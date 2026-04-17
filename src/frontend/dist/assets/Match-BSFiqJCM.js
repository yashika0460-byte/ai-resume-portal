import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as Button, X, B as BrainCircuit, L as LoadingSpinner, a as useNavigate } from "./index-C0uoDo9R.js";
import { G as GlassCard, a as SkillBadge } from "./SkillBadge-DWEbqy2E.js";
import { u as useResumes, d as useMatchResume } from "./use-resumes-U5T9p0Y7.js";
import { C as ChevronLeft } from "./chevron-left-BAAQAeGr.js";
import { S as Sparkles } from "./sparkles-DVsEdvjY.js";
import { L as LoaderCircle, a as CircleCheck, C as CircleX } from "./loader-circle-CHyPsDOr.js";
import { C as CircleAlert } from "./circle-alert-BoBwFJTu.js";
import { T as TriangleAlert } from "./triangle-alert-Dr-vroVO.js";
import "./useMutation-IWYl8V_O.js";
import "./api-D_-AFWZL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M14 2v4a2 2 0 0 0 2 2h4", key: "tnqrlb" }],
  [
    "path",
    { d: "M4.268 21a2 2 0 0 0 1.727 1H18a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v3", key: "ms7g94" }
  ],
  ["path", { d: "m9 18-1.5-1.5", key: "1j6qii" }],
  ["circle", { cx: "5", cy: "14", r: "3", key: "ufru5t" }]
];
const FileSearch = createLucideIcon("file-search", __iconNode);
function getScoreColorClass(score) {
  if (score >= 70) return "text-green-400";
  if (score >= 40) return "text-yellow-400";
  return "text-red-400";
}
function getScoreBarClass(score) {
  if (score >= 70) return "bg-gradient-to-r from-green-500/80 to-green-400";
  if (score >= 40) return "bg-gradient-to-r from-yellow-500/80 to-yellow-400";
  return "bg-gradient-to-r from-red-500/80 to-red-400";
}
function getScoreBorderClass(score) {
  if (score >= 70) return "border-green-500/25";
  if (score >= 40) return "border-yellow-500/25";
  return "border-red-500/25";
}
function getScoreIcon(score) {
  if (score >= 70)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4 shrink-0 text-green-400" });
  if (score >= 40)
    return /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-4 shrink-0 text-yellow-400" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "size-4 shrink-0 text-red-400" });
}
function getScoreTierLabel(score) {
  if (score >= 70) return "Strong Match";
  if (score >= 40) return "Partial Match";
  return "Weak Match";
}
function ResultCard({ item, rank }) {
  const { resume, result } = item;
  const pct = result.matchScore;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `rounded-xl border ${getScoreBorderClass(pct)}`, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlassCard,
    {
      "data-ocid": `card-match-result-${resume.id}`,
      className: "flex flex-col gap-4 border-0",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "flex-shrink-0 w-7 h-7 rounded-full bg-muted/60 border border-border/30 flex items-center justify-center text-xs font-mono font-semibold text-muted-foreground", children: rank }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm leading-tight truncate max-w-[240px] sm:max-w-sm", children: resume.filename }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-1", children: [
                getScoreIcon(pct),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: getScoreTierLabel(pct) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-end gap-0.5 flex-shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "span",
              {
                className: `font-display font-bold text-3xl leading-none ${getScoreColorClass(pct)}`,
                children: [
                  pct,
                  "%"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "match score" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "score-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: `h-full rounded-full transition-all duration-700 ${getScoreBarClass(pct)}`,
            style: { width: `${pct}%` }
          }
        ) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium mb-2 flex items-center gap-1.5 text-green-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-dot bg-green-400" }),
              "Matched (",
              result.matchedSkills.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: result.matchedSkills.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground italic", children: "No skills matched" }) : result.matchedSkills.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillBadge, { label: s, status: "matched" }, s)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium mb-2 flex items-center gap-1.5 text-red-400", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-dot bg-red-400" }),
              "Missing (",
              result.missingSkills.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: result.missingSkills.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground italic", children: "All skills covered 🎉" }) : result.missingSkills.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillBadge, { label: s, status: "missing" }, s)) })
          ] })
        ] })
      ]
    }
  ) });
}
function EmptyNoResumes() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlassCard,
    {
      className: "flex flex-col items-center justify-center gap-4 py-16 text-center",
      "data-ocid": "empty-no-resumes",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-2xl bg-muted/30 border border-border/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileSearch, { className: "size-10 text-muted-foreground/50" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base", children: "No resumes uploaded yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5 max-w-xs", children: "Upload at least one resume before running a job match analysis." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            variant: "outline",
            className: "mt-1",
            onClick: () => navigate({ to: "/upload" }),
            "data-ocid": "btn-go-upload",
            children: "Go to Upload"
          }
        )
      ]
    }
  );
}
function EmptyMatchPrompt() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlassCard,
    {
      className: "flex flex-col items-center justify-center gap-4 py-16 text-center",
      "data-ocid": "empty-match-prompt",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-2xl bg-accent/10 border border-accent/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { className: "size-10 text-accent/60" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base", children: "Ready to match" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1.5 max-w-xs", children: [
            "Paste a job description and click",
            " ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-medium", children: "Match All Resumes" }),
            " to rank every candidate by fit."
          ] })
        ] })
      ]
    }
  );
}
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
function Match() {
  const { data: resumes = [], isLoading: resumesLoading } = useResumes();
  const { mutateAsync: matchResume } = useMatchResume();
  const [jobDescription, setJobDescription] = reactExports.useState("");
  const [results, setResults] = reactExports.useState([]);
  const [isMatching, setIsMatching] = reactExports.useState(false);
  const [matchError, setMatchError] = reactExports.useState(null);
  const [hasRun, setHasRun] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState({ done: 0, total: 0 });
  const handleMatchAll = async () => {
    if (!jobDescription.trim() || resumes.length === 0) return;
    setIsMatching(true);
    setMatchError(null);
    setResults([]);
    setHasRun(false);
    setProgress({ done: 0, total: resumes.length });
    const collected = [];
    for (const resume of resumes) {
      try {
        const result = await matchResume({
          resumeId: resume.id,
          jobDescription
        });
        collected.push({ resume, result });
      } catch (err) {
        collected.push({
          resume,
          result: { matchScore: 0, matchedSkills: [], missingSkills: [] },
          error: err instanceof Error ? err.message : "Match failed"
        });
      } finally {
        setProgress((p) => ({ ...p, done: p.done + 1 }));
      }
    }
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
  const canMatch = jobDescription.trim().length > 0 && resumes.length > 0 && !isMatching;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-6 fade-up", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => window.history.back(),
        "aria-label": "Go back",
        "data-ocid": "match.back_button",
        className: "fixed top-4 left-4 z-50 flex items-center justify-center size-9 rounded-xl bg-muted/30 border border-border/40 text-muted-foreground hover:text-accent hover:border-accent/50 hover:bg-accent/10 backdrop-blur-sm transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-5", "aria-hidden": "true" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-2xl text-foreground flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-5 text-accent" }),
          "Job Description Matching"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Paste a job description to rank all uploaded resumes by compatibility." })
      ] }),
      hasRun && !isMatching && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Button,
        {
          variant: "ghost",
          size: "sm",
          onClick: handleClear,
          className: "shrink-0 text-muted-foreground hover:text-foreground gap-1.5",
          "data-ocid": "btn-clear-results",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }),
            "Clear"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "flex flex-col gap-4", "data-ocid": "card-jd-input", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "Job Description" }),
        jobDescription.trim().length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground/60 font-mono", children: [
          jobDescription.trim().split(/\s+/).length,
          " words"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "textarea",
        {
          value: jobDescription,
          onChange: (e) => setJobDescription(e.target.value),
          placeholder: JD_PLACEHOLDER,
          rows: 10,
          className: "w-full bg-muted/30 border border-border/30 rounded-lg px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground/35 resize-y focus:outline-none focus:border-accent/50 focus:bg-muted/50 transition-smooth font-body leading-relaxed min-h-[160px]",
          "data-ocid": "input-job-description"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            onClick: handleMatchAll,
            disabled: !canMatch,
            className: "bg-accent/90 hover:bg-accent text-accent-foreground font-display font-semibold gap-2 flex-1 sm:flex-none sm:min-w-[200px]",
            "data-ocid": "btn-match-all",
            children: isMatching ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }),
              "Matching ",
              progress.done,
              "/",
              progress.total,
              "…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { className: "size-4" }),
              "Match All Resumes"
            ] })
          }
        ),
        !isMatching && resumes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          resumes.length,
          " resume",
          resumes.length !== 1 ? "s" : "",
          " will be analyzed"
        ] })
      ] }),
      isMatching && progress.total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "score-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "score-bar-fill transition-all duration-500",
          style: {
            width: `${Math.round(progress.done / progress.total * 100)}%`
          }
        }
      ) })
    ] }),
    matchError && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "glass rounded-xl p-4 flex items-start gap-3 border-destructive/30 bg-destructive/10",
        "data-ocid": "match-error",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "size-5 text-destructive shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: matchError })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
      isMatching && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GlassCard,
        {
          className: "flex flex-col items-center gap-4 py-12",
          "data-ocid": "matching-loading",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg", label: "Analyzing resumes with AI…" }),
            progress.total > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground font-mono", children: [
              progress.done,
              " / ",
              progress.total,
              " processed"
            ] })
          ]
        }
      ),
      resumesLoading && !isMatching && /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassCard,
        {
          className: "flex items-center justify-center py-10",
          "data-ocid": "resumes-loading",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md", label: "Loading resumes…" })
        }
      ),
      !resumesLoading && resumes.length === 0 && !isMatching && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyNoResumes, {}),
      !resumesLoading && resumes.length > 0 && !hasRun && !isMatching && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyMatchPrompt, {}),
      hasRun && !isMatching && results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
            results.length,
            " result",
            results.length !== 1 ? "s" : "",
            " — sorted by match score"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 ml-auto text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-dot bg-green-400" }),
              results.filter((r) => r.result.matchScore >= 70).length,
              " ",
              "strong"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-dot bg-yellow-400" }),
              results.filter(
                (r) => r.result.matchScore >= 40 && r.result.matchScore < 70
              ).length,
              " ",
              "partial"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-dot bg-red-400" }),
              results.filter((r) => r.result.matchScore < 40).length,
              " weak"
            ] })
          ] })
        ] }),
        results.map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(ResultCard, { item, rank: i + 1 }, item.resume.id))
      ] })
    ] })
  ] });
}
export {
  Match as default
};
