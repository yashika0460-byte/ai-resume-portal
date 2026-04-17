import { c as createLucideIcon, u as useAuth, j as jsxRuntimeExports, l as Link } from "./index-C0uoDo9R.js";
import { G as GlassCard, a as SkillBadge } from "./SkillBadge-DWEbqy2E.js";
import { e as useUserResumes } from "./use-resumes-U5T9p0Y7.js";
import { C as ChevronLeft } from "./chevron-left-BAAQAeGr.js";
import { H as History } from "./history-dvU4uN14.js";
import { D as Download } from "./download-DDcVfCS6.js";
import { F as FileText } from "./file-text-Dz7WucPQ.js";
import { S as Sparkles } from "./sparkles-DVsEdvjY.js";
import { C as CloudUpload } from "./cloud-upload-CgwrCyJi.js";
import { C as Calendar } from "./calendar-qaMcXeH-.js";
import "./useMutation-IWYl8V_O.js";
import "./api-D_-AFWZL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M7 7h10v10", key: "1tivn9" }],
  ["path", { d: "M7 17 17 7", key: "1vkiza" }]
];
const ArrowUpRight = createLucideIcon("arrow-up-right", __iconNode);
function getScoreTier(score) {
  if (score >= 80)
    return {
      label: "Excellent",
      color: "text-accent",
      barColor: "from-accent to-primary"
    };
  if (score >= 50)
    return {
      label: "Good",
      color: "text-primary",
      barColor: "from-primary to-primary/60"
    };
  return {
    label: "Fair",
    color: "text-muted-foreground",
    barColor: "from-muted-foreground/60 to-muted-foreground/30"
  };
}
function exportToCsv(resumes, email) {
  const rows = [
    ["Filename", "Upload Date", "Score", "Skills"],
    ...resumes.map((r) => [
      `"${r.filename}"`,
      `"${new Date(r.uploadDate).toLocaleString()}"`,
      String(r.score),
      `"${r.skills.join(", ")}"`
    ])
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
function ResumeHistoryCard({
  resume,
  index
}) {
  const tier = getScoreTier(resume.score);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlassCard,
    {
      className: "flex flex-col gap-4 border-border/20 hover:border-accent/25 transition-smooth",
      "data-ocid": `resume-card-${index}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-muted/30 border border-border/20 shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm truncate", children: resume.filename }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "size-3 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: new Date(resume.uploadDate).toLocaleDateString(void 0, {
                year: "numeric",
                month: "short",
                day: "numeric"
              }) })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 flex flex-col items-end gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: `font-mono font-bold text-lg leading-none ${tier.color}`,
                children: resume.score
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/70", children: "/100" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-medium mt-0.5 ${tier.color}`, children: tier.label })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "score-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-full rounded-full bg-gradient-to-r ${tier.barColor} transition-all duration-700`,
            style: { width: `${resume.score}%` }
          }
        ) }),
        resume.skills.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-muted-foreground/70 uppercase tracking-wide mb-2", children: [
            "Skills (",
            resume.skills.length,
            ")"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: resume.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillBadge, { label: skill, status: "matched" }, skill)) })
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/50 italic", children: "No skills extracted" })
      ]
    }
  );
}
function SkeletonCard() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl p-5 flex flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-9 h-9 rounded-xl shimmer" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3.5 w-2/3 rounded shimmer" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-1/3 rounded shimmer" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-10 h-10 rounded shimmer" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-1.5 rounded-full shimmer" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1.5 flex-wrap", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-6 w-16 rounded-full shimmer" }, i)) })
  ] });
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center gap-5 py-16 text-center",
      "data-ocid": "profile-empty-state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-5 rounded-2xl bg-accent/10 border border-accent/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "size-10 text-accent/60" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-lg", children: "No resumes uploaded yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5 max-w-xs", children: "Upload your first resume to get started! Your analysis history will appear here." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/upload", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent text-accent-foreground font-display font-semibold text-sm hover:bg-accent/90 transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            "data-ocid": "btn-go-upload-from-empty",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "size-4" }),
              "Upload a resume",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-4" })
            ]
          }
        ) })
      ]
    }
  );
}
function ProfilePage() {
  const { user } = useAuth();
  const { data: resumes = [], isLoading, isError } = useUserResumes();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-6 fade-up", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/upload",
        "aria-label": "Back to upload",
        "data-ocid": "btn-back-to-upload",
        className: "fixed top-4 left-4 z-50 flex items-center justify-center size-9 rounded-xl bg-muted/30 border border-border/40 text-muted-foreground hover:text-accent hover:border-accent/50 hover:bg-accent/10 backdrop-blur-sm transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-5", "aria-hidden": "true" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-accent/15 border border-accent/30 shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "size-5 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "My Resume History" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm mt-1", children: [
            (user == null ? void 0 : user.email) && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-xs", children: user.email }),
            !isLoading && resumes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-2 text-muted-foreground/60", children: [
              "· ",
              resumes.length,
              " resume",
              resumes.length !== 1 ? "s" : ""
            ] })
          ] })
        ] })
      ] }),
      !isLoading && resumes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => exportToCsv(resumes, (user == null ? void 0 : user.email) ?? "user"),
          className: "flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-muted/30 border border-border/30 text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/8 text-xs font-medium transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 shrink-0",
          "data-ocid": "btn-export-csv",
          "aria-label": "Export resume history as CSV",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-3.5" }),
            "Export CSV"
          ]
        }
      )
    ] }),
    !isLoading && resumes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-3 gap-3", children: [
      {
        label: "Total",
        value: resumes.length,
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-3.5 text-primary" })
      },
      {
        label: "Avg. Score",
        value: Math.round(
          resumes.reduce((s, r) => s + r.score, 0) / resumes.length
        ),
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3.5 text-accent" })
      },
      {
        label: "Best Score",
        value: Math.max(...resumes.map((r) => r.score)),
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3.5 text-accent" })
      }
    ].map(({ label, value, icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      GlassCard,
      {
        className: "flex flex-col gap-1 py-3 px-4 border-border/15",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
            icon,
            label
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-mono font-bold text-xl text-foreground", children: value })
        ]
      },
      label
    )) }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonCard, {}, i)) }) : isError ? /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "glass rounded-xl px-5 py-4 border border-destructive/25 bg-destructive/5 text-sm text-destructive",
        "data-ocid": "profile-error",
        children: "Failed to load resume history. Please refresh the page."
      }
    ) : resumes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", "data-ocid": "resume-history-list", children: resumes.map((resume, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(ResumeHistoryCard, { resume, index }, resume.id)) }),
    !isLoading && resumes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl px-5 py-4 flex items-center justify-between gap-4 border border-border/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/15 border border-primary/25 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CloudUpload, { className: "size-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Upload another resume" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Analyse a new CV and compare scores" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/upload", className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          className: "flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-accent text-accent-foreground text-xs font-display font-semibold hover:bg-accent/90 transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 whitespace-nowrap",
          "data-ocid": "btn-upload-more",
          children: [
            "Upload",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpRight, { className: "size-3.5" })
          ]
        }
      ) })
    ] })
  ] });
}
export {
  ProfilePage as default
};
