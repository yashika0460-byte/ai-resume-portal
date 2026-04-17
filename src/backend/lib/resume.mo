// Domain logic for resume management and skill matching
import List "mo:core/List";
import Text "mo:core/Text";
import Types "../types/resume";
import Common "../types/common";
import Storage "mo:caffeineai-object-storage/Storage";

module {
  // Expanded skill list: 60+ skills covering modern frameworks, cloud, DevOps, data science, mobile, and databases
  public let SKILL_LIST : [Text] = [
    // Core programming languages
    "JavaScript", "TypeScript", "Python", "Java", "C#", "C++", "Go", "Rust", "PHP", "Swift", "Kotlin", "Ruby", "Scala",
    // Frontend frameworks
    "React", "Angular", "Vue", "Svelte",
    // Backend frameworks
    "Node.js", "Express", "Django", "Flask", "Spring", "FastAPI", "Rails", "Laravel",
    // Databases
    "SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "Cassandra", "DynamoDB", "Elasticsearch",
    // APIs & protocols
    "GraphQL", "REST APIs", "gRPC", "WebSockets",
    // Cloud & infrastructure
    "Docker", "Kubernetes", "AWS", "GCP", "Azure", "Terraform", "Ansible", "Helm",
    // DevOps & tooling
    "Git", "Linux", "Bash", "CI/CD", "Jenkins", "GitHub Actions", "GitLab CI",
    // Web / design
    "HTML", "CSS", "Tailwind", "Bootstrap", "Figma",
    // Data science & ML
    "Machine Learning", "Deep Learning", "Data Analysis", "TensorFlow", "PyTorch", "Pandas", "NumPy", "Scikit-learn", "Keras",
    // Mobile
    "React Native", "Flutter", "iOS", "Android",
    // Methodology
    "Agile", "Scrum", "DevOps"
  ];

  // Skill aliases: maps every variant to a canonical skill name.
  // Keys must be lowercase for case-insensitive matching.
  let SKILL_ALIASES : [(Text, Text)] = [
    // React
    ("reactjs", "React"),
    ("react.js", "React"),
    // Node.js
    ("nodejs", "Node.js"),
    // Vue
    ("vuejs", "Vue"),
    ("vue.js", "Vue"),
    // Angular
    ("angularjs", "Angular"),
    // TypeScript
    ("ts", "TypeScript"),
    // JavaScript
    ("js", "JavaScript"),
    ("ecmascript", "JavaScript"),
    // Python
    ("py", "Python"),
    // PostgreSQL
    ("postgres", "PostgreSQL"),
    // GraphQL
    ("gql", "GraphQL"),
    // REST APIs
    ("rest", "REST APIs"),
    ("restful", "REST APIs"),
    ("rest api", "REST APIs"),
    // CI/CD
    ("cicd", "CI/CD"),
    ("continuous integration", "CI/CD"),
    ("continuous delivery", "CI/CD"),
    // Kubernetes
    ("k8s", "Kubernetes"),
    // Elasticsearch
    ("elastic search", "Elasticsearch"),
    // Scikit-learn
    ("sklearn", "Scikit-learn"),
    ("scikit learn", "Scikit-learn"),
    // React Native
    ("rn", "React Native"),
    // GitHub Actions
    ("github-actions", "GitHub Actions"),
    // Machine Learning
    ("ml", "Machine Learning"),
    // Deep Learning
    ("dl", "Deep Learning"),
    // Spring
    ("spring boot", "Spring"),
    ("springboot", "Spring"),
    // FastAPI
    ("fast api", "FastAPI"),
    // GitLab CI
    ("gitlab-ci", "GitLab CI"),
    ("gitlab ci", "GitLab CI"),
  ];

  // Normalize a token for matching: lowercase, remove dots, dashes, and extra spaces
  func normalize(s : Text) : Text {
    var result = s.toLower();
    // Remove dots
    result := result.replace(#char '.', "");
    // Remove dashes
    result := result.replace(#char '-', "");
    // Remove underscores
    result := result.replace(#char '_', "");
    result
  };

  // Create a new Resume record; uploadedBy is the user's email (from session token)
  public func newResume(
    id : Common.ResumeId,
    filename : Text,
    blob : Storage.ExternalBlob,
    skills : [Text],
    score : Nat,
    uploadDate : Common.Timestamp,
    uploadedBy : Text,
  ) : Types.Resume {
    { id; filename; blob; skills; score; uploadDate; uploadedBy }
  };

  // Extract skills from text using normalized matching and alias resolution.
  // Returns canonical skill names; deduplicates results.
  public func extractSkills(text : Text) : [Text] {
    let normText = normalize(text);

    // First: check each SKILL_LIST item directly (normalized)
    let directMatches = SKILL_LIST.filter(func(skill) {
      normText.contains(#text (normalize(skill)))
    });

    // Second: check aliases — if alias matches and canonical not already found, add canonical
    let aliasMatches : List.List<Text> = List.empty<Text>();
    for ((alias, canonical) in SKILL_ALIASES.values()) {
      let normAlias = normalize(alias);
      if (normText.contains(#text normAlias)) {
        // Only add if canonical is in SKILL_LIST and not already in directMatches
        if (
          SKILL_LIST.find(func(s : Text) : Bool = Text.equal(s, canonical)) != null
          and directMatches.find(func(s : Text) : Bool = Text.equal(s, canonical)) == null
        ) {
          aliasMatches.add(canonical);
        };
      };
    };

    // Merge: directMatches + aliasMatches (deduplicated)
    let result : List.List<Text> = List.empty<Text>();
    for (s in directMatches.values()) {
      result.add(s);
    };
    for (s in aliasMatches.values()) {
      if (result.find(func(r : Text) : Bool = Text.equal(r, s)) == null) {
        result.add(s);
      };
    };
    result.toArray()
  };

  // Extract skills from a blob (PDF bytes) by decoding to text; falls back to filename only if decoding fails
  public func extractSkillsFromBlob(blob : Storage.ExternalBlob, filename : Text) : [Text] {
    let content = switch (blob.decodeUtf8()) {
      case (?decoded) { decoded # " " # filename };
      case null { filename };
    };
    extractSkills(content)
  };

  // Compute score: skills.size() * 10, capped at 100
  public func computeScore(skills : [Text]) : Nat {
    let raw = skills.size() * 10;
    if (raw > 100) 100 else raw
  };

  // Match a resume's skills against a job description; returns (matchScore, matchedSkills, missingSkills)
  public func matchSkills(resumeSkills : [Text], jobSkills : [Text]) : (Nat, [Text], [Text]) {
    let resumeSkillsLower = resumeSkills.map(func(s : Text) : Text { s.toLower() });
    let matched = jobSkills.filter(func(jobSkill) {
      let jobSkillLower = jobSkill.toLower();
      resumeSkillsLower.find(func(rs) { Text.equal(rs, jobSkillLower) }) != null
    });
    let missing = jobSkills.filter(func(jobSkill) {
      let jobSkillLower = jobSkill.toLower();
      resumeSkillsLower.find(func(rs) { Text.equal(rs, jobSkillLower) }) == null
    });
    let totalJobSkills = if (jobSkills.size() == 0) 1 else jobSkills.size();
    let matchScore = (matched.size() * 100) / totalJobSkills;
    (matchScore, matched, missing)
  };

  // Return all resumes sorted by uploadDate descending (most recent first)
  public func sortedResumes(resumes : List.List<Types.Resume>) : [Types.Resume] {
    let arr = resumes.toArray();
    arr.sort(func(a, b) {
      if (a.uploadDate > b.uploadDate) #less
      else if (a.uploadDate < b.uploadDate) #greater
      else #equal
    })
  };

  // Return resumes filtered by uploadedBy email (for per-user history)
  public func filterResumesByUser(resumes : List.List<Types.Resume>, userEmail : Text) : [Types.Resume] {
    resumes.filter(func(r) { r.uploadedBy == userEmail }).toArray()
  };

  // Generate a unique ID based on a counter
  public func generateId(prefix : Text, counter : Nat) : Text {
    prefix # "-" # counter.toText()
  };
};
