/**
 * DashboardPage — Admin dashboard showing all resumes, analytics, match history,
 * and user management. Includes CSV export, empty states, and consistent loading/error patterns.
 */

import { Button } from "@/components/ui/AppButton";
import { GlassCard, StatCard } from "@/components/ui/GlassCard";
import { LoadingSpinner, Skeleton } from "@/components/ui/LoadingSpinner";
import { ScoreBadge, SkillBadge } from "@/components/ui/SkillBadge";
import { useAuth } from "@/hooks/use-auth";
import {
  useDeleteResume,
  useMatchHistory,
  useResumes,
} from "@/hooks/use-resumes";
import type { MatchRecord, Resume } from "@/types";
import { useActor } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ChevronLeft,
  Download,
  FileText,
  LayoutDashboard,
  Search,
  Shield,
  Target,
  Trash2,
  TrendingUp,
  UploadCloud,
  User,
  Users,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { BackendActor, UserRecord } from "../api";
import { apiDeleteUser, apiListUsers } from "../api";
import { createActor } from "../backend";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getScoreColor(score: number): string {
  if (score >= 70) return "oklch(0.72 0.18 198)";
  if (score >= 40) return "oklch(0.72 0.16 70)";
  return "oklch(0.63 0.22 16)";
}

function getScoreClass(score: number): string {
  if (score >= 70) return "text-accent";
  if (score >= 40) return "text-yellow-400";
  return "text-destructive";
}

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "—";
  }
}

function truncateFilename(name: string, max = 22): string {
  if (name.length <= max) return name;
  const ext = name.lastIndexOf(".");
  if (ext > 0) return `${name.slice(0, max - 4)}…${name.slice(ext)}`;
  return `${name.slice(0, max - 1)}…`;
}

// ─── CSV Export ───────────────────────────────────────────────────────────────

function exportToCSV(resumes: Resume[]) {
  const sorted = [...resumes].sort((a, b) => b.score - a.score);
  const header = ["Rank", "Filename", "Score", "Skills", "Upload Date"];
  const rows = sorted.map((r, idx) => [
    String(idx + 1),
    `"${r.filename.replace(/"/g, '""')}"`,
    String(r.score),
    `"${r.skills.join(", ")}"`,
    `"${formatDate(r.uploadDate)}"`,
  ]);

  const csv = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `resumes-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Confirm Delete Modal ─────────────────────────────────────────────────────

interface ConfirmDeleteProps {
  resume: Resume;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

function ConfirmDelete({
  resume,
  onConfirm,
  onCancel,
  isPending,
}: ConfirmDeleteProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "oklch(0.60 0.014 240 / 0.25)",
        backdropFilter: "blur(8px)",
      }}
    >
      <GlassCard
        className="max-w-sm w-full mx-4 flex flex-col gap-5"
        data-ocid="confirm-delete-modal"
      >
        <div className="flex items-center gap-3 text-destructive">
          <AlertTriangle className="size-5 shrink-0" />
          <h2 className="font-display font-semibold text-lg text-foreground">
            Delete Resume?
          </h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="text-foreground font-medium">{resume.filename}</span>{" "}
          will be permanently removed along with its match history. This cannot
          be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={onCancel}
            disabled={isPending}
            data-ocid="confirm-delete-cancel"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
            data-ocid="confirm-delete-confirm"
          >
            {isPending ? "Deleting…" : "Delete"}
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}

// ─── Chart tooltip ────────────────────────────────────────────────────────────

interface TooltipPayload {
  value: number;
  payload: { filename: string };
}

function ChartTooltip({
  active,
  payload,
}: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null;
  const item = payload[0];
  return (
    <div className="glass rounded-lg px-3 py-2 text-sm">
      <p className="font-medium text-foreground truncate max-w-[180px]">
        {item.payload.filename}
      </p>
      <p className="text-accent font-mono font-semibold">Score: {item.value}</p>
    </div>
  );
}

// ─── Stats bar ────────────────────────────────────────────────────────────────

function StatsBar({ resumes }: { resumes: Resume[] }) {
  const total = resumes.length;
  const avg = total
    ? Math.round(resumes.reduce((s, r) => s + r.score, 0) / total)
    : 0;
  const top = total ? Math.max(...resumes.map((r) => r.score)) : 0;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <StatCard
        label="Total Resumes"
        value={total}
        icon={<FileText className="size-4" />}
        data-ocid="stat-total"
      />
      <StatCard
        label="Average Score"
        value={`${avg}`}
        icon={<TrendingUp className="size-4" />}
        data-ocid="stat-avg"
      />
      <StatCard
        label="Top Score"
        value={`${top}`}
        icon={<Target className="size-4" />}
        data-ocid="stat-top"
      />
    </div>
  );
}

// ─── Score bar chart ──────────────────────────────────────────────────────────

function ScoreChart({ resumes }: { resumes: Resume[] }) {
  const data = [...resumes]
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map((r) => ({ filename: r.filename, score: r.score }));

  return (
    <GlassCard data-ocid="score-chart" className="flex flex-col gap-4">
      <h2 className="font-display font-semibold text-foreground text-lg">
        Resume Score Distribution
      </h2>
      <ResponsiveContainer width="100%" height={220}>
        <BarChart
          data={data}
          margin={{ top: 4, right: 8, left: -16, bottom: 0 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="oklch(0.22 0.012 240 / 0.4)"
            vertical={false}
          />
          <XAxis
            dataKey="filename"
            tickFormatter={(v: string) => truncateFilename(v, 10)}
            tick={{
              fill: "oklch(0.62 0.02 240)",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
            }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            domain={[0, 100]}
            tick={{
              fill: "oklch(0.62 0.02 240)",
              fontSize: 11,
              fontFamily: "var(--font-mono)",
            }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={<ChartTooltip />}
            cursor={{ fill: "oklch(0.72 0.18 198 / 0.06)" }}
          />
          <Bar dataKey="score" radius={[4, 4, 0, 0]}>
            {data.map((entry) => (
              <Cell
                key={`cell-${entry.filename}`}
                fill={getScoreColor(entry.score)}
                fillOpacity={0.85}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </GlassCard>
  );
}

// ─── Empty dashboard state ────────────────────────────────────────────────────

function DashboardEmpty() {
  return (
    <GlassCard
      className="flex flex-col items-center justify-center py-20 gap-5 text-center"
      data-ocid="dashboard-empty-state"
    >
      <div className="relative">
        <div className="p-5 rounded-2xl bg-accent/10 border border-accent/20">
          <UploadCloud className="size-12 text-accent/70" />
        </div>
        <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent/30 animate-pulse" />
      </div>
      <div className="max-w-xs">
        <p className="font-display font-bold text-xl text-foreground">
          No resumes uploaded yet
        </p>
        <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
          Upload your first candidate resume and the AI will extract skills,
          compute a match score, and populate this dashboard automatically.
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-3 mt-1">
        <Button asChild data-ocid="empty-upload-cta">
          <Link to="/upload">
            <UploadCloud className="size-4" />
            Upload First Resume
          </Link>
        </Button>
        <Button asChild variant="outline" data-ocid="empty-match-cta">
          <Link to="/match">
            <Target className="size-4" />
            Try Job Matching
          </Link>
        </Button>
      </div>
      <div className="mt-2 flex flex-col sm:flex-row items-center gap-6 text-xs text-muted-foreground/60">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
          Drag-and-drop PDF upload
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
          44 tech skills extracted automatically
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
          AI scoring out of 100
        </span>
      </div>
    </GlassCard>
  );
}

// ─── Score tier filter presets ─────────────────────────────────────────────────

type ScoreTier = "all" | "high" | "medium" | "low";

const SCORE_TIERS: { key: ScoreTier; label: string; className: string }[] = [
  { key: "all", label: "All", className: "" },
  { key: "high", label: "High (70+)", className: "text-accent" },
  { key: "medium", label: "Medium (40–69)", className: "text-yellow-400" },
  { key: "low", label: "Low (<40)", className: "text-destructive" },
];

function matchesTier(score: number, tier: ScoreTier): boolean {
  if (tier === "high") return score >= 70;
  if (tier === "medium") return score >= 40 && score < 70;
  if (tier === "low") return score < 40;
  return true;
}

// ─── Resume table ─────────────────────────────────────────────────────────────

interface ResumeTableProps {
  resumes: Resume[];
  onDelete: (r: Resume) => void;
}

function ResumeTable({ resumes, onDelete }: ResumeTableProps) {
  const [search, setSearch] = useState("");
  const [tier, setTier] = useState<ScoreTier>("all");

  const sorted = [...resumes].sort((a, b) => b.score - a.score);
  const filtered = sorted.filter((r) => {
    const matchesSearch = r.filename
      .toLowerCase()
      .includes(search.toLowerCase());
    return matchesSearch && matchesTier(r.score, tier);
  });

  return (
    <GlassCard className="overflow-hidden p-0" data-ocid="resume-table">
      {/* ── Search + filter bar ── */}
      <div className="px-4 py-3 flex flex-col sm:flex-row gap-3 border-b border-border/20">
        {/* Text search */}
        <div className="relative flex-1 min-w-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by filename…"
            className="w-full bg-muted/30 border border-border/30 rounded-lg pl-8 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 transition-colors duration-200"
            data-ocid="filter-search"
          />
        </div>

        {/* Score tier filter */}
        <div className="flex gap-1 shrink-0">
          {SCORE_TIERS.map(({ key, label, className }) => (
            <button
              key={key}
              type="button"
              onClick={() => setTier(key)}
              data-ocid={`filter-tier-${key}`}
              className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 border ${
                tier === key
                  ? "bg-accent/15 border-accent/30 text-accent"
                  : `border-border/30 text-muted-foreground hover:bg-muted/40 hover:text-foreground ${className}`
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr
              style={{ borderBottom: "1px solid oklch(0.22 0.012 240 / 0.4)" }}
            >
              {["#", "Filename", "Score", "Skills", "Actions"].map((col) => (
                <th
                  key={col}
                  className="px-4 py-3.5 text-left text-xs font-semibold font-display uppercase tracking-wider text-muted-foreground"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center">
                  <p className="text-sm text-muted-foreground">
                    No resumes match your filter.
                  </p>
                </td>
              </tr>
            ) : (
              filtered.map((resume, idx) => (
                <tr
                  key={resume.id}
                  className="glass-hover"
                  style={{
                    borderBottom: "1px solid oklch(0.22 0.012 240 / 0.2)",
                  }}
                  data-ocid={`resume-row-${idx}`}
                >
                  {/* Rank */}
                  <td className="px-4 py-3.5 w-10">
                    <span className="text-muted-foreground font-mono text-xs">
                      {idx + 1}
                    </span>
                  </td>

                  {/* Filename */}
                  <td className="px-4 py-3.5 min-w-[160px]">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                        <FileText className="size-3.5 text-primary" />
                      </div>
                      <div className="min-w-0">
                        <p className="font-medium text-foreground truncate max-w-[200px]">
                          {resume.filename}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {formatDate(resume.uploadDate)}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Score */}
                  <td className="px-4 py-3.5 w-32">
                    <div className="flex flex-col gap-1.5">
                      <span
                        className={`font-mono font-bold text-base ${getScoreClass(resume.score)}`}
                      >
                        {resume.score}
                      </span>
                      <div className="score-bar w-20">
                        <div
                          className="score-bar-fill"
                          style={{ width: `${Math.min(resume.score, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Skills */}
                  <td className="px-4 py-3.5 max-w-[280px]">
                    <div className="flex flex-wrap gap-1">
                      {resume.skills.slice(0, 5).map((skill) => (
                        <SkillBadge key={skill} label={skill} />
                      ))}
                      {resume.skills.length > 5 && (
                        <SkillBadge
                          label={`+${resume.skills.length - 5}`}
                          status="primary"
                        />
                      )}
                    </div>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-3.5 w-28">
                    <div className="flex items-center gap-2">
                      {resume.fileUrl && (
                        <Button
                          variant="ghost"
                          size="icon"
                          asChild
                          className="size-8 text-accent hover:bg-accent/10 hover:text-accent"
                          data-ocid={`download-btn-${idx}`}
                        >
                          <a
                            href={resume.fileUrl}
                            download={resume.filename}
                            aria-label="Download resume"
                          >
                            <Download className="size-4" />
                          </a>
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => onDelete(resume)}
                        data-ocid={`delete-btn-${idx}`}
                        aria-label="Delete resume"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

// ─── Match History table ──────────────────────────────────────────────────────

function MatchHistorySection({ matches }: { matches: MatchRecord[] }) {
  if (matches.length === 0) {
    return (
      <GlassCard
        className="flex flex-col items-center justify-center py-10 gap-3"
        data-ocid="match-history-empty"
      >
        <Target className="size-8 text-muted-foreground" />
        <p className="text-sm text-muted-foreground">
          No match results yet. Run a job description match to see history here.
        </p>
      </GlassCard>
    );
  }

  const sorted = [...matches].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <GlassCard className="overflow-hidden p-0" data-ocid="match-history-table">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr
              style={{ borderBottom: "1px solid oklch(0.22 0.012 240 / 0.4)" }}
            >
              {["Resume", "Match Score", "Matched Skills", "Date"].map(
                (col) => (
                  <th
                    key={col}
                    className="px-4 py-3.5 text-left text-xs font-semibold font-display uppercase tracking-wider text-muted-foreground"
                  >
                    {col}
                  </th>
                ),
              )}
            </tr>
          </thead>
          <tbody>
            {sorted.map((match, idx) => (
              <tr
                key={match.id}
                className="glass-hover"
                style={{
                  borderBottom: "1px solid oklch(0.22 0.012 240 / 0.2)",
                }}
                data-ocid={`match-row-${idx}`}
              >
                <td className="px-4 py-3.5 max-w-[200px]">
                  <span className="font-medium text-foreground truncate block">
                    {match.resumeName}
                  </span>
                </td>
                <td className="px-4 py-3.5 w-32">
                  <ScoreBadge score={match.matchScore} />
                </td>
                <td className="px-4 py-3.5 max-w-[280px]">
                  <div className="flex flex-wrap gap-1">
                    {match.matchedSkills.slice(0, 4).map((s) => (
                      <SkillBadge key={s} label={s} status="matched" />
                    ))}
                    {match.matchedSkills.length > 4 && (
                      <SkillBadge
                        label={`+${match.matchedSkills.length - 4}`}
                      />
                    )}
                  </div>
                </td>
                <td className="px-4 py-3.5 w-36">
                  <span className="text-muted-foreground text-xs">
                    {formatDate(match.createdAt)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassCard>
  );
}

// ─── Skeleton loading state ───────────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-24" />
        ))}
      </div>
      <Skeleton className="h-64" />
      <Skeleton className="h-72" />
    </div>
  );
}

// ─── Dashboard tabs ───────────────────────────────────────────────────────────

type DashboardTab = "resumes" | "analytics" | "users";

interface TabButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  ocid: string;
}

function TabButton({ active, onClick, icon, label, ocid }: TabButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-ocid={ocid}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors duration-200 border ${
        active
          ? "bg-accent/15 border-accent/30 text-accent"
          : "border-border/30 text-muted-foreground hover:bg-muted/40 hover:text-foreground"
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

// ─── Confirm Delete User Modal ────────────────────────────────────────────────

interface ConfirmDeleteUserProps {
  userEmail: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

function ConfirmDeleteUser({
  userEmail,
  onConfirm,
  onCancel,
  isPending,
}: ConfirmDeleteUserProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        background: "oklch(0.60 0.014 240 / 0.25)",
        backdropFilter: "blur(8px)",
      }}
    >
      <GlassCard
        className="max-w-sm w-full mx-4 flex flex-col gap-5"
        data-ocid="confirm-delete-user-modal"
      >
        <div className="flex items-center gap-3 text-destructive">
          <AlertTriangle className="size-5 shrink-0" />
          <h2 className="font-display font-semibold text-lg text-foreground">
            Delete User?
          </h2>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Are you sure you want to delete{" "}
          <span className="text-foreground font-medium break-all">
            {userEmail}
          </span>
          ? This cannot be undone.
        </p>
        <div className="flex justify-end gap-3">
          <Button
            variant="ghost"
            onClick={onCancel}
            disabled={isPending}
            data-ocid="confirm-delete-user-cancel"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={onConfirm}
            disabled={isPending}
            data-ocid="confirm-delete-user-confirm"
          >
            {isPending ? "Deleting…" : "Delete"}
          </Button>
        </div>
      </GlassCard>
    </div>
  );
}

// ─── Users tab section ────────────────────────────────────────────────────────

interface UsersTabProps {
  token: string;
  currentUserEmail: string;
}

function UsersTab({ token, currentUserEmail }: UsersTabProps) {
  const { actor: rawActor } = useActor(createActor);
  const actor = rawActor as BackendActor | null;

  const [users, setUsers] = useState<UserRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [pendingDelete, setPendingDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const fetchUsers = useCallback(async () => {
    if (!actor) return;
    setIsLoading(true);
    setError(null);
    const result = await apiListUsers(actor, token);
    if (result.success && result.users) {
      setUsers(result.users);
    } else {
      setError(result.error ?? "Failed to load users");
    }
    setIsLoading(false);
  }, [actor, token]);

  useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);

  const handleDeleteConfirm = async () => {
    if (!pendingDelete || !actor) return;
    setIsDeleting(true);
    const result = await apiDeleteUser(actor, token, pendingDelete);
    if (result.success) {
      setUsers((prev) => prev.filter((u) => u.email !== pendingDelete));
    } else {
      setError(result.error ?? "Failed to delete user");
    }
    setIsDeleting(false);
    setPendingDelete(null);
  };

  const filtered = users.filter((u) =>
    u.email.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex flex-col gap-4">
        <Skeleton className="h-12" />
        <Skeleton className="h-72" />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4" data-ocid="users-tab">
      {error && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm">
          <AlertTriangle className="size-4 shrink-0" />
          {error}
        </div>
      )}

      <GlassCard className="overflow-hidden p-0" data-ocid="users-table">
        {/* Search bar */}
        <div className="px-4 py-3 border-b border-border/20">
          <div className="relative max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by email…"
              className="w-full bg-muted/30 border border-border/30 rounded-lg pl-8 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 transition-colors duration-200"
              data-ocid="users-search"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr
                style={{
                  borderBottom: "1px solid oklch(0.22 0.012 240 / 0.4)",
                }}
              >
                {["Email", "Role", "Date Joined", "Actions"].map((col) => (
                  <th
                    key={col}
                    className="px-4 py-3.5 text-left text-xs font-semibold font-display uppercase tracking-wider text-muted-foreground"
                  >
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-4 py-14 text-center">
                    <div
                      className="flex flex-col items-center gap-3"
                      data-ocid="users-empty-state"
                    >
                      <Users className="size-8 text-muted-foreground/50" />
                      <p className="text-sm text-muted-foreground">
                        {search
                          ? "No users match your search."
                          : "No users found."}
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                filtered.map((u, idx) => (
                  <tr
                    key={u.email}
                    className="glass-hover"
                    style={{
                      borderBottom: "1px solid oklch(0.22 0.012 240 / 0.2)",
                    }}
                    data-ocid={`user-row-${idx}`}
                  >
                    {/* Email */}
                    <td className="px-4 py-3.5 min-w-[200px]">
                      <div className="flex items-center gap-2.5">
                        <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 shrink-0">
                          <User className="size-3.5 text-primary" />
                        </div>
                        <span className="font-medium text-foreground truncate max-w-[240px]">
                          {u.email}
                        </span>
                      </div>
                    </td>

                    {/* Role badge */}
                    <td className="px-4 py-3.5 w-28">
                      {u.role === "admin" ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-accent/15 border border-accent/30 text-accent">
                          <Shield className="size-3" />
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-muted/40 border border-border/30 text-muted-foreground">
                          <User className="size-3" />
                          User
                        </span>
                      )}
                    </td>

                    {/* Date joined */}
                    <td className="px-4 py-3.5 w-36">
                      <span className="text-muted-foreground text-xs">
                        {formatDate(u.createdAt)}
                      </span>
                    </td>

                    {/* Delete action */}
                    <td className="px-4 py-3.5 w-20">
                      {u.email.toLowerCase() !==
                      currentUserEmail.toLowerCase() ? (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => setPendingDelete(u.email)}
                          data-ocid={`delete-user-btn-${idx}`}
                          aria-label={`Delete user ${u.email}`}
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      ) : (
                        <span className="text-xs text-muted-foreground/40 px-2">
                          You
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </GlassCard>

      {pendingDelete && (
        <ConfirmDeleteUser
          userEmail={pendingDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setPendingDelete(null)}
          isPending={isDeleting}
        />
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  const { data: resumes = [], isLoading: resumesLoading } = useResumes();
  const { data: matches = [], isLoading: matchesLoading } = useMatchHistory();
  const deleteMutation = useDeleteResume();
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState<DashboardTab>("resumes");
  const [pendingDelete, setPendingDelete] = useState<Resume | null>(null);

  const handleDeleteClick = (resume: Resume) => setPendingDelete(resume);

  const handleDeleteConfirm = () => {
    if (!pendingDelete) return;
    deleteMutation.mutate(pendingDelete.id, {
      onSuccess: () => setPendingDelete(null),
      onError: () => setPendingDelete(null),
    });
  };

  const isLoading = resumesLoading || matchesLoading;
  const hasResumes = resumes.length > 0;

  return (
    <div
      className="min-h-screen gradient-flow bg-grid-pattern"
      data-ocid="dashboard-page"
    >
      {/* ── Back button ── */}
      <button
        type="button"
        onClick={() => window.history.back()}
        aria-label="Go back"
        data-ocid="btn-back"
        className="fixed top-4 left-4 z-50 flex items-center justify-center size-9 rounded-xl bg-muted/30 border border-border/40 text-muted-foreground hover:text-accent hover:border-accent/50 hover:bg-accent/10 backdrop-blur-sm transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8">
        {/* Page header */}
        <div className="flex items-center justify-between gap-4 fade-up">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-accent/10 border border-accent/25">
              <LayoutDashboard className="size-5 text-accent" />
            </div>
            <div>
              <h1 className="font-display font-bold text-2xl text-foreground">
                Admin Dashboard
              </h1>
              <p className="text-sm text-muted-foreground">
                AI Resume Screening Portal
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {hasResumes && activeTab !== "users" && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => exportToCSV(resumes)}
                data-ocid="btn-export-csv"
                className="hidden sm:flex gap-2 border-border/40 hover:border-accent/40 hover:text-accent"
              >
                <Download className="size-4" />
                Export CSV
              </Button>
            )}
            <Button asChild data-ocid="upload-cta">
              <Link to="/upload">+ Upload Resume</Link>
            </Button>
          </div>
        </div>

        {/* ── Tab bar ── */}
        <div
          className="flex gap-2 flex-wrap fade-up"
          style={{ animationDelay: "0.03s" }}
        >
          <TabButton
            active={activeTab === "resumes"}
            onClick={() => setActiveTab("resumes")}
            icon={<FileText className="size-4" />}
            label="Resumes"
            ocid="tab-resumes"
          />
          <TabButton
            active={activeTab === "analytics"}
            onClick={() => setActiveTab("analytics")}
            icon={<TrendingUp className="size-4" />}
            label="Analytics"
            ocid="tab-analytics"
          />
          <TabButton
            active={activeTab === "users"}
            onClick={() => setActiveTab("users")}
            icon={<Users className="size-4" />}
            label="Users"
            ocid="tab-users"
          />
        </div>

        {/* ── Resumes tab ── */}
        {activeTab === "resumes" &&
          (isLoading ? (
            <DashboardSkeleton />
          ) : !hasResumes ? (
            <div className="fade-up">
              <DashboardEmpty />
            </div>
          ) : (
            <>
              {/* KPI stats */}
              <section className="fade-up" style={{ animationDelay: "0.05s" }}>
                <StatsBar resumes={resumes} />
              </section>

              {/* Resume table + mobile export button */}
              <section
                className="fade-up flex flex-col gap-3"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display font-semibold text-lg text-foreground">
                    All Resumes
                    <span className="ml-2 text-xs font-normal text-muted-foreground font-body">
                      sorted by score
                    </span>
                  </h2>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportToCSV(resumes)}
                    data-ocid="btn-export-csv-mobile"
                    className="sm:hidden flex gap-2 border-border/40 hover:border-accent/40 hover:text-accent"
                  >
                    <Download className="size-4" />
                    CSV
                  </Button>
                </div>
                <ResumeTable resumes={resumes} onDelete={handleDeleteClick} />
              </section>
            </>
          ))}

        {/* ── Analytics tab ── */}
        {activeTab === "analytics" &&
          (isLoading ? (
            <DashboardSkeleton />
          ) : !hasResumes ? (
            <div className="fade-up">
              <DashboardEmpty />
            </div>
          ) : (
            <>
              <section className="fade-up" style={{ animationDelay: "0.05s" }}>
                <StatsBar resumes={resumes} />
              </section>
              <section className="fade-up" style={{ animationDelay: "0.1s" }}>
                <ScoreChart resumes={resumes} />
              </section>
              <section
                className="fade-up flex flex-col gap-3"
                style={{ animationDelay: "0.15s" }}
              >
                <h2 className="font-display font-semibold text-lg text-foreground">
                  Match History
                </h2>
                <MatchHistorySection matches={matches as MatchRecord[]} />
              </section>
            </>
          ))}

        {/* ── Users tab ── */}
        {activeTab === "users" && user && (
          <section className="fade-up" style={{ animationDelay: "0.05s" }}>
            <UsersTab token={user.token} currentUserEmail={user.email} />
          </section>
        )}

        {/* Loading overlay for delete in progress */}
        {deleteMutation.isPending && !pendingDelete && (
          <div
            className="fixed inset-0 z-40 flex items-center justify-center"
            style={{ background: "oklch(0.60 0.014 240 / 0.20)" }}
          >
            <LoadingSpinner size="lg" label="Deleting resume…" />
          </div>
        )}
      </div>

      {/* Confirm delete dialog */}
      {pendingDelete && (
        <ConfirmDelete
          resume={pendingDelete}
          onConfirm={handleDeleteConfirm}
          onCancel={() => setPendingDelete(null)}
          isPending={deleteMutation.isPending}
        />
      )}
    </div>
  );
}
