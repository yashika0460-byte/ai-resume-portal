import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type Timestamp = bigint;
export type ResumeResult = {
    __kind__: "ok";
    ok: Resume;
} | {
    __kind__: "err";
    err: string;
};
export interface LoginSuccess {
    token: SessionToken;
    role: string;
}
export interface MatchRecord {
    id: MatchId;
    jobDescription: string;
    matchScore: bigint;
    resumeName: string;
    resumeId: ResumeId;
    missingSkills: Array<string>;
    matchedSkills: Array<string>;
    matchDate: Timestamp;
}
export type MatchId = string;
export type ResumeId = string;
export type RegisterResult = {
    __kind__: "ok";
    ok: LoginSuccess;
} | {
    __kind__: "err";
    err: RegisterError;
};
export type MatchResult = {
    __kind__: "ok";
    ok: MatchRecord;
} | {
    __kind__: "err";
    err: string;
};
export interface UserSummary {
    createdAt: bigint;
    role: string;
    email: string;
}
export type SessionToken = string;
export type LoginResult = {
    __kind__: "ok";
    ok: LoginSuccess;
} | {
    __kind__: "err";
    err: LoginError;
};
export interface Resume {
    id: ResumeId;
    blob: ExternalBlob;
    filename: string;
    score: bigint;
    skills: Array<string>;
    uploadDate: Timestamp;
    uploadedBy: string;
}
export type SessionResult = {
    __kind__: "ok";
    ok: LoginSuccess;
} | {
    __kind__: "err";
    err: string;
};
export enum LoginError {
    invalidCredentials = "invalidCredentials"
}
export enum RegisterError {
    invalidInput = "invalidInput",
    duplicateEmail = "duplicateEmail"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    computeScore(skills: Array<string>): Promise<bigint>;
    deleteResume(sessionToken: string, resumeId: ResumeId): Promise<boolean>;
    deleteUser(token: SessionToken, email: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    extractSkillsFromText(text: string): Promise<Array<string>>;
    getCallerUserRole(): Promise<UserRole>;
    getMatchHistory(): Promise<Array<MatchRecord>>;
    getResumeMatchHistory(resumeId: ResumeId): Promise<Array<MatchRecord>>;
    getResumes(): Promise<Array<Resume>>;
    getSecurityQuestion(email: string): Promise<string | null>;
    getUserResumes(sessionToken: string): Promise<Array<Resume>>;
    isCallerAdmin(): Promise<boolean>;
    listUsers(token: SessionToken): Promise<{
        __kind__: "ok";
        ok: Array<UserSummary>;
    } | {
        __kind__: "err";
        err: string;
    }>;
    login(email: string, password: string): Promise<LoginResult>;
    logout(token: SessionToken): Promise<boolean>;
    matchResume(sessionToken: string, resumeId: ResumeId, jobDescription: string): Promise<MatchResult>;
    register(email: string, password: string): Promise<RegisterResult>;
    resetPasswordBySecurityQuestion(email: string, answer: string, newPassword: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    setSecurityQuestion(token: SessionToken, question: string, answer: string): Promise<{
        __kind__: "ok";
        ok: null;
    } | {
        __kind__: "err";
        err: string;
    }>;
    uploadResume(sessionToken: string, filename: string, blob: ExternalBlob): Promise<ResumeResult>;
    validateSession(token: SessionToken): Promise<SessionResult>;
}
