/**
 * MatchPage — Job Description Matching
 *
 * Matches ALL uploaded resumes against a job description in parallel,
 * displays results sorted by score descending, with color-coded scores
 * and matched/missing skill badges.
 */

import { useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  BrainCircuit,
  CheckCircle2,
  ChevronLeft,
  FileSearch,
  Loader2,
  Sparkles,
  TriangleAlert,
  X,
  XCircle,
} from "lucide-react";
import { useState } from "react";
import { Button } from "../components/ui/AppButton";
import { GlassCard } from "../components/ui/GlassCard";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { SkillBadge } from "../components/ui/SkillBadge";
import { useMatchResume, useResumes } from "../hooks/use-resumes";
import type { MatchResult, Resume } from "../types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface ResumeMatchResult {
  resume: Resume;
  result: MatchResult;
  error?: string;
}

// ─── Score color helpers ──────────────────────────────────────────────────────

function getScoreColorClass(score: number): string {
  if (score >= 70) return "text-green-400";
  if (score >= 40) return "text-yellow-400";
  return "text-red-400";
}

function getScoreBarClass(score: number): string {
  if (score >= 70) return "bg-gradient-to-r from-green-500/80 to-green-400";
  if (score >= 40) return "bg-gradient-to-r from-yellow-500/80 to-yellow-400";
  return "bg-gradient-to-r from-red-500/80 to-red-400";
}

function getScoreBorderClass(score: number): string {
  if (score >= 70) return "border-green-500/25";
  if (score >= 40) return "border-yellow-500/25";
  return "border-red-500/25";
}

function getScoreIcon(score: number) {
  if (score >= 70)
    return <CheckCircle2 className="size-4 shrink-0 text-green-400" />;
  if (score >= 40)
    return <TriangleAlert className="size-4 shrink-0 text-yellow-400" />;
  return <XCircle className="size-4 shrink-0 text-red-400" />;
}

function getScoreTierLabel(score: number): string {
  if (score >= 70) return "Strong Match";
  if (score >= 40) return "Partial Match";
  return "Weak Match";
}

// ─── Result Card ──────────────────────────────────────────────────────────────

interface ResultCardProps {
  item: ResumeMatchResult;
  rank: number;
}

function ResultCard({ item, rank }: ResultCardProps) {
  const { resume, result } = item;
  const pct = result.matchScore;

  return (
    <div className={`rounded-xl border ${getScoreBorderClass(pct)}`}>
      <GlassCard
        data-ocid={`card-match-result-${resume.id}`}
        className="flex flex-col gap-4 border-0"
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 min-w-0">
            <span className="flex-shrink-0 w-7 h-7 rounded-full bg-muted/60 border border-border/30 flex items-center justify-center text-xs font-mono font-semibold text-muted-foreground">
              {rank}
            </span>
            <div className="min-w-0">
              <p className="font-display font-semibold text-foreground text-sm leading-tight truncate max-w-[240px] sm:max-w-sm">
                {resume.filename}
              </p>
              <div className="flex items-center gap-1.5 mt-1">
                {getScoreIcon(pct)}
                <span className="text-xs text-muted-foreground">
                  {getScoreTierLabel(pct)}
                </span>
              </div>
            </div>
          </div>

          {/* Score */}
          <div className="flex flex-col items-end gap-0.5 flex-shrink-0">
            <span
              className={`font-display font-bold text-3xl leading-none ${getScoreColorClass(pct)}`}
            >
              {pct}%
            </span>
            <span className="text-xs text-muted-foreground">match score</span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="score-bar">
          <div
            className={`h-full rounded-full transition-all duration-700 ${getScoreBarClass(pct)}`}
            style={{ width: `${pct}%` }}
          />
        </div>

        {/* Skills grid */}
        <div className="grid sm:grid-cols-2 gap-3">
          {/* Matched skills */}
          <div>
            <p className="text-xs font-medium mb-2 flex items-center gap-1.5 text-green-400">
              <span className="status-dot bg-green-400" />
              Matched ({result.matchedSkills.length})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {result.matchedSkills.length === 0 ? (
                <span className="text-xs text-muted-foreground italic">
                  No skills matched
                </span>
              ) : (
                result.matchedSkills.map((s) => (
                  <SkillBadge key={s} label={s} status="matched" />
                ))
              )}
            </div>
          </div>

          {/* Missing skills */}
          <div>
            <p className="text-xs font-medium mb-2 flex items-center gap-1.5 text-red-400">
              <span className="status-dot bg-red-400" />
              Missing ({result.missingSkills.length})
            </p>
            <div className="flex flex-wrap gap-1.5">
              {result.missingSkills.length === 0 ? (
                <span className="text-xs text-muted-foreground italic">
                  All skills covered 🎉
                </span>
              ) : (
                result.missingSkills.map((s) => (
                  <SkillBadge key={s} label={s} status="missing" />
                ))
              )}
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}

// ─── Empty States ─────────────────────────────────────────────────────────────

function EmptyNoResumes() {
  const navigate = useNavigate();
  return (
    <GlassCard
      className="flex flex-col items-center justify-center gap-4 py-16 text-center"
      data-ocid="empty-no-resumes"
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
      <Button
        variant="outline"
        className="mt-1"
        onClick={() => navigate({ to: "/upload" })}
        data-ocid="btn-go-upload"
      >
        Go to Upload
      </Button>
    </GlassCard>
  );
}

function EmptyMatchPrompt() {
  return (
    <GlassCard
      className="flex flex-col items-center justify-center gap-4 py-16 text-center"
      data-ocid="empty-match-prompt"
    >
      <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20">
        <BrainCircuit className="size-10 text-accent/60" />
      </div>
      <div>
        <p className="font-display font-semibold text-foreground text-base">
          Ready to match
        </p>
        <p className="text-sm text-muted-foreground mt-1.5 max-w-xs">
          Paste a job description and click{" "}
          <span className="text-accent font-medium">Match All Resumes</span> to
          rank every candidate by fit.
        </p>
      </div>
    </GlassCard>
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

export default function Match() {
  const { data: resumes = [], isLoading: resumesLoading } = useResumes();
  const { mutateAsync: matchResume } = useMatchResume();

  const [jobDescription, setJobDescription] = useState("");
  const [results, setResults] = useState<ResumeMatchResult[]>([]);
  const [isMatching, setIsMatching] = useState(false);
  const [matchError, setMatchError] = useState<string | null>(null);
  const [hasRun, setHasRun] = useState(false);
  const [progress, setProgress] = useState({ done: 0, total: 0 });

  const handleMatchAll = async () => {
    if (!jobDescription.trim() || resumes.length === 0) return;

    setIsMatching(true);
    setMatchError(null);
    setResults([]);
    setHasRun(false);
    setProgress({ done: 0, total: resumes.length });

    const collected: ResumeMatchResult[] = [];

    for (const resume of resumes) {
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
    jobDescription.trim().length > 0 && resumes.length > 0 && !isMatching;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-6 fade-up">
      {/* Back button */}
      <button
        type="button"
        onClick={() => window.history.back()}
        aria-label="Go back"
        data-ocid="match.back_button"
        className="fixed top-4 left-4 z-50 flex items-center justify-center size-9 rounded-xl bg-muted/30 border border-border/40 text-muted-foreground hover:text-accent hover:border-accent/50 hover:bg-accent/10 backdrop-blur-sm transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>

      {/* Page Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="font-display font-bold text-2xl text-foreground flex items-center gap-2.5">
            <Sparkles className="size-5 text-accent" />
            Job Description Matching
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Paste a job description to rank all uploaded resumes by
            compatibility.
          </p>
        </div>

        {hasRun && !isMatching && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="shrink-0 text-muted-foreground hover:text-foreground gap-1.5"
            data-ocid="btn-clear-results"
          >
            <X className="size-4" />
            Clear
          </Button>
        )}
      </div>

      {/* Job Description Input */}
      <GlassCard className="flex flex-col gap-4" data-ocid="card-jd-input">
        <div className="flex items-center justify-between">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Job Description
          </p>
          {jobDescription.trim().length > 0 && (
            <span className="text-xs text-muted-foreground/60 font-mono">
              {jobDescription.trim().split(/\s+/).length} words
            </span>
          )}
        </div>

        <textarea
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder={JD_PLACEHOLDER}
          rows={10}
          className="w-full bg-muted/30 border border-border/30 rounded-lg px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground/35 resize-y focus:outline-none focus:border-accent/50 focus:bg-muted/50 transition-smooth font-body leading-relaxed min-h-[160px]"
          data-ocid="input-job-description"
        />

        <div className="flex items-center gap-3">
          <Button
            onClick={handleMatchAll}
            disabled={!canMatch}
            className="bg-accent/90 hover:bg-accent text-accent-foreground font-display font-semibold gap-2 flex-1 sm:flex-none sm:min-w-[200px]"
            data-ocid="btn-match-all"
          >
            {isMatching ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Matching {progress.done}/{progress.total}…
              </>
            ) : (
              <>
                <BrainCircuit className="size-4" />
                Match All Resumes
              </>
            )}
          </Button>

          {!isMatching && resumes.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {resumes.length} resume{resumes.length !== 1 ? "s" : ""} will be
              analyzed
            </span>
          )}
        </div>

        {/* Inline progress bar when matching */}
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

      {/* Error */}
      {matchError && (
        <div
          className="glass rounded-xl p-4 flex items-start gap-3 border-destructive/30 bg-destructive/10"
          data-ocid="match-error"
        >
          <AlertCircle className="size-5 text-destructive shrink-0 mt-0.5" />
          <p className="text-sm text-destructive">{matchError}</p>
        </div>
      )}

      {/* Results Area */}
      <div className="flex flex-col gap-4">
        {/* Loading state */}
        {isMatching && (
          <GlassCard
            className="flex flex-col items-center gap-4 py-12"
            data-ocid="matching-loading"
          >
            <LoadingSpinner size="lg" label="Analyzing resumes with AI…" />
            {progress.total > 0 && (
              <p className="text-xs text-muted-foreground font-mono">
                {progress.done} / {progress.total} processed
              </p>
            )}
          </GlassCard>
        )}

        {/* Resume loading state */}
        {resumesLoading && !isMatching && (
          <GlassCard
            className="flex items-center justify-center py-10"
            data-ocid="resumes-loading"
          >
            <LoadingSpinner size="md" label="Loading resumes…" />
          </GlassCard>
        )}

        {/* No resumes available */}
        {!resumesLoading && resumes.length === 0 && !isMatching && (
          <EmptyNoResumes />
        )}

        {/* Prompt to run match */}
        {!resumesLoading && resumes.length > 0 && !hasRun && !isMatching && (
          <EmptyMatchPrompt />
        )}

        {/* Results */}
        {hasRun && !isMatching && results.length > 0 && (
          <>
            {/* Summary bar */}
            <div className="flex items-center gap-4 px-1">
              <p className="text-sm font-medium text-foreground">
                {results.length} result{results.length !== 1 ? "s" : ""} —
                sorted by match score
              </p>
              <div className="flex items-center gap-3 ml-auto text-xs text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <span className="status-dot bg-green-400" />
                  {results.filter((r) => r.result.matchScore >= 70).length}{" "}
                  strong
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="status-dot bg-yellow-400" />
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

            {results.map((item, i) => (
              <ResultCard key={item.resume.id} item={item} rank={i + 1} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
