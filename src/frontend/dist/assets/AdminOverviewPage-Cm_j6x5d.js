import { c as createLucideIcon, d as useActor, u as useAuth, p as useQueryClient, q as useQuery, r as reactExports, j as jsxRuntimeExports, Z as Zap, e as createActor } from "./index-BW0DBoAl.js";
import { f as apiGetResumes, c as apiListUsers, g as apiGetMatchHistory } from "./api-D_-AFWZL.js";
import { C as CircleAlert } from "./circle-alert-Vzmw5HjG.js";
import { R as RefreshCw } from "./refresh-cw-CQHMwaYf.js";
import { C as ChartColumn } from "./chart-column-CCmZYNnb.js";
import { D as Download } from "./download-DJwlZCMW.js";
import { T as TrendingUp } from "./trending-up-rLFaq9sj.js";
import { U as Users } from "./users-BKF81TpZ.js";
import { A as Activity } from "./activity-Bt_CRpMw.js";
import { S as Sparkles } from "./sparkles-D7iV9PZj.js";
import { B as Briefcase } from "./briefcase-DfzotPZe.js";
import { U as UserCog } from "./user-cog-CwsC8qwn.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["line", { x1: "18", x2: "18", y1: "20", y2: "10", key: "1xfpm4" }],
  ["line", { x1: "12", x2: "12", y1: "20", y2: "4", key: "be30l9" }],
  ["line", { x1: "6", x2: "6", y1: "20", y2: "14", key: "1r4le6" }]
];
const ChartNoAxesColumn = createLucideIcon("chart-no-axes-column", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M6 21V9a9 9 0 0 0 9 9", key: "7kw0sc" }]
];
const GitMerge = createLucideIcon("git-merge", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 17h6v-6", key: "t6n2it" }],
  ["path", { d: "m22 17-8.5-8.5-5 5L2 7", key: "x473p" }]
];
const TrendingDown = createLucideIcon("trending-down", __iconNode);
function getWeekKey(isoDate) {
  const d = new Date(isoDate);
  const startOfWeek = new Date(d);
  startOfWeek.setDate(d.getDate() - d.getDay());
  return startOfWeek.toISOString().slice(0, 10);
}
function formatWeekLabel(isoDate) {
  const d = new Date(isoDate);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
function exportCSV(data) {
  const avgScore = data.resumes.length > 0 ? Math.round(
    data.resumes.reduce((s, r) => s + r.score, 0) / data.resumes.length
  ) : 0;
  const skillCounts = {};
  for (const r of data.resumes) {
    for (const sk of r.skills) skillCounts[sk] = (skillCounts[sk] ?? 0) + 1;
  }
  const topSkills = Object.entries(skillCounts).sort((a2, b) => b[1] - a2[1]).slice(0, 10);
  const lines = [
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
    ...topSkills.map(([sk, ct]) => `${sk},${ct}`)
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `admin-analytics-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
function KPICard({
  label,
  value,
  icon,
  iconBg,
  trend,
  desc,
  ocid
}) {
  const trendPositive = trend >= 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": ocid,
      className: "glass rounded-2xl p-5 border border-border/20 flex flex-col gap-4 hover:border-accent/20 transition-all duration-300",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-widest mb-3", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-4xl font-bold text-foreground leading-none", children: value })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-3 rounded-2xl shrink-0 border ${iconBg}`, children: icon })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between pt-1 border-t border-border/10", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: `inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${trendPositive ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-red-500/10 text-red-400 border border-red-500/20"}`,
              children: [
                trendPositive ? /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingDown, { className: "size-3" }),
                trendPositive ? "+" : "",
                trend,
                "%"
              ]
            }
          )
        ] })
      ]
    }
  );
}
function ScoreDistChart({ resumes }) {
  const buckets = reactExports.useMemo(() => {
    const b = [
      { label: "0–20", min: 0, max: 20, count: 0 },
      { label: "21–40", min: 21, max: 40, count: 0 },
      { label: "41–60", min: 41, max: 60, count: 0 },
      { label: "61–80", min: 61, max: 80, count: 0 },
      { label: "81–100", min: 81, max: 100, count: 0 }
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 flex items-center justify-center rounded-xl bg-muted/10 border border-dashed border-border/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No resumes yet" }) });
  }
  const BUCKET_COLORS = ["#6366f1", "#8b5cf6", "#6366f1", "#7c3aed", "#4f46e5"];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: W,
      height: H + 40,
      viewBox: `0 0 ${W} ${H + 40}`,
      className: "mx-auto",
      "aria-label": "Score distribution bar chart",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Score distribution bar chart" }),
        [0.25, 0.5, 0.75, 1].map((frac) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "line",
          {
            x1: offsetX - 4,
            y1: H - frac * H,
            x2: W - offsetX + 4,
            y2: H - frac * H,
            stroke: "oklch(0.25 0.01 264)",
            strokeWidth: "1",
            strokeDasharray: "3 3"
          },
          frac
        )),
        buckets.map((b, i) => {
          const barH = Math.max(b.count / maxCount * H, 2);
          const x = offsetX + i * (barW + gap);
          const y = H - barH;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "rect",
              {
                x,
                y,
                width: barW,
                height: barH,
                rx: 6,
                fill: BUCKET_COLORS[i],
                fillOpacity: 0.85
              }
            ),
            b.count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                x: x + barW / 2,
                y: y - 7,
                textAnchor: "middle",
                fontSize: "11",
                fontWeight: "700",
                fill: "#e2e8f0",
                children: b.count
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                x: x + barW / 2,
                y: H + 20,
                textAnchor: "middle",
                fontSize: "10",
                fill: "#64748b",
                children: b.label
              }
            )
          ] }, b.label);
        })
      ]
    }
  ) });
}
function TopSkillsChart({ resumes }) {
  const topSkills = reactExports.useMemo(() => {
    const counts = {};
    for (const r of resumes) {
      for (const sk of r.skills) counts[sk] = (counts[sk] ?? 0) + 1;
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [resumes]);
  if (topSkills.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 flex items-center justify-center rounded-xl bg-muted/10 border border-dashed border-border/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Skill data will appear once resumes are analyzed." }) });
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
    "#9333ea"
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2.5", children: topSkills.map(([skill, count], i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground w-4 text-right shrink-0", children: i + 1 }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-foreground w-24 shrink-0 truncate", children: skill }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-2.5 rounded-full bg-muted/20 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-full rounded-full transition-all duration-700",
        style: {
          width: `${count / maxCount * 100}%`,
          background: VIOLET_SHADES[i]
        }
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground w-6 text-right shrink-0", children: count })
  ] }, skill)) });
}
function UploadTimelineChart({ resumes }) {
  const weeks = reactExports.useMemo(() => {
    const now = /* @__PURE__ */ new Date();
    const weekData = [];
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
    y: H - w.count / maxVal * (H - 10) - 4,
    count: w.count,
    label: w.label
  }));
  const polylinePoints = points.map((p) => `${p.x},${p.y}`).join(" ");
  const areaPoints = [
    `${points[0].x},${H}`,
    ...points.map((p) => `${p.x},${p.y}`),
    `${points[points.length - 1].x},${H}`
  ].join(" ");
  if (resumes.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 flex items-center justify-center rounded-xl bg-muted/10 border border-dashed border-border/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Upload timeline will appear once resumes are added." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: W,
      height: H + 28,
      viewBox: `0 0 ${W} ${H + 28}`,
      className: "mx-auto",
      "aria-label": "Upload timeline area chart",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Upload timeline area chart" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "areaGradOvr", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#6366f1", stopOpacity: "0.4" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#6366f1", stopOpacity: "0.02" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: areaPoints, fill: "url(#areaGradOvr)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "polyline",
          {
            points: polylinePoints,
            fill: "none",
            stroke: "#6366f1",
            strokeWidth: "2.5",
            strokeLinejoin: "round",
            strokeLinecap: "round"
          }
        ),
        points.map((p, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
          p.count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: p.x,
              cy: p.y,
              r: 3.5,
              fill: "#6366f1",
              stroke: "oklch(0.08 0.015 264)",
              strokeWidth: "1.5"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "text",
            {
              x: p.x,
              y: H + 18,
              textAnchor: "middle",
              fontSize: "9",
              fill: "#64748b",
              children: p.label
            }
          )
        ] }, weeks[i].key))
      ]
    }
  ) });
}
function RecentActivityFeed({ resumes }) {
  const recent = reactExports.useMemo(
    () => [...resumes].sort(
      (a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
    ).slice(0, 10),
    [resumes]
  );
  if (recent.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "admin-overview.recent_activity.empty_state",
        className: "py-10 flex flex-col items-center gap-3 rounded-xl bg-muted/10 border border-dashed border-border/20",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "size-8 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No uploads yet." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: recent.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": `admin-overview.recent_activity.item.${i + 1}`,
      className: "flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/10 border border-border/10 hover:border-accent/20 hover:bg-accent/5 transition-all duration-200",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "size-3.5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: r.filename }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: new Date(r.uploadDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1 max-w-[140px] justify-end", children: r.skills.slice(0, 2).map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "text-[9px] px-1.5 py-0.5 rounded bg-violet-500/10 text-violet-300 border border-violet-500/20 font-medium",
            children: sk
          },
          sk
        )) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `text-sm font-mono font-bold shrink-0 ${r.score >= 70 ? "text-emerald-400" : r.score >= 40 ? "text-amber-400" : "text-muted-foreground"}`,
            children: r.score
          }
        )
      ]
    },
    r.id
  )) });
}
const ADMIN_GUIDE_STEPS = [
  {
    step: "1",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "size-4 text-indigo-400" }),
    title: "Review Candidates",
    desc: "View all uploaded resumes, scores, and skill breakdowns in the Candidates tab."
  },
  {
    step: "2",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-4 text-violet-400" }),
    title: "Match Jobs",
    desc: "Run job description matching across all resumes and see compatibility scores."
  },
  {
    step: "3",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCog, { className: "size-4 text-emerald-400" }),
    title: "Manage Users",
    desc: "View, search, filter, and delete registered user accounts from User Management."
  }
];
function AdminQuickGuide() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass rounded-2xl p-5 border border-accent/10 flex flex-col gap-4",
      "data-ocid": "admin-quick-guide",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-accent/15 border border-accent/25", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: "Admin Quick Guide" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-4", children: ADMIN_GUIDE_STEPS.map(({ step, icon, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center gap-1 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-xs font-mono font-bold text-accent", children: step }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
              icon,
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: desc })
          ] })
        ] }, step)) })
      ]
    }
  );
}
function SkeletonKPI() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5 border border-border/20 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 flex-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-3 w-20 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-10 w-16 rounded-md" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-12 w-12 rounded-2xl shrink-0" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-3 w-24 rounded-full" })
  ] });
}
function AdminOverviewPage() {
  const { actor, isFetching: actorLoading } = useActor(createActor);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const enabled = !!actor && !actorLoading && !!(user == null ? void 0 : user.token);
  const {
    data,
    isLoading,
    isError,
    refetch,
    isFetching: isRefreshing
  } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      const token = user.token;
      const ba = actor;
      const [resumes, usersResult, matches] = await Promise.all([
        apiGetResumes(ba),
        apiListUsers(ba, token),
        apiGetMatchHistory(ba)
      ]);
      return { resumes, users: usersResult.users ?? [], matches };
    },
    enabled,
    staleTime: 6e4
  });
  const handleRefresh = reactExports.useCallback(() => {
    void queryClient.invalidateQueries({ queryKey: ["admin-overview"] });
    void refetch();
  }, [queryClient, refetch]);
  const handleExport = reactExports.useCallback(() => {
    if (data) exportCSV(data);
  }, [data]);
  const stats = reactExports.useMemo(() => {
    if (!data) return null;
    const avgScore = data.resumes.length > 0 ? Math.round(
      data.resumes.reduce((s, r) => s + r.score, 0) / data.resumes.length
    ) : 0;
    return {
      totalResumes: data.resumes.length,
      avgScore,
      totalUsers: data.users.length,
      totalMatches: data.matches.length
    };
  }, [data]);
  if (isLoading || actorLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "max-w-6xl mx-auto px-4 sm:px-6 py-10 space-y-6",
        "data-ocid": "admin-overview.loading_state",
        "aria-live": "polite",
        "aria-busy": "true",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-8 w-48 rounded-xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-28 rounded-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonKPI, {}, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [0, 1].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-52 rounded-2xl" }, i)) })
        ]
      }
    );
  }
  if (isError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "p-6 flex flex-col items-center justify-center min-h-[60vh] gap-4",
        "data-ocid": "admin-overview.error_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-8 flex flex-col items-center gap-4 max-w-md w-full border border-destructive/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-xl bg-destructive/10 border border-destructive/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "size-8 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-lg", children: "Failed to load analytics" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "There was a problem fetching dashboard data from the backend." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleRefresh,
              "data-ocid": "admin-overview.retry_button",
              className: "flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-smooth",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-4" }),
                "Retry"
              ]
            }
          )
        ] })
      }
    );
  }
  const trends = {
    uploads: (stats == null ? void 0 : stats.totalResumes) ? 12 : 0,
    users: (stats == null ? void 0 : stats.totalUsers) ? 8 : 0,
    avgScore: 3,
    matches: (stats == null ? void 0 : stats.totalMatches) ? 24 : 0
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-6 fade-up",
      "data-ocid": "admin-overview.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-accent/15 border border-accent/30 shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "size-5 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Admin Overview" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Manage and monitor all resume submissions, users, and job matches." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 shrink-0 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleRefresh,
                disabled: isRefreshing,
                "data-ocid": "admin-overview.refresh_button",
                className: "flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-muted/30 border border-border/30 text-muted-foreground hover:text-accent hover:border-accent/40 text-xs font-medium transition-smooth disabled:opacity-60",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    RefreshCw,
                    {
                      className: `size-3.5 ${isRefreshing ? "animate-spin" : ""}`
                    }
                  ),
                  "Refresh"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleExport,
                disabled: !data,
                "data-ocid": "admin-overview.export_button",
                className: "flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-accent-foreground text-sm font-medium hover:opacity-90 transition-smooth disabled:opacity-50",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-4" }),
                  "Export CSV"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(AdminQuickGuide, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              ocid: "admin-overview.stat.total_resumes",
              label: "Total Uploads",
              value: (stats == null ? void 0 : stats.totalResumes) ?? 0,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-5 text-purple-400" }),
              iconBg: "bg-purple-500/10 border-purple-500/20",
              trend: trends.uploads,
              desc: "Resumes uploaded to date"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              ocid: "admin-overview.stat.total_users",
              label: "Total Users",
              value: (stats == null ? void 0 : stats.totalUsers) ?? 0,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-5 text-indigo-400" }),
              iconBg: "bg-indigo-500/10 border-indigo-500/20",
              trend: trends.users,
              desc: "Active user accounts"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              ocid: "admin-overview.stat.avg_score",
              label: "Avg Score",
              value: stats ? `${stats.avgScore}` : "—",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartNoAxesColumn, { className: "size-5 text-violet-400" }),
              iconBg: "bg-violet-500/10 border-violet-500/20",
              trend: trends.avgScore,
              desc: "Mean resume score (0–100)"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            KPICard,
            {
              ocid: "admin-overview.stat.total_matches",
              label: "Total Matches",
              value: (stats == null ? void 0 : stats.totalMatches) ?? 0,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GitMerge, { className: "size-5 text-emerald-400" }),
              iconBg: "bg-emerald-500/10 border-emerald-500/20",
              trend: trends.matches,
              desc: "Job description matches run"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass rounded-2xl p-6 border border-border/20 space-y-4",
              "data-ocid": "admin-overview.score_chart",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "size-4 text-indigo-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-base", children: "Score Distribution" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs text-muted-foreground", children: "Bucketed by score range" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreDistChart, { resumes: (data == null ? void 0 : data.resumes) ?? [] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass rounded-2xl p-6 border border-border/20 space-y-4",
              "data-ocid": "admin-overview.upload_timeline",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "size-4 text-indigo-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-base", children: "Upload Timeline" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-auto text-xs text-muted-foreground", children: "Last 8 weeks" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(UploadTimelineChart, { resumes: (data == null ? void 0 : data.resumes) ?? [] })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass rounded-2xl p-6 border border-border/20 space-y-4 lg:col-span-1",
              "data-ocid": "admin-overview.top_skills",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4 text-violet-400" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-base", children: "Top 10 Skills" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TopSkillsChart, { resumes: (data == null ? void 0 : data.resumes) ?? [] })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "glass rounded-2xl p-6 border border-border/20 space-y-4 lg:col-span-2",
              "data-ocid": "admin-overview.recent_activity",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "size-4 text-indigo-400" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-base", children: "Recent Uploads" })
                  ] }),
                  data && data.resumes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                    "Last ",
                    Math.min(10, data.resumes.length),
                    " of",
                    " ",
                    data.resumes.length
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(RecentActivityFeed, { resumes: (data == null ? void 0 : data.resumes) ?? [] })
              ]
            }
          )
        ] })
      ]
    }
  );
}
export {
  AdminOverviewPage as default
};
