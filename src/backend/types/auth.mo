// Auth domain types
module {
  // User role — admin has full access, user has restricted access
  public type UserRole = {
    #admin;
    #user;
  };

  // Stored user record
  public type UserRecord = {
    email : Text;
    passwordHash : Text; // hashed — never stored in plaintext
    role : UserRole;
    createdAt : Int; // nanoseconds since epoch
    securityQuestion : ?Text; // optional — set by user after registration
    securityAnswerHash : ?Text; // hashed answer — never stored in plaintext
  };

  // Session token — opaque text identifying an active session
  public type SessionToken = Text;

  // Public result of a successful login
  public type LoginSuccess = {
    token : SessionToken;
    role : Text; // "admin" or "user" as Text for easy frontend consumption
  };

  // Register result — returns LoginSuccess on success so caller gets a token immediately
  public type RegisterResult = {
    #ok : LoginSuccess;
    #err : RegisterError;
  };

  public type RegisterError = {
    #duplicateEmail;
    #invalidInput;
  };

  // Login result
  public type LoginResult = {
    #ok : LoginSuccess;
    #err : LoginError;
  };

  public type LoginError = {
    #invalidCredentials;
  };

  // Session validation result
  public type SessionResult = {
    #ok : LoginSuccess;
    #err : Text;
  };

  // User summary returned by listUsers (shared-safe, no password hash)
  public type UserSummary = {
    email : Text;
    role : Text;
    createdAt : Int;
  };
};
