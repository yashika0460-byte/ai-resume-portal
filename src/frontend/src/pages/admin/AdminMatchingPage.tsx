/**
 * AdminMatchingPage.tsx — Job Matching dashboard with mini circular match gauges.
 * Dark glass card, JD textarea, ranked results with circular score gauges,
 * skill chip columns, CSV download, loading states.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  AlertCircle,
  Briefcase,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  Filter,
  Layers,
  Loader2,
  Plus,
  Search,
  Trash2,
  X,
  XCircle,
  Zap,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { type BackendActor, apiMatchResume } from "../../api";
import { createActor } from "../../backend";
import { useAuth } from "../../hooks/use-auth";
import { useMatchHistory, useResumes } from "../../hooks/use-resumes";
import type { MatchRecord, Resume } from "../../types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function scoreColorClass(score: number): string {
  if (score >= 70) return "text-emerald-400";
  if (score >= 40) return "text-amber-400";
  return "text-red-400";
}

function scoreStroke(score: number): string {
  if (score >= 70) return "#34d399";
  if (score >= 40) return "#fbbf24";
  return "#f87171";
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function truncateJD(jd: string, max = 120): string {
  return jd.length <= max ? jd : `${jd.slice(0, max).trimEnd()}…`;
}

function exportToCSV(records: MatchRecord[]): void {
  const header = [
    "Candidate",
    "Match Score",
    "Matched Skills",
    "Missing Skills",
    "Date",
  ];
  const rows = records.map((r) => [
    `"${r.resumeName}"`,
    r.matchScore,
    `"${r.matchedSkills.join(", ")}"`,
    `"${r.missingSkills.join(", ")}"`,
    `"${formatDate(r.createdAt)}"`,
  ]);
  const csv = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `match-results-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Circular Match Gauge (mini 36px) ─────────────────────────────────────────

function CircularGauge({ score, size = 36 }: { score: number; size?: number }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (score / 100) * circ;
  const center = size / 2;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        aria-hidden="true"
      >
        <circle
          cx={center}
          cy={center}
          r={r}
          stroke="oklch(0.20 0.01 264)"
          strokeWidth={4}
          fill="none"
        />
        <circle
          cx={center}
          cy={center}
          r={r}
          stroke={scoreStroke(score)}
          strokeWidth={4}
          fill="none"
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${center} ${center})`}
          style={{ transition: "stroke-dasharray 0.7s ease" }}
        />
      </svg>
      <span
        className={`absolute inset-0 flex items-center justify-center text-[9px] font-bold font-mono ${scoreColorClass(score)}`}
      >
        {score}
      </span>
    </div>
  );
}

// ─── Skill badge list ─────────────────────────────────────────────────────────

function SkillList({
  skills,
  variant,
}: { skills: string[]; variant: "matched" | "missing" }) {
  const [expanded, setExpanded] = useState(false);
  const shown = expanded ? skills : skills.slice(0, 3);
  if (skills.length === 0)
    return <span className="text-xs text-muted-foreground">—</span>;
  const cls =
    variant === "matched"
      ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/25"
      : "bg-red-500/10 text-red-300 border-red-500/25";
  return (
    <div className="flex flex-wrap gap-1">
      {shown.map((s) => (
        <span
          key={s}
          className={`text-[10px] px-1.5 py-0.5 rounded-md border font-medium ${cls}`}
        >
          {s}
        </span>
      ))}
      {skills.length > 3 && (
        <button
          type="button"
          className="text-xs text-accent hover:underline"
          onClick={() => setExpanded(!expanded)}
        >
          {expanded ? "less" : `+${skills.length - 3} more`}
        </button>
      )}
    </div>
  );
}

// ─── Unique JD list from match history ───────────────────────────────────────

interface JDEntry {
  jd: string;
  count: number;
  lastDate: string;
}

function buildJDList(records: MatchRecord[]): JDEntry[] {
  const map = new Map<string, { count: number; lastDate: string }>();
  for (const r of records) {
    const existing = map.get(r.jobDescription);
    if (!existing)
      map.set(r.jobDescription, { count: 1, lastDate: r.createdAt });
    else {
      existing.count += 1;
      if (r.createdAt > existing.lastDate) existing.lastDate = r.createdAt;
    }
  }
  return Array.from(map.entries())
    .map(([jd, meta]) => ({ jd, ...meta }))
    .sort((a, b) => b.lastDate.localeCompare(a.lastDate));
}

// ─── Run Match Modal ──────────────────────────────────────────────────────────

interface RunMatchModalProps {
  resumes: Resume[];
  onClose: () => void;
  onDone: () => void;
}

function RunMatchModal({ resumes, onClose, onDone }: RunMatchModalProps) {
  const { actor } = useActor(createActor);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [resumeId, setResumeId] = useState<string>(resumes[0]?.id ?? "");
  const [jd, setJd] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const runMatch = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      if (!user?.token) throw new Error("Not authenticated");
      if (!resumeId) throw new Error("Select a resume");
      if (!jd.trim()) throw new Error("Job description is required");
      return apiMatchResume(
        actor as BackendActor,
        user.token,
        resumeId,
        jd.trim(),
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matchHistory"] });
      setSuccess(true);
      setTimeout(onDone, 1200);
    },
    onError: (e: Error) => setError(e.message),
  });

  return (
    <dialog
      aria-label="Run New Match"
      className="fixed inset-0 z-50 m-0 flex h-full w-full max-w-none items-center justify-center bg-foreground/20 p-0 backdrop-blur-sm [&::backdrop]:hidden"
      data-ocid="run-match.dialog"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      open
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        className="glass rounded-2xl border border-border/30 w-full max-w-lg mx-4 p-6 space-y-5 shadow-xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-foreground">
            Run New Match
          </h2>
          <button
            type="button"
            className="p-1.5 rounded-lg hover:bg-muted/40 transition-smooth"
            onClick={onClose}
            data-ocid="run-match.close_button"
          >
            <X className="size-4 text-muted-foreground" />
          </button>
        </div>
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label
              htmlFor="run-match-resume"
              className="text-sm font-medium text-foreground"
            >
              Resume
            </label>
            <select
              id="run-match-resume"
              className="w-full rounded-xl bg-muted/20 border border-border/30 px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent/40 transition-smooth"
              value={resumeId}
              onChange={(e) => setResumeId(e.target.value)}
              data-ocid="run-match.resume_select"
            >
              {resumes.length === 0 ? (
                <option value="">No resumes available</option>
              ) : (
                resumes.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.filename}
                  </option>
                ))
              )}
            </select>
          </div>
          <div className="space-y-1.5">
            <label
              htmlFor="run-match-jd"
              className="text-sm font-medium text-foreground"
            >
              Job Description
            </label>
            <textarea
              id="run-match-jd"
              rows={6}
              className="w-full rounded-xl bg-muted/20 border border-border/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent/40 resize-none transition-smooth"
              placeholder="Paste the job description here…"
              value={jd}
              onChange={(e) => {
                setJd(e.target.value);
                setError("");
              }}
              data-ocid="run-match.jd_textarea"
            />
          </div>
          {error && (
            <div
              className="flex items-center gap-2 text-destructive text-sm"
              data-ocid="run-match.error_state"
            >
              <AlertCircle className="size-4 shrink-0" />
              {error}
            </div>
          )}
          {success && (
            <div
              className="flex items-center gap-2 text-emerald-400 text-sm"
              data-ocid="run-match.success_state"
            >
              <CheckCircle2 className="size-4 shrink-0" />
              Match completed!
            </div>
          )}
        </div>
        <div className="flex gap-3 justify-end">
          <Button
            variant="outline"
            onClick={onClose}
            data-ocid="run-match.cancel_button"
          >
            Cancel
          </Button>
          <Button
            onClick={() => runMatch.mutate()}
            disabled={runMatch.isPending || !resumeId || !jd.trim()}
            data-ocid="run-match.submit_button"
          >
            {runMatch.isPending ? (
              <>
                <Loader2 className="size-4 animate-spin mr-2" />
                Running…
              </>
            ) : (
              <>
                <Zap className="size-4 mr-2" />
                Run Match
              </>
            )}
          </Button>
        </div>
      </motion.div>
    </dialog>
  );
}

// ─── Bulk Match Modal ─────────────────────────────────────────────────────────

interface BulkProgress {
  resumeId: string;
  filename: string;
  status: "pending" | "running" | "done" | "error";
  score?: number;
  error?: string;
}
interface BulkMatchModalProps {
  resumes: Resume[];
  onClose: () => void;
  onDone: () => void;
}

function BulkMatchModal({ resumes, onClose, onDone }: BulkMatchModalProps) {
  const { actor } = useActor(createActor);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [bulkSelected, setBulkSelected] = useState<Set<string>>(new Set());
  const [jd, setJd] = useState("");
  const [progress, setProgress] = useState<BulkProgress[] | null>(null);
  const [isRunning, setIsRunning] = useState(false);

  const toggleResume = (id: string) => {
    setBulkSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const runBulk = async () => {
    if (!actor || !user?.token || bulkSelected.size === 0 || !jd.trim()) return;
    setIsRunning(true);
    const items: BulkProgress[] = Array.from(bulkSelected).map((id) => ({
      resumeId: id,
      filename: resumes.find((r) => r.id === id)?.filename ?? id,
      status: "pending",
    }));
    setProgress(items);
    for (let i = 0; i < items.length; i++) {
      setProgress((prev) =>
        prev!.map((p, idx) => (idx === i ? { ...p, status: "running" } : p)),
      );
      try {
        const result = await apiMatchResume(
          actor as BackendActor,
          user!.token,
          items[i].resumeId,
          jd.trim(),
        );
        setProgress((prev) =>
          prev!.map((p, idx) =>
            idx === i ? { ...p, status: "done", score: result.matchScore } : p,
          ),
        );
      } catch (e) {
        setProgress((prev) =>
          prev!.map((p, idx) =>
            idx === i
              ? {
                  ...p,
                  status: "error",
                  error: e instanceof Error ? e.message : "Failed",
                }
              : p,
          ),
        );
      }
    }
    queryClient.invalidateQueries({ queryKey: ["matchHistory"] });
    setIsRunning(false);
    setTimeout(onDone, 1500);
  };

  const allDone = progress?.every(
    (p) => p.status === "done" || p.status === "error",
  );

  return (
    <dialog
      aria-label="Bulk Match"
      className="fixed inset-0 z-50 m-0 flex h-full w-full max-w-none items-center justify-center bg-foreground/20 p-0 backdrop-blur-sm [&::backdrop]:hidden"
      data-ocid="bulk-match.dialog"
      onClick={(e) => e.target === e.currentTarget && !isRunning && onClose()}
      onKeyDown={(e) => e.key === "Escape" && !isRunning && onClose()}
      open
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 8 }}
        className="glass rounded-2xl border border-border/30 w-full max-w-2xl mx-4 p-6 space-y-5 shadow-xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between">
          <h2 className="font-display text-lg font-bold text-foreground">
            Bulk Match
          </h2>
          {!isRunning && (
            <button
              type="button"
              className="p-1.5 rounded-lg hover:bg-muted/40 transition-smooth"
              onClick={onClose}
              data-ocid="bulk-match.close_button"
            >
              <X className="size-4 text-muted-foreground" />
            </button>
          )}
        </div>
        {!progress ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-foreground">
                  Select Resumes ({bulkSelected.size} of {resumes.length})
                </span>
                <div className="flex gap-2 text-xs">
                  <button
                    type="button"
                    className="text-accent hover:underline"
                    onClick={() =>
                      setBulkSelected(new Set(resumes.map((r) => r.id)))
                    }
                    data-ocid="bulk-match.select_all"
                  >
                    All
                  </button>
                  <button
                    type="button"
                    className="text-muted-foreground hover:underline"
                    onClick={() => setBulkSelected(new Set())}
                    data-ocid="bulk-match.clear_all"
                  >
                    Clear
                  </button>
                </div>
              </div>
              <div className="max-h-48 overflow-y-auto space-y-1 rounded-xl border border-border/20 p-2">
                {resumes.length === 0 ? (
                  <p className="text-sm text-muted-foreground p-2">
                    No resumes available
                  </p>
                ) : (
                  resumes.map((r, idx) => (
                    <label
                      key={r.id}
                      className="flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/30 cursor-pointer transition-smooth"
                      data-ocid={`bulk-match.resume_checkbox.${idx + 1}`}
                    >
                      <input
                        type="checkbox"
                        checked={bulkSelected.has(r.id)}
                        onChange={() => toggleResume(r.id)}
                        className="rounded accent-accent"
                      />
                      <span className="text-sm text-foreground truncate">
                        {r.filename}
                      </span>
                      <span className="ml-auto text-xs text-muted-foreground font-mono">
                        {r.score}%
                      </span>
                    </label>
                  ))
                )}
              </div>
            </div>
            <div className="space-y-1.5">
              <label
                htmlFor="bulk-match-jd"
                className="text-sm font-medium text-foreground"
              >
                Job Description
              </label>
              <textarea
                id="bulk-match-jd"
                rows={5}
                className="w-full rounded-xl bg-muted/20 border border-border/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent/40 resize-none transition-smooth"
                placeholder="Paste the job description here…"
                value={jd}
                onChange={(e) => setJd(e.target.value)}
                data-ocid="bulk-match.jd_textarea"
              />
            </div>
            <div className="flex gap-3 justify-end">
              <Button
                variant="outline"
                onClick={onClose}
                data-ocid="bulk-match.cancel_button"
              >
                Cancel
              </Button>
              <Button
                onClick={runBulk}
                disabled={bulkSelected.size === 0 || !jd.trim()}
                data-ocid="bulk-match.submit_button"
              >
                <Layers className="size-4 mr-2" />
                Match{" "}
                {bulkSelected.size > 0
                  ? `${bulkSelected.size} Resumes`
                  : "Resumes"}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Running matches against {progress.length} resume
              {progress.length !== 1 ? "s" : ""}…
            </p>
            <div className="space-y-2" data-ocid="bulk-match.progress_list">
              {progress.map((p, idx) => (
                <div
                  key={p.resumeId}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/20 border border-border/20"
                  data-ocid={`bulk-match.progress_item.${idx + 1}`}
                >
                  {p.status === "pending" && (
                    <div className="size-4 rounded-full border-2 border-border/40" />
                  )}
                  {p.status === "running" && (
                    <Loader2 className="size-4 text-accent animate-spin shrink-0" />
                  )}
                  {p.status === "done" && (
                    <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                  )}
                  {p.status === "error" && (
                    <XCircle className="size-4 text-destructive shrink-0" />
                  )}
                  <span className="text-sm text-foreground truncate flex-1 min-w-0">
                    {p.filename}
                  </span>
                  {p.status === "done" && p.score !== undefined && (
                    <span
                      className={`text-sm font-semibold font-mono ml-auto ${scoreColorClass(p.score)}`}
                    >
                      {p.score}%
                    </span>
                  )}
                  {p.status === "error" && (
                    <span className="text-xs text-destructive ml-auto">
                      {p.error}
                    </span>
                  )}
                </div>
              ))}
            </div>
            {allDone && (
              <div className="flex justify-end">
                <Button onClick={onClose} data-ocid="bulk-match.done_button">
                  Done
                </Button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </dialog>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

type SortField = "score" | "date";
type SortOrder = "asc" | "desc";

export default function AdminMatchingPage() {
  const { data: matchHistory = [], isLoading: histLoading } = useMatchHistory();
  const { data: resumes = [], isLoading: resumesLoading } = useResumes();
  const queryClient = useQueryClient();

  const [selectedJD, setSelectedJD] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [minScore, setMinScore] = useState<number>(0);
  const [maxScore, setMaxScore] = useState<number>(100);
  const [sortField, setSortField] = useState<SortField>("score");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [showRunModal, setShowRunModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [deletedJDs, setDeletedJDs] = useState<Set<string>>(new Set());

  const jdList = useMemo(() => {
    const filtered = matchHistory.filter(
      (r) => !deletedJDs.has(r.jobDescription),
    );
    return buildJDList(filtered);
  }, [matchHistory, deletedJDs]);

  const filteredResults = useMemo(() => {
    if (!selectedJD) return [];
    let results = matchHistory.filter(
      (r) =>
        r.jobDescription === selectedJD && !deletedJDs.has(r.jobDescription),
    );
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter((r) => r.resumeName.toLowerCase().includes(q));
    }
    results = results.filter(
      (r) => r.matchScore >= minScore && r.matchScore <= maxScore,
    );
    results = [...results].sort((a, b) => {
      const aVal =
        sortField === "score" ? a.matchScore : new Date(a.createdAt).getTime();
      const bVal =
        sortField === "score" ? b.matchScore : new Date(b.createdAt).getTime();
      return sortOrder === "desc" ? bVal - aVal : aVal - bVal;
    });
    return results;
  }, [
    matchHistory,
    selectedJD,
    searchQuery,
    minScore,
    maxScore,
    sortField,
    sortOrder,
    deletedJDs,
  ]);

  const handleSort = useCallback(
    (field: SortField) => {
      if (sortField === field)
        setSortOrder((o) => (o === "desc" ? "asc" : "desc"));
      else {
        setSortField(field);
        setSortOrder("desc");
      }
    },
    [sortField],
  );

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field)
      return <ChevronDown className="size-3 text-muted-foreground/50" />;
    return sortOrder === "desc" ? (
      <ChevronDown className="size-3 text-accent" />
    ) : (
      <ChevronUp className="size-3 text-accent" />
    );
  };

  const selectedJDEntry = jdList.find((j) => j.jd === selectedJD);

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-6 fade-up"
      data-ocid="admin-matching.page"
    >
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-accent/15 border border-accent/30 shrink-0 mt-0.5">
            <Briefcase className="size-5 text-accent" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Job Matching
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Match job descriptions against candidate resumes and explore
              compatibility scores.
            </p>
          </div>
        </div>
        <div className="flex gap-2 shrink-0 mt-1">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowBulkModal(true)}
            data-ocid="admin-matching.bulk_match_button"
            disabled={resumesLoading}
          >
            <Layers className="size-4 mr-2" />
            Bulk Match
          </Button>
          <Button
            size="sm"
            onClick={() => setShowRunModal(true)}
            data-ocid="admin-matching.run_match_button"
            disabled={resumesLoading}
          >
            <Plus className="size-4 mr-2" />
            New Match
          </Button>
        </div>
      </div>

      {/* Two-panel layout */}
      <div
        className="flex gap-5 flex-1 min-h-0"
        style={{ alignItems: "flex-start" }}
      >
        {/* Left panel — JD list */}
        <div
          className="w-72 shrink-0 space-y-3"
          data-ocid="admin-matching.jd_panel"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1">
            Job Descriptions
          </p>
          {histLoading ? (
            <div className="space-y-2">
              {[1, 2, 3].map((i) => (
                <Skeleton key={i} className="h-20 rounded-2xl" />
              ))}
            </div>
          ) : jdList.length === 0 ? (
            <div
              className="glass rounded-2xl border border-border/20 p-6 flex flex-col items-center gap-3 text-center"
              data-ocid="admin-matching.jd_empty_state"
            >
              <div className="p-3 rounded-2xl bg-accent/10 border border-accent/20">
                <FileText className="size-6 text-accent" />
              </div>
              <p className="text-sm font-semibold text-foreground">
                No matches run yet
              </p>
              <p className="text-xs text-muted-foreground">
                Run a match to see job descriptions listed here.
              </p>
              <Button
                size="sm"
                className="mt-1"
                onClick={() => setShowRunModal(true)}
                data-ocid="admin-matching.empty_run_button"
              >
                <Zap className="size-3.5 mr-1.5" />
                Run a Match
              </Button>
            </div>
          ) : (
            <div className="space-y-2" data-ocid="admin-matching.jd_list">
              {jdList.map((entry, idx) => (
                <motion.div
                  key={entry.jd}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`glass rounded-2xl border p-4 cursor-pointer transition-smooth group relative ${
                    selectedJD === entry.jd
                      ? "border-accent/40 bg-accent/5"
                      : "border-border/20 hover:border-accent/20"
                  }`}
                  onClick={() =>
                    setSelectedJD(entry.jd === selectedJD ? null : entry.jd)
                  }
                  data-ocid={`admin-matching.jd_card.${idx + 1}`}
                >
                  <p className="text-xs text-foreground leading-relaxed line-clamp-3 pr-5">
                    {truncateJD(entry.jd)}
                  </p>
                  <div className="mt-2.5 flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">
                      {entry.count} match{entry.count !== 1 ? "es" : ""}
                    </span>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(entry.lastDate)}
                    </span>
                  </div>
                  <button
                    type="button"
                    className="absolute top-3 right-3 p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-smooth"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeletedJDs((prev) => new Set([...prev, entry.jd]));
                      if (selectedJD === entry.jd) setSelectedJD(null);
                    }}
                    aria-label="Remove job description"
                    data-ocid={`admin-matching.jd_delete_button.${idx + 1}`}
                  >
                    <Trash2 className="size-3" />
                  </button>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Right panel — Results */}
        <div
          className="flex-1 min-w-0 space-y-4"
          data-ocid="admin-matching.results_panel"
        >
          {!selectedJD ? (
            <div
              className="glass rounded-2xl border border-border/20 flex flex-col items-center justify-center py-24 gap-4 text-center"
              data-ocid="admin-matching.select_jd_state"
            >
              <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20">
                <Zap className="size-8 text-accent" />
              </div>
              <p className="font-display font-semibold text-foreground text-base">
                {jdList.length > 0
                  ? "Select a job description"
                  : "No matches yet"}
              </p>
              <p className="text-sm text-muted-foreground max-w-xs">
                {jdList.length > 0
                  ? "Choose a job description from the left panel to see match results."
                  : "Run your first match to see how candidates compare."}
              </p>
            </div>
          ) : (
            <>
              {/* JD preview */}
              <div className="glass rounded-2xl border border-border/20 p-4 space-y-3">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <FileText className="size-4 text-accent shrink-0" />
                    <p className="text-sm font-semibold text-foreground">
                      {selectedJDEntry?.count ?? 0} candidates matched
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => exportToCSV(filteredResults)}
                    data-ocid="admin-matching.csv_export_button"
                    disabled={filteredResults.length === 0}
                  >
                    <Download className="size-3.5 mr-1.5" />
                    Export CSV
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2 border-t border-border/15 pt-2">
                  {truncateJD(selectedJD, 200)}
                </p>
              </div>

              {/* Filters */}
              <div
                className="glass rounded-2xl border border-border/20 p-4 flex flex-wrap gap-3 items-center"
                data-ocid="admin-matching.filters_panel"
              >
                <div className="flex items-center gap-2 flex-1 min-w-[160px]">
                  <Search className="size-4 text-muted-foreground shrink-0" />
                  <Input
                    type="search"
                    placeholder="Search candidates…"
                    className="h-8 text-sm bg-transparent border-none shadow-none focus-visible:ring-0"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    data-ocid="admin-matching.search_input"
                  />
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Filter className="size-3.5 shrink-0" />
                  <label htmlFor="score-min" className="text-xs">
                    Score:
                  </label>
                  <input
                    id="score-min"
                    type="number"
                    min={0}
                    max={100}
                    value={minScore}
                    onChange={(e) => setMinScore(Number(e.target.value))}
                    className="w-12 h-7 rounded-lg bg-muted/30 border border-border/20 px-2 text-xs text-center outline-none focus:border-accent/40 transition-smooth"
                    data-ocid="admin-matching.score_min_input"
                  />
                  <span className="text-xs">—</span>
                  <input
                    type="number"
                    min={0}
                    max={100}
                    value={maxScore}
                    onChange={(e) => setMaxScore(Number(e.target.value))}
                    className="w-12 h-7 rounded-lg bg-muted/30 border border-border/20 px-2 text-xs text-center outline-none focus:border-accent/40 transition-smooth"
                    data-ocid="admin-matching.score_max_input"
                  />
                </div>
              </div>

              {/* Results table */}
              <div
                className="glass rounded-2xl border border-border/20 overflow-hidden"
                data-ocid="admin-matching.results_table"
              >
                <div className="px-5 py-3.5 border-b border-border/15 bg-muted/30 grid grid-cols-[2fr_80px_1.5fr_1.5fr_1fr] gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  <span>Candidate</span>
                  <button
                    type="button"
                    className="flex items-center gap-1 hover:text-foreground transition-smooth text-left"
                    onClick={() => handleSort("score")}
                    data-ocid="admin-matching.sort_score"
                  >
                    Score <SortIcon field="score" />
                  </button>
                  <span>Matched Skills</span>
                  <span>Missing Skills</span>
                  <button
                    type="button"
                    className="flex items-center gap-1 hover:text-foreground transition-smooth text-left"
                    onClick={() => handleSort("date")}
                    data-ocid="admin-matching.sort_date"
                  >
                    Date <SortIcon field="date" />
                  </button>
                </div>

                {histLoading ? (
                  <div
                    className="p-4 space-y-3"
                    data-ocid="admin-matching.loading_state"
                  >
                    {[1, 2, 3].map((i) => (
                      <Skeleton key={i} className="h-14 rounded-xl" />
                    ))}
                  </div>
                ) : filteredResults.length === 0 ? (
                  <div
                    className="flex flex-col items-center justify-center py-16 gap-3 text-center"
                    data-ocid="admin-matching.results_empty_state"
                  >
                    <div className="p-3 rounded-2xl bg-muted/30 border border-border/20">
                      <Search className="size-6 text-muted-foreground" />
                    </div>
                    <p className="text-sm font-semibold text-foreground">
                      No results found
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Try adjusting your filters or search query.
                    </p>
                  </div>
                ) : (
                  <div data-ocid="admin-matching.results_list">
                    <AnimatePresence mode="popLayout">
                      {filteredResults.map((record, idx) => (
                        <motion.div
                          key={record.id}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ delay: idx * 0.03 }}
                          className="px-5 py-4 border-b border-border/10 last:border-0 grid grid-cols-[2fr_80px_1.5fr_1.5fr_1fr] gap-4 items-start hover:bg-muted/15 transition-smooth"
                          data-ocid={`admin-matching.result_row.${idx + 1}`}
                        >
                          <div className="min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">
                              {record.resumeName}
                            </p>
                          </div>
                          <div className="flex items-center justify-center">
                            <CircularGauge
                              score={record.matchScore}
                              size={40}
                            />
                          </div>
                          <SkillList
                            skills={record.matchedSkills}
                            variant="matched"
                          />
                          <SkillList
                            skills={record.missingSkills}
                            variant="missing"
                          />
                          <span className="text-xs text-muted-foreground">
                            {formatDate(record.createdAt)}
                          </span>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {showRunModal && (
          <RunMatchModal
            resumes={resumes}
            onClose={() => setShowRunModal(false)}
            onDone={() => {
              setShowRunModal(false);
              queryClient.invalidateQueries({ queryKey: ["matchHistory"] });
            }}
          />
        )}
        {showBulkModal && (
          <BulkMatchModal
            resumes={resumes}
            onClose={() => setShowBulkModal(false)}
            onDone={() => {
              setShowBulkModal(false);
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
