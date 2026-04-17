function toResume(r) {
  var _a, _b;
  return {
    id: r.id,
    filename: r.filename,
    score: Number(r.score),
    skills: r.skills,
    // Timestamp is nanoseconds bigint → convert to ms ISO string
    uploadDate: new Date(
      Number(r.uploadDate / BigInt(1e6))
    ).toISOString(),
    fileUrl: (_b = (_a = r.blob) == null ? void 0 : _a.getDirectURL) == null ? void 0 : _b.call(_a)
  };
}
function toMatchRecord(m) {
  return {
    id: m.id,
    resumeId: m.resumeId,
    resumeName: m.resumeName,
    jobDescription: m.jobDescription,
    matchScore: Number(m.matchScore),
    matchedSkills: m.matchedSkills,
    missingSkills: m.missingSkills,
    createdAt: new Date(Number(m.matchDate / BigInt(1e6))).toISOString()
  };
}
async function apiGetResumes(actor) {
  if (!actor.getResumes) return [];
  const results = await actor.getResumes();
  return results.map(toResume).sort((a, b) => b.score - a.score);
}
async function apiUploadResume(actor, sessionToken, filename, blob) {
  if (!actor.uploadResume) throw new Error("uploadResume not available");
  const raw = await actor.uploadResume(sessionToken, filename, blob);
  if (raw.__kind__ === "ok") {
    return { __kind__: "ok", ok: toResume(raw.ok) };
  }
  return { __kind__: "err", err: raw.err };
}
async function apiDeleteResume(actor, sessionToken, resumeId) {
  if (!actor.deleteResume) throw new Error("deleteResume not available");
  return actor.deleteResume(sessionToken, resumeId);
}
async function apiMatchResume(actor, sessionToken, resumeId, jobDescription) {
  if (!actor.matchResume) throw new Error("matchResume not available");
  const raw = await actor.matchResume(sessionToken, resumeId, jobDescription);
  if (raw.__kind__ === "err") throw new Error(raw.err);
  const record = raw.ok;
  return {
    matchScore: Number(record.matchScore),
    matchedSkills: record.matchedSkills,
    missingSkills: record.missingSkills
  };
}
async function apiGetMatchHistory(actor) {
  if (!actor.getMatchHistory) return [];
  const results = await actor.getMatchHistory();
  return results.map(toMatchRecord);
}
async function apiGetUserResumes(actor, sessionToken) {
  if (!actor.getUserResumes) return [];
  const results = await actor.getUserResumes(sessionToken);
  return results.map(toResume).sort((a, b) => b.score - a.score);
}
async function apiListUsers(actor, token) {
  if (!actor.listUsers) return { success: false, error: "Not available" };
  try {
    const result = await actor.listUsers(token);
    if (result.__kind__ === "err") return { success: false, error: result.err };
    const users = result.ok.map((u) => ({
      email: u.email,
      role: u.role,
      createdAt: new Date(
        Number(u.createdAt / BigInt(1e6))
      ).toISOString()
    }));
    return { success: true, users };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to fetch users"
    };
  }
}
async function apiDeleteUser(actor, token, email) {
  if (!actor.deleteUser) return { success: false, error: "Not available" };
  try {
    const result = await actor.deleteUser(token, email);
    if (result.__kind__ === "err") return { success: false, error: result.err };
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : "Failed to delete user"
    };
  }
}
async function apiGetSecurityQuestion(actor, email) {
  if (!actor.getSecurityQuestion) return null;
  return actor.getSecurityQuestion(email);
}
async function apiResetPasswordBySecurityQuestion(actor, email, answer, newPassword) {
  if (!actor.resetPasswordBySecurityQuestion)
    return { success: false, error: "Not available." };
  const result = await actor.resetPasswordBySecurityQuestion(
    email,
    answer,
    newPassword
  );
  if (result.__kind__ === "ok") return { success: true };
  return { success: false, error: result.err };
}
async function apiSetSecurityQuestion(actor, token, question, answer) {
  if (!actor.setSecurityQuestion)
    return { success: false, error: "Not available." };
  const result = await actor.setSecurityQuestion(token, question, answer);
  if (result.__kind__ === "ok") return { success: true };
  return { success: false, error: result.err };
}
export {
  apiGetSecurityQuestion as a,
  apiResetPasswordBySecurityQuestion as b,
  apiListUsers as c,
  apiDeleteUser as d,
  apiSetSecurityQuestion as e,
  apiGetResumes as f,
  apiGetMatchHistory as g,
  apiMatchResume as h,
  apiGetUserResumes as i,
  apiUploadResume as j,
  apiDeleteResume as k
};
