// Composition root — wires all mixins together. No business logic here.
import List "mo:core/List";
import Map "mo:core/Map";
import AccessControl "mo:caffeineai-authorization/access-control";
import MixinAuthorization "mo:caffeineai-authorization/MixinAuthorization";
import MixinObjectStorage "mo:caffeineai-object-storage/Mixin";
import ResumeTypes "types/resume";
import AuthTypes "types/auth";
import ResumeMixin "mixins/resume-api";
import AuthMixin "mixins/auth-api";
import AuthLib "lib/auth";



actor {
  // Authorization state (managed by MixinAuthorization)
  let accessControlState = AccessControl.initState();
  include MixinAuthorization(accessControlState);

  // Object storage infrastructure (managed by MixinObjectStorage)
  include MixinObjectStorage();

  // Resume domain state
  let resumes = List.empty<ResumeTypes.Resume>();
  let matchHistory = List.empty<ResumeTypes.MatchRecord>();

  // Mutable counters wrapped as records so the mixin can increment them
  let nextResumeId = { var value : Nat = 0 };
  let nextMatchId = { var value : Nat = 0 };

  // Auth domain state
  let users = Map.empty<Text, AuthTypes.UserRecord>();
  let sessions = Map.empty<Text, Text>();
  let tokenCounter = { var value : Nat = 0 };

  // Preload demo accounts (idempotent — skips if already present)
  AuthLib.preloadDemoUsers(users);

  // Resume API mixin — sessions passed so resume ops can validate token auth
  include ResumeMixin(
    accessControlState,
    resumes,
    matchHistory,
    nextResumeId,
    nextMatchId,
    sessions,
  );

  // Auth API mixin (register/login are public — no auth guard)
  include AuthMixin(users, sessions, tokenCounter);
};
