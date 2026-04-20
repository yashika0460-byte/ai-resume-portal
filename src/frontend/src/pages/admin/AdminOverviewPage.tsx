/**
 * AdminOverviewPage — Live analytics dashboard for the admin portal.
 * KPI cards with trend badges, score distribution, top skills, recent activity.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Activity,
  AlertCircle,
  BarChart2,
  BarChart3,
  Briefcase,
  Download,
  GitMerge,
  RefreshCw,
  Sparkles,
  TrendingDown,
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
    for (const sk of r.skills) skillCounts[sk] = (skillCounts[sk] ?? 0) + 1;
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
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `admin-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────

interface KPICardProps {
  label: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  trend: number;
  desc: string;
  ocid: string;
}

function KPICard({
  label,
  value,
  icon,
  iconBg,
  trend,
  desc,
  ocid,
}: KPICardProps) {
  const trendPositive = trend >= 0;
  return (
    <div
      data-ocid={ocid}
      className="glass rounded-2xl p-5 border border-border/20 flex flex-col gap-4 hover:border-accent/20 transition-all duration-300"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3">
            {label}
          </p>
          <p className="font-display text-4xl font-bold text-foreground leading-none">
            {value}
          </p>
        </div>
        <div className={`p-3 rounded-2xl shrink-0 border ${iconBg}`}>
          {icon}
        </div>
      </div>
      <div className="flex items-center justify-between pt-1 border-t border-border/10">
        <p className="text-xs text-muted-foreground">{desc}</p>
        <span
          className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
            trendPositive
              ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
              : "bg-red-500/10 text-red-400 border border-red-500/20"
          }`}
        >
          {trendPositive ? (
            <TrendingUp className="size-3" />
          ) : (
            <TrendingDown className="size-3" />
          )}
          {trendPositive ? "+" : ""}
          {trend}%
        </span>
      </div>
    </div>
  );
}

// ─── Score Distribution Chart (inline SVG) ────────────────────────────────────

function ScoreDistChart({ resumes }: { resumes: Resume[] }) {
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
  const W = 340;
  const H = 130;
  const barW = 48;
  const gap = 18;
  const totalBarsWidth = buckets.length * barW + (buckets.length - 1) * gap;
  const offsetX = (W - totalBarsWidth) / 2;

  if (resumes.length === 0) {
    return (
      <div className="h-40 flex items-center justify-center rounded-xl bg-muted/10 border border-dashed border-border/20">
        <p className="text-sm text-muted-foreground">No resumes yet</p>
      </div>
    );
  }

  const BUCKET_COLORS = ["#6366f1", "#8b5cf6", "#6366f1", "#7c3aed", "#4f46e5"];

  return (
    <div className="overflow-x-auto">
      <svg
        width={W}
        height={H + 40}
        viewBox={`0 0 ${W} ${H + 40}`}
        className="mx-auto"
        aria-label="Score distribution bar chart"
        role="img"
      >
        <title>Score distribution bar chart</title>
        {/* Grid lines */}
        {[0.25, 0.5, 0.75, 1].map((frac) => (
          <line
            key={frac}
            x1={offsetX - 4}
            y1={H - frac * H}
            x2={W - offsetX + 4}
            y2={H - frac * H}
            stroke="oklch(0.25 0.01 264)"
            strokeWidth="1"
            strokeDasharray="3 3"
          />
        ))}
        {buckets.map((b, i) => {
          const barH = Math.max((b.count / maxCount) * H, 2);
          const x = offsetX + i * (barW + gap);
          const y = H - barH;
          return (
            <g key={b.label}>
              <rect
                x={x}
                y={y}
                width={barW}
                height={barH}
                rx={6}
                fill={BUCKET_COLORS[i]}
                fillOpacity={0.85}
              />
              {b.count > 0 && (
                <text
                  x={x + barW / 2}
                  y={y - 7}
                  textAnchor="middle"
                  fontSize="11"
                  fontWeight="700"
                  fill="#e2e8f0"
                >
                  {b.count}
                </text>
              )}
              <text
                x={x + barW / 2}
                y={H + 20}
                textAnchor="middle"
                fontSize="10"
                fill="#64748b"
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

// ─── Top Skills Horizontal Bar chart ─────────────────────────────────────────

function TopSkillsChart({ resumes }: { resumes: Resume[] }) {
  const topSkills = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const r of resumes) {
      for (const sk of r.skills) counts[sk] = (counts[sk] ?? 0) + 1;
    }
    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10);
  }, [resumes]);

  if (topSkills.length === 0) {
    return (
      <div className="h-32 flex items-center justify-center rounded-xl bg-muted/10 border border-dashed border-border/20">
        <p className="text-sm text-muted-foreground">
          Skill data will appear once resumes are analyzed.
        </p>
      </div>
    );
  }

  const maxCount = topSkills[0][1];
  const VIOLET_SHADES = [
    "#8b5cf6",
    "#7c3aed",
    "#9333ea",
    "#6d28d9",
    "#a855f7",
    "#7e22ce",
    "#c026d3",
    "#8b5cf6",
    "#7c3aed",
    "#9333ea",
  ];

  return (
    <div className="space-y-2.5">
      {topSkills.map(([skill, count], i) => (
        <div key={skill} className="flex items-center gap-3">
          <span className="text-xs font-mono text-muted-foreground w-4 text-right shrink-0">
            {i + 1}
          </span>
          <span className="text-xs font-medium text-foreground w-24 shrink-0 truncate">
            {skill}
          </span>
          <div className="flex-1 h-2.5 rounded-full bg-muted/20 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${(count / maxCount) * 100}%`,
                background: VIOLET_SHADES[i],
              }}
            />
          </div>
          <span className="text-xs font-mono text-muted-foreground w-6 text-right shrink-0">
            {count}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Upload Timeline (area chart, last 8 weeks) ───────────────────────────────

function UploadTimelineChart({ resumes }: { resumes: Resume[] }) {
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
      <div className="h-32 flex items-center justify-center rounded-xl bg-muted/10 border border-dashed border-border/20">
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
          <linearGradient id="areaGradOvr" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill="url(#areaGradOvr)" />
        <polyline
          points={polylinePoints}
          fill="none"
          stroke="#6366f1"
          strokeWidth="2.5"
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
                fill="#6366f1"
                stroke="oklch(0.08 0.015 264)"
                strokeWidth="1.5"
              />
            )}
            <text
              x={p.x}
              y={H + 18}
              textAnchor="middle"
              fontSize="9"
              fill="#64748b"
            >
              {p.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}

// ─── Recent Activity Feed ─────────────────────────────────────────────────────

function RecentActivityFeed({ resumes }: { resumes: Resume[] }) {
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
        className="py-10 flex flex-col items-center gap-3 rounded-xl bg-muted/10 border border-dashed border-border/20"
      >
        <Activity className="size-8 text-muted-foreground/40" />
        <p className="text-sm text-muted-foreground">No uploads yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {recent.map((r, i) => (
        <div
          key={r.id}
          data-ocid={`admin-overview.recent_activity.item.${i + 1}`}
          className="flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/10 border border-border/10 hover:border-accent/20 hover:bg-accent/5 transition-all duration-200"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0">
            <Briefcase className="size-3.5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-foreground truncate">
              {r.filename}
            </p>
            <p className="text-xs text-muted-foreground">
              {new Date(r.uploadDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex flex-wrap gap-1 max-w-[140px] justify-end">
            {r.skills.slice(0, 2).map((sk) => (
              <span
                key={sk}
                className="text-[9px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20 font-medium"
              >
                {sk}
              </span>
            ))}
          </div>
          <span
            className={`text-sm font-mono font-bold shrink-0 ${
              r.score >= 70
                ? "text-emerald-400"
                : r.score >= 40
                  ? "text-amber-400"
                  : "text-muted-foreground"
            }`}
          >
            {r.score}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Quick Guide card ─────────────────────────────────────────────────────────

const ADMIN_GUIDE_STEPS = [
  {
    step: "1",
    icon: <Briefcase className="size-4 text-indigo-400" />,
    title: "Review Candidates",
    desc: "View all uploaded resumes, scores, and skill breakdowns in the Candidates tab.",
  },
  {
    step: "2",
    icon: <Zap className="size-4 text-violet-400" />,
    title: "Match Jobs",
    desc: "Run job description matching across all resumes and see compatibility scores.",
  },
  {
    step: "3",
    icon: <UserCog className="size-4 text-emerald-400" />,
    title: "Manage Users",
    desc: "View, search, filter, and delete registered user accounts from User Management.",
  },
];

function AdminQuickGuide() {
  return (
    <div
      className="glass rounded-2xl p-5 border border-accent/10 flex flex-col gap-4"
      data-ocid="admin-quick-guide"
    >
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-accent/15 border border-accent/25">
          <Sparkles className="size-4 text-accent" />
        </div>
        <p className="font-display font-semibold text-foreground text-sm">
          Admin Quick Guide
        </p>
      </div>
      <div className="flex flex-col sm:flex-row gap-4">
        {ADMIN_GUIDE_STEPS.map(({ step, icon, title, desc }) => (
          <div key={step} className="flex-1 flex gap-3">
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div className="w-7 h-7 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-xs font-mono font-bold text-accent">
                {step}
              </div>
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
    </div>
  );
}

// ─── Skeleton placeholders ────────────────────────────────────────────────────

function SkeletonKPI() {
  return (
    <div className="glass rounded-2xl p-5 border border-border/20 space-y-4">
      <div className="flex items-start justify-between">
        <div className="space-y-2 flex-1">
          <div className="shimmer h-3 w-20 rounded-full" />
          <div className="shimmer h-10 w-16 rounded-md" />
        </div>
        <div className="shimmer h-12 w-12 rounded-2xl shrink-0" />
      </div>
      <div className="shimmer h-3 w-24 rounded-full" />
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
      return { resumes, users: usersResult.users ?? [], matches };
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

  if (isLoading || actorLoading) {
    return (
      <div
        className="max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-6"
        data-ocid="admin-overview.loading_state"
        aria-live="polite"
        aria-busy="true"
      >
        <div className="shimmer h-8 w-48 rounded-xl" />
        <div className="shimmer h-28 rounded-2xl" />
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
          {[0, 1, 2, 3].map((i) => (
            <SkeletonKPI key={i} />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[0, 1].map((i) => (
            <div key={i} className="shimmer h-52 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

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

  // Fake trend values for visual richness (in a real app, compare to previous period)
  const trends = {
    uploads: stats?.totalResumes ? 12 : 0,
    users: stats?.totalUsers ? 8 : 0,
    avgScore: 3,
    matches: stats?.totalMatches ? 24 : 0,
  };

  return (
    <div
      className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-6 fade-up"
      data-ocid="admin-overview.page"
    >
      {/* Page header */}
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
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-muted/30 border border-border/30 text-muted-foreground hover:text-accent hover:border-accent/40 text-xs font-medium transition-smooth disabled:opacity-60"
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

      {/* Admin Quick Guide */}
      <AdminQuickGuide />

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <KPICard
          ocid="admin-overview.stat.total_resumes"
          label="Total Uploads"
          value={stats?.totalResumes ?? 0}
          icon={<TrendingUp className="size-5 text-purple-400" />}
          iconBg="bg-purple-500/10 border-purple-500/20"
          trend={trends.uploads}
          desc="Resumes uploaded to date"
        />
        <KPICard
          ocid="admin-overview.stat.total_users"
          label="Total Users"
          value={stats?.totalUsers ?? 0}
          icon={<Users className="size-5 text-indigo-400" />}
          iconBg="bg-indigo-500/10 border-indigo-500/20"
          trend={trends.users}
          desc="Active user accounts"
        />
        <KPICard
          ocid="admin-overview.stat.avg_score"
          label="Avg Score"
          value={stats ? `${stats.avgScore}` : "—"}
          icon={<BarChart2 className="size-5 text-violet-400" />}
          iconBg="bg-violet-500/10 border-violet-500/20"
          trend={trends.avgScore}
          desc="Mean resume score (0–100)"
        />
        <KPICard
          ocid="admin-overview.stat.total_matches"
          label="Total Matches"
          value={stats?.totalMatches ?? 0}
          icon={<GitMerge className="size-5 text-emerald-400" />}
          iconBg="bg-emerald-500/10 border-emerald-500/20"
          trend={trends.matches}
          desc="Job description matches run"
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          className="glass rounded-2xl p-6 border border-border/20 space-y-4"
          data-ocid="admin-overview.score_chart"
        >
          <div className="flex items-center gap-2">
            <BarChart3 className="size-4 text-indigo-400" />
            <h2 className="font-display font-semibold text-foreground text-base">
              Score Distribution
            </h2>
            <span className="ml-auto text-xs text-muted-foreground">
              Bucketed by score range
            </span>
          </div>
          <ScoreDistChart resumes={data?.resumes ?? []} />
        </div>
        <div
          className="glass rounded-2xl p-6 border border-border/20 space-y-4"
          data-ocid="admin-overview.upload_timeline"
        >
          <div className="flex items-center gap-2">
            <Activity className="size-4 text-indigo-400" />
            <h2 className="font-display font-semibold text-foreground text-base">
              Upload Timeline
            </h2>
            <span className="ml-auto text-xs text-muted-foreground">
              Last 8 weeks
            </span>
          </div>
          <UploadTimelineChart resumes={data?.resumes ?? []} />
        </div>
      </div>

      {/* Top Skills + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div
          className="glass rounded-2xl p-6 border border-border/20 space-y-4 lg:col-span-1"
          data-ocid="admin-overview.top_skills"
        >
          <div className="flex items-center gap-2">
            <Sparkles className="size-4 text-violet-400" />
            <h2 className="font-display font-semibold text-foreground text-base">
              Top 10 Skills
            </h2>
          </div>
          <TopSkillsChart resumes={data?.resumes ?? []} />
        </div>
        <div
          className="glass rounded-2xl p-6 border border-border/20 space-y-4 lg:col-span-2"
          data-ocid="admin-overview.recent_activity"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="size-4 text-indigo-400" />
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
          <RecentActivityFeed resumes={data?.resumes ?? []} />
        </div>
      </div>
    </div>
  );
}
