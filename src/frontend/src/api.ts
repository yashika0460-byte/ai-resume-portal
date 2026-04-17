/**
 * api.ts — typed wrappers for every backend canister method.
 *
 * All functions receive the actor instance so they remain pure and testable.
 * Actual actor wiring happens in hooks/use-resumes.ts via useActor().
 *
 * NOTE: The backend uses bigint for score, matchScore, and Timestamp (uploadDate,
 * matchDate). We convert those to number/string at this boundary so that all
 * UI code works with plain JS types.
 */

import type {
  MatchRecord as BackendMatchRecord,
  Resume as BackendResume,
  ExternalBlob,
  LoginResult,
  RegisterResult,
  SessionResult,
} from "./backend";
import type { MatchRecord, MatchResult, Resume, ResumeResult } from "./types";

// ─── Backend actor type ───────────────────────────────────────────────────────

export interface BackendActor {
  uploadResume?: (
    sessionToken: string,
    filename: string,
    blob: ExternalBlob,
  ) => Promise<
    { __kind__: "ok"; ok: BackendResume } | { __kind__: "err"; err: string }
  >;
  getResumes?: () => Promise<BackendResume[]>;
  deleteResume?: (sessionToken: string, resumeId: string) => Promise<boolean>;
  matchResume?: (
    sessionToken: string,
    resumeId: string,
    jobDescription: string,
  ) => Promise<
    | { __kind__: "ok"; ok: BackendMatchRecord }
    | { __kind__: "err"; err: string }
  >;
  getMatchHistory?: () => Promise<BackendMatchRecord[]>;
  getResumeMatchHistory?: (resumeId: string) => Promise<BackendMatchRecord[]>;
  extractSkillsFromText?: (text: string) => Promise<string[]>;
  computeScore?: (skills: string[]) => Promise<bigint>;
  // Auth methods
  register?: (email: string, password: string) => Promise<RegisterResult>;
  login?: (email: string, password: string) => Promise<LoginResult>;
  validateSession?: (token: string) => Promise<SessionResult>;
  logout?: (token: string) => Promise<boolean>;
  // User management
  listUsers?: (token: string) => Promise<
    | {
        __kind__: "ok";
        ok: Array<{ email: string; role: string; createdAt: bigint }>;
      }
    | { __kind__: "err"; err: string }
  >;
  deleteUser?: (
    token: string,
    email: string,
  ) => Promise<{ __kind__: "ok"; ok: null } | { __kind__: "err"; err: string }>;
  // User resume history — now token-scoped; sessionToken resolves to the user's email server-side
  getUserResumes?: (sessionToken: string) => Promise<BackendResume[]>;
  // Security question / password reset
  getSecurityQuestion?: (email: string) => Promise<string | null>;
  resetPasswordBySecurityQuestion?: (
    email: string,
    answer: string,
    newPassword: string,
  ) => Promise<{ __kind__: "ok"; ok: null } | { __kind__: "err"; err: string }>;
  setSecurityQuestion?: (
    token: string,
    question: string,
    answer: string,
  ) => Promise<{ __kind__: "ok"; ok: null } | { __kind__: "err"; err: string }>;
}

// ─── Conversion helpers ───────────────────────────────────────────────────────

function toResume(r: BackendResume): Resume {
  return {
    id: r.id,
    filename: r.filename,
    score: Number(r.score),
    skills: r.skills,
    // Timestamp is nanoseconds bigint → convert to ms ISO string
    uploadDate: new Date(
      Number(r.uploadDate / BigInt(1_000_000)),
    ).toISOString(),
    fileUrl: r.blob?.getDirectURL?.(),
  };
}

function toMatchRecord(m: BackendMatchRecord): MatchRecord {
  return {
    id: m.id,
    resumeId: m.resumeId,
    resumeName: m.resumeName,
    jobDescription: m.jobDescription,
    matchScore: Number(m.matchScore),
    matchedSkills: m.matchedSkills,
    missingSkills: m.missingSkills,
    createdAt: new Date(Number(m.matchDate / BigInt(1_000_000))).toISOString(),
  };
}

// ─── Auth operations ──────────────────────────────────────────────────────────

export async function apiRegister(
  actor: BackendActor,
  email: string,
  password: string,
): Promise<RegisterResult> {
  if (!actor.register) throw new Error("register not available");
  return actor.register(email, password);
}

export async function apiLogin(
  actor: BackendActor,
  email: string,
  password: string,
): Promise<LoginResult> {
  if (!actor.login) throw new Error("login not available");
  return actor.login(email, password);
}

export async function apiValidateSession(
  actor: BackendActor,
  token: string,
): Promise<SessionResult> {
  if (!actor.validateSession) throw new Error("validateSession not available");
  return actor.validateSession(token);
}

export async function apiLogout(
  actor: BackendActor,
  token: string,
): Promise<boolean> {
  if (!actor.logout) throw new Error("logout not available");
  return actor.logout(token);
}

// ─── Resume operations ────────────────────────────────────────────────────────

export async function apiGetResumes(actor: BackendActor): Promise<Resume[]> {
  if (!actor.getResumes) return [];
  const results = await actor.getResumes();
  return results.map(toResume).sort((a, b) => b.score - a.score);
}

export async function apiUploadResume(
  actor: BackendActor,
  sessionToken: string,
  filename: string,
  blob: ExternalBlob,
): Promise<ResumeResult> {
  if (!actor.uploadResume) throw new Error("uploadResume not available");
  const raw = await actor.uploadResume(sessionToken, filename, blob);
  if (raw.__kind__ === "ok") {
    return { __kind__: "ok", ok: toResume(raw.ok) };
  }
  return { __kind__: "err", err: raw.err };
}

export async function apiDeleteResume(
  actor: BackendActor,
  sessionToken: string,
  resumeId: string,
): Promise<boolean> {
  if (!actor.deleteResume) throw new Error("deleteResume not available");
  return actor.deleteResume(sessionToken, resumeId);
}

// ─── Match operations ─────────────────────────────────────────────────────────

export async function apiMatchResume(
  actor: BackendActor,
  sessionToken: string,
  resumeId: string,
  jobDescription: string,
): Promise<MatchResult> {
  if (!actor.matchResume) throw new Error("matchResume not available");
  const raw = await actor.matchResume(sessionToken, resumeId, jobDescription);
  if (raw.__kind__ === "err") throw new Error(raw.err);
  const record = raw.ok;
  return {
    matchScore: Number(record.matchScore),
    matchedSkills: record.matchedSkills,
    missingSkills: record.missingSkills,
  };
}

export async function apiGetMatchHistory(
  actor: BackendActor,
): Promise<MatchRecord[]> {
  if (!actor.getMatchHistory) return [];
  const results = await actor.getMatchHistory();
  return results.map(toMatchRecord);
}

export async function apiGetResumeMatchHistory(
  actor: BackendActor,
  resumeId: string,
): Promise<MatchRecord[]> {
  if (!actor.getResumeMatchHistory) return [];
  const results = await actor.getResumeMatchHistory(resumeId);
  return results.map(toMatchRecord);
}

// ─── Skills / scoring ─────────────────────────────────────────────────────────

export async function apiExtractSkills(
  actor: BackendActor,
  text: string,
): Promise<string[]> {
  if (!actor.extractSkillsFromText) return [];
  return actor.extractSkillsFromText(text);
}

export async function apiComputeScore(
  actor: BackendActor,
  skills: string[],
): Promise<number> {
  if (!actor.computeScore) return 0;
  const result = await actor.computeScore(skills);
  return Number(result);
}

// ─── User resume history ─────────────────────────────────────────────────────

/**
 * apiGetUserResumes — fetches all resumes for the current user via session token.
 * The backend resolves the token to the user's email and returns only their resumes.
 */
export async function apiGetUserResumes(
  actor: BackendActor,
  sessionToken: string,
): Promise<Resume[]> {
  if (!actor.getUserResumes) return [];
  const results = await actor.getUserResumes(sessionToken);
  return results.map(toResume).sort((a, b) => b.score - a.score);
}

// ─── User management ──────────────────────────────────────────────────────────

export interface UserRecord {
  email: string;
  role: string;
  createdAt: string; // ISO timestamp
}

export async function apiListUsers(
  actor: BackendActor,
  token: string,
): Promise<{ success: boolean; users?: UserRecord[]; error?: string }> {
  if (!actor.listUsers) return { success: false, error: "Not available" };
  try {
    const result = await actor.listUsers(token);
    if (result.__kind__ === "err") return { success: false, error: result.err };
    const users: UserRecord[] = result.ok.map((u) => ({
      email: u.email,
      role: u.role,
      createdAt: new Date(
        Number(u.createdAt / BigInt(1_000_000)),
      ).toISOString(),
    }));
    return { success: true, users };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to fetch users",
    };
  }
}

export async function apiDeleteUser(
  actor: BackendActor,
  token: string,
  email: string,
): Promise<{ success: boolean; error?: string }> {
  if (!actor.deleteUser) return { success: false, error: "Not available" };
  try {
    const result = await actor.deleteUser(token, email);
    if (result.__kind__ === "err") return { success: false, error: result.err };
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete user",
    };
  }
}

// ─── Security question / password reset ──────────────────────────────────────

export async function apiGetSecurityQuestion(
  actor: BackendActor,
  email: string,
): Promise<string | null> {
  if (!actor.getSecurityQuestion) return null;
  return actor.getSecurityQuestion(email);
}

export async function apiResetPasswordBySecurityQuestion(
  actor: BackendActor,
  email: string,
  answer: string,
  newPassword: string,
): Promise<{ success: boolean; error?: string }> {
  if (!actor.resetPasswordBySecurityQuestion)
    return { success: false, error: "Not available." };
  const result = await actor.resetPasswordBySecurityQuestion(
    email,
    answer,
    newPassword,
  );
  if (result.__kind__ === "ok") return { success: true };
  return { success: false, error: result.err };
}

export async function apiSetSecurityQuestion(
  actor: BackendActor,
  token: string,
  question: string,
  answer: string,
): Promise<{ success: boolean; error?: string }> {
  if (!actor.setSecurityQuestion)
    return { success: false, error: "Not available." };
  const result = await actor.setSecurityQuestion(token, question, answer);
  if (result.__kind__ === "ok") return { success: true };
  return { success: false, error: result.err };
}
