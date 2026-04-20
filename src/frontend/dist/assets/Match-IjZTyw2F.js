import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, X, B as BrainCircuit, L as LoadingSpinner, a as useNavigate } from "./index-BW0DBoAl.js";
import { G as GlassCard } from "./GlassCard-CqZihfXf.js";
import { S as SkillBadge } from "./SkillBadge-DrKZNeA8.js";
import { d as useUserResumes, a as useMatchHistory, e as useMatchResume } from "./use-resumes-BkByy20o.js";
import { S as Sparkles } from "./sparkles-D7iV9PZj.js";
import { L as LoaderCircle, C as CircleX } from "./loader-circle-DlcuGtIl.js";
import { C as CircleAlert } from "./circle-alert-Vzmw5HjG.js";
import { C as ChevronDown } from "./chevron-down-Buq2wl4V.js";
import { F as FileSearch } from "./file-search-rzrtZ7ty.js";
import { C as Calendar } from "./calendar-EyJncCHR.js";
import { C as ChevronUp } from "./chevron-up-Dj0QWSpa.js";
import "./useMutation-DJ2_JvTs.js";
import "./api-D_-AFWZL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M21.801 10A10 10 0 1 1 17 3.335", key: "yps3ct" }],
  ["path", { d: "m9 11 3 3L22 4", key: "1pflzl" }]
];
const CircleCheckBig = createLucideIcon("circle-check-big", __iconNode);
const GAUGE_R = 70;
const GAUGE_STROKE = 10;
const GAUGE_CX = GAUGE_R + GAUGE_STROKE;
const GAUGE_CIRCUMFERENCE = 2 * Math.PI * GAUGE_R;
function gaugeColor(score) {
  if (score >= 70) return "oklch(0.54 0.2 151)";
  if (score >= 40) return "oklch(0.65 0.18 79)";
  return "oklch(0.62 0.22 22)";
}
function gaugeTextColor(score) {
  if (score >= 70) return "text-emerald-400";
  if (score >= 40) return "text-amber-400";
  return "text-red-400";
}
function scoreTierLabel(score) {
  if (score >= 70) return "Strong Match";
  if (score >= 40) return "Partial Match";
  return "Weak Match";
}
function MatchGauge({ score, animated = true }) {
  const [displayed, setDisplayed] = reactExports.useState(animated ? 0 : score);
  const dashoffset = GAUGE_CIRCUMFERENCE * (1 - Math.min(displayed, 100) / 100);
  reactExports.useEffect(() => {
    if (!animated) return;
    const timeout = setTimeout(() => setDisplayed(score), 80);
    return () => clearTimeout(timeout);
  }, [score, animated]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative flex items-center justify-center",
      style: { width: GAUGE_CX * 2, height: GAUGE_CX * 2 },
      "data-ocid": "match.gauge",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            className: "absolute inset-0 -rotate-90",
            viewBox: `0 0 ${GAUGE_CX * 2} ${GAUGE_CX * 2}`,
            "aria-hidden": "true",
            role: "img",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Match score gauge" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: GAUGE_CX,
                  cy: GAUGE_CX,
                  r: GAUGE_R,
                  fill: "none",
                  stroke: "oklch(0.18 0.012 264 / 0.5)",
                  strokeWidth: GAUGE_STROKE
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: GAUGE_CX,
                  cy: GAUGE_CX,
                  r: GAUGE_R,
                  fill: "none",
                  stroke: gaugeColor(score),
                  strokeWidth: GAUGE_STROKE,
                  strokeDasharray: GAUGE_CIRCUMFERENCE,
                  strokeDashoffset: dashoffset,
                  strokeLinecap: "round",
                  style: {
                    transition: "stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)"
                  }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center gap-0.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: `font-display font-bold leading-none text-5xl ${gaugeTextColor(score)}`,
              children: score
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: "%" })
        ] })
      ]
    }
  );
}
function ResultPanel({ result, resumeName }) {
  const { matchScore, matchedSkills, missingSkills } = result;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "flex flex-col gap-6", "data-ocid": "match.result_panel", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MatchGauge, { score: matchScore, animated: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: `font-display font-semibold text-lg ${gaugeTextColor(matchScore)}`,
            children: scoreTierLabel(matchScore)
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground text-center max-w-xs truncate", children: resumeName })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border/30" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "size-4 text-emerald-400 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-emerald-400", children: [
            "Matched Skills",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 text-xs font-mono text-emerald-400/70", children: [
              "(",
              matchedSkills.length,
              ")"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 min-h-[40px]", children: matchedSkills.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground italic", children: "No skills matched" }) : matchedSkills.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border bg-emerald-500/10 text-emerald-400 border-emerald-500/25 transition-smooth hover:bg-emerald-500/20",
            children: s
          },
          s
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "size-4 text-red-400 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold text-red-400", children: [
            "Missing Skills",
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-1.5 text-xs font-mono text-red-400/70", children: [
              "(",
              missingSkills.length,
              ")"
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5 min-h-[40px]", children: missingSkills.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground italic", children: "All required skills covered 🎉" }) : missingSkills.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium border bg-red-500/10 text-red-400 border-red-500/25 transition-smooth hover:bg-red-500/20",
            children: s
          },
          s
        )) })
      ] })
    ] })
  ] });
}
function HistoryRow({ record, index }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const color = gaugeTextColor(record.matchScore);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-xl border border-border/30 overflow-hidden transition-smooth hover:border-border/50",
      "data-ocid": `match.history.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: () => setExpanded((v) => !v),
            className: "w-full flex items-center gap-3 px-4 py-3 text-left bg-muted/10 hover:bg-muted/20 transition-smooth",
            "data-ocid": `match.history.expand.${index + 1}`,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "shrink-0 relative w-10 h-10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "svg",
                  {
                    className: "absolute inset-0 -rotate-90",
                    viewBox: "0 0 40 40",
                    "aria-hidden": "true",
                    role: "img",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Mini score ring" }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "circle",
                        {
                          cx: "20",
                          cy: "20",
                          r: "16",
                          fill: "none",
                          stroke: "oklch(0.18 0.012 264 / 0.4)",
                          strokeWidth: "4"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "circle",
                        {
                          cx: "20",
                          cy: "20",
                          r: "16",
                          fill: "none",
                          stroke: gaugeColor(record.matchScore),
                          strokeWidth: "4",
                          strokeDasharray: 2 * Math.PI * 16,
                          strokeDashoffset: 2 * Math.PI * 16 * (1 - record.matchScore / 100),
                          strokeLinecap: "round"
                        }
                      )
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "span",
                  {
                    className: `absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold ${color}`,
                    children: record.matchScore
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: record.resumeName }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mt-0.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "size-3 text-muted-foreground/60 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono", children: new Date(record.createdAt).toLocaleDateString(void 0, {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                  }) })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: `shrink-0 text-xs font-medium px-2 py-0.5 rounded-md border ${record.matchScore >= 70 ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25" : record.matchScore >= 40 ? "bg-amber-500/10 text-amber-400 border-amber-500/25" : "bg-red-500/10 text-red-400 border-red-500/25"}`,
                  children: scoreTierLabel(record.matchScore)
                }
              ),
              expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "size-4 text-muted-foreground shrink-0" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-4 text-muted-foreground shrink-0" })
            ]
          }
        ),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-3 border-t border-border/20 bg-muted/5 flex flex-col gap-3 fade-up", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-emerald-400 mb-2 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheckBig, { className: "size-3", "aria-hidden": "true" }),
              "Matched (",
              record.matchedSkills.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: record.matchedSkills.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground italic", children: "None" }) : record.matchedSkills.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillBadge, { label: s, status: "matched" }, s)) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-semibold text-red-400 mb-2 flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "size-3", "aria-hidden": "true" }),
              "Missing (",
              record.missingSkills.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: record.missingSkills.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground italic", children: "None 🎉" }) : record.missingSkills.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillBadge, { label: s, status: "missing" }, s)) })
          ] })
        ] }) })
      ]
    }
  );
}
function EmptyNoResumes() {
  const navigate = useNavigate();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlassCard,
    {
      className: "flex flex-col items-center justify-center gap-4 py-16 text-center",
      "data-ocid": "match.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-2xl bg-muted/30 border border-border/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileSearch, { className: "size-10 text-muted-foreground/50" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base", children: "No resumes uploaded yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1.5 max-w-xs", children: "Upload at least one resume before running a job match analysis." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => void navigate({ to: "/upload" }),
            "data-ocid": "match.go_upload_button",
            className: "mt-1 px-4 py-2 rounded-lg border border-border/40 text-sm text-muted-foreground hover:text-foreground hover:border-accent/50 hover:bg-accent/10 transition-smooth",
            children: "Go to Upload"
          }
        )
      ]
    }
  );
}
function ResumeSelector({
  resumes,
  selectedId,
  onSelect
}) {
  const selected = resumes.find((r) => r.id === selectedId);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "label",
      {
        htmlFor: "resume-select",
        className: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
        children: "Select Resume"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "select",
        {
          id: "resume-select",
          value: selectedId ?? "",
          onChange: (e) => onSelect(e.target.value || null),
          "data-ocid": "match.resume_select",
          className: "w-full appearance-none bg-muted/30 border border-border/30 rounded-lg px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:border-accent/50 focus:bg-muted/50 transition-smooth pr-10 cursor-pointer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "— All uploaded resumes —" }),
            resumes.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsxs("option", { value: r.id, children: [
              r.filename,
              r.score > 0 ? ` (score: ${r.score})` : ""
            ] }, r.id))
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" })
    ] }),
    selected && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-dot bg-accent/80" }),
      "Matching against:",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-foreground truncate max-w-[200px]", children: selected.filename })
    ] }),
    !selectedId && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground flex items-center gap-1.5 mt-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-dot bg-primary/80" }),
      "Matching against all ",
      resumes.length,
      " resume",
      resumes.length !== 1 ? "s" : ""
    ] })
  ] });
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
  const { data: resumes = [], isLoading: resumesLoading } = useUserResumes();
  const { data: history = [], isLoading: historyLoading } = useMatchHistory();
  const { mutateAsync: matchResume } = useMatchResume();
  const [jobDescription, setJobDescription] = reactExports.useState("");
  const [selectedResumeId, setSelectedResumeId] = reactExports.useState(null);
  const [results, setResults] = reactExports.useState([]);
  const [isMatching, setIsMatching] = reactExports.useState(false);
  const [matchError, setMatchError] = reactExports.useState(null);
  const [hasRun, setHasRun] = reactExports.useState(false);
  const [progress, setProgress] = reactExports.useState({ done: 0, total: 0 });
  const resultsRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (hasRun && results.length > 0 && resultsRef.current) {
      setTimeout(() => {
        var _a;
        (_a = resultsRef.current) == null ? void 0 : _a.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }, 200);
    }
  }, [hasRun, results.length]);
  const targetResumes = selectedResumeId ? resumes.filter((r) => r.id === selectedResumeId) : resumes;
  const handleMatch = async () => {
    if (!jobDescription.trim() || targetResumes.length === 0) return;
    setIsMatching(true);
    setMatchError(null);
    setResults([]);
    setHasRun(false);
    setProgress({ done: 0, total: targetResumes.length });
    const collected = [];
    for (const resume of targetResumes) {
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
  const canMatch = jobDescription.trim().length > 0 && targetResumes.length > 0 && !isMatching;
  const topResult = results[0];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-6 fade-up", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-2xl text-foreground flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-5 text-accent", "aria-hidden": "true" }),
          "Job Description Matching"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Paste a job description to rank your resumes by compatibility." })
      ] }),
      hasRun && !isMatching && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: handleClear,
          className: "shrink-0 flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground px-3 py-1.5 rounded-lg hover:bg-muted/30 transition-smooth",
          "data-ocid": "match.clear_button",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" }),
            "Clear"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "flex flex-col gap-5", "data-ocid": "match.input_card", children: [
      !resumesLoading && resumes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        ResumeSelector,
        {
          resumes,
          selectedId: selectedResumeId,
          onSelect: setSelectedResumeId
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "jd-textarea",
              className: "text-xs font-medium text-muted-foreground uppercase tracking-wider",
              children: "Job Description"
            }
          ),
          jobDescription.trim().length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground/60 font-mono", children: [
            jobDescription.trim().split(/\s+/).length,
            " words"
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            id: "jd-textarea",
            value: jobDescription,
            onChange: (e) => setJobDescription(e.target.value),
            placeholder: JD_PLACEHOLDER,
            rows: 10,
            className: "w-full bg-muted/30 border border-border/30 rounded-lg px-3.5 py-3 text-sm text-foreground placeholder:text-muted-foreground/35 resize-y focus:outline-none focus:border-accent/50 focus:bg-muted/50 transition-smooth font-body leading-relaxed min-h-[160px]",
            "data-ocid": "match.jd_input"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-wrap", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleMatch,
            disabled: !canMatch,
            "data-ocid": "match.analyze_button",
            className: "flex items-center gap-2 px-5 py-2.5 rounded-lg font-display font-semibold text-sm bg-primary/90 hover:bg-primary text-primary-foreground border border-primary/50 disabled:opacity-40 disabled:cursor-not-allowed transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 flex-1 sm:flex-none sm:min-w-[200px] justify-center",
            children: isMatching ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin", "aria-hidden": "true" }),
              "Analyzing ",
              progress.done,
              "/",
              progress.total,
              "…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { className: "size-4", "aria-hidden": "true" }),
              "Analyze Match"
            ] })
          }
        ),
        !isMatching && targetResumes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
          targetResumes.length,
          " resume",
          targetResumes.length !== 1 ? "s" : "",
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
        "data-ocid": "match.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            CircleAlert,
            {
              className: "size-5 text-destructive shrink-0 mt-0.5",
              "aria-hidden": "true"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-destructive", children: matchError })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", ref: resultsRef, children: [
      isMatching && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GlassCard,
        {
          className: "flex flex-col items-center gap-4 py-12",
          "data-ocid": "match.loading_state",
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
          "data-ocid": "match.resumes_loading_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "md", label: "Loading resumes…" })
        }
      ),
      !resumesLoading && resumes.length === 0 && !isMatching && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyNoResumes, {}),
      !resumesLoading && resumes.length > 0 && !hasRun && !isMatching && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        GlassCard,
        {
          className: "flex flex-col items-center justify-center gap-4 py-14 text-center",
          "data-ocid": "match.prompt_state",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-2xl bg-accent/10 border border-accent/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              BrainCircuit,
              {
                className: "size-10 text-accent/60",
                "aria-hidden": "true"
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base", children: "Ready to match" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1.5 max-w-xs", children: [
                "Paste a job description above and click",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-medium", children: "Analyze Match" }),
                " ",
                "to rank your resume by fit."
              ] })
            ] })
          ]
        }
      ),
      hasRun && !isMatching && results.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-5 fade-up", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-1 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-medium text-foreground", children: [
            results.length,
            " result",
            results.length !== 1 ? "s" : "",
            " — sorted by match score"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 ml-auto text-xs text-muted-foreground flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-dot bg-emerald-400" }),
              results.filter((r) => r.result.matchScore >= 70).length,
              " ",
              "strong"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "status-dot bg-amber-400" }),
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
        results.length === 1 && topResult && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ResultPanel,
          {
            result: topResult.result,
            resumeName: topResult.resume.filename
          }
        ),
        results.length > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
          topResult && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-2.5 left-4 z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-semibold uppercase tracking-wider bg-accent/90 text-accent-foreground px-2 py-0.5 rounded-full", children: "Best Match" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ResultPanel,
              {
                result: topResult.result,
                resumeName: topResult.resume.filename
              }
            )
          ] }),
          results.slice(1).map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: `rounded-xl border overflow-hidden ${item.result.matchScore >= 70 ? "border-emerald-500/20" : item.result.matchScore >= 40 ? "border-amber-500/20" : "border-red-500/20"}`,
              "data-ocid": `match.result.item.${i + 2}`,
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "flex flex-col gap-4 border-0", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 flex-wrap", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0 w-14 h-14", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "svg",
                      {
                        className: "absolute inset-0 -rotate-90",
                        viewBox: "0 0 56 56",
                        "aria-hidden": "true",
                        role: "img",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Score ring" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "circle",
                            {
                              cx: "28",
                              cy: "28",
                              r: "22",
                              fill: "none",
                              stroke: "oklch(0.18 0.012 264 / 0.4)",
                              strokeWidth: "5"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "circle",
                            {
                              cx: "28",
                              cy: "28",
                              r: "22",
                              fill: "none",
                              stroke: gaugeColor(item.result.matchScore),
                              strokeWidth: "5",
                              strokeDasharray: 2 * Math.PI * 22,
                              strokeDashoffset: 2 * Math.PI * 22 * (1 - item.result.matchScore / 100),
                              strokeLinecap: "round"
                            }
                          )
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "span",
                      {
                        className: `absolute inset-0 flex items-center justify-center font-display font-bold text-sm ${gaugeTextColor(item.result.matchScore)}`,
                        children: item.result.matchScore
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-sm text-foreground truncate", children: item.resume.filename }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "p",
                      {
                        className: `text-xs mt-0.5 ${gaugeTextColor(item.result.matchScore)}`,
                        children: [
                          scoreTierLabel(item.result.matchScore),
                          " ·",
                          " ",
                          item.result.matchScore,
                          "% match"
                        ]
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "shrink-0 text-xs font-mono text-muted-foreground/60", children: [
                    "#",
                    i + 2
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid sm:grid-cols-2 gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-emerald-400 font-medium mb-1.5 flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        CircleCheckBig,
                        {
                          className: "size-3",
                          "aria-hidden": "true"
                        }
                      ),
                      "Matched (",
                      item.result.matchedSkills.length,
                      ")"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
                      item.result.matchedSkills.slice(0, 8).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
                          children: s
                        },
                        s
                      )),
                      item.result.matchedSkills.length > 8 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground/60 self-center", children: [
                        "+",
                        item.result.matchedSkills.length - 8,
                        " more"
                      ] })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-red-400 font-medium mb-1.5 flex items-center gap-1", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "size-3", "aria-hidden": "true" }),
                      "Missing (",
                      item.result.missingSkills.length,
                      ")"
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
                      item.result.missingSkills.slice(0, 8).map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "span",
                        {
                          className: "inline-flex items-center px-2 py-0.5 rounded-md text-xs font-medium border bg-red-500/10 text-red-400 border-red-500/20",
                          children: s
                        },
                        s
                      )),
                      item.result.missingSkills.length > 8 && /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground/60 self-center", children: [
                        "+",
                        item.result.missingSkills.length - 8,
                        " more"
                      ] })
                    ] })
                  ] })
                ] })
              ] })
            },
            item.resume.id
          ))
        ] })
      ] })
    ] }),
    (history.length > 0 || historyLoading) && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3 mt-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-base text-foreground", children: "Match History" }),
        history.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-muted-foreground bg-muted/30 px-2 py-0.5 rounded-full border border-border/20", children: history.length })
      ] }),
      historyLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
        GlassCard,
        {
          className: "flex items-center justify-center py-8",
          "data-ocid": "match.history_loading_state",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "sm", label: "Loading history…" })
        }
      ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", "data-ocid": "match.history_list", children: history.map((record, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(HistoryRow, { record, index: i }, record.id)) })
    ] })
  ] });
}
export {
  Match as default
};
