import { c as createLucideIcon, d as useActor, u as useAuth, q as useQueryClient, s as useQuery, r as reactExports, j as jsxRuntimeExports, Z as Zap, e as createActor } from "./index-C0uoDo9R.js";
import { f as apiGetResumes, c as apiListUsers, g as apiGetMatchHistory } from "./api-D_-AFWZL.js";
import { C as CircleAlert } from "./circle-alert-BoBwFJTu.js";
import { R as RefreshCw } from "./refresh-cw-DUtTkOjD.js";
import { D as Download } from "./download-DDcVfCS6.js";
import { B as Briefcase } from "./briefcase-B2ZtkQMR.js";
import { U as Users } from "./users-sZU7Bq5d.js";
import { T as TrendingUp } from "./trending-up-BMrGIpe7.js";
import { A as Activity } from "./activity-BcyXHvVH.js";
import { S as Sparkles } from "./sparkles-DVsEdvjY.js";
import { U as UserCog } from "./user-cog-wWPQ5itw.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
  ["path", { d: "M18 17V9", key: "2bz60n" }],
  ["path", { d: "M13 17V5", key: "1frdt8" }],
  ["path", { d: "M8 17v-3", key: "17ska0" }]
];
const ChartColumn = createLucideIcon("chart-column", __iconNode);
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
    for (const sk of r.skills) {
      skillCounts[sk] = (skillCounts[sk] ?? 0) + 1;
    }
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
    ...topSkills.map(([sk, ct]) => `${sk},${ct}`),
    "",
    "Recent Uploads",
    "Filename,Score,Skills,Upload Date",
    ...data.resumes.slice(0, 10).map(
      (r) => `"${r.filename}",${r.score},"${r.skills.join("; ")}",${new Date(r.uploadDate).toLocaleDateString()}`
    )
  ];
  const blob = new Blob([lines.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `admin-analytics-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
const ADMIN_GUIDE_STEPS = [
  {
    step: "1",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "size-4 text-accent" }),
    title: "Review Candidates",
    desc: "View all uploaded resumes, scores, and skill breakdowns in the Candidates tab."
  },
  {
    step: "2",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-4 text-accent" }),
    title: "Match Jobs",
    desc: "Run job description matching across all resumes and see compatibility scores."
  },
  {
    step: "3",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCog, { className: "size-4 text-accent" }),
    title: "Manage Users",
    desc: "View, search, filter, and delete registered user accounts from User Management."
  }
];
function AdminQuickGuide() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass rounded-2xl p-5 border border-accent/10 flex flex-col gap-5",
      "data-ocid": "admin-quick-guide",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-accent/15 border border-accent/25", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: "Admin Quick Guide" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Three things to do from this portal" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-4", children: ADMIN_GUIDE_STEPS.map(({ step, icon, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-xs font-mono font-bold text-accent", children: step }),
            step !== "3" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-px bg-accent/15 hidden sm:block" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
              icon,
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: desc })
          ] })
        ] }, step)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pt-1 border-t border-border/15 flex flex-wrap gap-4 text-xs text-muted-foreground/60", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent/50" }),
            "Real-time data"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent/50" }),
            "CSV export"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent/50" }),
            "Bulk actions"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent/50" }),
            "Admin-only access"
          ] })
        ] })
      ]
    }
  );
}
function SkeletonCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5 border border-border/20 space-y-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-3 w-24 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-9 w-9 rounded-lg" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-9 w-16 rounded-md" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-3 w-32 rounded-full" })
  ] });
}
function SkeletonChart() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6 border border-border/20 space-y-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-4 w-40 rounded-full" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-40 rounded-xl" })
  ] });
}
function StatCard({ label, value, icon, desc, accent, ocid }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": ocid,
      className: `glass glass-hover rounded-2xl p-5 flex flex-col gap-3 border transition-smooth ${accent ? "border-accent/30 shadow-[0_0_24px_oklch(0.52_0.18_198/0.1)]" : "border-border/20"}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-widest", children: label }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `p-2 rounded-lg border ${accent ? "bg-accent/15 border-accent/30" : "bg-muted/30 border-border/20"}`,
              children: icon
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display text-3xl font-bold text-foreground", children: value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: desc })
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
  const W = 320;
  const H = 120;
  const barW = 44;
  const gap = 16;
  const totalBarsWidth = buckets.length * barW + (buckets.length - 1) * gap;
  const offsetX = (W - totalBarsWidth) / 2;
  if (resumes.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-40 flex items-center justify-center rounded-xl bg-muted/20 border border-border/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No resumes yet — upload some candidates to see the distribution." }) });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: W,
      height: H + 36,
      viewBox: `0 0 ${W} ${H + 36}`,
      className: "mx-auto",
      "aria-label": "Score distribution bar chart",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Score distribution bar chart" }),
        buckets.map((b, i) => {
          const barH = maxCount > 0 ? Math.max(b.count / maxCount * H, 2) : 2;
          const x = offsetX + i * (barW + gap);
          const y = H - barH;
          const isHighest = b.count === maxCount && b.count > 0;
          return /* @__PURE__ */ jsxRuntimeExports.jsxs("g", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "rect",
              {
                x,
                y,
                width: barW,
                height: barH,
                rx: 6,
                fill: isHighest ? "#52b8a8" : "#6e7dd4",
                className: "transition-all duration-500"
              }
            ),
            b.count > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                x: x + barW / 2,
                y: y - 5,
                textAnchor: "middle",
                fontSize: "11",
                fontWeight: "600",
                fill: "#1e2a3a",
                children: b.count
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "text",
              {
                x: x + barW / 2,
                y: H + 18,
                textAnchor: "middle",
                fontSize: "10",
                fill: "#7a8499",
                children: b.label
              }
            )
          ] }, b.label);
        })
      ]
    }
  ) });
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
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 flex items-center justify-center rounded-xl bg-muted/20 border border-border/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Upload timeline will appear once resumes are added." }) });
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "areaGrad", x1: "0", y1: "0", x2: "0", y2: "1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "#52b8a8", stopOpacity: "0.3" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "#52b8a8", stopOpacity: "0.02" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polygon", { points: areaPoints, fill: "url(#areaGrad)" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "polyline",
          {
            points: polylinePoints,
            fill: "none",
            stroke: "#52b8a8",
            strokeWidth: "2",
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
              fill: "#52b8a8",
              stroke: "white",
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
              fill: "#7a8499",
              children: p.label
            }
          )
        ] }, weeks[i].key))
      ]
    }
  ) });
}
function TopSkillsLeaderboard({ resumes }) {
  const topSkills = reactExports.useMemo(() => {
    const counts = {};
    for (const r of resumes) {
      for (const sk of r.skills) {
        counts[sk] = (counts[sk] ?? 0) + 1;
      }
    }
    return Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 10);
  }, [resumes]);
  if (topSkills.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-32 flex items-center justify-center rounded-xl bg-muted/20 border border-border/15", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "Skill data will appear once resumes are analyzed." }) });
  }
  const maxCount = topSkills[0][1];
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: topSkills.map(([skill, count], i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 group", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground w-5 text-right shrink-0", children: i + 1 }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-medium text-foreground truncate", children: skill }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-2 shrink-0", children: count })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "score-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "score-bar-fill",
          style: { width: `${count / maxCount * 100}%` }
        }
      ) })
    ] })
  ] }, skill)) });
}
function RecentActivity({ resumes }) {
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
        className: "py-10 flex flex-col items-center gap-2 rounded-xl bg-muted/20 border border-border/15",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "size-8 text-muted-foreground/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No uploads yet." })
        ]
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto rounded-xl border border-border/15", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { className: "border-b border-border/15 bg-muted/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Filename" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-left px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden sm:table-cell", children: "Skills" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide", children: "Score" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("th", { className: "text-right px-4 py-2.5 text-xs font-semibold text-muted-foreground uppercase tracking-wide hidden md:table-cell", children: "Date" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: recent.map((r, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        "data-ocid": `admin-overview.recent_activity.item.${i + 1}`,
        className: "border-b border-border/10 last:border-0 hover:bg-muted/10 transition-colors duration-150",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 max-w-[180px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate block", children: r.filename }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 hidden sm:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
            r.skills.slice(0, 3).map((sk) => /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "text-[10px] px-1.5 py-0.5 rounded-md bg-accent/10 text-accent border border-accent/20 font-medium",
                children: sk
              },
              sk
            )),
            r.skills.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-[10px] px-1.5 py-0.5 rounded-md bg-muted/30 text-muted-foreground border border-border/20", children: [
              "+",
              r.skills.length - 3
            ] })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `font-mono font-bold text-sm ${r.score >= 70 ? "text-accent" : r.score >= 40 ? "text-primary" : "text-muted-foreground"}`,
              children: r.score
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3 text-right hidden md:table-cell", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: new Date(r.uploadDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric"
          }) }) })
        ]
      },
      r.id
    )) })
  ] }) });
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
      return {
        resumes,
        users: usersResult.users ?? [],
        matches
      };
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
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-7 w-40 rounded-md" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-4 w-56 rounded-full" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-9 w-24 rounded-lg" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-9 w-32 rounded-lg" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shimmer h-36 rounded-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4", children: [0, 1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, i)) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonChart, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonChart, {})
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-3 gap-6", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonChart, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonChart, {}) })
          ] })
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
                className: "flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-muted/30 border border-border/30 text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/8 text-xs font-medium transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 disabled:opacity-60",
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
            StatCard,
            {
              ocid: "admin-overview.stat.total_resumes",
              label: "Total Resumes",
              value: (stats == null ? void 0 : stats.totalResumes) ?? 0,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "size-5 text-primary" }),
              desc: "Resumes uploaded to date"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              ocid: "admin-overview.stat.avg_score",
              label: "Average Score",
              value: stats ? `${stats.avgScore}` : "—",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "size-5 text-accent" }),
              desc: "Mean resume score (0–100)",
              accent: true
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              ocid: "admin-overview.stat.total_users",
              label: "Registered Users",
              value: (stats == null ? void 0 : stats.totalUsers) ?? 0,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-5 text-chart-3" }),
              desc: "Active user accounts"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              ocid: "admin-overview.stat.total_matches",
              label: "Job Matches",
              value: (stats == null ? void 0 : stats.totalMatches) ?? 0,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-5 text-chart-2" }),
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "size-4 text-accent" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-base", children: "Score Distribution" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreDistChart, { resumes: (data == null ? void 0 : data.resumes) ?? [] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Resumes bucketed by score range" })
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "size-4 text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-base", children: "Upload Timeline" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(UploadTimelineChart, { resumes: (data == null ? void 0 : data.resumes) ?? [] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground text-center", children: "Uploads per week — last 8 weeks" })
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4 text-chart-3" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-base", children: "Top Skills" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(TopSkillsLeaderboard, { resumes: (data == null ? void 0 : data.resumes) ?? [] })
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
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "size-4 text-chart-2" }),
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
                /* @__PURE__ */ jsxRuntimeExports.jsx(RecentActivity, { resumes: (data == null ? void 0 : data.resumes) ?? [] })
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
