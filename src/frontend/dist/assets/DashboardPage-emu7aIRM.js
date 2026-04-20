import { u as useAuth, r as reactExports, j as jsxRuntimeExports, C as ChevronLeft, b as Button, f as Link, L as LoadingSpinner, S as Skeleton, d as useActor, U as User, e as createActor } from "./index-BW0DBoAl.js";
import { G as GlassCard, S as StatCard } from "./GlassCard-CqZihfXf.js";
import { S as SkillBadge, a as ScoreBadge } from "./SkillBadge-DrKZNeA8.js";
import { u as useResumes, a as useMatchHistory, b as useDeleteResume } from "./use-resumes-BkByy20o.js";
import { c as apiListUsers, d as apiDeleteUser } from "./api-D_-AFWZL.js";
import { L as LayoutDashboard } from "./layout-dashboard-BPG7NZXq.js";
import { D as Download } from "./download-DJwlZCMW.js";
import { F as FileText } from "./file-text-BdAYUBQk.js";
import { T as TrendingUp } from "./trending-up-rLFaq9sj.js";
import { U as Users } from "./users-BKF81TpZ.js";
import { g as generateCategoricalChart, B as Bar, X as XAxis, Y as YAxis, f as formatAxisMap, C as CloudUpload, R as ResponsiveContainer, a as CartesianGrid, T as Tooltip, b as Cell } from "./generateCategoricalChart-DKQlU1BF.js";
import { T as Target } from "./target-B5jH6OHt.js";
import { S as Search } from "./search-CnM-Bvfc.js";
import { T as Trash2 } from "./trash-2-DbtB38ng.js";
import { C as ChartColumn } from "./chart-column-CCmZYNnb.js";
import { T as TriangleAlert } from "./triangle-alert-BGl_J52Y.js";
import { S as Shield } from "./shield-Bee9K8zZ.js";
import "./useMutation-DJ2_JvTs.js";
var BarChart = generateCategoricalChart({
  chartName: "BarChart",
  GraphicalChild: Bar,
  defaultTooltipEventType: "axis",
  validateTooltipEventTypes: ["axis", "item"],
  axisComponents: [{
    axisType: "xAxis",
    AxisComp: XAxis
  }, {
    axisType: "yAxis",
    AxisComp: YAxis
  }],
  formatAxisMap
});
function getScoreColor(score) {
  if (score >= 70) return "oklch(0.62 0.22 151)";
  if (score >= 40) return "oklch(0.72 0.16 79)";
  return "oklch(0.62 0.22 22)";
}
function getScoreClass(score) {
  if (score >= 70) return "text-emerald-400";
  if (score >= 40) return "text-amber-400";
  return "text-red-400";
}
function formatDate(iso) {
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  } catch {
    return "—";
  }
}
function truncateFilename(name, max = 22) {
  if (name.length <= max) return name;
  const ext = name.lastIndexOf(".");
  if (ext > 0) return `${name.slice(0, max - 4)}…${name.slice(ext)}`;
  return `${name.slice(0, max - 1)}…`;
}
function exportToCSV(resumes) {
  const sorted = [...resumes].sort((a2, b) => b.score - a2.score);
  const header = ["Rank", "Filename", "Score", "Skills", "Upload Date"];
  const rows = sorted.map((r, idx) => [
    String(idx + 1),
    `"${r.filename.replace(/"/g, '""')}"`,
    String(r.score),
    `"${r.skills.join(", ")}"`,
    `"${formatDate(r.uploadDate)}"`
  ]);
  const csv = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `resumes-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
function ConfirmDelete({
  resume,
  onConfirm,
  onCancel,
  isPending
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlassCard,
    {
      className: "max-w-sm w-full mx-4 flex flex-col gap-5",
      "data-ocid": "confirm-delete-modal",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "Delete Resume?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium", children: resume.filename }),
          " ",
          "will be permanently removed along with its match history."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              onClick: onCancel,
              disabled: isPending,
              "data-ocid": "confirm-delete-cancel",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "destructive",
              onClick: onConfirm,
              disabled: isPending,
              "data-ocid": "confirm-delete-confirm",
              children: isPending ? "Deleting…" : "Delete"
            }
          )
        ] })
      ]
    }
  ) });
}
function ChartTooltip({
  active,
  payload
}) {
  if (!active || !(payload == null ? void 0 : payload.length)) return null;
  const item = payload[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-lg px-3 py-2 text-sm border border-border/30", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate max-w-[180px]", children: item.payload.filename }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-accent font-mono font-semibold", children: [
      "Score: ",
      item.value
    ] })
  ] });
}
function StatsBar({ resumes }) {
  const total = resumes.length;
  const avg = total ? Math.round(resumes.reduce((s, r) => s + r.score, 0) / total) : 0;
  const top = total ? Math.max(...resumes.map((r) => r.score)) : 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatCard,
      {
        label: "Total Resumes",
        value: total,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-4" }),
        "data-ocid": "stat-total"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatCard,
      {
        label: "Average Score",
        value: `${avg}`,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-4" }),
        "data-ocid": "stat-avg"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      StatCard,
      {
        label: "Top Score",
        value: `${top}`,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "size-4" }),
        "data-ocid": "stat-top"
      }
    )
  ] });
}
function ScoreChart({ resumes }) {
  const data = [...resumes].sort((a, b) => b.score - a.score).slice(0, 12).map((r) => ({ filename: r.filename, score: r.score }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { "data-ocid": "score-chart", className: "flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartColumn, { className: "size-4 text-indigo-400" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-foreground text-lg", children: "Resume Score Distribution" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResponsiveContainer, { width: "100%", height: 220, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      BarChart,
      {
        data,
        margin: { top: 4, right: 8, left: -16, bottom: 0 },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CartesianGrid,
            {
              strokeDasharray: "3 3",
              stroke: "oklch(0.20 0.012 264 / 0.5)",
              vertical: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            XAxis,
            {
              dataKey: "filename",
              tickFormatter: (v) => truncateFilename(v, 10),
              tick: {
                fill: "oklch(0.62 0.02 264)",
                fontSize: 11,
                fontFamily: "var(--font-mono)"
              },
              axisLine: false,
              tickLine: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            YAxis,
            {
              domain: [0, 100],
              tick: {
                fill: "oklch(0.62 0.02 264)",
                fontSize: 11,
                fontFamily: "var(--font-mono)"
              },
              axisLine: false,
              tickLine: false
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Tooltip,
            {
              content: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltip, {}),
              cursor: { fill: "oklch(0.53 0.22 264 / 0.08)" }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { dataKey: "score", radius: [4, 4, 0, 0], children: data.map((entry) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            Cell,
            {
              fill: getScoreColor(entry.score),
              fillOpacity: 0.85
            },
            `cell-${entry.filename}`
          )) })
        ]
      }
    ) })
  ] });
}
function DashboardEmpty() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlassCard,
    {
      className: "flex flex-col items-center justify-center py-20 gap-5 text-center",
      "data-ocid": "dashboard-empty-state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 rounded-2xl bg-accent/10 border border-accent/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "size-12 text-accent/70" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-1 -right-1 w-4 h-4 rounded-full bg-accent/30 animate-pulse" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-xl text-foreground", children: "No resumes uploaded yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-2 leading-relaxed", children: "Upload your first candidate resume and the AI will extract skills, compute a match score, and populate this dashboard." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3 mt-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "empty-upload-cta", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/upload", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "size-4" }),
            "Upload First Resume"
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", "data-ocid": "empty-match-cta", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/match", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "size-4" }),
            "Try Job Matching"
          ] }) })
        ] })
      ]
    }
  );
}
const SCORE_TIERS = [
  { key: "all", label: "All", className: "" },
  { key: "high", label: "High (70+)", className: "text-emerald-400" },
  { key: "medium", label: "Medium (40–69)", className: "text-amber-400" },
  { key: "low", label: "Low (<40)", className: "text-red-400" }
];
function matchesTier(score, tier) {
  if (tier === "high") return score >= 70;
  if (tier === "medium") return score >= 40 && score < 70;
  if (tier === "low") return score < 40;
  return true;
}
function ResumeTable({
  resumes,
  onDelete
}) {
  const [search, setSearch] = reactExports.useState("");
  const [tier, setTier] = reactExports.useState("all");
  const sorted = [...resumes].sort((a, b) => b.score - a.score);
  const filtered = sorted.filter(
    (r) => r.filename.toLowerCase().includes(search.toLowerCase()) && matchesTier(r.score, tier)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "overflow-hidden p-0", "data-ocid": "resume-table", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 flex flex-col sm:flex-row gap-3 border-b border-border/20 bg-muted/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search by filename…",
            className: "w-full bg-muted/20 border border-border/30 rounded-lg pl-8 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 transition-colors duration-200",
            "data-ocid": "filter-search"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1 shrink-0", children: SCORE_TIERS.map(({ key, label, className }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: () => setTier(key),
          "data-ocid": `filter-tier-${key}`,
          className: `px-3 py-2 rounded-lg text-xs font-medium transition-colors duration-200 border ${tier === key ? "bg-accent/15 border-accent/30 text-accent" : `border-border/30 text-muted-foreground hover:bg-muted/40 hover:text-foreground ${className}`}`,
          children: label
        },
        key
      )) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/20 bg-muted/30", children: ["#", "Filename", "Score", "Skills", "Actions"].map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "px-4 py-3.5 text-left text-xs font-semibold font-display uppercase tracking-wider text-muted-foreground",
          children: col
        },
        col
      )) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 5, className: "px-4 py-10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No resumes match your filter." }) }) }) : filtered.map((resume, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "tr",
        {
          className: "border-b border-border/10 hover:bg-muted/10 transition-colors",
          "data-ocid": `resume-row-${idx}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 w-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-mono text-xs", children: idx + 1 }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 min-w-[160px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-3.5 text-indigo-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-foreground truncate max-w-[200px]", children: resume.filename }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: formatDate(resume.uploadDate) })
              ] })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 w-32", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `font-mono font-bold text-base ${getScoreClass(resume.score)}`,
                  children: resume.score
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 w-20 rounded-full bg-muted/30 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "h-full rounded-full transition-all duration-700",
                  style: {
                    width: `${Math.min(resume.score, 100)}%`,
                    background: getScoreColor(resume.score)
                  }
                }
              ) })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 max-w-[280px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
              resume.skills.slice(0, 5).map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillBadge, { label: skill }, skill)),
              resume.skills.length > 5 && /* @__PURE__ */ jsxRuntimeExports.jsx(
                SkillBadge,
                {
                  label: `+${resume.skills.length - 5}`,
                  status: "primary"
                }
              )
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 w-28", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              resume.fileUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  asChild: true,
                  className: "size-8 text-accent hover:bg-accent/10",
                  "data-ocid": `download-btn-${idx}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "a",
                    {
                      href: resume.fileUrl,
                      download: resume.filename,
                      "aria-label": "Download resume",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-4" })
                    }
                  )
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
                  onClick: () => onDelete(resume),
                  "data-ocid": `delete-btn-${idx}`,
                  "aria-label": "Delete resume",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" })
                }
              )
            ] }) })
          ]
        },
        resume.id
      )) })
    ] }) })
  ] });
}
function MatchHistorySection({ matches }) {
  if (matches.length === 0) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      GlassCard,
      {
        className: "flex flex-col items-center justify-center py-10 gap-3",
        "data-ocid": "match-history-empty",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "size-8 text-muted-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "No match results yet. Run a job description match to see history here." })
        ]
      }
    );
  }
  const sorted = [...matches].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(GlassCard, { className: "overflow-hidden p-0", "data-ocid": "match-history-table", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/20 bg-muted/30", children: ["Resume", "Match Score", "Matched Skills", "Date"].map(
      (col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "th",
        {
          className: "px-4 py-3.5 text-left text-xs font-semibold font-display uppercase tracking-wider text-muted-foreground",
          children: col
        },
        col
      )
    ) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: sorted.map((match, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "tr",
      {
        className: "border-b border-border/10 hover:bg-muted/10 transition-colors",
        "data-ocid": `match-row-${idx}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 max-w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate block", children: match.resumeName }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 w-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreBadge, { score: match.matchScore }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 max-w-[280px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
            match.matchedSkills.slice(0, 4).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillBadge, { label: s, status: "matched" }, s)),
            match.matchedSkills.length > 4 && /* @__PURE__ */ jsxRuntimeExports.jsx(
              SkillBadge,
              {
                label: `+${match.matchedSkills.length - 4}`
              }
            )
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 w-36", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: formatDate(match.createdAt) }) })
        ]
      },
      match.id
    )) })
  ] }) }) });
}
function DashboardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24" }, i)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-64" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72" })
  ] });
}
function TabButton({
  active,
  onClick,
  icon,
  label,
  ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "button",
    {
      type: "button",
      onClick,
      "data-ocid": ocid,
      className: `flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 border ${active ? "bg-indigo-500/15 border-indigo-500/30 text-indigo-300" : "border-border/30 text-muted-foreground hover:bg-muted/40 hover:text-foreground"}`,
      children: [
        icon,
        label
      ]
    }
  );
}
function ConfirmDeleteUser({
  userEmail,
  onConfirm,
  onCancel,
  isPending
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlassCard,
    {
      className: "max-w-sm w-full mx-4 flex flex-col gap-5",
      "data-ocid": "confirm-delete-user-modal",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-destructive", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "Delete User?" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground leading-relaxed", children: [
          "Are you sure you want to delete",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground font-medium break-all", children: userEmail }),
          "? This cannot be undone."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              onClick: onCancel,
              disabled: isPending,
              "data-ocid": "confirm-delete-user-cancel",
              children: "Cancel"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "destructive",
              onClick: onConfirm,
              disabled: isPending,
              "data-ocid": "confirm-delete-user-confirm",
              children: isPending ? "Deleting…" : "Delete"
            }
          )
        ] })
      ]
    }
  ) });
}
function UsersTab({
  token,
  currentUserEmail
}) {
  const { actor: rawActor } = useActor(createActor);
  const actor = rawActor;
  const [users, setUsers] = reactExports.useState([]);
  const [isLoading, setIsLoading] = reactExports.useState(true);
  const [error, setError] = reactExports.useState(null);
  const [search, setSearch] = reactExports.useState("");
  const [pendingDelete, setPendingDelete] = reactExports.useState(null);
  const [isDeleting, setIsDeleting] = reactExports.useState(false);
  const fetchUsers = reactExports.useCallback(async () => {
    if (!actor) return;
    setIsLoading(true);
    setError(null);
    const result = await apiListUsers(actor, token);
    if (result.success && result.users) setUsers(result.users);
    else setError(result.error ?? "Failed to load users");
    setIsLoading(false);
  }, [actor, token]);
  reactExports.useEffect(() => {
    void fetchUsers();
  }, [fetchUsers]);
  const handleDeleteConfirm = async () => {
    if (!pendingDelete || !actor) return;
    setIsDeleting(true);
    const result = await apiDeleteUser(actor, token, pendingDelete);
    if (result.success)
      setUsers((prev) => prev.filter((u) => u.email !== pendingDelete));
    else setError(result.error ?? "Failed to delete user");
    setIsDeleting(false);
    setPendingDelete(null);
  };
  const filtered = users.filter(
    (u) => u.email.toLowerCase().includes(search.toLowerCase())
  );
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-72" })
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", "data-ocid": "users-tab", children: [
    error && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-4 py-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-4 shrink-0" }),
      error
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "overflow-hidden p-0", "data-ocid": "users-table", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-b border-border/20 bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "text",
            value: search,
            onChange: (e) => setSearch(e.target.value),
            placeholder: "Search by email…",
            className: "w-full bg-muted/20 border border-border/30 rounded-lg pl-8 pr-3 py-2 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-accent/50 transition-colors duration-200",
            "data-ocid": "users-search"
          }
        )
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "overflow-x-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { className: "w-full text-sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { className: "border-b border-border/20 bg-muted/30", children: ["Email", "Role", "Date Joined", "Actions"].map((col) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "th",
          {
            className: "px-4 py-3.5 text-left text-xs font-semibold font-display uppercase tracking-wider text-muted-foreground",
            children: col
          },
          col
        )) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: filtered.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("tr", { children: /* @__PURE__ */ jsxRuntimeExports.jsx("td", { colSpan: 4, className: "px-4 py-14 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex flex-col items-center gap-3",
            "data-ocid": "users-empty-state",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-8 text-muted-foreground/50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: search ? "No users match your search." : "No users found." })
            ]
          }
        ) }) }) : filtered.map((u, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "tr",
          {
            className: "border-b border-border/10 hover:bg-muted/10 transition-colors",
            "data-ocid": `user-row-${idx}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 min-w-[200px]", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/20 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-3.5 text-indigo-400" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground truncate max-w-[240px]", children: u.email })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 w-28", children: u.role === "admin" ? /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 border border-indigo-500/25 text-indigo-300", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-3" }),
                "Admin"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-500/10 border border-slate-500/25 text-slate-400", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-3" }),
                "User"
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 w-36", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: formatDate(u.createdAt) }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("td", { className: "px-4 py-3.5 w-20", children: u.email.toLowerCase() !== currentUserEmail.toLowerCase() ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "ghost",
                  size: "icon",
                  className: "size-8 text-muted-foreground hover:bg-destructive/10 hover:text-destructive",
                  onClick: () => setPendingDelete(u.email),
                  "data-ocid": `delete-user-btn-${idx}`,
                  "aria-label": `Delete user ${u.email}`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" })
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/40 px-2", children: "You" }) })
            ]
          },
          u.email
        )) })
      ] }) })
    ] }),
    pendingDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(
      ConfirmDeleteUser,
      {
        userEmail: pendingDelete,
        onConfirm: handleDeleteConfirm,
        onCancel: () => setPendingDelete(null),
        isPending: isDeleting
      }
    )
  ] });
}
function DashboardPage() {
  const { data: resumes = [], isLoading: resumesLoading } = useResumes();
  const { data: matches = [], isLoading: matchesLoading } = useMatchHistory();
  const deleteMutation = useDeleteResume();
  const { user } = useAuth();
  const [activeTab, setActiveTab] = reactExports.useState("resumes");
  const [pendingDelete, setPendingDelete] = reactExports.useState(null);
  const handleDeleteClick = (resume) => setPendingDelete(resume);
  const handleDeleteConfirm = () => {
    if (!pendingDelete) return;
    deleteMutation.mutate(pendingDelete.id, {
      onSuccess: () => setPendingDelete(null),
      onError: () => setPendingDelete(null)
    });
  };
  const isLoading = resumesLoading || matchesLoading;
  const hasResumes = resumes.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "min-h-screen gradient-flow bg-grid-pattern",
      "data-ocid": "dashboard-page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => window.history.back(),
            "aria-label": "Go back",
            "data-ocid": "btn-back",
            className: "fixed top-4 left-4 z-50 flex items-center justify-center size-9 rounded-xl bg-muted/30 border border-border/40 text-muted-foreground hover:text-accent hover:border-accent/50 hover:bg-accent/10 backdrop-blur-sm transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-5", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4 fade-up", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "size-5 text-indigo-400" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Admin Dashboard" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "AI Resume Screening Portal" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              hasResumes && activeTab !== "users" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Button,
                {
                  variant: "outline",
                  size: "sm",
                  onClick: () => exportToCSV(resumes),
                  "data-ocid": "btn-export-csv",
                  className: "hidden sm:flex gap-2 border-border/40 hover:border-accent/40 hover:text-accent",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-4" }),
                    "Export CSV"
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, "data-ocid": "upload-cta", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/upload", children: "+ Upload Resume" }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex gap-2 flex-wrap fade-up",
              style: { animationDelay: "0.03s" },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabButton,
                  {
                    active: activeTab === "resumes",
                    onClick: () => setActiveTab("resumes"),
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-4" }),
                    label: "Resumes",
                    ocid: "tab-resumes"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabButton,
                  {
                    active: activeTab === "analytics",
                    onClick: () => setActiveTab("analytics"),
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-4" }),
                    label: "Analytics",
                    ocid: "tab-analytics"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  TabButton,
                  {
                    active: activeTab === "users",
                    onClick: () => setActiveTab("users"),
                    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-4" }),
                    label: "Users",
                    ocid: "tab-users"
                  }
                )
              ]
            }
          ),
          activeTab === "resumes" && (isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardSkeleton, {}) : !hasResumes ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fade-up", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardEmpty, {}) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "fade-up", style: { animationDelay: "0.05s" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatsBar, { resumes }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "section",
              {
                className: "fade-up flex flex-col gap-3",
                style: { animationDelay: "0.1s" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-3", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("h2", { className: "font-display font-semibold text-lg text-foreground", children: [
                      "All Resumes",
                      " ",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-2 text-xs font-normal text-muted-foreground font-body", children: "sorted by score" })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        variant: "outline",
                        size: "sm",
                        onClick: () => exportToCSV(resumes),
                        "data-ocid": "btn-export-csv-mobile",
                        className: "sm:hidden flex gap-2 border-border/40",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-4" }),
                          "CSV"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ResumeTable, { resumes, onDelete: handleDeleteClick })
                ]
              }
            )
          ] })),
          activeTab === "analytics" && (isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardSkeleton, {}) : !hasResumes ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fade-up", children: /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardEmpty, {}) }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "fade-up", style: { animationDelay: "0.05s" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatsBar, { resumes }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "fade-up", style: { animationDelay: "0.1s" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreChart, { resumes }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "section",
              {
                className: "fade-up flex flex-col gap-3",
                style: { animationDelay: "0.15s" },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-lg text-foreground", children: "Match History" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(MatchHistorySection, { matches })
                ]
              }
            )
          ] })),
          activeTab === "users" && user && /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "fade-up", style: { animationDelay: "0.05s" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(UsersTab, { token: user.token, currentUserEmail: user.email }) }),
          deleteMutation.isPending && !pendingDelete && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed inset-0 z-40 flex items-center justify-center bg-foreground/20 backdrop-blur-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Deleting resume…" }) })
        ] }),
        pendingDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ConfirmDelete,
          {
            resume: pendingDelete,
            onConfirm: handleDeleteConfirm,
            onCancel: () => setPendingDelete(null),
            isPending: deleteMutation.isPending
          }
        )
      ]
    }
  );
}
export {
  DashboardPage as default
};
