// Public API mixin for the resume domain
import List "mo:core/List";
import Map "mo:core/Map";
import Time "mo:core/Time";
import Runtime "mo:core/Runtime";
import AccessControl "mo:caffeineai-authorization/access-control";
import Storage "mo:caffeineai-object-storage/Storage";
import ResumeLib "../lib/resume";
import Types "../types/resume";
import Common "../types/common";

mixin (
  accessControlState : AccessControl.AccessControlState,
  resumes : List.List<Types.Resume>,
  matchHistory : List.List<Types.MatchRecord>,
  nextResumeId : { var value : Nat },
  nextMatchId : { var value : Nat },
  sessions : Map.Map<Text, Text>,
) {
  // Upload a resume; sessionToken identifies the authenticated user.
  public shared func uploadResume(
    sessionToken : Text,
    filename : Text,
    blob : Storage.ExternalBlob,
  ) : async Types.ResumeResult {
    switch (sessions.get(sessionToken)) {
      case null { return #err("Unauthorized: invalid or expired session") };
      case (?uploaderEmail) {
        let skills = ResumeLib.extractSkillsFromBlob(blob, filename);
        let score = ResumeLib.computeScore(skills);
        let id = ResumeLib.generateId("resume", nextResumeId.value);
        nextResumeId.value += 1;
        let resume = ResumeLib.newResume(id, filename, blob, skills, score, Time.now(), uploaderEmail);
        resumes.add(resume);
        #ok(resume)
      };
    }
  };

  // Return all resumes sorted by score descending (publicly readable)
  public query func getResumes() : async [Types.Resume] {
    ResumeLib.sortedResumes(resumes)
  };

  // Delete a resume by ID; sessionToken identifies the authenticated user.
  public shared func deleteResume(sessionToken : Text, resumeId : Common.ResumeId) : async Bool {
    switch (sessions.get(sessionToken)) {
      case null { Runtime.trap("Unauthorized: invalid or expired session") };
      case (?_email) {
        let sizeBefore = resumes.size();
        let filtered = resumes.filter(func(r) { r.id != resumeId });
        resumes.clear();
        resumes.append(filtered);
        resumes.size() < sizeBefore
      };
    }
  };

  // Match a resume against a job description; sessionToken identifies the authenticated user.
  public shared func matchResume(
    sessionToken : Text,
    resumeId : Common.ResumeId,
    jobDescription : Text,
  ) : async Types.MatchResult {
    switch (sessions.get(sessionToken)) {
      case null { return #err("Unauthorized: invalid or expired session") };
      case (?_email) {
        switch (resumes.find(func(r) { r.id == resumeId })) {
          case null { #err("Resume not found: " # resumeId) };
          case (?resume) {
            let jobSkills = ResumeLib.extractSkills(jobDescription);
            let (matchScore, matchedSkills, missingSkills) = ResumeLib.matchSkills(resume.skills, jobSkills);
            let id = ResumeLib.generateId("match", nextMatchId.value);
            nextMatchId.value += 1;
            let record : Types.MatchRecord = {
              id;
              resumeId;
              resumeName = resume.filename;
              jobDescription;
              matchScore;
              matchedSkills;
              missingSkills;
              matchDate = Time.now();
            };
            matchHistory.add(record);
            #ok(record)
          };
        }
      };
    }
  };

  // Return all match history records
  public query func getMatchHistory() : async [Types.MatchRecord] {
    matchHistory.toArray()
  };

  // Return match history for a specific resume
  public query func getResumeMatchHistory(resumeId : Common.ResumeId) : async [Types.MatchRecord] {
    matchHistory.filter(func(m) { m.resumeId == resumeId }).toArray()
  };

  // Extract skills from free-form text using the hardcoded skill list
  public query func extractSkillsFromText(text : Text) : async [Text] {
    ResumeLib.extractSkills(text)
  };

  // Compute a score from a list of skills (skills.size * 10, max 100)
  public query func computeScore(skills : [Text]) : async Nat {
    ResumeLib.computeScore(skills)
  };

  // Return resumes for the session owner (token-scoped to current user's email).
  public shared func getUserResumes(sessionToken : Text) : async [Types.Resume] {
    switch (sessions.get(sessionToken)) {
      case null { [] };
      case (?email) { ResumeLib.filterResumesByUser(resumes, email) };
    }
  };
};
