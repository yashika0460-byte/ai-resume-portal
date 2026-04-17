// Public auth API mixin — register/login/validateSession/logout are all public
// (no auth guard) so anonymous callers can use them.
// setSecurityQuestion/getSecurityQuestion/resetPasswordBySecurityQuestion are public (no session required for get/reset).
// listUsers/deleteUser require admin session.
import Map "mo:core/Map";
import AuthLib "../lib/auth";
import Types "../types/auth";

mixin (
  users : Map.Map<Text, Types.UserRecord>,
  sessions : Map.Map<Text, Text>,
  tokenCounter : { var value : Nat },
) {
  // Register a new user. Email is normalized and password is hashed server-side.
  // Returns a session token immediately so the caller is logged in right away.
  public shared func register(
    email : Text,
    password : Text,
  ) : async Types.RegisterResult {
    let normalizedEmail = AuthLib.normalizeEmail(email);
    let passwordHash = AuthLib.hashPassword(password);
    AuthLib.registerUser(users, sessions, tokenCounter, normalizedEmail, passwordHash, #user)
  };

  // Login with email and password. Returns a session token and role on success.
  public shared func login(
    email : Text,
    password : Text,
  ) : async Types.LoginResult {
    let normalizedEmail = AuthLib.normalizeEmail(email);
    let passwordHash = AuthLib.hashPassword(password);
    AuthLib.loginUser(users, sessions, tokenCounter, normalizedEmail, passwordHash)
  };

  // Validate an existing session token. Returns role and token if valid.
  public shared func validateSession(
    token : Types.SessionToken,
  ) : async Types.SessionResult {
    AuthLib.validateSession(users, sessions, token)
  };

  // Logout — invalidates the session token.
  public shared func logout(
    token : Types.SessionToken,
  ) : async Bool {
    AuthLib.logoutUser(sessions, token)
  };

  // ---------------------------------------------------------------------------
  // Forgot password — security question flow
  // ---------------------------------------------------------------------------

  // Set or update security question/answer for the currently authenticated user.
  public shared func setSecurityQuestion(
    token : Types.SessionToken,
    question : Text,
    answer : Text,
  ) : async { #ok; #err : Text } {
    AuthLib.setSecurityQuestion(users, sessions, token, question, answer)
  };

  // Return the security question for an email (public — no session required).
  public shared func getSecurityQuestion(
    email : Text,
  ) : async ?Text {
    AuthLib.getSecurityQuestion(users, email)
  };

  // Reset password using the answer to the security question (public — no session required).
  public shared func resetPasswordBySecurityQuestion(
    email : Text,
    answer : Text,
    newPassword : Text,
  ) : async { #ok; #err : Text } {
    AuthLib.resetPasswordBySecurityQuestion(users, email, answer, newPassword)
  };

  // ---------------------------------------------------------------------------
  // User management — admin only
  // ---------------------------------------------------------------------------

  // List all users — requires valid admin session token.
  public shared func listUsers(
    token : Types.SessionToken,
  ) : async { #ok : [Types.UserSummary]; #err : Text } {
    switch (AuthLib.validateSession(users, sessions, token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(sess)) {
        if (sess.role != "admin") {
          return #err("Admin access required");
        };
        #ok(AuthLib.listUsers(users))
      };
    }
  };

  // Delete a user by email — requires valid admin session token; cannot delete self.
  public shared func deleteUser(
    token : Types.SessionToken,
    email : Text,
  ) : async { #ok; #err : Text } {
    switch (AuthLib.validateSession(users, sessions, token)) {
      case (#err(msg)) { #err(msg) };
      case (#ok(sess)) {
        if (sess.role != "admin") {
          return #err("Admin access required");
        };
        // Resolve the admin's own email from the session map before delegating
        let adminEmail = switch (sessions.get(token)) {
          case (?e) e;
          case null { return #err("Session not found") };
        };
        AuthLib.deleteUser(users, sessions, adminEmail, email)
      };
    }
  };
};
