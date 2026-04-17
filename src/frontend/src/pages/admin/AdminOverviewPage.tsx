/**
 * AdminOverviewPage — Live analytics dashboard for the admin portal.
 * Loads resumes, users, and match history to derive all stats.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Activity,
  AlertCircle,
  BarChart3,
  Briefcase,
  Download,
  RefreshCw,
  Sparkles,
  TrendingUp,
  UserCog,
  Users,
  Zap,
} from "lucide-react";
import { useCallback, useMemo } from "react";
import {
  type BackendActor,
  type UserRecord,
  apiGetMatchHistory,
  apiGetResumes,
  apiListUsers,
} from "../../api";
import { createActor } from "../../backend";
import { useAuth } from "../../hooks/use-auth";
import type { MatchRecord, Resume } from "../../types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface OverviewData {
  resumes: Resume[];
  users: UserRecord[];
  matches: MatchRecord[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getWeekKey(isoDate: string): string {
  const d = new Date(isoDate);
  const startOfWeek = new Date(d);
  startOfWeek.setDate(d.getDate() - d.getDay());
  return startOfWeek.toISOString().slice(0, 10);
}

function formatWeekLabel(isoDate: string): string {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function exportCSV(data: OverviewData) {
  const avgScore =
    data.resumes.length > 0
      ? Math.round(
          data.resumes.reduce((s, r) => s + r.score, 0) / data.resumes.length,
        )
      : 0;

  const skillCounts: Record<string, number> = {};
  for (const r of data.resumes) {
    for (const sk of r.skills) {
      skillCounts[sk] = (skillCounts[sk] ?? 0) + 1;
    }
  }
  const topSkills = Object.entries(skillCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10);

  const lines: string[] = [
    "=== AI Resume Portal — Analytics Export ===",
    "",
    "Summary",
    `Total Resumes,${data.resumes.length}`,
    `Average Score,${avgScore}`,
    `Registered Users,${data.users.length}`,
    `Total Job Matches,${data.matches.length}`,
    "",
    "Top Skills",
    "Skill,Count",
    ...topSkills.map(([sk, ct]) => `${sk},${ct}`),
    "",
    "Recent Uploads",
    "Filename,Score,Skills,Upload Date",
    ...data.resumes
      .slice(0, 10)
      .map(
        (r) =>
          `"${r.filename}",${r.score},"${r.skills.join("; ")}",${new Date(r.uploadDate).toLocaleDateString()}`,
      ),
  ];

  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `admin-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Quick Guide card ─────────────────────────────────────────────────────────

const ADMIN_GUIDE_STEPS = [
  {
    step: "1",
    icon: <Briefcase className="size-4 text-accent" />,
    title: "Review Candidates",
    desc: "View all uploaded resumes, scores, and skill breakdowns in the Candidates tab.",
  },
  {
    step: "2",
    icon: <Zap className="size-4 text-accent" />,
    title: "Match Jobs",
    desc: "Run job description matching across all resumes and see compatibility scores.",
  },
  {
    step: "3",
    icon: <UserCog className="size-4 text-accent" />,
    title: "Manage Users",
    desc: "View, search, filter, and delete registered user accounts from User Management.",
  },
];

function AdminQuickGuide() {
  return (
    <div
      className="glass rounded-2xl p-5 border border-accent/10 flex flex-col gap-5"
      data-ocid="admin-quick-guide"
    >
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-accent/15 border border-accent/25">
          <Sparkles className="size-4 text-accent" />
        </div>
        <div>
          <p className="font-display font-semibold text-foreground text-sm">
            Admin Quick Guide
          </p>
          <p className="text-xs text-muted-foreground">
            Three things to do from this portal
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {ADMIN_GUIDE_STEPS.map(({ step, icon, title, desc }) => (
          <div key={step} className="flex-1 flex gap-3">
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div className="w-7 h-7 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-xs font-mono font-bold text-accent">
                {step}
              </div>
              {step !== "3" && (
                <div className="flex-1 w-px bg-accent/15 hidden sm:block" />
              )}
            </div>
            <div className="pb-3">
              <div className="flex items-center gap-1.5 mb-1">
                {icon}
                <p className="text-sm font-semibold text-foreground">{title}</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-1 border-t border-border/15 flex flex-wrap gap-4 text-xs text-muted-foreground/60">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
          Real-time data
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
          CSV export
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
          Bulk actions
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
          Admin-only access
        </span>
      </div>
    </div>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="glass rounded-2xl p-5 border border-border/20 space-y-3">
      <div className="flex items-center justify-between">
        <div className="shimmer h-3 w-24 rounded-full" />
        <div className="shimmer h-9 w-9 rounded-lg" />
      </div>
      <div className="shimmer h-9 w-16 rounded-md" />
      <div className="shimmer h-3 w-32 rounded-full" />
    </div>
  );
}

function SkeletonChart() {
  return (
    <div className="glass rounded-2xl p-6 border border-border/20 space-y-4">
      <div className="shimmer h-4 w-40 rounded-full" />
      <div className="shimmer h-40 rounded-xl" />
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  desc: string;
  accent?: boolean;
  ocid: string;
}
function StatCard({ label, value, icon, desc, accent, ocid }: StatCardProps) {
  return (
    <div
      data-ocid={ocid}
      className={`glass glass-hover rounded-2xl p-5 flex flex-col gap-3 border transition-smooth ${
        accent
          ? "border-accent/30 shadow-[0_0_24px_oklch(0.52_0.18_198/0.1)]"
          : "border-border/20"
      }`}
    >
      <div className="flex items-center justify-between">
        <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
          {label}
        </p>
        <div
          className={`p-2 rounded-lg border ${
            accent
              ? "bg-accent/15 border-accent/30"
              : "bg-muted/30 border-border/20"
          }`}
        >
          {icon}
        </div>
      </div>
      <p className="font-display text-3xl font-bold text-foreground">{value}</p>
      <p className="text-xs text-muted-foreground">{desc}</p>
    </div>
  );
}

// ─── Score Distribution Chart (inline SVG) ────────────────────────────────────

interface ScoreDistChartProps {
  resumes: Resume[];
}
function ScoreDistChart({ resumes }: ScoreDistChartProps) {
  const buckets = useMemo(() => {
    const b = [
      { label: "0–20", min: 0, max: 20, count: 0 },
      { label: "21–40", min: 21, max: 40, count: 0 },
      { label: "41–60", min: 41, max: 60, count: 0 },
      { label: "61–80", min: 61, max: 80, count: 0 },
      { label: "81–100", min: 81, max: 100, count: 0 },
    ];
    for (const r of resumes) {
      const bucket = b.find((bk) => r.score >= bk.min && r.score <= bk.max);
      if (bucket) bucket.count++;
    }
    return b;
  }, [resumes]);

  const maxCount = Math.max(...buckets.map((b) => b.count), 1);
  const W = 320;
  const H = 120;
  const barW = 44;
  const gap = 16;
  const totalBarsWidth = buckets.length * barW + (buckets.length - 1) * gap;
  const offsetX = (W - totalBarsWidth) / 2;

  if (resumes.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center rounded-xl bg-muted/20 border border-border/15">
        <p className="text-sm text-muted-foreground">
          No resumes yet — upload some candidates to see the distribution.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <svg
        width={W}
        height={H + 36}
        viewBox={`0 0 ${W} ${H + 36}`}
        className="mx-auto"
        aria-label="Score distribution bar chart"
        role="img"
      >
        <title>Score distribution bar chart</title>
        {buckets.map((b, i) => {
          const barH = maxCount > 0 ? Math.max((b.count / maxCount) * H, 2) : 2;
          const x = offsetX + i * (barW + gap);
          const y = H - barH;
          const isHighest = b.count === maxCount && b.count > 0;
          return (
            <g key={b.label}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={barH}
                rx={6}
                fill={isHighest ? "#52b8a8" : "#6e7dd4"}
                className="transition-all duration-500"
              />
              {b.count > 0 && (
                <text
                  x={x + barW / 2}
                  y={y - 5}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="600"
                  fill="#1e2a3a"
                >
                  {b.count}
                </text>
              )}
              <text
                x={x + barW / 2}
                y={H + 18}
                textAnchor="middle"
                fontSize="10"
                fill="#7a8499"
              >
                {b.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── Upload Timeline (area chart, last 8 weeks) ───────────────────────────────

interface TimelineChartProps {
  resumes: Resume[];
}
function UploadTimelineChart({ resumes }: TimelineChartProps) {
  const weeks = useMemo(() => {
    const now = new Date();
    const weekData: Array<{ label: string; key: string; count: number }> = [];
    for (let i = 7; i >= 0; i--) {
      const d = new Date(now);
      d.setDate(d.getDate() - i * 7);
      const key = getWeekKey(d.toISOString());
      weekData.push({ label: formatWeekLabel(key), key, count: 0 });
    }
    for (const r of resumes) {
      const key = getWeekKey(r.uploadDate);
      const w = weekData.find((wk) => wk.key === key);
      if (w) w.count++;
    }
    return weekData;
  }, [resumes]);

  const maxVal = Math.max(...weeks.map((w) => w.count), 1);
  const W = 320;
  const H = 80;
  const padX = 16;
  const stepX = (W - padX * 2) / (weeks.length - 1);

  const points = weeks.map((w, i) => ({
    x: padX + i * stepX,
    y: H - (w.count / maxVal) * (H - 10) - 4,
    count: w.count,
    label: w.label,
  }));

  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPoints = [
    `${points[0].x},${H}`,
    ...points.map((p) => `${p.x},${p.y}`),
    `${points[points.length - 1].x},${H}`,
  ].join(" ");

  if (resumes.length === 0) {
    return (
      <div className="h-32 flex items-center justify-center rounded-xl bg-muted/20 border border-border/15">
        <p className="text-sm text-muted-foreground">
          Upload timeline will appear once resumes are added.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <svg
        width={W}
        height={H + 28}
        viewBox={`0 0 ${W} ${H + 28}`}
        className="mx-auto"
        aria-label="Upload timeline area chart"
        role="img"
      >
        <title>Upload timeline area chart</title>
        <defs>
          <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#52b8a8" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#52b8a8" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill="url(#areaGrad)" />
        <polyline
          points={polylinePoints}
          fill="none"
          stroke="#52b8a8"
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
        {points.map((p, i) => (
          <g key={weeks[i].key}>
            {p.count > 0 && (
              <circle
                cx={p.x}
                cy={p.y}
                r={3.5}
                fill="#52b8a8"
                stroke="white"
                strokeWidth="1.5"
              />
            )}
            <text
              x={p.x}
              y={H + 18}
              textAnchor="middle"
              fontSize="9"
              fill="#7a8499"
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─── Top Skills Leaderboard ───────────────────────────────────────────────────

interface TopSkillsProps {
  resumes: Resume[];
}
function TopSkillsLeaderboard({ resumes }: TopSkillsProps) {
  const topSkills = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of resumes) {
      for (const sk of r.skills) {
        counts[sk] = (counts[sk] ?? 0) + 1;
      }
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [resumes]);

  if (topSkills.length === 0) {
    return (
      <div className="h-32 flex items-center justify-center rounded-xl bg-muted/20 border border-border/15">
        <p className="text-sm text-muted-foreground">
          Skill data will appear once resumes are analyzed.
        </p>
      </div>
    );
  }

  const maxCount = topSkills[0][1];

  return (
    <div className="space-y-2">
      {topSkills.map(([skill, count], i) => (
        <div key={skill} className="flex items-center gap-3 group">
          <span className="text-xs font-mono text-muted-foreground w-5 text-right shrink-0">
            {i + 1}
          </span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm font-medium text-foreground truncate">
                {skill}
              </span>
              <span className="text-xs text-muted-foreground ml-2 shrink-0">
                {count}
              </span>
            </div>
            <div className="score-bar">
              <div
                className="score-bar-fill"
                style={{ width: `${(count / maxCount) * 100}%` }}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Recent Activity Table ────────────────────────────────────────────────────

interface RecentActivityProps {
  resumes: Resume[];
}
function RecentActivity({ resumes }: RecentActivityProps) {
  const recent = useMemo(
    () =>
      [...resumes]
        .sort(
          (a, b) =>
            new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime(),
        )
        .slice(0, 10),
    [resumes],
  );

  if (recent.length === 0) {
    return (
      <div
        data-ocid="admin-overview.recent_activity.empty_state"
        className="py-10 flex flex-col items-center gap-2 rounded-xl bg-muted/20 border border-border/15"
      >
        <Activity className="size-8 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">No uploads yet.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border/15">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border/15 bg-muted/20">
            <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Filename
            </th>
            <th className="text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell">
              Skills
            </th>
            <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Score
            </th>
            <th className="text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {recent.map((r, i) => (
            <tr
              key={r.id}
              data-ocid={`admin-overview.recent_activity.item.${i + 1}`}
              className="border-b border-border/10 last:border-0 hover:bg-muted/10 transition-colors duration-150"
            >
              <td className="px-4 py-3 max-w-[180px]">
                <span className="font-medium text-foreground truncate block">
                  {r.filename}
                </span>
              </td>
              <td className="px-4 py-3 hidden sm:table-cell">
                <div className="flex flex-wrap gap-1">
                  {r.skills.slice(0, 3).map((sk) => (
                    <span
                      key={sk}
                      className="text-[10px] px-1.5 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/20 font-medium"
                    >
                      {sk}
                    </span>
                  ))}
                  {r.skills.length > 3 && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-muted/30 text-muted-foreground border border-border/20">
                      +{r.skills.length - 3}
                    </span>
                  )}
                </div>
              </td>
              <td className="px-4 py-3 text-right">
                <span
                  className={`font-mono font-bold text-sm ${
                    r.score >= 70
                      ? "text-accent"
                      : r.score >= 40
                        ? "text-primary"
                        : "text-muted-foreground"
                  }`}
                >
                  {r.score}
                </span>
              </td>
              <td className="px-4 py-3 text-right hidden md:table-cell">
                <span className="text-xs text-muted-foreground">
                  {new Date(r.uploadDate).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function AdminOverviewPage() {
  const { actor, isFetching: actorLoading } = useActor(createActor);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const enabled = !!actor && !actorLoading && !!user?.token;

  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching: isRefreshing,
  } = useQuery<OverviewData>({
    queryKey: ["admin-overview"],
    queryFn: async (): Promise<OverviewData> => {
      const token = user!.token;
      const ba = actor as BackendActor;
      const [resumes, usersResult, matches] = await Promise.all([
        apiGetResumes(ba),
        apiListUsers(ba, token),
        apiGetMatchHistory(ba),
      ]);
      return {
        resumes,
        users: usersResult.users ?? [],
        matches,
      };
    },
    enabled,
    staleTime: 60_000,
  });

  const handleRefresh = useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
    void refetch();
  }, [queryClient, refetch]);

  const handleExport = useCallback(() => {
    if (data) exportCSV(data);
  }, [data]);

  // Derived stats
  const stats = useMemo(() => {
    if (!data) return null;
    const avgScore =
      data.resumes.length > 0
        ? Math.round(
            data.resumes.reduce((s, r) => s + r.score, 0) / data.resumes.length,
          )
        : 0;
    return {
      totalResumes: data.resumes.length,
      avgScore,
      totalUsers: data.users.length,
      totalMatches: data.matches.length,
    };
  }, [data]);

  // ── Loading state ──
  if (isLoading || actorLoading) {
    return (
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-6"
        data-ocid="admin-overview.loading_state"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <div className="shimmer h-7 w-40 rounded-md" />
            <div className="shimmer h-4 w-56 rounded-full" />
          </div>
          <div className="flex gap-2">
            <div className="shimmer h-9 w-24 rounded-lg" />
            <div className="shimmer h-9 w-32 rounded-lg" />
          </div>
        </div>
        <div className="shimmer h-36 rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <SkeletonChart />
          <SkeletonChart />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <SkeletonChart />
          </div>
          <div className="lg:col-span-2">
            <SkeletonChart />
          </div>
        </div>
      </div>
    );
  }

  // ── Error state ──
  if (isError) {
    return (
      <div
        className="p-6 flex flex-col items-center justify-center min-h-[60vh] gap-4"
        data-ocid="admin-overview.error_state"
      >
        <div className="glass rounded-2xl p-8 flex flex-col items-center gap-4 max-w-md w-full border border-destructive/20">
          <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/20">
            <AlertCircle className="size-8 text-destructive" />
          </div>
          <div className="text-center">
            <h2 className="font-display font-semibold text-foreground text-lg">
              Failed to load analytics
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              There was a problem fetching dashboard data from the backend.
            </p>
          </div>
          <button
            type="button"
            onClick={handleRefresh}
            data-ocid="admin-overview.retry_button"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-smooth"
          >
            <RefreshCw className="size-4" />
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-6 fade-up"
      data-ocid="admin-overview.page"
    >
      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-accent/15 border border-accent/30 shrink-0 mt-0.5">
            <BarChart3 className="size-5 text-accent" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Admin Overview
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Manage and monitor all resume submissions, users, and job matches.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0 mt-1">
          <button
            type="button"
            onClick={handleRefresh}
            disabled={isRefreshing}
            data-ocid="admin-overview.refresh_button"
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-muted/30 border border-border/30 text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/8 text-xs font-medium transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:opacity-60"
          >
            <RefreshCw
              className={`size-3.5 ${isRefreshing ? "animate-spin" : ""}`}
            />
            Refresh
          </button>
          <button
            type="button"
            onClick={handleExport}
            disabled={!data}
            data-ocid="admin-overview.export_button"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-smooth disabled:opacity-50"
          >
            <Download className="size-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* ── Admin Quick Guide ── */}
      <AdminQuickGuide />

      {/* ── Stat cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          ocid="admin-overview.stat.total_resumes"
          label="Total Resumes"
          value={stats?.totalResumes ?? 0}
          icon={<Briefcase className="size-5 text-primary" />}
          desc="Resumes uploaded to date"
        />
        <StatCard
          ocid="admin-overview.stat.avg_score"
          label="Average Score"
          value={stats ? `${stats.avgScore}` : "—"}
          icon={<BarChart3 className="size-5 text-accent" />}
          desc="Mean resume score (0–100)"
          accent
        />
        <StatCard
          ocid="admin-overview.stat.total_users"
          label="Registered Users"
          value={stats?.totalUsers ?? 0}
          icon={<Users className="size-5 text-chart-3" />}
          desc="Active user accounts"
        />
        <StatCard
          ocid="admin-overview.stat.total_matches"
          label="Job Matches"
          value={stats?.totalMatches ?? 0}
          icon={<TrendingUp className="size-5 text-chart-2" />}
          desc="Job description matches run"
        />
      </div>

      {/* ── Charts row ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Score distribution */}
        <div
          className="glass rounded-2xl p-6 border border-border/20 space-y-4"
          data-ocid="admin-overview.score_chart"
        >
          <div className="flex items-center gap-2">
            <BarChart3 className="size-4 text-accent" />
            <h2 className="font-display font-semibold text-foreground text-base">
              Score Distribution
            </h2>
          </div>
          <ScoreDistChart resumes={data?.resumes ?? []} />
          <p className="text-xs text-muted-foreground text-center">
            Resumes bucketed by score range
          </p>
        </div>

        {/* Upload timeline */}
        <div
          className="glass rounded-2xl p-6 border border-border/20 space-y-4"
          data-ocid="admin-overview.upload_timeline"
        >
          <div className="flex items-center gap-2">
            <Activity className="size-4 text-primary" />
            <h2 className="font-display font-semibold text-foreground text-base">
              Upload Timeline
            </h2>
          </div>
          <UploadTimelineChart resumes={data?.resumes ?? []} />
          <p className="text-xs text-muted-foreground text-center">
            Uploads per week — last 8 weeks
          </p>
        </div>
      </div>

      {/* ── Skills + Recent activity ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Top skills leaderboard */}
        <div
          className="glass rounded-2xl p-6 border border-border/20 space-y-4 lg:col-span-1"
          data-ocid="admin-overview.top_skills"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-chart-3" />
            <h2 className="font-display font-semibold text-foreground text-base">
              Top Skills
            </h2>
          </div>
          <TopSkillsLeaderboard resumes={data?.resumes ?? []} />
        </div>

        {/* Recent activity */}
        <div
          className="glass rounded-2xl p-6 border border-border/20 space-y-4 lg:col-span-2"
          data-ocid="admin-overview.recent_activity"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="size-4 text-chart-2" />
              <h2 className="font-display font-semibold text-foreground text-base">
                Recent Uploads
              </h2>
            </div>
            {data && data.resumes.length > 0 && (
              <span className="text-xs text-muted-foreground">
                Last {Math.min(10, data.resumes.length)} of{" "}
                {data.resumes.length}
              </span>
            )}
          </div>
          <RecentActivity resumes={data?.resumes ?? []} />
        </div>
      </div>
    </div>
  );
}
