// Resume domain types
import Storage "mo:caffeineai-object-storage/Storage";
import Common "common";

module {
  // Internal resume record (stored in canister state)
  public type Resume = {
    id : Common.ResumeId;
    filename : Text;
    blob : Storage.ExternalBlob;
    score : Nat;
    skills : [Text];
    uploadDate : Common.Timestamp;
    uploadedBy : Text; // email of the user who uploaded (from session token)
  };

  // Public API result type returned to callers
  public type ResumeResult = {
    #ok : Resume;
    #err : Text;
  };

  // Match history record
  public type MatchRecord = {
    id : Common.MatchId;
    resumeId : Common.ResumeId;
    resumeName : Text;
    jobDescription : Text;
    matchScore : Nat;
    matchedSkills : [Text];
    missingSkills : [Text];
    matchDate : Common.Timestamp;
  };

  // Result of a match operation
  public type MatchResult = {
    #ok : MatchRecord;
    #err : Text;
  };
};
