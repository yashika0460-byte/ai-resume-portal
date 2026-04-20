import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, C as ChevronLeft, B as BrainCircuit, L as LoadingSpinner, b as Button, Z as Zap } from "./index-BW0DBoAl.js";
import { m as motion } from "./proxy-BIbc0SRU.js";
import { S as Star } from "./star-3dMSJpQd.js";
import { M as Mail, E as Eye } from "./mail-DxZJM82z.js";
import { L as Lock } from "./lock-BX_e6_BH.js";
import { E as EyeOff } from "./eye-off-DiUdBOCP.js";
import { S as Sparkles } from "./sparkles-D7iV9PZj.js";
import { U as UserPlus } from "./user-plus-BnpaeZ3e.js";
import { F as FileSearch } from "./file-search-rzrtZ7ty.js";
import { T as Target } from "./target-B5jH6OHt.js";
const FEATURES = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileSearch, { className: "size-4" }),
    title: "AI-Powered Extraction",
    desc: "NLP parses skills from any PDF resume in seconds"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "size-4" }),
    title: "Job Match Scoring",
    desc: "Compare candidates against a job description instantly"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-4" }),
    title: "Real-Time Analytics",
    desc: "Live dashboards track every candidate and their progress"
  }
];
const STATS = [
  { value: "98%", label: "Accuracy" },
  { value: "<3s", label: "Parse time" },
  { value: "80+", label: "Skills detected" }
];
function LoginPage() {
  const { isAuthenticated, isLoading, user, login, error } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [successMessage, setSuccessMessage] = reactExports.useState(null);
  const emailRef = reactExports.useRef(null);
  const actorConnecting = isLoading && !submitting;
  const submitLabel = submitting ? "Signing in…" : actorConnecting ? "Connecting…" : "Sign in";
  reactExports.useEffect(() => {
    if (isAuthenticated && user) {
      const dest = user.role === "admin" ? "/admin/overview" : "/upload";
      navigate({ to: dest });
    }
  }, [isAuthenticated, user, navigate]);
  reactExports.useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("registered") === "1") {
      setSuccessMessage("Account created! Sign in with your new credentials.");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);
  reactExports.useEffect(() => {
    var _a;
    (_a = emailRef.current) == null ? void 0 : _a.focus();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitting(true);
    const ok = await login(email, password);
    if (!ok) {
      setSubmitting(false);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen gradient-flow bg-grid-pattern flex flex-col relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => navigate({ to: "/" }),
        "aria-label": "Go back",
        "data-ocid": "btn-back",
        className: "fixed top-4 left-4 z-50 flex items-center justify-center size-9 rounded-xl bg-muted/30 border border-border/40 text-muted-foreground hover:text-accent hover:border-accent/50 hover:bg-accent/10 backdrop-blur-sm transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-5", "aria-hidden": "true" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "pointer-events-none fixed inset-0 overflow-hidden",
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-primary/10 blur-[120px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-40 -right-40 w-[560px] h-[560px] rounded-full bg-accent/10 blur-[120px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-secondary/5 blur-[80px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "absolute top-[15%] right-[25%] w-1.5 h-1.5 rounded-full bg-accent/60",
              animate: { y: [0, -8, 0], opacity: [0.6, 1, 0.6] },
              transition: {
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut"
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "absolute top-[40%] right-[10%] w-1 h-1 rounded-full bg-primary/60",
              animate: { y: [0, -6, 0], opacity: [0.4, 0.8, 0.4] },
              transition: {
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 1
              }
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            motion.div,
            {
              className: "absolute bottom-[30%] left-[12%] w-1.5 h-1.5 rounded-full bg-accent/40",
              animate: { y: [0, -10, 0], opacity: [0.3, 0.7, 0.3] },
              transition: {
                duration: 5,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
                delay: 2
              }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col items-center justify-center px-6 py-16 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-5xl flex flex-col lg:flex-row items-center gap-14 lg:gap-20", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "hidden lg:flex flex-1 flex-col gap-8",
          initial: { opacity: 0, x: -28 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-3 rounded-2xl bg-accent/15 border border-accent/30", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { className: "size-8 text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-2xl bg-accent/5 blur-sm" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display font-bold text-2xl text-foreground leading-none", children: [
                  "TalentScan",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "AI" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5 font-body", children: "AI Resume Screening Portal" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-5xl xl:text-6xl leading-[1.05] text-foreground", children: [
                "Screen smarter.",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-accent relative inline-block", children: [
                  "Hire faster.",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent/70 to-transparent rounded-full" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-lg leading-relaxed max-w-md", children: "AI-powered resume analysis that extracts skills, calculates scores, and matches candidates to your job description — in seconds." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
              STATS.map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  className: "flex flex-col items-center gap-0.5",
                  initial: { opacity: 0, y: 12 },
                  animate: { opacity: 1, y: 0 },
                  transition: { delay: 0.2 + i * 0.07, duration: 0.4 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-2xl text-accent", children: s.value }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: s.label })
                  ]
                },
                s.label
              )),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-px bg-border/30 mx-2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
                ["s1", "s2", "s3", "s4", "s5"].map((id) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Star,
                  {
                    className: "size-4 fill-accent/70 text-accent/70",
                    "aria-hidden": "true"
                  },
                  id
                )),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground ml-1", children: "Trusted by hiring teams" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: FEATURES.map((f, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "glass-hover glass flex items-start gap-4 p-4 rounded-xl cursor-default",
                initial: { opacity: 0, x: -16 },
                animate: { opacity: 1, x: 0 },
                transition: {
                  delay: 0.3 + i * 0.1,
                  duration: 0.45,
                  ease: [0.16, 1, 0.3, 1]
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-lg bg-accent/10 border border-accent/20 text-accent shrink-0 mt-0.5", children: f.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-display font-semibold text-sm text-foreground", children: f.title }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5 leading-relaxed", children: f.desc })
                  ] })
                ]
              },
              f.title
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "w-full max-w-sm lg:w-[380px] shrink-0",
          initial: { opacity: 0, x: 28 },
          animate: { opacity: 1, x: 0 },
          transition: {
            duration: 0.55,
            delay: 0.08,
            ease: [0.16, 1, 0.3, 1]
          },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 mb-8 lg:hidden justify-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative p-2.5 rounded-2xl bg-accent/15 border border-accent/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { className: "size-7 text-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display font-bold text-xl text-foreground leading-none", children: [
                  "TalentScan",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "AI" })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5", children: "AI Resume Screening Portal" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "absolute inset-0 rounded-2xl pointer-events-none",
                  style: {
                    background: "radial-gradient(ellipse at 30% 0%, oklch(0.62 0.22 300 / 0.07) 0%, transparent 65%)"
                  },
                  "aria-hidden": "true"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col gap-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Welcome back" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "Sign in to access your screening dashboard." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border/30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "form",
                {
                  onSubmit: handleSubmit,
                  className: "flex flex-col gap-4 relative",
                  noValidate: true,
                  children: [
                    successMessage && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.div,
                      {
                        className: "text-xs text-accent bg-accent/10 border border-accent/20 rounded-lg px-3 py-2",
                        initial: { opacity: 0, y: -6 },
                        animate: { opacity: 1, y: 0 },
                        "aria-live": "polite",
                        children: successMessage
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "login-email",
                          className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                          children: "Email address"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Mail,
                          {
                            className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60 pointer-events-none",
                            "aria-hidden": "true"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            ref: emailRef,
                            id: "login-email",
                            type: "email",
                            autoComplete: "email",
                            value: email,
                            onChange: (e) => setEmail(e.target.value),
                            placeholder: "you@company.com",
                            required: true,
                            disabled: submitting || isLoading,
                            "data-ocid": "input-email",
                            className: "w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border border-border/40 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50"
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "login-password",
                          className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                          children: "Password"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Lock,
                          {
                            className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60 pointer-events-none",
                            "aria-hidden": "true"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            id: "login-password",
                            type: showPassword ? "text" : "password",
                            autoComplete: "current-password",
                            value: password,
                            onChange: (e) => setPassword(e.target.value),
                            placeholder: "••••••••",
                            required: true,
                            disabled: submitting || isLoading,
                            "data-ocid": "input-password",
                            className: "w-full pl-10 pr-11 py-2.5 rounded-xl bg-muted/30 border border-border/40 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setShowPassword((v) => !v),
                            "aria-label": showPassword ? "Hide password" : "Show password",
                            disabled: submitting || isLoading,
                            "data-ocid": "btn-toggle-password",
                            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-accent transition-colors focus:outline-none focus-visible:text-accent disabled:opacity-40",
                            children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-4", "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-4", "aria-hidden": "true" })
                          }
                        )
                      ] })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end -mt-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "text-xs text-muted-foreground hover:text-accent transition-colors",
                        "data-ocid": "link-forgot-password",
                        onClick: () => navigate({ to: "/forgot-password" }),
                        children: "Forgot password?"
                      }
                    ) }),
                    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.p,
                      {
                        className: "text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2",
                        initial: { opacity: 0, y: -6 },
                        animate: { opacity: 1, y: 0 },
                        "data-ocid": "login-error",
                        role: "alert",
                        children: error
                      }
                    ),
                    submitting || isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex flex-col items-center gap-3 py-3",
                        "data-ocid": "login-loading",
                        "aria-live": "polite",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-medium text-foreground", children: submitLabel })
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "submit",
                        disabled: !email || !password || actorConnecting,
                        size: "lg",
                        className: "w-full bg-accent hover:bg-accent/90 text-accent-foreground font-display font-semibold accent-glow transition-smooth gap-2 mt-1",
                        "data-ocid": "btn-login",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4 shrink-0", "aria-hidden": "true" }),
                          submitLabel
                        ]
                      }
                    )
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-sm text-muted-foreground border-t border-border/20 pt-4", children: [
                "Don't have an account?",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "text-accent hover:text-accent/80 font-medium transition-colors inline-flex items-center gap-1",
                    "data-ocid": "link-register",
                    onClick: () => navigate({ to: "/register" }),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "size-3.5", "aria-hidden": "true" }),
                      "Register"
                    ]
                  }
                )
              ] })
            ] })
          ]
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/20 backdrop-blur-sm py-4 px-6 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " AI Resume Screening Portal"
    ] }) })
  ] });
}
export {
  LoginPage as default
};
