/**
 * Match.tsx — Job Description Matching
 *
 * Upgraded with:
 * - Resume selector dropdown (from useUserResumes)
 * - Large SVG radial ring gauge (r=70, animated stroke-dashoffset)
 * - Two-column matched/missing skills with CheckCircle/XCircle headers
 * - Match history list from useMatchHistory
 * - Dark glass-morphism layout, fully responsive
 */

import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  BrainCircuit,
  Calendar,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  FileSearch,
  Loader2,
  Sparkles,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { GlassCard } from "../components/ui/GlassCard";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { SkillBadge } from "../components/ui/SkillBadge";
import {
  useMatchHistory,
  useMatchResume,
  useUserResumes,
} from "../hooks/use-resumes";
import type { MatchRecord, MatchResult, Resume } from "../types";

// ─── Gauge helpers ────────────────────────────────────────────────────────────

const GAUGE_R = 70;
const GAUGE_STROKE = 10;
const GAUGE_CX = GAUGE_R + GAUGE_STROKE;
const GAUGE_CIRCUMFERENCE = 2 * Math.PI * GAUGE_R;

function gaugeColor(score: number): string {
  if (score >= 70) return "oklch(0.54 0.2 151)"; // emerald
  if (score >= 40) return "oklch(0.65 0.18 79)"; // amber
  return "oklch(0.62 0.22 22)"; // red
}

function gaugeTextColor(score: number): string {
  if (score >= 70) return "text-emerald-400";
  if (score >= 40) return "text-amber-400";
  return "text-red-400";
}

function scoreTierLabel(score: number): string {
  if (score >= 70) return "Strong Match";
  if (score >= 40) return "Partial Match";
  return "Weak Match";
}

// ─── Animated gauge circle (CSS transition trick) ─────────────────────────────

interface MatchGaugeProps {
  score: number;
  animated?: boolean;
}

function MatchGauge({ score, animated = true }: MatchGaugeProps) {
  const [displayed, setDisplayed] = useState(animated ? 0 : score);
  const dashoffset = GAUGE_CIRCUMFERENCE * (1 - Math.min(displayed, 100) / 100);

  useEffect(() => {
    if (!animated) return;
    // Slight delay so the ring animates in after mount
    const timeout = setTimeout(() => setDisplayed(score), 80);
    return () => clearTimeout(timeout);
  }, [score, animated]);

  return (
    <div
      className="relative flex items-center justify-center"
      style={{ width: GAUGE_CX * 2, height: GAUGE_CX * 2 }}
      data-ocid="match.gauge"
    >
      <svg
        className="absolute inset-0 -rotate-90"
        viewBox={`0 0 ${GAUGE_CX * 2} ${GAUGE_CX * 2}`}
        aria-hidden="true"
        role="img"
      >
        <title>Match score gauge</title>
        {/* Track */}
        <circle
          cx={GAUGE_CX}
          cy={GAUGE_CX}
          r={GAUGE_R}
          fill="none"
          stroke="oklch(0.18 0.012 264 / 0.5)"
          strokeWidth={GAUGE_STROKE}
        />
        {/* Fill */}
        <circle
          cx={GAUGE_CX}
          cy={GAUGE_CX}
          r={GAUGE_R}
          fill="none"
          stroke={gaugeColor(score)}
          strokeWidth={GAUGE_STROKE}
          strokeDasharray={GAUGE_CIRCUMFERENCE}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
          style={{
            transition: "stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)",
          }}
        />
      </svg>
      <div className="relative flex flex-col items-center gap-0.5">
        <span
          className={`font-display font-bold leading-none text-5xl ${gaugeTextColor(score)}`}
        >
          {score}
        </span>
        <span className="text-xs text-muted-foreground font-mono">%</span>
      </div>
    </div>
  );
}

// ─── Result Panel ─────────────────────────────────────────────────────────────

interface ResultPanelProps {
  result: MatchResult;
  resumeName: string;
}

function ResultPanel({ result, resumeName }: ResultPanelProps) {
  const { matchScore, matchedSkills, missingSkills } = result;

  return (
    <GlassCard className="flex flex-col gap-6" data-ocid="match.result_panel">
      {/* Gauge + tier */}
      <div className="flex flex-col items-center gap-3 py-4">
        <MatchGauge score={matchScore} animated />
        <div className="flex flex-col items-center gap-1">
          <span
            className={`font-display font-semibold text-lg ${gaugeTextColor(matchScore)}`}
          >
            {scoreTierLabel(matchScore)}
          </span>
          <span className="text-sm text-muted-foreground text-center max-w-xs truncate">
            {resumeName}
          </span>
        </div>
      </div>

      {/* Divider */}
      <div className="h-px bg-border/30" />

      {/* Skills grid */}
      <div className="grid sm:grid-cols-2 gap-5">
        {/* Matched */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="size-4 text-emerald-400 shrink-0" />
            <span className="text-sm font-semibold text-emerald-400">
              Matched Skills
              <span className="ml-1.5 text-xs font-mono text-emerald-400/70">
                ({matchedSkills.length})
              </span>
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 min-h-[40px]">
            {matchedSkills.length === 0 ? (
              <span className="text-xs text-muted-foreground italic">
                No skills matched
              </span>
            ) : (
              matchedSkills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border bg-emerald-500/10 text-emerald-400 border-emerald-500/25 transition-smooth hover:bg-emerald-500/20"
                >
                  {s}
                </span>
              ))
            )}
          </div>
        </div>

        {/* Missing */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <XCircle className="size-4 text-red-400 shrink-0" />
            <span className="text-sm font-semibold text-red-400">
              Missing Skills
              <span className="ml-1.5 text-xs font-mono text-red-400/70">
                ({missingSkills.length})
              </span>
            </span>
          </div>
          <div className="flex flex-wrap gap-1.5 min-h-[40px]">
            {missingSkills.length === 0 ? (
              <span className="text-xs text-muted-foreground italic">
                All required skills covered 🎉
              </span>
            ) : (
              missingSkills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border bg-red-500/10 text-red-400 border-red-500/25 transition-smooth hover:bg-red-500/20"
                >
                  {s}
                </span>
              ))
            )}
          </div>
        </div>
      </div>
    </GlassCard>
  );
}

// ─── History row ──────────────────────────────────────────────────────────────

interface HistoryRowProps {
  record: MatchRecord;
  index: number;
}

function HistoryRow({ record, index }: HistoryRowProps) {
  const [expanded, setExpanded] = useState(false);
  const color = gaugeTextColor(record.matchScore);

  return (
    <div
      className="rounded-xl border border-border/30 overflow-hidden transition-smooth hover:border-border/50"
      data-ocid={`match.history.item.${index + 1}`}
    >
      <button
        type="button"
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left bg-muted/10 hover:bg-muted/20 transition-smooth"
        data-ocid={`match.history.expand.${index + 1}`}
      >
        {/* Score ring mini */}
        <div className="shrink-0 relative w-10 h-10">
          <svg
            className="absolute inset-0 -rotate-90"
            viewBox="0 0 40 40"
            aria-hidden="true"
            role="img"
          >
            <title>Mini score ring</title>
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke="oklch(0.18 0.012 264 / 0.4)"
              strokeWidth="4"
            />
            <circle
              cx="20"
              cy="20"
              r="16"
              fill="none"
              stroke={gaugeColor(record.matchScore)}
              strokeWidth="4"
              strokeDasharray={2 * Math.PI * 16}
              strokeDashoffset={
                2 * Math.PI * 16 * (1 - record.matchScore / 100)
              }
              strokeLinecap="round"
            />
          </svg>
          <span
            className={`absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold ${color}`}
          >
            {record.matchScore}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground truncate">
            {record.resumeName}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Calendar className="size-3 text-muted-foreground/60 shrink-0" />
            <span className="text-xs text-muted-foreground font-mono">
              {new Date(record.createdAt).toLocaleDateString(undefined, {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Tier badge */}
        <span
          className={`shrink-0 text-xs font-medium px-2 py-0.5 rounded-md border ${
            record.matchScore >= 70
              ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25"
              : record.matchScore >= 40
                ? "bg-amber-500/10 text-amber-400 border-amber-500/25"
                : "bg-red-500/10 text-red-400 border-red-500/25"
          }`}
        >
          {scoreTierLabel(record.matchScore)}
        </span>

        {/* Expand icon */}
        {expanded ? (
          <ChevronUp className="size-4 text-muted-foreground shrink-0" />
        ) : (
          <ChevronDown className="size-4 text-muted-foreground shrink-0" />
        )}
      </button>

      {/* Expanded skills */}
      {expanded && (
        <div className="px-4 py-3 border-t border-border/20 bg-muted/5 flex flex-col gap-3 fade-up">
          <div className="grid sm:grid-cols-2 gap-3">
            <div>
              <p className="text-xs font-semibold text-emerald-400 mb-2 flex items-center gap-1.5">
                <CheckCircle className="size-3" aria-hidden="true" />
                Matched ({record.matchedSkills.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {record.matchedSkills.length === 0 ? (
                  <span className="text-xs text-muted-foreground italic">
                    None
                  </span>
                ) : (
                  record.matchedSkills.map((s) => (
                    <SkillBadge key={s} label={s} status="matched" />
                  ))
                )}
              </div>
            </div>
            <div>
              <p className="text-xs font-semibold text-red-400 mb-2 flex items-center gap-1.5">
                <XCircle className="size-3" aria-hidden="true" />
                Missing ({record.missingSkills.length})
              </p>
              <div className="flex flex-wrap gap-1.5">
                {record.missingSkills.length === 0 ? (
                  <span className="text-xs text-muted-foreground italic">
                    None 🎉
                  </span>
                ) : (
                  record.missingSkills.map((s) => (
                    <SkillBadge key={s} label={s} status="missing" />
                  ))
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Empty state — no resumes ─────────────────────────────────────────────────

function EmptyNoResumes() {
  const navigate = useNavigate();
  return (
    <GlassCard
      className="flex flex-col items-center justify-center gap-4 py-16 text-center"
      data-ocid="match.empty_state"
    >
      <div className="p-4 rounded-2xl bg-muted/30 border border-border/20">
        <FileSearch className="size-10 text-muted-foreground/50" />
      </div>
      <div>
        <p className="font-display font-semibold text-foreground text-base">
          No resumes uploaded yet
        </p>
        <p className="text-sm text-muted-foreground mt-1.5 max-w-xs">
          Upload at least one resume before running a job match analysis.
        </p>
      </div>
      <button
        type="button"
        onClick={() => void navigate({ to: "/upload" })}
        data-ocid="match.go_upload_button"
        className="mt-1 px-4 py-2 rounded-lg border border-border/40 text-sm text-muted-foreground hover:text-foreground hover:border-accent/50 hover:bg-accent/10 transition-smooth"
      >
        Go to Upload
      </button>
    </GlassCard>
  );
}

// ─── Resume selector dropdown ─────────────────────────────────────────────────

interface ResumeSelectorProps {
  resumes: Resume[];
  selectedId: string | null;
  onSelect: (id: string | null) => void;
}

function ResumeSelector({
  resumes,
  selectedId,
  onSelect,
}: ResumeSelectorProps) {
  const selected = resumes.find((r) => r.id === selectedId);

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="resume-select"
        className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
      >
        Select Resume
      </label>
      <div className="relative">
        <select
          id="resume-select"
          value={selectedId ?? ""}
          onChange={(e) => onSelect(e.target.value || null)}
          data-ocid="match.resume_select"
          className="w-full appearance-none bg-muted/30 border border-border/30 rounded-lg px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent/50 focus:bg-muted/50 transition-smooth pr-10 cursor-pointer"
        >
          <option value="">— All uploaded resumes —</option>
          {resumes.map((r) => (
            <option key={r.id} value={r.id}>
              {r.filename}
              {r.score > 0 ? ` (score: ${r.score})` : ""}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
      </div>
      {selected && (
        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
          <span className="status-dot bg-accent/80" />
          Matching against:{" "}
          <span className="text-foreground truncate max-w-[200px]">
            {selected.filename}
          </span>
        </p>
      )}
      {!selectedId && (
        <p className="text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5">
          <span className="status-dot bg-primary/80" />
          Matching against all {resumes.length} resume
          {resumes.length !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

const JD_PLACEHOLDER = `e.g. We are looking for a Senior Python Developer with 4+ years of experience.

Required skills:
- Python, Django, REST APIs
- AWS, Docker, Kubernetes
- PostgreSQL, Redis
- Machine Learning, TensorFlow

Nice to have:
- CI/CD, GitHub Actions
- React or TypeScript
- Strong communication skills`;

interface ResumeMatchResult {
  resume: Resume;
  result: MatchResult;
  error?: string;
}

export default function Match() {
  const { data: resumes = [], isLoading: resumesLoading } = useUserResumes();
  const { data: history = [], isLoading: historyLoading } = useMatchHistory();
  const { mutateAsync: matchResume } = useMatchResume();

  const [jobDescription, setJobDescription] = useState("");
  const [selectedResumeId, setSelectedResumeId] = useState<string | null>(null);
  const [results, setResults] = useState<ResumeMatchResult[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const [matchError, setMatchError] = useState<string | null>(null);
  const [hasRun, setHasRun] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });
  const resultsRef = useRef<HTMLDivElement>(null);

  // Scroll to results when they arrive
  useEffect(() => {
    if (hasRun && results.length > 0 && resultsRef.current) {
      setTimeout(() => {
        resultsRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 200);
    }
  }, [hasRun, results.length]);

  const targetResumes = selectedResumeId
    ? resumes.filter((r) => r.id === selectedResumeId)
    : resumes;

  const handleMatch = async () => {
    if (!jobDescription.trim() || targetResumes.length === 0) return;

    setIsMatching(true);
    setMatchError(null);
    setResults([]);
    setHasRun(false);
    setProgress({ done: 0, total: targetResumes.length });

    const collected: ResumeMatchResult[] = [];

    for (const resume of targetResumes) {
      try {
        const result = await matchResume({
          resumeId: resume.id,
          jobDescription,
        });
        collected.push({ resume, result });
      } catch (err) {
        collected.push({
          resume,
          result: { matchScore: 0, matchedSkills: [], missingSkills: [] },
          error: err instanceof Error ? err.message : "Match failed",
        });
      } finally {
        setProgress((p) => ({ ...p, done: p.done + 1 }));
      }
    }

    // Sort descending by match score
    collected.sort((a, b) => b.result.matchScore - a.result.matchScore);
    setResults(collected);
    setHasRun(true);
    setIsMatching(false);
  };

  const handleClear = () => {
    setJobDescription("");
    setResults([]);
    setMatchError(null);
    setHasRun(false);
    setProgress({ done: 0, total: 0 });
  };

  const canMatch =
    jobDescription.trim().length > 0 && targetResumes.length > 0 && !isMatching;

  // Best result (top sorted)
  const topResult = results[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-6 fade-up">
      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground flex items-center gap-2.5">
            <Sparkles className="size-5 text-accent" aria-hidden="true" />
            Job Description Matching
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Paste a job description to rank your resumes by compatibility.
          </p>
        </div>

        {hasRun && !isMatching && (
          <button
            type="button"
            onClick={handleClear}
            className="shrink-0 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-muted/30 transition-smooth"
            data-ocid="match.clear_button"
          >
            <X className="size-4" />
            Clear
          </button>
        )}
      </div>

      {/* ── Input card ────────────────────────────────────────────────────────── */}
      <GlassCard className="flex flex-col gap-5" data-ocid="match.input_card">
        {/* Resume selector */}
        {!resumesLoading && resumes.length > 0 && (
          <ResumeSelector
            resumes={resumes}
            selectedId={selectedResumeId}
            onSelect={setSelectedResumeId}
          />
        )}

        {/* Job description */}
        <div className="flex flex-col gap-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="jd-textarea"
              className="text-xs font-medium text-muted-foreground uppercase tracking-wider"
            >
              Job Description
            </label>
            {jobDescription.trim().length > 0 && (
              <span className="text-xs text-muted-foreground/60 font-mono">
                {jobDescription.trim().split(/\s+/).length} words
              </span>
            )}
          </div>
          <textarea
            id="jd-textarea"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder={JD_PLACEHOLDER}
            rows={10}
            className="w-full bg-muted/30 border border-border/30 rounded-lg px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground/35 resize-y focus:outline-none focus:border-accent/50 focus:bg-muted/50 transition-smooth font-body leading-relaxed min-h-[160px]"
            data-ocid="match.jd_input"
          />
        </div>

        {/* Action row */}
        <div className="flex items-center gap-3 flex-wrap">
          <button
            type="button"
            onClick={handleMatch}
            disabled={!canMatch}
            data-ocid="match.analyze_button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-display font-semibold text-sm bg-primary/90 hover:bg-primary text-primary-foreground border border-primary/50 disabled:opacity-40 disabled:cursor-not-allowed transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 flex-1 sm:flex-none sm:min-w-[200px] justify-center"
          >
            {isMatching ? (
              <>
                <Loader2 className="size-4 animate-spin" aria-hidden="true" />
                Analyzing {progress.done}/{progress.total}…
              </>
            ) : (
              <>
                <BrainCircuit className="size-4" aria-hidden="true" />
                Analyze Match
              </>
            )}
          </button>

          {!isMatching && targetResumes.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {targetResumes.length} resume
              {targetResumes.length !== 1 ? "s" : ""} will be analyzed
            </span>
          )}
        </div>

        {/* Progress bar during matching */}
        {isMatching && progress.total > 0 && (
          <div className="score-bar">
            <div
              className="score-bar-fill transition-all duration-500"
              style={{
                width: `${Math.round((progress.done / progress.total) * 100)}%`,
              }}
            />
          </div>
        )}
      </GlassCard>

      {/* ── Error ─────────────────────────────────────────────────────────────── */}
      {matchError && (
        <div
          className="glass rounded-xl p-4 flex items-start gap-3 border-destructive/30 bg-destructive/10"
          data-ocid="match.error_state"
        >
          <AlertCircle
            className="size-5 text-destructive shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <p className="text-sm text-destructive">{matchError}</p>
        </div>
      )}

      {/* ── Results area ──────────────────────────────────────────────────────── */}
      <div className="flex flex-col gap-4" ref={resultsRef}>
        {/* Loading */}
        {isMatching && (
          <GlassCard
            className="flex flex-col items-center gap-4 py-12"
            data-ocid="match.loading_state"
          >
            <LoadingSpinner size="lg" label="Analyzing resumes with AI…" />
            {progress.total > 0 && (
              <p className="text-xs text-muted-foreground font-mono">
                {progress.done} / {progress.total} processed
              </p>
            )}
          </GlassCard>
        )}

        {/* Resume loading */}
        {resumesLoading && !isMatching && (
          <GlassCard
            className="flex items-center justify-center py-10"
            data-ocid="match.resumes_loading_state"
          >
            <LoadingSpinner size="md" label="Loading resumes…" />
          </GlassCard>
        )}

        {/* No resumes */}
        {!resumesLoading && resumes.length === 0 && !isMatching && (
          <EmptyNoResumes />
        )}

        {/* Prompt when resumes exist but no match run yet */}
        {!resumesLoading && resumes.length > 0 && !hasRun && !isMatching && (
          <GlassCard
            className="flex flex-col items-center justify-center gap-4 py-14 text-center"
            data-ocid="match.prompt_state"
          >
            <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20">
              <BrainCircuit
                className="size-10 text-accent/60"
                aria-hidden="true"
              />
            </div>
            <div>
              <p className="font-display font-semibold text-foreground text-base">
                Ready to match
              </p>
              <p className="text-sm text-muted-foreground mt-1.5 max-w-xs">
                Paste a job description above and click{" "}
                <span className="text-accent font-medium">Analyze Match</span>{" "}
                to rank your resume by fit.
              </p>
            </div>
          </GlassCard>
        )}

        {/* ── Match results ──────────────────────────────────────────────────── */}
        {hasRun && !isMatching && results.length > 0 && (
          <div className="flex flex-col gap-5 fade-up">
            {/* Summary row */}
            <div className="flex items-center gap-4 px-1 flex-wrap">
              <p className="text-sm font-medium text-foreground">
                {results.length} result{results.length !== 1 ? "s" : ""} —
                sorted by match score
              </p>
              <div className="flex items-center gap-3 ml-auto text-xs text-muted-foreground flex-wrap">
                <span className="flex items-center gap-1.5">
                  <span className="status-dot bg-emerald-400" />
                  {results.filter((r) => r.result.matchScore >= 70).length}{" "}
                  strong
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="status-dot bg-amber-400" />
                  {
                    results.filter(
                      (r) =>
                        r.result.matchScore >= 40 && r.result.matchScore < 70,
                    ).length
                  }{" "}
                  partial
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="status-dot bg-red-400" />
                  {results.filter((r) => r.result.matchScore < 40).length} weak
                </span>
              </div>
            </div>

            {/* If single resume → large centered gauge panel */}
            {results.length === 1 && topResult && (
              <ResultPanel
                result={topResult.result}
                resumeName={topResult.resume.filename}
              />
            )}

            {/* If multiple resumes → list with mini gauges */}
            {results.length > 1 && (
              <div className="flex flex-col gap-4">
                {/* Top result — featured */}
                {topResult && (
                  <div className="relative">
                    <div className="absolute -top-2.5 left-4 z-10">
                      <span className="text-[10px] font-semibold uppercase tracking-wider bg-accent/90 text-accent-foreground px-2 py-0.5 rounded-full">
                        Best Match
                      </span>
                    </div>
                    <ResultPanel
                      result={topResult.result}
                      resumeName={topResult.resume.filename}
                    />
                  </div>
                )}

                {/* Remaining results — compact rows */}
                {results.slice(1).map((item, i) => (
                  <div
                    key={item.resume.id}
                    className={`rounded-xl border overflow-hidden ${
                      item.result.matchScore >= 70
                        ? "border-emerald-500/20"
                        : item.result.matchScore >= 40
                          ? "border-amber-500/20"
                          : "border-red-500/20"
                    }`}
                    data-ocid={`match.result.item.${i + 2}`}
                  >
                    <GlassCard className="flex flex-col gap-4 border-0">
                      <div className="flex items-center gap-4 flex-wrap">
                        {/* Mini gauge */}
                        <div className="relative shrink-0 w-14 h-14">
                          <svg
                            className="absolute inset-0 -rotate-90"
                            viewBox="0 0 56 56"
                            aria-hidden="true"
                            role="img"
                          >
                            <title>Score ring</title>
                            <circle
                              cx="28"
                              cy="28"
                              r="22"
                              fill="none"
                              stroke="oklch(0.18 0.012 264 / 0.4)"
                              strokeWidth="5"
                            />
                            <circle
                              cx="28"
                              cy="28"
                              r="22"
                              fill="none"
                              stroke={gaugeColor(item.result.matchScore)}
                              strokeWidth="5"
                              strokeDasharray={2 * Math.PI * 22}
                              strokeDashoffset={
                                2 *
                                Math.PI *
                                22 *
                                (1 - item.result.matchScore / 100)
                              }
                              strokeLinecap="round"
                            />
                          </svg>
                          <span
                            className={`absolute inset-0 flex items-center justify-center font-display font-bold text-sm ${gaugeTextColor(item.result.matchScore)}`}
                          >
                            {item.result.matchScore}
                          </span>
                        </div>

                        {/* Info */}
                        <div className="flex-1 min-w-0">
                          <p className="font-display font-semibold text-sm text-foreground truncate">
                            {item.resume.filename}
                          </p>
                          <p
                            className={`text-xs mt-0.5 ${gaugeTextColor(item.result.matchScore)}`}
                          >
                            {scoreTierLabel(item.result.matchScore)} ·{" "}
                            {item.result.matchScore}% match
                          </p>
                        </div>

                        {/* Rank */}
                        <span className="shrink-0 text-xs font-mono text-muted-foreground/60">
                          #{i + 2}
                        </span>
                      </div>

                      {/* Compact skills */}
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-emerald-400 font-medium mb-1.5 flex items-center gap-1">
                            <CheckCircle
                              className="size-3"
                              aria-hidden="true"
                            />
                            Matched ({item.result.matchedSkills.length})
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {item.result.matchedSkills.slice(0, 8).map((s) => (
                              <span
                                key={s}
                                className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                              >
                                {s}
                              </span>
                            ))}
                            {item.result.matchedSkills.length > 8 && (
                              <span className="text-xs text-muted-foreground/60 self-center">
                                +{item.result.matchedSkills.length - 8} more
                              </span>
                            )}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-red-400 font-medium mb-1.5 flex items-center gap-1">
                            <XCircle className="size-3" aria-hidden="true" />
                            Missing ({item.result.missingSkills.length})
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {item.result.missingSkills.slice(0, 8).map((s) => (
                              <span
                                key={s}
                                className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border bg-red-500/10 text-red-400 border-red-500/20"
                              >
                                {s}
                              </span>
                            ))}
                            {item.result.missingSkills.length > 8 && (
                              <span className="text-xs text-muted-foreground/60 self-center">
                                +{item.result.missingSkills.length - 8} more
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* ── Match History ─────────────────────────────────────────────────────── */}
      {(history.length > 0 || historyLoading) && (
        <div className="flex flex-col gap-3 mt-2">
          <div className="flex items-center gap-3 px-1">
            <h2 className="font-display font-semibold text-base text-foreground">
              Match History
            </h2>
            {history.length > 0 && (
              <span className="text-xs font-mono text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-full border border-border/20">
                {history.length}
              </span>
            )}
          </div>

          {historyLoading ? (
            <GlassCard
              className="flex items-center justify-center py-8"
              data-ocid="match.history_loading_state"
            >
              <LoadingSpinner size="sm" label="Loading history…" />
            </GlassCard>
          ) : (
            <div className="flex flex-col gap-2" data-ocid="match.history_list">
              {(history as MatchRecord[]).map((record, i) => (
                <HistoryRow key={record.id} record={record} index={i} />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
