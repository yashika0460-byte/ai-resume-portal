/**
 * ProfilePage — shows the logged-in user's resume upload history with
 * scores, skills, upload dates, and a CSV export option.
 */

import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Calendar,
  ChevronLeft,
  Download,
  FileText,
  History,
  Sparkles,
  UploadCloud,
} from "lucide-react";
import { GlassCard } from "../components/ui/GlassCard";
import { SkillBadge } from "../components/ui/SkillBadge";
import { useAuth } from "../hooks/use-auth";
import { useUserResumes } from "../hooks/use-resumes";
import type { Resume } from "../types";

// ─── Score tier ───────────────────────────────────────────────────────────────

function getScoreTier(score: number): {
  label: string;
  color: string;
  barColor: string;
} {
  if (score >= 80)
    return {
      label: "Excellent",
      color: "text-accent",
      barColor: "from-accent to-primary",
    };
  if (score >= 50)
    return {
      label: "Good",
      color: "text-primary",
      barColor: "from-primary to-primary/60",
    };
  return {
    label: "Fair",
    color: "text-muted-foreground",
    barColor: "from-muted-foreground/60 to-muted-foreground/30",
  };
}

// ─── CSV export ───────────────────────────────────────────────────────────────

function exportToCsv(resumes: Resume[], email: string) {
  const rows = [
    ["Filename", "Upload Date", "Score", "Skills"],
    ...resumes.map((r) => [
      `"${r.filename}"`,
      `"${new Date(r.uploadDate).toLocaleString()}"`,
      String(r.score),
      `"${r.skills.join(", ")}"`,
    ]),
  ];
  const csv = rows.map((r) => r.join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `resume-history-${email.split("@")[0]}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Resume card ─────────────────────────────────────────────────────────────

function ResumeHistoryCard({
  resume,
  index,
}: {
  resume: Resume;
  index: number;
}) {
  const tier = getScoreTier(resume.score);

  return (
    <GlassCard
      className="flex flex-col gap-4 border-border/20 hover:border-accent/25 transition-smooth"
      data-ocid={`resume-card-${index}`}
    >
      {/* Header row */}
      <div className="flex items-start gap-3 min-w-0">
        <div className="p-2.5 rounded-xl bg-muted/30 border border-border/20 shrink-0 mt-0.5">
          <FileText className="size-4 text-primary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-display font-semibold text-foreground text-sm truncate">
            {resume.filename}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5 text-xs text-muted-foreground">
            <Calendar className="size-3 shrink-0" />
            <span>
              {new Date(resume.uploadDate).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Score badge */}
        <div className="shrink-0 flex flex-col items-end gap-0.5">
          <span
            className={`font-mono font-bold text-lg leading-none ${tier.color}`}
          >
            {resume.score}
          </span>
          <span className="text-xs text-muted-foreground/70">/100</span>
          <span className={`text-xs font-medium mt-0.5 ${tier.color}`}>
            {tier.label}
          </span>
        </div>
      </div>

      {/* Score bar */}
      <div className="score-bar">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${tier.barColor} transition-all duration-700`}
          style={{ width: `${resume.score}%` }}
        />
      </div>

      {/* Skills */}
      {resume.skills.length > 0 ? (
        <div>
          <p className="text-xs font-medium text-muted-foreground/70 uppercase tracking-wide mb-2">
            Skills ({resume.skills.length})
          </p>
          <div className="flex flex-wrap gap-1.5">
            {resume.skills.map((skill) => (
              <SkillBadge key={skill} label={skill} status="matched" />
            ))}
          </div>
        </div>
      ) : (
        <p className="text-xs text-muted-foreground/50 italic">
          No skills extracted
        </p>
      )}
    </GlassCard>
  );
}

// ─── Skeleton loader ──────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="glass rounded-xl p-5 flex flex-col gap-4">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl shimmer" />
        <div className="flex-1 flex flex-col gap-2">
          <div className="h-3.5 w-2/3 rounded shimmer" />
          <div className="h-3 w-1/3 rounded shimmer" />
        </div>
        <div className="w-10 h-10 rounded shimmer" />
      </div>
      <div className="h-1.5 rounded-full shimmer" />
      <div className="flex gap-1.5 flex-wrap">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-6 w-16 rounded-full shimmer" />
        ))}
      </div>
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-5 py-16 text-center"
      data-ocid="profile-empty-state"
    >
      <div className="p-5 rounded-2xl bg-accent/10 border border-accent/20">
        <History className="size-10 text-accent/60" />
      </div>
      <div>
        <p className="font-display font-semibold text-foreground text-lg">
          No resumes uploaded yet
        </p>
        <p className="text-sm text-muted-foreground mt-1.5 max-w-xs">
          Upload your first resume to get started! Your analysis history will
          appear here.
        </p>
      </div>
      <Link to="/upload">
        <button
          type="button"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-sm hover:bg-accent/90 transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
          data-ocid="btn-go-upload-from-empty"
        >
          <UploadCloud className="size-4" />
          Upload a resume
          <ArrowUpRight className="size-4" />
        </button>
      </Link>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { user } = useAuth();
  const { data: resumes = [], isLoading, isError } = useUserResumes();

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-6 fade-up">
      {/* ── Back button ── */}
      <Link
        to="/upload"
        aria-label="Back to upload"
        data-ocid="btn-back-to-upload"
        className="fixed top-4 left-4 z-50 flex items-center justify-center size-9 rounded-xl bg-muted/30 border border-border/40 text-muted-foreground hover:text-accent hover:border-accent/50 hover:bg-accent/10 backdrop-blur-sm transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </Link>

      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-accent/15 border border-accent/30 shrink-0 mt-0.5">
            <History className="size-5 text-accent" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              My Resume History
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {user?.email && (
                <span className="font-mono text-xs">{user.email}</span>
              )}
              {!isLoading && resumes.length > 0 && (
                <span className="ml-2 text-muted-foreground/60">
                  · {resumes.length} resume{resumes.length !== 1 ? "s" : ""}
                </span>
              )}
            </p>
          </div>
        </div>

        {/* CSV export */}
        {!isLoading && resumes.length > 0 && (
          <button
            type="button"
            onClick={() => exportToCsv(resumes, user?.email ?? "user")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-muted/30 border border-border/30 text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/8 text-xs font-medium transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 shrink-0"
            data-ocid="btn-export-csv"
            aria-label="Export resume history as CSV"
          >
            <Download className="size-3.5" />
            Export CSV
          </button>
        )}
      </div>

      {/* ── Stats summary strip ── */}
      {!isLoading && resumes.length > 0 && (
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              label: "Total",
              value: resumes.length,
              icon: <FileText className="size-3.5 text-primary" />,
            },
            {
              label: "Avg. Score",
              value: Math.round(
                resumes.reduce((s, r) => s + r.score, 0) / resumes.length,
              ),
              icon: <Sparkles className="size-3.5 text-accent" />,
            },
            {
              label: "Best Score",
              value: Math.max(...resumes.map((r) => r.score)),
              icon: <Sparkles className="size-3.5 text-accent" />,
            },
          ].map(({ label, value, icon }) => (
            <GlassCard
              key={label}
              className="flex flex-col gap-1 py-3 px-4 border-border/15"
            >
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                {icon}
                {label}
              </div>
              <p className="font-mono font-bold text-xl text-foreground">
                {value}
              </p>
            </GlassCard>
          ))}
        </div>
      )}

      {/* ── Content ── */}
      {isLoading ? (
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : isError ? (
        <div
          className="glass rounded-xl px-5 py-4 border border-destructive/25 bg-destructive/5 text-sm text-destructive"
          data-ocid="profile-error"
        >
          Failed to load resume history. Please refresh the page.
        </div>
      ) : resumes.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-4" data-ocid="resume-history-list">
          {resumes.map((resume, index) => (
            <ResumeHistoryCard key={resume.id} resume={resume} index={index} />
          ))}
        </div>
      )}

      {/* ── Upload CTA at bottom when has resumes ── */}
      {!isLoading && resumes.length > 0 && (
        <div className="glass rounded-xl px-5 py-4 flex items-center justify-between gap-4 border border-border/20">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-primary/15 border border-primary/25 shrink-0">
              <UploadCloud className="size-4 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground">
                Upload another resume
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Analyse a new CV and compare scores
              </p>
            </div>
          </div>
          <Link to="/upload" className="shrink-0">
            <button
              type="button"
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-display font-semibold hover:bg-accent/90 transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 whitespace-nowrap"
              data-ocid="btn-upload-more"
            >
              Upload
              <ArrowUpRight className="size-3.5" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
