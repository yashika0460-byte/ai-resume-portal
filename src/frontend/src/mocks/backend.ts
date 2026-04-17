import type { backendInterface, Resume, MatchRecord, UserRole, LoginResult, RegisterResult, SessionResult } from "../backend.d";
import type { Principal } from "@icp-sdk/core/principal";
import { ExternalBlob } from "../backend.d";

const now = BigInt(Date.now()) * BigInt(1_000_000);

const sampleResumes: Resume[] = [
  {
    id: "resume-1",
    blob: ExternalBlob.fromURL("https://example.com/resume1.pdf"),
    filename: "john_doe_resume.pdf",
    score: BigInt(91),
    skills: ["Python", "AWS", "Machine Learning", "Docker"],
    uploadDate: now - BigInt(86400 * 1_000_000_000),
    uploadedBy: "john@example.com",
  },
  {
    id: "resume-2",
    blob: ExternalBlob.fromURL("https://example.com/resume2.pdf"),
    filename: "jane_smith_resume.pdf",
    score: BigInt(85),
    skills: ["Machine Learning", "TensorFlow", "Python", "SQL"],
    uploadDate: now - BigInt(2 * 86400 * 1_000_000_000),
    uploadedBy: "jane@example.com",
  },
  {
    id: "resume-3",
    blob: ExternalBlob.fromURL("https://example.com/resume3.pdf"),
    filename: "marty_smith_resume.pdf",
    score: BigInt(87),
    skills: ["Machine Learning", "PyTorch", "Python"],
    uploadDate: now - BigInt(3 * 86400 * 1_000_000_000),
    uploadedBy: "marty@example.com",
  },
  {
    id: "resume-4",
    blob: ExternalBlob.fromURL("https://example.com/resume4.pdf"),
    filename: "mia_cardeon_resume.pdf",
    score: BigInt(82),
    skills: ["Python", "SQL", "Data Analysis"],
    uploadDate: now - BigInt(4 * 86400 * 1_000_000_000),
    uploadedBy: "mia@example.com",
  },
  {
    id: "resume-5",
    blob: ExternalBlob.fromURL("https://example.com/resume5.pdf"),
    filename: "kanna_schatti_resume.pdf",
    score: BigInt(92),
    skills: ["Python", "AWS", "Kubernetes", "CI/CD"],
    uploadDate: now - BigInt(5 * 86400 * 1_000_000_000),
    uploadedBy: "kanna@example.com",
  },
];

const sampleMatchHistory: MatchRecord[] = [
  {
    id: "match-1",
    jobDescription: "Senior Python Developer with AWS experience",
    matchScore: BigInt(91),
    resumeName: "john_doe_resume.pdf",
    resumeId: "resume-1",
    matchedSkills: ["Python", "AWS"],
    missingSkills: ["React", "TypeScript"],
    matchDate: now - BigInt(86400 * 1_000_000_000),
  },
  {
    id: "match-2",
    jobDescription: "Machine Learning Engineer",
    matchScore: BigInt(85),
    resumeName: "jane_smith_resume.pdf",
    resumeId: "resume-2",
    matchedSkills: ["Machine Learning", "Python", "TensorFlow"],
    missingSkills: ["Spark"],
    matchDate: now - BigInt(2 * 86400 * 1_000_000_000),
  },
  {
    id: "match-3",
    jobDescription: "Full Stack Developer",
    matchScore: BigInt(72),
    resumeName: "marty_smith_resume.pdf",
    resumeId: "resume-3",
    matchedSkills: ["Python"],
    missingSkills: ["React", "Node.js", "TypeScript"],
    matchDate: now - BigInt(3 * 86400 * 1_000_000_000),
  },
];

export const mockBackend: backendInterface = {
  assignCallerUserRole: async (_user: Principal, _role: UserRole) => undefined,

  computeScore: async (skills: string[]) => BigInt(skills.length * 10),

  deleteResume: async (_sessionToken: string, _resumeId: string) => true,

  extractSkillsFromText: async (_text: string) => ["Python", "JavaScript", "React", "AWS"],

  getCallerUserRole: async () => "admin" as unknown as UserRole,

  getMatchHistory: async () => sampleMatchHistory,

  getResumeMatchHistory: async (_resumeId: string) => sampleMatchHistory.slice(0, 1),

  getResumes: async () => sampleResumes,

  getUserResumes: async (_sessionToken: string) => sampleResumes,

  isCallerAdmin: async () => true,

  matchResume: async (_sessionToken: string, resumeId: string, _jobDescription: string) => {
    const resume = sampleResumes.find((r) => r.id === resumeId);
    if (!resume) {
      return { __kind__: "err", err: "Resume not found" };
    }
    return {
      __kind__: "ok",
      ok: {
        id: `match-${Date.now()}`,
        jobDescription: _jobDescription,
        matchScore: BigInt(88),
        resumeName: resume.filename,
        resumeId: resume.id,
        matchedSkills: resume.skills.slice(0, 2),
        missingSkills: ["TypeScript", "React"],
        matchDate: BigInt(Date.now()) * BigInt(1_000_000),
      },
    };
  },

  uploadResume: async (_sessionToken: string, filename: string, _blob: ExternalBlob) => ({
    __kind__: "ok",
    ok: {
      id: `resume-new-${Date.now()}`,
      blob: _blob,
      filename,
      score: BigInt(75),
      skills: ["Python", "SQL"],
      uploadDate: BigInt(Date.now()) * BigInt(1_000_000),
      uploadedBy: "user@portal.com",
    },
  }),

  // ─── Auth mock methods ─────────────────────────────────────────────────────

  login: async (email: string, password: string): Promise<LoginResult> => {
    const accounts: Record<string, { password: string; role: string }> = {
      "chandu46@gmail.com": { password: "chandu1432", role: "admin" },
      "user@portal.com": { password: "user123", role: "user" },
    };
    const account = accounts[email.toLowerCase()];
    if (!account || account.password !== password) {
      return { __kind__: "err", err: "invalidCredentials" } as LoginResult;
    }
    return {
      __kind__: "ok",
      ok: { token: `mock-token-${email}`, role: account.role },
    };
  },

  register: async (email: string, _password: string): Promise<RegisterResult> => ({
    __kind__: "ok",
    ok: { token: `mock-token-${email}`, role: "user" },
  }),

  validateSession: async (token: string): Promise<SessionResult> => {
    if (token.startsWith("mock-token-")) {
      const email = token.replace("mock-token-", "");
      const role = email.includes("admin") ? "admin" : "user";
      return { __kind__: "ok", ok: { token, role } };
    }
    return { __kind__: "err", err: "Invalid session" };
  },

  logout: async (_token: string): Promise<boolean> => true,

  // ─── User management mock methods ─────────────────────────────────────────

  listUsers: async (_token: string) => ({
    __kind__: "ok" as const,
    ok: [
      { email: "chandu46@gmail.com", role: "admin", createdAt: BigInt(Date.now()) * BigInt(1_000_000) },
      { email: "user@portal.com", role: "user", createdAt: BigInt(Date.now()) * BigInt(1_000_000) },
    ],
  }),

  deleteUser: async (_token: string, _email: string) => ({ __kind__: "ok" as const, ok: null }),

  // ─── Security question mock methods ───────────────────────────────────────

  getSecurityQuestion: async (email: string): Promise<string | null> => {
    if (email.toLowerCase() === "chandu46@gmail.com") {
      return "What is your mother's maiden name?";
    }
    if (email.toLowerCase() === "user@portal.com") {
      return "What was the name of your first pet?";
    }
    return null;
  },

  resetPasswordBySecurityQuestion: async (
    _email: string,
    answer: string,
    _newPassword: string,
  ) => {
    if (answer.toLowerCase() === "test") {
      return { __kind__: "ok" as const, ok: null };
    }
    return { __kind__: "err" as const, err: "Incorrect answer." };
  },

  setSecurityQuestion: async (
    _token: string,
    _question: string,
    _answer: string,
  ) => ({ __kind__: "ok" as const, ok: null }),
};
