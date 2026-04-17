// ─── Domain Types ────────────────────────────────────────────────────────────
// These mirror the Motoko backend structs exactly.

export interface Resume {
  id: string;
  filename: string;
  score: number;
  skills: string[];
  uploadDate: string; // ISO timestamp
  fileUrl?: string;
}

export interface MatchRecord {
  id: string;
  resumeId: string;
  resumeName: string;
  jobDescription: string;
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
  createdAt: string; // ISO timestamp
}

export interface MatchResult {
  matchScore: number;
  matchedSkills: string[];
  missingSkills: string[];
}

// ─── API result wrappers ─────────────────────────────────────────────────────

export type ResumeResult =
  | { __kind__: "ok"; ok: Resume }
  | { __kind__: "err"; err: string };

// ─── UI / view types ─────────────────────────────────────────────────────────

export type SortField = "score" | "filename" | "uploadDate";
export type SortOrder = "asc" | "desc";

export interface SortConfig {
  field: SortField;
  order: SortOrder;
}

export type UploadStatus = "idle" | "uploading" | "success" | "error";

export interface UploadState {
  status: UploadStatus;
  progress: number;
  error?: string;
}
