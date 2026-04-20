import { c as createLucideIcon, u as useAuth, r as reactExports, j as jsxRuntimeExports, f as Link, b as Button, d as useActor, Z as Zap, e as createActor } from "./index-BW0DBoAl.js";
import { e as apiSetSecurityQuestion } from "./api-D_-AFWZL.js";
import { G as GlassCard } from "./GlassCard-CqZihfXf.js";
import { S as SkillBadge, b as ScoreGauge } from "./SkillBadge-DrKZNeA8.js";
import { c as useUploadResume, d as useUserResumes, b as useDeleteResume } from "./use-resumes-BkByy20o.js";
import { F as FileUp } from "./file-up-BRV_sIyY.js";
import { H as History } from "./history-DRuu52Wy.js";
import { F as FileText } from "./file-text-BdAYUBQk.js";
import { L as LoaderCircle, C as CircleX } from "./loader-circle-DlcuGtIl.js";
import { S as Sparkles } from "./sparkles-D7iV9PZj.js";
import { C as CircleAlert } from "./circle-alert-Vzmw5HjG.js";
import { C as CircleCheck } from "./circle-check-Cf-FaEkA.js";
import { A as ArrowRight } from "./arrow-right-DwP2sP5m.js";
import { S as ShieldCheck } from "./shield-check-ByDfaybr.js";
import { C as ChevronUp } from "./chevron-up-Dj0QWSpa.js";
import { C as ChevronDown } from "./chevron-down-Buq2wl4V.js";
import { L as Lock } from "./lock-BX_e6_BH.js";
import { T as Trash2 } from "./trash-2-DbtB38ng.js";
import "./useMutation-DJ2_JvTs.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z",
      key: "l5xja"
    }
  ],
  [
    "path",
    {
      d: "M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z",
      key: "ep3f8r"
    }
  ],
  ["path", { d: "M15 13a4.5 4.5 0 0 1-3-4 4.5 4.5 0 0 1-3 4", key: "1p4c4q" }],
  ["path", { d: "M17.599 6.5a3 3 0 0 0 .399-1.375", key: "tmeiqw" }],
  ["path", { d: "M6.003 5.125A3 3 0 0 0 6.401 6.5", key: "105sqy" }],
  ["path", { d: "M3.477 10.896a4 4 0 0 1 .585-.396", key: "ql3yin" }],
  ["path", { d: "M19.938 10.5a4 4 0 0 1 .585.396", key: "1qfode" }],
  ["path", { d: "M6 18a4 4 0 0 1-1.967-.516", key: "2e4loj" }],
  ["path", { d: "M19.967 17.484A4 4 0 0 1 18 18", key: "159ez6" }]
];
const Brain = createLucideIcon("brain", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["polyline", { points: "12 6 12 12 16 14", key: "68esgv" }]
];
const Clock = createLucideIcon("clock", __iconNode);
const MAX_SIZE_MB = 10;
const ACCEPTED_TYPES = ["application/pdf"];
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}
function formatDate(iso) {
  return new Date(iso).toLocaleDateString(void 0, {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
const HOW_IT_WORKS = [
  {
    step: "1",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileUp, { className: "size-4 text-indigo-400" }),
    title: "Upload your PDF",
    desc: "Drag and drop or click to select a PDF resume (max 10 MB)."
  },
  {
    step: "2",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "size-4 text-violet-400" }),
    title: "AI extracts skills",
    desc: "Our engine scans for 60+ tech skills across Python, cloud, DevOps, ML, and more."
  },
  {
    step: "3",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-4 text-emerald-400" }),
    title: "Score & match",
    desc: "Receive an AI match score out of 100 and compare against any job description."
  }
];
function WelcomeGuide() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "border-accent/10", "data-ocid": "welcome-guide", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-accent/15 border border-accent/25", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4 text-accent" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: "How it works" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Get started in 3 simple steps" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-4", children: HOW_IT_WORKS.map(({ step, icon, title, desc }, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-1 shrink-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono font-bold text-foreground", children: step }),
        idx < 2 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 w-px bg-border/20 hidden sm:block" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pb-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 mb-1", children: [
          icon,
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: title })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: desc })
      ] })
    ] }, step)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-3 border-t border-border/15 flex flex-wrap gap-4 text-xs text-muted-foreground/60", children: ["PDF only", "Max 10 MB", "Results in seconds", "Stored securely"].map(
      (note) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent/50" }),
        note
      ] }, note)
    ) })
  ] });
}
const STEPS = [
  {
    key: "uploading",
    label: "Uploading file",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileUp, { className: "size-3.5" })
  },
  {
    key: "analysing",
    label: "Analysing resume",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "size-3.5" })
  },
  { key: "done", label: "Scoring", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3.5" }) }
];
const STEP_ORDER = ["uploading", "analysing", "done"];
function StepProgress({ currentStep }) {
  if (currentStep === "idle") return null;
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-2 pt-1", children: STEPS.map((step, idx) => {
    const stepIdx = STEP_ORDER.indexOf(step.key);
    const currentIdx = STEP_ORDER.indexOf(currentStep);
    const isComplete = currentIdx > stepIdx;
    const isActive = currentStep === step.key;
    const isPending = currentIdx < stepIdx;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border transition-smooth ${isComplete ? "bg-accent/15 text-accent border-accent/30" : isActive ? "bg-primary/15 text-primary border-primary/30" : isPending ? "bg-muted/30 text-muted-foreground/50 border-border/20" : "bg-muted/30 text-muted-foreground border-border/20"}`,
          children: [
            isActive ? /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-3 animate-spin" }) : isComplete ? /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-3" }) : step.icon,
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline", children: step.label })
          ]
        }
      ),
      idx < STEPS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: `h-px w-4 transition-smooth ${isComplete ? "bg-accent/40" : "bg-border/30"}`
        }
      )
    ] }, step.key);
  }) });
}
function AnimatedScoreGauge({ score }) {
  const r = 54;
  const circumference = 2 * Math.PI * r;
  const [dashoffset, setDashoffset] = reactExports.useState(circumference);
  function getColor(s) {
    if (s >= 85) return "oklch(0.72 0.18 162)";
    if (s >= 70) return "oklch(0.67 0.22 264)";
    if (s >= 50) return "oklch(0.78 0.18 75)";
    return "oklch(0.65 0.23 27)";
  }
  function getTier(s) {
    if (s >= 85) return "Excellent";
    if (s >= 70) return "Good";
    if (s >= 50) return "Fair";
    return "Low";
  }
  reactExports.useEffect(() => {
    const raf = requestAnimationFrame(() => {
      setDashoffset(circumference - score / 100 * circumference);
    });
    return () => cancelAnimationFrame(raf);
  }, [score, circumference]);
  const color = getColor(score);
  const tier = getTier(score);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "relative inline-flex items-center justify-center",
      style: { width: 128, height: 128 },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            width: 128,
            height: 128,
            viewBox: "0 0 128 128",
            "aria-label": `Score ${score} out of 100, ${tier}`,
            role: "img",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: `Score: ${score}/100 — ${tier}` }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: 64,
                  cy: 64,
                  r,
                  fill: "none",
                  stroke: "oklch(1 0 0 / 0.08)",
                  strokeWidth: 9
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: 64,
                  cy: 64,
                  r,
                  fill: "none",
                  stroke: color,
                  strokeWidth: 9,
                  strokeLinecap: "round",
                  strokeDasharray: circumference,
                  strokeDashoffset: dashoffset,
                  transform: "rotate(-90 64 64)",
                  style: { transition: "stroke-dashoffset 1.5s ease-out" }
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 flex flex-col items-center justify-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: "font-mono font-bold leading-none",
              style: { fontSize: 28, color },
              children: score
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground mt-0.5 font-medium", children: tier })
        ] })
      ]
    }
  );
}
function HistoryCard({
  resume,
  onDelete
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const [confirming, setConfirming] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "glass rounded-xl border border-border/20 overflow-hidden transition-smooth hover:border-accent/20",
      "data-ocid": `history.item.${resume.id}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 px-4 py-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ScoreGauge, { score: resume.score, size: "sm" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: resume.filename }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 mt-0.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "size-3 text-muted-foreground/50" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDate(resume.uploadDate) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground/50", children: "·" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                resume.skills.length,
                " skill",
                resume.skills.length !== 1 ? "s" : ""
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setExpanded((v) => !v),
                className: "p-1.5 rounded-lg text-muted-foreground hover:text-accent hover:bg-accent/10 transition-smooth",
                "aria-label": expanded ? "Collapse skill list" : "Expand skill list",
                "data-ocid": `history.expand-toggle.${resume.id}`,
                children: expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-4" })
              }
            ),
            !confirming ? /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setConfirming(true),
                className: "p-1.5 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth",
                "aria-label": "Delete resume",
                "data-ocid": `history.delete_button.${resume.id}`,
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" })
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex items-center gap-1",
                "data-ocid": `history.confirm-delete.${resume.id}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => {
                        onDelete(resume.id);
                        setConfirming(false);
                      },
                      className: "px-2 py-1 rounded text-xs font-medium bg-destructive/20 text-destructive hover:bg-destructive/30 border border-destructive/30 transition-smooth",
                      "data-ocid": `history.confirm_button.${resume.id}`,
                      children: "Delete"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "button",
                    {
                      type: "button",
                      onClick: () => setConfirming(false),
                      className: "px-2 py-1 rounded text-xs font-medium bg-muted/30 text-muted-foreground hover:bg-muted/50 border border-border/20 transition-smooth",
                      "data-ocid": `history.cancel_button.${resume.id}`,
                      children: "Cancel"
                    }
                  )
                ]
              }
            )
          ] })
        ] }),
        expanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-border/15 px-4 py-3 bg-muted/5", children: resume.skills.length > 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", children: resume.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillBadge, { label: skill, status: "matched" }, skill)) }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60 italic", children: "No skills extracted." }) })
      ]
    }
  );
}
function UploadHistory() {
  const { data: resumes = [], isLoading } = useUserResumes();
  const { mutateAsync: deleteResume } = useDeleteResume();
  const handleDelete = async (id) => {
    try {
      await deleteResume(id);
    } catch {
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "border-border/20", "data-ocid": "upload-history-section", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 mb-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-primary/15 border border-primary/25", children: /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "size-4 text-primary" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: "Upload History" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "All your previously analyzed resumes" })
      ] }),
      resumes.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full bg-primary/15 border border-primary/25 text-xs font-mono font-medium text-primary", children: resumes.length })
    ] }),
    isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", "data-ocid": "history.loading_state", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "h-16 rounded-xl bg-muted/20 animate-pulse"
      },
      i
    )) }) : resumes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center gap-3 py-10 text-center",
        "data-ocid": "history.empty_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-2xl bg-muted/20 border border-border/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-8 text-muted-foreground/40" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "No uploads yet" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "Drop your first PDF above to get started" })
          ] })
        ]
      }
    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2", "data-ocid": "history.list", children: resumes.map((resume) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      HistoryCard,
      {
        resume,
        onDelete: handleDelete
      },
      resume.id
    )) })
  ] });
}
const SECURITY_QUESTIONS = [
  "What was the name of your first pet?",
  "What city were you born in?",
  "What is your mother's maiden name?",
  "What was the name of your primary school?",
  "What was your childhood nickname?",
  "What is the name of the street you grew up on?"
];
function AccountSecurityCard({ token }) {
  const { actor } = useActor(createActor);
  const [open, setOpen] = reactExports.useState(false);
  const [question, setQuestion] = reactExports.useState(SECURITY_QUESTIONS[0]);
  const [customQuestion, setCustomQuestion] = reactExports.useState("");
  const [useCustom, setUseCustom] = reactExports.useState(false);
  const [answer, setAnswer] = reactExports.useState("");
  const [status, setStatus] = reactExports.useState(
    "idle"
  );
  const [errorMsg, setErrorMsg] = reactExports.useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!actor) return;
    const finalQuestion = useCustom ? customQuestion.trim() : question;
    const finalAnswer = answer.trim();
    if (!finalQuestion || !finalAnswer) return;
    setStatus("saving");
    setErrorMsg(null);
    try {
      const result = await apiSetSecurityQuestion(
        actor,
        token,
        finalQuestion,
        finalAnswer
      );
      if (result.success) {
        setStatus("success");
        setAnswer("");
      } else {
        setStatus("error");
        setErrorMsg(result.error ?? "Failed to save. Please try again.");
      }
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "An error occurred.");
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "border-border/20", "data-ocid": "account-security-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "button",
      {
        type: "button",
        onClick: () => setOpen((v) => !v),
        className: "flex items-center justify-between w-full text-left gap-3 group",
        "aria-expanded": open,
        "data-ocid": "btn-security-toggle",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-muted/30 border border-border/20 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-4 text-muted-foreground group-hover:text-accent transition-smooth" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Account Security" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "Set a security question to enable forgot-password recovery" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "shrink-0 text-muted-foreground group-hover:text-accent transition-smooth", children: open ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-4" }) })
        ]
      }
    ),
    open && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-4 pt-4 border-t border-border/15 flex flex-col gap-4", children: [
      status === "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border border-accent/30 bg-accent/8",
          "data-ocid": "security-success",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4 text-accent shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-accent font-medium", children: "Security question saved! Your account can now use forgot-password." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2 text-xs text-muted-foreground/80 leading-relaxed", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, { className: "size-3.5 shrink-0 mt-0.5 text-muted-foreground/50" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Your answer is stored securely and used only to verify your identity when resetting your password." })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "flex flex-col gap-3.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: useCustom ? "custom-question-input" : "select-question",
              className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
              children: "Security question"
            }
          ),
          !useCustom ? /* @__PURE__ */ jsxRuntimeExports.jsx(
            "select",
            {
              id: "select-question",
              value: question,
              onChange: (e) => setQuestion(e.target.value),
              className: "w-full px-3 py-2.5 rounded-lg bg-muted/20 border border-border/30 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth",
              "data-ocid": "select-security-question",
              children: SECURITY_QUESTIONS.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: q, children: q }, q))
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "custom-question-input",
              type: "text",
              value: customQuestion,
              onChange: (e) => setCustomQuestion(e.target.value),
              placeholder: "Type your own security question…",
              maxLength: 120,
              className: "w-full px-3 py-2.5 rounded-lg bg-muted/20 border border-border/30 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth",
              "data-ocid": "input-custom-question"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => {
                setUseCustom((v) => !v);
                setCustomQuestion("");
              },
              className: "self-start text-xs text-accent/80 hover:text-accent underline underline-offset-2 transition-smooth",
              children: useCustom ? "← Choose from list" : "Write a custom question"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "label",
            {
              htmlFor: "security-answer",
              className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
              children: "Your answer"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              id: "security-answer",
              type: "text",
              value: answer,
              onChange: (e) => setAnswer(e.target.value),
              placeholder: "Enter your answer…",
              autoComplete: "off",
              required: true,
              maxLength: 120,
              className: "w-full px-3 py-2.5 rounded-lg bg-muted/20 border border-border/30 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth",
              "data-ocid": "input-security-answer"
            }
          )
        ] }),
        status === "error" && errorMsg && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex items-center gap-2 text-xs text-destructive",
            "data-ocid": "security-error",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "size-3.5 shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: errorMsg })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            type: "submit",
            disabled: status === "saving" || !answer.trim() || useCustom && !customQuestion.trim(),
            size: "sm",
            className: "bg-accent hover:bg-accent/90 text-accent-foreground font-display font-semibold w-full sm:w-auto",
            "data-ocid": "btn-save-security-question",
            children: status === "saving" ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-3.5 animate-spin" }),
              "Saving…"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-3.5" }),
              "Save security question"
            ] })
          }
        )
      ] })
    ] })
  ] });
}
function UploadPage() {
  const { user } = useAuth();
  const [uploadState, setUploadState] = reactExports.useState({
    status: "idle",
    progress: 0
  });
  const [step, setStep] = reactExports.useState("idle");
  const [dragOver, setDragOver] = reactExports.useState(false);
  const [result, setResult] = reactExports.useState(null);
  const [selectedFile, setSelectedFile] = reactExports.useState(null);
  const fileInputRef = reactExports.useRef(null);
  const { mutateAsync: uploadResume } = useUploadResume();
  const processFile = reactExports.useCallback((file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setUploadState({
        status: "error",
        progress: 0,
        error: "Only PDF files are supported."
      });
      setStep("idle");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setUploadState({
        status: "error",
        progress: 0,
        error: `File exceeds ${MAX_SIZE_MB}MB limit.`
      });
      setStep("idle");
      return;
    }
    setSelectedFile(file);
    setUploadState({ status: "idle", progress: 0 });
    setResult(null);
    setStep("idle");
  }, []);
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );
  const handleFileChange = reactExports.useCallback(
    (e) => {
      var _a;
      const file = (_a = e.target.files) == null ? void 0 : _a[0];
      if (file) processFile(file);
    },
    [processFile]
  );
  const handleUpload = async () => {
    if (!selectedFile) return;
    setStep("uploading");
    setUploadState({ status: "uploading", progress: 30 });
    try {
      const mutationPromise = uploadResume({
        filename: selectedFile.name,
        file: selectedFile
      });
      await new Promise((r) => setTimeout(r, 500));
      setStep("analysing");
      setUploadState({ status: "uploading", progress: 65 });
      const resume = await mutationPromise;
      setStep("done");
      setResult(resume);
      setUploadState({ status: "success", progress: 100 });
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      const raw = err instanceof Error ? err.message : String(err);
      const userMsg = raw.startsWith("Actor not ready") ? "The backend is still loading. Please wait a moment and try again." : raw || "Analysis failed. Please try again.";
      setStep("idle");
      setResult(null);
      setUploadState({ status: "error", progress: 0, error: userMsg });
    }
  };
  const reset = () => {
    setUploadState({ status: "idle", progress: 0 });
    setResult(null);
    setSelectedFile(null);
    setStep("idle");
    if (fileInputRef.current) fileInputRef.current.value = "";
  };
  const isUploading = uploadState.status === "uploading";
  const isIdle = uploadState.status === "idle" && !selectedFile && !result;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-6 fade-up", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-accent/15 border border-accent/30 shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileUp, { className: "size-5 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Upload Resume" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Drop a PDF and our AI will extract skills and score your resume automatically." })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Link,
        {
          to: "/profile",
          className: "flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-muted/30 border border-border/30 text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/8 text-xs font-medium transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 shrink-0 mt-1",
          "data-ocid": "btn-view-history",
          "aria-label": "View upload history",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(History, { className: "size-3.5" }),
            "View History"
          ]
        }
      )
    ] }),
    isIdle && /* @__PURE__ */ jsxRuntimeExports.jsx(WelcomeGuide, {}),
    uploadState.status !== "success" && /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "p-0 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "label",
        {
          htmlFor: "file-drop-input",
          "aria-label": "File upload drop zone — drag and drop or click to browse",
          onDragOver: (e) => {
            e.preventDefault();
            setDragOver(true);
          },
          onDragLeave: () => setDragOver(false),
          onDrop: handleDrop,
          "data-ocid": "dropzone-upload",
          className: [
            "flex flex-col items-center justify-center gap-5 py-14 px-8 cursor-pointer rounded-xl m-1 transition-all duration-300",
            "border-2 border-dashed",
            dragOver ? "bg-indigo-500/10 border-indigo-400/60 shadow-[0_0_32px_oklch(0.67_0.22_264_/_0.18)]" : "border-border/25 hover:border-indigo-400/35 hover:bg-indigo-500/5"
          ].join(" "),
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: [
                  "relative p-5 rounded-2xl transition-all duration-300",
                  dragOver ? "bg-indigo-500/20 shadow-[0_0_24px_oklch(0.67_0.22_264_/_0.3)]" : "bg-muted/25"
                ].join(" "),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    FileText,
                    {
                      className: `size-10 transition-all duration-300 ${dragOver ? "text-indigo-400 scale-110" : "text-muted-foreground"}`
                    }
                  ),
                  dragOver && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-2xl border-2 border-indigo-400/50 animate-pulse" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-lg", children: dragOver ? "Release to upload" : "Drag & drop your PDF resume" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1.5", children: [
                "or",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent underline underline-offset-2", children: "click to browse files" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/50 mt-3 font-mono", children: [
                "PDF only · Max ",
                MAX_SIZE_MB,
                "MB"
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                ref: fileInputRef,
                id: "file-drop-input",
                type: "file",
                accept: ".pdf",
                className: "hidden",
                onChange: handleFileChange,
                "data-ocid": "input-file",
                "aria-label": "Choose PDF file"
              }
            )
          ]
        }
      ),
      selectedFile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-border/20 bg-muted/10 px-5 py-4 flex flex-col gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/15 border border-primary/25 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0 flex-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: selectedFile.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
              formatBytes(selectedFile.size),
              " · PDF document"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: reset,
              disabled: isUploading,
              className: "text-muted-foreground hover:text-destructive shrink-0 text-xs",
              "aria-label": "Remove selected file",
              children: "Remove"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row items-start sm:items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: handleUpload,
              disabled: isUploading,
              size: "default",
              className: "bg-accent hover:bg-accent/90 text-accent-foreground font-display font-semibold shrink-0 w-full sm:w-auto",
              "data-ocid": "btn-upload-submit",
              children: isUploading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin" }),
                step === "uploading" ? "Uploading…" : "Analysing…"
              ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4" }),
                "Analyse Resume"
              ] })
            }
          ),
          isUploading && /* @__PURE__ */ jsxRuntimeExports.jsx(StepProgress, { currentStep: step })
        ] }),
        isUploading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 h-1.5 rounded-full bg-muted/30 overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "h-full rounded-full bg-gradient-to-r from-indigo-500 to-accent transition-all duration-700",
            style: { width: `${uploadState.progress}%` }
          }
        ) })
      ] })
    ] }),
    uploadState.status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "upload-error",
        className: "glass rounded-xl p-4 border border-destructive/30 bg-destructive/8 flex flex-col gap-3",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "size-5 text-destructive shrink-0 mt-0.5" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-destructive", children: "Analysis Failed" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1 leading-relaxed break-words", children: uploadState.error ?? "Something went wrong. Please try again." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 pl-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: reset,
              className: "border-destructive/30 text-destructive hover:bg-destructive/10 text-xs",
              "data-ocid": "btn-retry",
              children: "Try again"
            }
          ) })
        ]
      }
    ),
    uploadState.status === "idle" && !selectedFile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-2.5 px-4 py-3 rounded-xl bg-muted/20 border border-border/20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "size-4 text-muted-foreground/60 shrink-0 mt-0.5" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/70 leading-relaxed", children: [
        "Only ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono text-muted-foreground", children: ".pdf" }),
        " ",
        "files are accepted. Skill extraction works best with text-based PDFs — scanned images may yield lower accuracy."
      ] })
    ] }),
    uploadState.status === "success" && result !== null && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4 fade-up", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          "data-ocid": "upload-success",
          className: "flex items-center gap-3 px-4 py-3 rounded-xl border border-accent/30 bg-accent/8",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-5 text-accent shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-accent", children: "Resume analysed successfully!" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
                result.skills.length,
                " skill",
                result.skills.length !== 1 ? "s" : "",
                " extracted · scored and indexed"
              ] })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { className: "border-accent/20", "data-ocid": "result-card", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-muted/30 border border-border/20 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground truncate text-base", children: result.filename }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              "Uploaded ",
              new Date(result.uploadDate).toLocaleString()
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3 mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "AI Match Score" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatedScoreGauge, { score: result.score }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground/60", children: "out of 100" })
        ] }),
        result.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: [
              "Extracted Skills (",
              result.skills.length,
              ")"
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5 text-xs text-muted-foreground/60", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-sm bg-indigo-500/50" }),
                "Tech"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-sm bg-violet-500/50" }),
                "Tools"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-2 h-2 rounded-sm bg-emerald-500/50" }),
                "Soft"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap gap-1.5", "data-ocid": "skills-list", children: result.skills.map((skill) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkillBadge, { label: skill, status: "matched" }, skill)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-2 pt-2 border-t border-border/15", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              onClick: reset,
              variant: "outline",
              size: "sm",
              className: "border-border/30 hover:border-border/60 flex-1 sm:flex-none",
              "data-ocid": "btn-upload-another",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(FileUp, { className: "size-4" }),
                "Upload another"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/dashboard", className: "flex-1 sm:flex-none", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              size: "sm",
              className: "bg-accent hover:bg-accent/90 text-accent-foreground font-display font-semibold w-full",
              "data-ocid": "btn-go-dashboard",
              children: [
                "View all resumes",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4" })
              ]
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-xl px-5 py-4 flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-primary/15 border border-primary/25 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "Match against a job description" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: "See matched and missing skills for any role" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/match", className: "shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            size: "sm",
            variant: "outline",
            className: "border-primary/30 text-primary hover:bg-primary/10 whitespace-nowrap",
            "data-ocid": "btn-go-match",
            children: [
              "Match now",
              /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-3.5" })
            ]
          }
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(UploadHistory, {}),
    (user == null ? void 0 : user.token) && /* @__PURE__ */ jsxRuntimeExports.jsx(AccountSecurityCard, { token: user.token })
  ] });
}
export {
  UploadPage as default
};
