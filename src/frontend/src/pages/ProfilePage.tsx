/**
 * ProfilePage — Next-gen SaaS upgrade.
 * - 4 summary stat cards with trend indicators
 * - Score trend line chart (recharts)
 * - Vertical timeline with circular score rings, color-coded skill chips
 * - CSV export (Filename, Upload Date, Score, Skills, Tier)
 */

import { Link } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  ArrowUpRight,
  Calendar,
  ChevronDown,
  ChevronUp,
  Download,
  FileText,
  History,
  Minus,
  Sparkles,
  Star,
  Tag,
  Trash2,
  UploadCloud,
} from "lucide-react";
import { useState } from "react";
import {
  CartesianGrid,
  Dot,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { GlassCard, ScoreBadge } from "../components/ui/GlassCard";
import { useAuth } from "../hooks/use-auth";
import { useDeleteResume, useUserResumes } from "../hooks/use-resumes";
import type { Resume } from "../types";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getScoreTier(score: number): string {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Fair";
  return "Needs Work";
}

function getSkillCategory(
  skill: string,
): "technical" | "tools" | "soft" | "default" {
  const lower = skill.toLowerCase();
  const technical = [
    "javascript",
    "typescript",
    "python",
    "java",
    "c++",
    "c#",
    "go",
    "rust",
    "ruby",
    "php",
    "swift",
    "kotlin",
    "sql",
    "html",
    "css",
    "react",
    "vue",
    "angular",
    "node",
    "express",
    "django",
    "flask",
    "spring",
    "tensorflow",
    "pytorch",
    "machine learning",
    "deep learning",
    "nlp",
    "ai",
    "ml",
    "api",
    "rest",
    "graphql",
    "mongodb",
    "postgresql",
    "mysql",
    "redis",
    "aws",
    "azure",
    "gcp",
    "kubernetes",
    "docker",
  ];
  const tools = [
    "git",
    "github",
    "gitlab",
    "jira",
    "confluence",
    "figma",
    "sketch",
    "xd",
    "postman",
    "webpack",
    "vite",
    "jest",
    "cypress",
    "linux",
    "bash",
    "terraform",
    "ansible",
    "jenkins",
    "ci/cd",
    "vs code",
    "intellij",
    "excel",
    "tableau",
    "powerbi",
  ];
  const soft = [
    "communication",
    "leadership",
    "teamwork",
    "problem solving",
    "analytical",
    "critical thinking",
    "management",
    "collaboration",
    "presentation",
    "negotiation",
    "adaptability",
    "creativity",
    "time management",
  ];
  if (technical.some((t) => lower.includes(t))) return "technical";
  if (tools.some((t) => lower.includes(t))) return "tools";
  if (soft.some((t) => lower.includes(t))) return "soft";
  return "default";
}

const skillCategoryStyles: Record<string, string> = {
  technical: "bg-primary/15 text-primary border-primary/30",
  tools: "bg-secondary/15 text-secondary border-secondary/30",
  soft: "bg-success/15 text-success border-success/30",
  default: "bg-muted/40 text-muted-foreground border-border/30",
};

function computeTrend(resumes: Resume[], count = 3): "up" | "down" | "stable" {
  if (resumes.length < 2) return "stable";
  const recent = resumes.slice(0, count);
  if (recent.length < 2) return "stable";
  const first = recent[recent.length - 1].score;
  const last = recent[0].score;
  if (last - first > 3) return "up";
  if (first - last > 3) return "down";
  return "stable";
}

// ─── CSV export ───────────────────────────────────────────────────────────────

function exportToCsv(resumes: Resume[], email: string) {
  const rows = [
    ["Filename", "Upload Date", "Score", "Skills", "Tier"],
    ...resumes.map((r) => [
      `"${r.filename}"`,
      `"${new Date(r.uploadDate).toLocaleString()}"`,
      String(r.score),
      `"${r.skills.join(", ")}"`,
      `"${getScoreTier(r.score)}"`,
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

// ─── Stat Cards ───────────────────────────────────────────────────────────────

interface StatMeta {
  label: string;
  value: number;
  icon: React.ReactNode;
  iconBg: string;
  trend: "up" | "down" | "stable";
  ocid: string;
}

function ProfileStatCard({ meta }: { meta: StatMeta }) {
  const TrendIcon =
    meta.trend === "up" ? ArrowUp : meta.trend === "down" ? ArrowDown : Minus;
  const trendColor =
    meta.trend === "up"
      ? "text-success"
      : meta.trend === "down"
        ? "text-destructive"
        : "text-muted-foreground";

  return (
    <GlassCard
      data-ocid={meta.ocid}
      className="flex flex-col gap-3 hover:border-primary/30 transition-smooth"
    >
      <div className="flex items-start justify-between gap-2">
        <div
          className={`p-2 rounded-lg border ${meta.iconBg} shrink-0 flex items-center justify-center`}
        >
          {meta.icon}
        </div>
        <TrendIcon
          aria-hidden="true"
          className={`size-3.5 mt-1 ${trendColor}`}
        />
      </div>
      <div>
        <p className="text-2xl font-display font-bold text-foreground leading-none">
          {meta.value}
        </p>
        <p className="text-xs text-muted-foreground mt-1 font-body">
          {meta.label}
        </p>
      </div>
    </GlassCard>
  );
}

// ─── Score Trend Chart ────────────────────────────────────────────────────────

interface TrendPoint {
  upload: string;
  score: number;
  filename: string;
  date: string;
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{ value: number; payload: TrendPoint }>;
}

function CustomTooltip({ active, payload }: CustomTooltipProps) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  return (
    <div className="glass rounded-lg px-3 py-2 text-xs max-w-[180px]">
      <p className="font-display font-semibold text-foreground truncate">
        {d.filename}
      </p>
      <p className="text-muted-foreground mt-0.5">{d.date}</p>
      <p className="text-primary font-mono font-bold mt-1">
        Score: {d.score}/100
      </p>
    </div>
  );
}

function ScoreTrendChart({ resumes }: { resumes: Resume[] }) {
  if (resumes.length < 2) {
    return (
      <GlassCard className="flex flex-col items-center justify-center gap-3 py-10 text-center border-border/20">
        <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
          <Sparkles className="size-5 text-primary/60" aria-hidden="true" />
        </div>
        <div>
          <p className="text-sm font-semibold text-foreground">
            Upload more resumes to see your trend
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Score trend appears after 2+ uploads
          </p>
        </div>
      </GlassCard>
    );
  }

  const trendData: TrendPoint[] = [...resumes].reverse().map((r, i) => ({
    upload: `#${i + 1}`,
    score: r.score,
    filename: r.filename,
    date: new Date(r.uploadDate).toLocaleDateString(undefined, {
      month: "short",
      day: "numeric",
    }),
  }));

  return (
    <GlassCard
      className="flex flex-col gap-4 border-border/20"
      data-ocid="score-trend-chart"
    >
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-primary/15 border border-primary/25 shrink-0">
          <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
        </div>
        <h2 className="font-display font-semibold text-foreground text-sm">
          Score Trend
        </h2>
      </div>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trendData}
            margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="oklch(0.53 0.22 264 / 0.08)"
              vertical={false}
            />
            <XAxis
              dataKey="upload"
              tick={{ fill: "oklch(0.68 0.01 264)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "oklch(0.68 0.01 264)", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ stroke: "oklch(0.53 0.22 264 / 0.2)", strokeWidth: 1 }}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="oklch(0.53 0.22 264)"
              strokeWidth={2.5}
              dot={(props) => {
                const { cx, cy, payload } = props as {
                  cx: number;
                  cy: number;
                  payload: TrendPoint;
                };
                const color =
                  payload.score >= 70
                    ? "oklch(0.54 0.2 151)"
                    : payload.score >= 40
                      ? "oklch(0.65 0.18 79)"
                      : "oklch(0.62 0.22 22)";
                return (
                  <Dot
                    key={`dot-${payload.upload}`}
                    cx={cx}
                    cy={cy}
                    r={5}
                    fill={color}
                    stroke="oklch(0.08 0.015 264)"
                    strokeWidth={2}
                  />
                );
              }}
              activeDot={{
                r: 7,
                stroke: "oklch(0.53 0.22 264)",
                strokeWidth: 2,
                fill: "oklch(0.08 0.015 264)",
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}

// ─── Timeline card ────────────────────────────────────────────────────────────

function TimelineCard({
  resume,
  index,
  isLast,
}: {
  resume: Resume;
  index: number;
  isLast: boolean;
}) {
  const [expanded, setExpanded] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const { mutate: deleteResume, isPending: isDeleting } = useDeleteResume();

  const handleDelete = () => {
    deleteResume(resume.id);
    setConfirmDelete(false);
  };

  return (
    <div
      className="relative flex gap-4"
      data-ocid={`timeline.item.${index + 1}`}
    >
      {/* Timeline connector */}
      <div className="flex flex-col items-center shrink-0 w-10">
        <div className="shrink-0">
          <ScoreBadge score={resume.score} size="sm" />
        </div>
        {!isLast && (
          <div className="w-px flex-1 bg-gradient-to-b from-primary/20 to-transparent mt-2 min-h-[24px]" />
        )}
      </div>

      {/* Card content */}
      <GlassCard
        className="flex-1 mb-4 border-border/20 hover:border-primary/25 transition-smooth"
        data-ocid={`timeline.card.${index + 1}`}
      >
        {/* Header */}
        <div className="flex items-start gap-2 justify-between">
          <div className="flex items-start gap-2 min-w-0 flex-1">
            <div className="p-1.5 rounded-lg bg-primary/10 border border-primary/20 shrink-0 mt-0.5">
              <FileText className="size-3 text-primary" aria-hidden="true" />
            </div>
            <div className="min-w-0">
              <p
                className="font-display font-semibold text-foreground text-sm truncate"
                title={resume.filename}
              >
                {resume.filename}
              </p>
              <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                <span className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Calendar className="size-3 shrink-0" aria-hidden="true" />
                  {new Date(resume.uploadDate).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                {resume.skills.length > 0 && (
                  <span className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Tag className="size-3 shrink-0" aria-hidden="true" />
                    {resume.skills.length} skill
                    {resume.skills.length !== 1 ? "s" : ""}
                  </span>
                )}
                <span className="text-xs px-1.5 py-0.5 rounded bg-muted/40 text-muted-foreground border border-border/20 font-medium">
                  {getScoreTier(resume.score)}
                </span>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 shrink-0">
            {!confirmDelete ? (
              <button
                type="button"
                onClick={() => setConfirmDelete(true)}
                disabled={isDeleting}
                aria-label="Delete resume"
                data-ocid={`timeline.delete_button.${index + 1}`}
                className="p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth focus:outline-none focus-visible:ring-1 focus-visible:ring-destructive/40"
              >
                <Trash2 className="size-3.5" aria-hidden="true" />
              </button>
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-destructive font-medium">
                  Delete?
                </span>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  data-ocid={`timeline.confirm_button.${index + 1}`}
                  className="px-2 py-1 rounded-md bg-destructive/20 text-destructive border border-destructive/30 text-xs font-semibold hover:bg-destructive/30 transition-smooth"
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmDelete(false)}
                  data-ocid={`timeline.cancel_button.${index + 1}`}
                  className="px-2 py-1 rounded-md bg-muted/40 text-muted-foreground border border-border/30 text-xs font-semibold hover:bg-muted/60 transition-smooth"
                >
                  No
                </button>
              </div>
            )}

            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              aria-expanded={expanded}
              aria-label={expanded ? "Collapse skills" : "Expand skills"}
              data-ocid={`timeline.toggle.${index + 1}`}
              className="p-1.5 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/10 transition-smooth focus:outline-none focus-visible:ring-1 focus-visible:ring-accent/40"
            >
              {expanded ? (
                <ChevronUp className="size-3.5" aria-hidden="true" />
              ) : (
                <ChevronDown className="size-3.5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Collapsed skill preview */}
        {!expanded && resume.skills.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1 overflow-hidden max-h-7">
            {resume.skills.slice(0, 6).map((skill) => {
              const cat = getSkillCategory(skill);
              return (
                <span
                  key={skill}
                  className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border transition-smooth ${skillCategoryStyles[cat]}`}
                >
                  {skill}
                </span>
              );
            })}
            {resume.skills.length > 6 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium text-muted-foreground bg-muted/30 border border-border/20">
                +{resume.skills.length - 6}
              </span>
            )}
          </div>
        )}

        {/* Expanded skill list */}
        {expanded && (
          <div className="mt-3 pt-3 border-t border-border/15">
            {resume.skills.length > 0 ? (
              <>
                <div className="flex items-center gap-3 mb-2.5 flex-wrap">
                  {(["technical", "tools", "soft"] as const).map((cat) => {
                    const count = resume.skills.filter(
                      (s) => getSkillCategory(s) === cat,
                    ).length;
                    if (!count) return null;
                    const labels = {
                      technical: "Technical",
                      tools: "Tools",
                      soft: "Soft Skills",
                    };
                    return (
                      <span
                        key={cat}
                        className={`text-[10px] font-medium px-1.5 py-0.5 rounded border ${skillCategoryStyles[cat]}`}
                      >
                        {labels[cat]}: {count}
                      </span>
                    );
                  })}
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {resume.skills.map((skill) => {
                    const cat = getSkillCategory(skill);
                    return (
                      <span
                        key={skill}
                        className={`inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border transition-smooth ${skillCategoryStyles[cat]}`}
                      >
                        {skill}
                      </span>
                    );
                  })}
                </div>
              </>
            ) : (
              <p className="text-xs text-muted-foreground italic">
                No skills extracted
              </p>
            )}
          </div>
        )}
      </GlassCard>
    </div>
  );
}

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function SkeletonTimeline() {
  return (
    <div className="flex flex-col gap-2">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex gap-4">
          <div className="w-10 flex flex-col items-center gap-2">
            <div className="w-10 h-10 rounded-full shimmer" />
          </div>
          <div className="flex-1 glass rounded-xl p-5 flex flex-col gap-3 mb-4">
            <div className="flex gap-3 items-center">
              <div className="w-7 h-7 rounded-lg shimmer" />
              <div className="flex-1 flex flex-col gap-2">
                <div className="h-3.5 w-1/2 rounded shimmer" />
                <div className="h-3 w-1/4 rounded shimmer" />
              </div>
            </div>
            <div className="flex gap-1.5">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-5 w-14 rounded-md shimmer" />
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Empty state ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-5 py-16 text-center"
      data-ocid="profile.empty_state"
    >
      <div className="p-5 rounded-2xl bg-primary/10 border border-primary/20">
        <History className="size-10 text-primary/60" aria-hidden="true" />
      </div>
      <div>
        <p className="font-display font-semibold text-foreground text-lg">
          No resumes uploaded yet
        </p>
        <p className="text-sm text-muted-foreground mt-1.5 max-w-xs">
          Upload your first resume to get started. Your analysis history and
          score trends will appear here.
        </p>
      </div>
      <Link to="/upload">
        <button
          type="button"
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-display font-semibold text-sm hover:bg-primary/90 transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          data-ocid="profile.go_upload_button"
        >
          <UploadCloud className="size-4" aria-hidden="true" />
          Upload a resume
          <ArrowRight className="size-4" aria-hidden="true" />
        </button>
      </Link>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { user } = useAuth();
  const { data: resumes = [], isLoading, isError } = useUserResumes();

  const totalUploads = resumes.length;
  const avgScore =
    resumes.length > 0
      ? Math.round(resumes.reduce((s, r) => s + r.score, 0) / resumes.length)
      : 0;
  const bestScore =
    resumes.length > 0 ? Math.max(...resumes.map((r) => r.score)) : 0;
  const totalSkills = resumes.reduce((s, r) => s + r.skills.length, 0);
  const overallTrend = computeTrend(resumes);

  const statCards: StatMeta[] = [
    {
      label: "Total Uploads",
      value: totalUploads,
      icon: <FileText className="size-3.5 text-secondary" aria-hidden="true" />,
      iconBg: "bg-secondary/10 border-secondary/25",
      trend: "stable",
      ocid: "stat.total_uploads",
    },
    {
      label: "Average Score",
      value: avgScore,
      icon: <Sparkles className="size-3.5 text-primary" aria-hidden="true" />,
      iconBg: "bg-primary/10 border-primary/25",
      trend: overallTrend,
      ocid: "stat.avg_score",
    },
    {
      label: "Best Score",
      value: bestScore,
      icon: <Star className="size-3.5 text-success" aria-hidden="true" />,
      iconBg: "bg-success/10 border-success/25",
      trend: "stable",
      ocid: "stat.best_score",
    },
    {
      label: "Total Skills Found",
      value: totalSkills,
      icon: <Tag className="size-3.5 text-accent" aria-hidden="true" />,
      iconBg: "bg-accent/10 border-accent/25",
      trend: overallTrend,
      ocid: "stat.total_skills",
    },
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-6 fade-up">
      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-primary/15 border border-primary/30 shrink-0 mt-0.5">
            <History className="size-5 text-primary" aria-hidden="true" />
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

        {!isLoading && resumes.length > 0 && (
          <button
            type="button"
            onClick={() => exportToCsv(resumes, user?.email ?? "user")}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-muted/30 border border-border/30 text-muted-foreground hover:text-primary hover:border-primary/40 hover:bg-primary/8 text-xs font-medium transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 shrink-0"
            data-ocid="profile.export_csv_button"
            aria-label="Export resume history as CSV"
          >
            <Download className="size-3.5" aria-hidden="true" />
            Export CSV
          </button>
        )}
      </div>

      {/* ── Stat cards ── */}
      {!isLoading && resumes.length > 0 && (
        <div
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          data-ocid="profile.stat_cards"
        >
          {statCards.map((meta) => (
            <ProfileStatCard key={meta.label} meta={meta} />
          ))}
        </div>
      )}

      {/* ── Score trend chart ── */}
      {!isLoading && !isError && <ScoreTrendChart resumes={resumes} />}

      {/* ── Content ── */}
      {isLoading ? (
        <SkeletonTimeline />
      ) : isError ? (
        <div
          className="glass rounded-xl px-5 py-4 border border-destructive/25 bg-destructive/5 text-sm text-destructive"
          data-ocid="profile.error_state"
        >
          Failed to load resume history. Please refresh the page.
        </div>
      ) : resumes.length === 0 ? (
        <EmptyState />
      ) : (
        <div data-ocid="profile.timeline_list">
          <div className="flex items-center gap-2 mb-4">
            <div className="p-1.5 rounded-lg bg-muted/30 border border-border/20 shrink-0">
              <History
                className="size-3.5 text-muted-foreground"
                aria-hidden="true"
              />
            </div>
            <h2 className="font-display font-semibold text-sm text-foreground">
              Upload Timeline
            </h2>
            <span className="text-xs text-muted-foreground">
              — most recent first
            </span>
          </div>
          {resumes.map((resume, index) => (
            <TimelineCard
              key={resume.id}
              resume={resume}
              index={index}
              isLast={index === resumes.length - 1}
            />
          ))}
        </div>
      )}

      {/* ── Upload CTA ── */}
      {!isLoading && resumes.length > 0 && (
        <div className="glass rounded-xl px-5 py-4 flex items-center justify-between gap-4 border border-border/20">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-lg bg-primary/15 border border-primary/25 shrink-0">
              <UploadCloud className="size-4 text-primary" aria-hidden="true" />
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
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-primary text-primary-foreground text-xs font-display font-semibold hover:bg-primary/90 transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 whitespace-nowrap"
              data-ocid="profile.upload_more_button"
            >
              Upload
              <ArrowUpRight className="size-3.5" aria-hidden="true" />
            </button>
          </Link>
        </div>
      )}
    </div>
  );
}
