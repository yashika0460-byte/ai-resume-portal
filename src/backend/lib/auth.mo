// Domain logic for authentication: user storage, password hashing, sessions
import Map "mo:core/Map";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Nat "mo:core/Nat";
import Nat32 "mo:core/Nat32";
import Int "mo:core/Int";
import Char "mo:core/Char";
import Types "../types/auth";

module {
  // ---------------------------------------------------------------------------
  // Email normalization — trim whitespace and lowercase
  // ---------------------------------------------------------------------------
  public func normalizeEmail(email : Text) : Text {
    // Trim leading/trailing whitespace then lowercase every character
    let trimmed = email.trim(#predicate(func(c) { c == ' ' or c == '\t' or c == '\n' or c == '\r' }));
    trimmed.toLower()
  };

  // ---------------------------------------------------------------------------
  // Password hashing
  // A simple deterministic polynomial hash over char codes. Passwords are
  // NEVER stored as plaintext. Deterministic so the same password always
  // produces the same hash.
  // ---------------------------------------------------------------------------
  public func hashPassword(password : Text) : Text {
    let fnvPrime : Nat = 16777619;
    let fnvBasis : Nat = 2166136261;
    let mod32 : Nat = 4294967296; // 2^32

    var h0 = fnvBasis;
    var h1 = 0x811c9dc5;
    var h2 = 0xdeadbeef;
    var h3 = 0xabcd1234;

    for (c in password.toIter()) {
      let code = c.toNat32().toNat();
      // Use only +, *, % — no bitwise ops on Nat
      h0 := ((h0 + code) * fnvPrime) % mod32;
      h1 := ((h1 + code + h0) * 1540483477) % mod32;
      h2 := ((h2 + h0 + h1) * 2654435761) % mod32;
      h3 := ((h3 + h1 + h2) * fnvPrime) % mod32;
    };

    let hexChars : [Char] = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
    let natToHex8 = func(n : Nat) : Text {
      var result = "";
      var remaining = n % mod32;
      var i = 0;
      while (i < 8) {
        let nibble = remaining % 16;
        result := Text.fromChar(hexChars[nibble]) # result;
        remaining := remaining / 16;
        i += 1;
      };
      result
    };

    natToHex8(h0) # natToHex8(h1) # natToHex8(h2) # natToHex8(h3)
  };

  // ---------------------------------------------------------------------------
  // Token generation — timestamp + counter based.
  // tokenCounter is passed in as a mutable record so the module is stateless.
  // ---------------------------------------------------------------------------
  public func generateToken(
    email : Text,
    tokenCounter : { var value : Nat },
  ) : Types.SessionToken {
    let ts = Time.now();
    tokenCounter.value += 1;
    "tok_" # email # "_" # Int.abs(ts).toText() # "_" # tokenCounter.value.toText()
  };

  // ---------------------------------------------------------------------------
  // Role helpers
  // ---------------------------------------------------------------------------
  public func roleToText(role : Types.UserRole) : Text {
    switch role {
      case (#admin) "admin";
      case (#user) "user";
    }
  };

  // ---------------------------------------------------------------------------
  // User CRUD
  // ---------------------------------------------------------------------------
  public func registerUser(
    users : Map.Map<Text, Types.UserRecord>,
    sessions : Map.Map<Text, Text>,
    tokenCounter : { var value : Nat },
    email : Text,
    passwordHash : Text,
    role : Types.UserRole,
  ) : Types.RegisterResult {
    let normalizedEmail = normalizeEmail(email);
    if (normalizedEmail.size() == 0 or passwordHash.size() == 0) {
      return #err(#invalidInput);
    };
    if (users.get(normalizedEmail) != null) {
      return #err(#duplicateEmail);
    };
    let record : Types.UserRecord = {
      email = normalizedEmail;
      passwordHash;
      role;
      createdAt = Time.now();
      securityQuestion = null;
      securityAnswerHash = null;
    };
    users.add(normalizedEmail, record);
    let token = generateToken(normalizedEmail, tokenCounter);
    sessions.add(token, normalizedEmail);
    #ok({ token; role = roleToText(role) })
  };

  public func loginUser(
    users : Map.Map<Text, Types.UserRecord>,
    sessions : Map.Map<Text, Text>,
    tokenCounter : { var value : Nat },
    email : Text,
    passwordHash : Text,
  ) : Types.LoginResult {
    let normalizedEmail = normalizeEmail(email);
    switch (users.get(normalizedEmail)) {
      case null { #err(#invalidCredentials) };
      case (?record) {
        if (record.passwordHash != passwordHash) {
          return #err(#invalidCredentials);
        };
        let token = generateToken(normalizedEmail, tokenCounter);
        sessions.add(token, normalizedEmail);
        #ok({ token; role = roleToText(record.role) })
      };
    }
  };

  public func validateSession(
    users : Map.Map<Text, Types.UserRecord>,
    sessions : Map.Map<Text, Text>,
    token : Types.SessionToken,
  ) : Types.SessionResult {
    switch (sessions.get(token)) {
      case null { #err("Invalid or expired session") };
      case (?email) {
        switch (users.get(email)) {
          case null { #err("User not found") };
          case (?record) {
            #ok({ token; role = roleToText(record.role) })
          };
        }
      };
    }
  };

  public func logoutUser(
    sessions : Map.Map<Text, Text>,
    token : Types.SessionToken,
  ) : Bool {
    let existed = sessions.get(token) != null;
    sessions.remove(token);
    existed
  };

  // ---------------------------------------------------------------------------
  // Forgot password — security question flow
  // ---------------------------------------------------------------------------

  // Set or update the security question and answer for the session owner
  public func setSecurityQuestion(
    users : Map.Map<Text, Types.UserRecord>,
    sessions : Map.Map<Text, Text>,
    token : Types.SessionToken,
    question : Text,
    answer : Text,
  ) : { #ok; #err : Text } {
    switch (sessions.get(token)) {
      case null { #err("Invalid or expired session") };
      case (?email) {
        switch (users.get(email)) {
          case null { #err("User not found") };
          case (?record) {
            let updated : Types.UserRecord = {
              record with
              securityQuestion = ?question;
              securityAnswerHash = ?hashPassword(answer);
            };
            users.add(email, updated);
            #ok
          };
        }
      };
    }
  };

  // Return the security question for a given email (null if not set)
  public func getSecurityQuestion(
    users : Map.Map<Text, Types.UserRecord>,
    email : Text,
  ) : ?Text {
    let normalizedEmail = normalizeEmail(email);
    switch (users.get(normalizedEmail)) {
      case null { null };
      case (?record) { record.securityQuestion };
    }
  };

  // Reset password using security question answer
  public func resetPasswordBySecurityQuestion(
    users : Map.Map<Text, Types.UserRecord>,
    email : Text,
    answer : Text,
    newPassword : Text,
  ) : { #ok; #err : Text } {
    let normalizedEmail = normalizeEmail(email);
    switch (users.get(normalizedEmail)) {
      case null { #err("User not found") };
      case (?record) {
        switch (record.securityAnswerHash) {
          case null { #err("No security question set for this account") };
          case (?storedHash) {
            if (storedHash != hashPassword(answer)) {
              return #err("Incorrect answer");
            };
            let updated : Types.UserRecord = {
              record with
              passwordHash = hashPassword(newPassword);
            };
            users.add(normalizedEmail, updated);
            #ok
          };
        }
      };
    }
  };

  // ---------------------------------------------------------------------------
  // User management — admin only
  // ---------------------------------------------------------------------------

  // Return all users as shared-safe summaries (admin only, caller checked in mixin)
  public func listUsers(
    users : Map.Map<Text, Types.UserRecord>,
  ) : [Types.UserSummary] {
    let summaries = users.entries().map(
      func((_email, record) : (Text, Types.UserRecord)) : Types.UserSummary {
        {
          email = record.email;
          role = roleToText(record.role);
          createdAt = record.createdAt;
        }
      }
    );
    summaries.toArray()
  };

  // Delete a user by email; also purge their sessions (admin only, caller checked in mixin)
  public func deleteUser(
    users : Map.Map<Text, Types.UserRecord>,
    sessions : Map.Map<Text, Text>,
    adminEmail : Text,
    targetEmail : Text,
  ) : { #ok; #err : Text } {
    let normalizedTarget = normalizeEmail(targetEmail);
    if (normalizedTarget == normalizeEmail(adminEmail)) {
      return #err("Cannot delete your own account");
    };
    if (users.get(normalizedTarget) == null) {
      return #err("User not found");
    };
    users.remove(normalizedTarget);
    // Purge all sessions belonging to the deleted user
    let tokensToRemove = sessions.entries()
      .filter(func((_, email) : (Text, Text)) : Bool { email == normalizedTarget })
      .map(func((tok, _) : (Text, Text)) : Text { tok })
      .toArray();
    for (tok in tokensToRemove.vals()) {
      sessions.remove(tok);
    };
    #ok
  };

  // ---------------------------------------------------------------------------
  // Preload demo users.
  // Admin is ALWAYS force-reseeded (remove + add) so credentials stay current
  // across upgrades and redeployments.
  // The demo user is seeded only on first install — Map.add() silently skips
  // the entry when it already exists, preserving any password changes.
  // Regular registered users are never touched here.
  // ---------------------------------------------------------------------------
  public func preloadDemoUsers(users : Map.Map<Text, Types.UserRecord>) {
    // Admin: always overwrite to guarantee credentials are correct
    let adminEmail = normalizeEmail("chandu46@gmail.com");
    users.remove(adminEmail);
    users.add(adminEmail, {
      email = adminEmail;
      passwordHash = hashPassword("chandu1432");
      role = #admin;
      createdAt = 0;
      securityQuestion = null;
      securityAnswerHash = null;
    });

    // Demo user: seed only if not already present (preserves state across upgrades)
    let demoEmail = normalizeEmail("user@portal.com");
    users.add(demoEmail, {
      email = demoEmail;
      passwordHash = hashPassword("user123");
      role = #user;
      createdAt = 0;
      securityQuestion = null;
      securityAnswerHash = null;
    });
  };
};
