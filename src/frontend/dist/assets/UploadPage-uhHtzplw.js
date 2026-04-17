import { c as createLucideIcon, u as useAuth, r as reactExports, j as jsxRuntimeExports, l as Link, b as Button, d as useActor, Z as Zap, e as createActor } from "./index-C0uoDo9R.js";
import { e as apiSetSecurityQuestion } from "./api-D_-AFWZL.js";
import { G as GlassCard, a as SkillBadge } from "./SkillBadge-DWEbqy2E.js";
import { c as useUploadResume } from "./use-resumes-U5T9p0Y7.js";
import { C as ChevronLeft } from "./chevron-left-BAAQAeGr.js";
import { F as FileUp } from "./file-up-BRLw-tVE.js";
import { H as History } from "./history-dvU4uN14.js";
import { F as FileText } from "./file-text-Dz7WucPQ.js";
import { L as LoaderCircle, C as CircleX, a as CircleCheck } from "./loader-circle-CHyPsDOr.js";
import { S as Sparkles } from "./sparkles-DVsEdvjY.js";
import { C as CircleAlert } from "./circle-alert-BoBwFJTu.js";
import { A as ArrowRight } from "./arrow-right-CA5Iy8wj.js";
import { S as ShieldCheck } from "./shield-check-CxpDo2en.js";
import { C as ChevronUp } from "./chevron-up-Don-xLbr.js";
import { C as ChevronDown } from "./chevron-down-B3evB4H9.js";
import { L as Lock } from "./lock-6omcHBRA.js";
import "./useMutation-IWYl8V_O.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
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
const Brain = createLucideIcon("brain", __iconNode);
const MAX_SIZE_MB = 10;
const ACCEPTED_TYPES = ["application/pdf"];
function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1048576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1048576).toFixed(1)} MB`;
}
function getScoreTier(score) {
  if (score >= 80) return { label: "Excellent", color: "text-accent" };
  if (score >= 60) return { label: "Good", color: "text-primary" };
  return { label: "Fair", color: "text-muted-foreground" };
}
const HOW_IT_WORKS = [
  {
    step: "1",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileUp, { className: "size-4 text-accent" }),
    title: "Upload your PDF",
    desc: "Drag and drop or click to select a PDF resume (max 10 MB)."
  },
  {
    step: "2",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Brain, { className: "size-4 text-accent" }),
    title: "AI extracts skills",
    desc: "Our engine scans for 60+ tech skills across Python, cloud, DevOps, ML, and more."
  },
  {
    step: "3",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-4 text-accent" }),
    title: "Score & match",
    desc: "Receive an AI match score out of 100 and compare against any job description."
  }
];
function WelcomeGuide() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    GlassCard,
    {
      className: "flex flex-col gap-5 border-accent/10",
      "data-ocid": "welcome-guide",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-accent/15 border border-accent/25", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4 text-accent" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-sm", children: "How it works" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Get started in 3 simple steps" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row gap-4", children: HOW_IT_WORKS.map(({ step, icon, title, desc }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 flex gap-3", children: [
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
            "PDF only"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent/50" }),
            "Max 10 MB"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent/50" }),
            "Results in seconds"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "w-1.5 h-1.5 rounded-full bg-accent/50" }),
            "Stored securely"
          ] })
        ] })
      ]
    }
  );
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
  {
    key: "done",
    label: "Scoring",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3.5" })
  }
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
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Your answer is stored securely and used only to verify your identity when resetting your password. Choose a question only you know the answer to." })
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
        error: "Only PDF files are supported. Please select a .pdf file."
      });
      setStep("idle");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setUploadState({
        status: "error",
        progress: 0,
        error: `File size exceeds the ${MAX_SIZE_MB}MB limit. Please compress or split the file.`
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
      console.error("[UploadPage] Upload failed:", err);
      setStep("idle");
      setResult(null);
      setUploadState({
        status: "error",
        progress: 0,
        error: userMsg
      });
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
  const scoreTier = result ? getScoreTier(result.score) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-2xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-6 fade-up", children: [
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
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-accent/15 border border-accent/30 shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileUp, { className: "size-5 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Upload Resume" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Drop a PDF resume and our AI will extract skills and compute a match score automatically." })
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
          className: `flex flex-col items-center justify-center gap-5 py-12 px-8 cursor-pointer transition-smooth rounded-xl m-1 ${dragOver ? "bg-accent/10 border-2 border-dashed border-accent/50" : "border-2 border-dashed border-border/25 hover:border-accent/35 hover:bg-muted/10"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: `relative p-5 rounded-2xl transition-smooth ${dragOver ? "bg-accent/20 accent-glow" : "bg-muted/25"}`,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    FileText,
                    {
                      className: `size-10 transition-smooth ${dragOver ? "text-accent scale-110" : "text-muted-foreground"}`
                    }
                  ),
                  dragOver && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-2xl border-2 border-accent/50 animate-pulse" })
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
        isUploading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "score-bar mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "score-bar-fill transition-all duration-700",
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
          className: "flex items-center gap-3 px-4 py-3 rounded-xl border",
          style: {
            backgroundColor: "oklch(0.72 0.18 198 / 0.1)",
            borderColor: "oklch(0.72 0.18 198 / 0.3)"
          },
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
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4 mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-muted/30 border border-border/20 shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-5 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground truncate text-base", children: result.filename }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
              "Uploaded ",
              new Date(result.uploadDate).toLocaleString()
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider", children: "AI Match Score" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              scoreTier && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-xs font-medium ${scoreTier.color}`, children: scoreTier.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono font-bold text-accent text-xl", children: result.score }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "/100" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "score-bar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "score-bar-fill",
              style: { width: `${result.score}%` }
            }
          ) })
        ] }),
        result.skills.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2.5", children: [
            "Extracted Skills (",
            result.skills.length,
            ")"
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
    (user == null ? void 0 : user.token) && /* @__PURE__ */ jsxRuntimeExports.jsx(AccountSecurityCard, { token: user.token })
  ] });
}
export {
  UploadPage as default
};
