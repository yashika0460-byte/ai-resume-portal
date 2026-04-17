import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, B as BrainCircuit, L as LoadingSpinner, b as Button } from "./index-C0uoDo9R.js";
import { C as ChevronLeft } from "./chevron-left-BAAQAeGr.js";
import { m as motion } from "./proxy-Ds80ngds.js";
import { M as Mail, E as Eye } from "./mail-dBIi1Y1w.js";
import { L as Lock } from "./lock-6omcHBRA.js";
import { E as EyeOff } from "./eye-off-CVumWf_P.js";
import { S as Sparkles } from "./sparkles-DVsEdvjY.js";
import { U as UserPlus } from "./user-plus-BvuOwnzU.js";
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
      navigate({ to: user.role === "admin" ? "/admin/overview" : "/upload" });
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
    if (!ok) setSubmitting(false);
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -top-60 -left-60 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[100px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -bottom-60 -right-60 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[100px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-secondary/5 blur-[80px]" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-16 right-[20%] w-1.5 h-1.5 rounded-full bg-accent/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-[30%] right-[10%] w-1 h-1 rounded-full bg-primary/40" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-[25%] left-[15%] w-1.5 h-1.5 rounded-full bg-accent/30" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-16 left-[35%] w-1 h-1 rounded-full bg-primary/30" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col items-center justify-center px-6 py-16 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm flex flex-col items-center", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex items-center gap-3 mb-8",
          initial: { opacity: 0, y: -12 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative p-2.5 rounded-2xl bg-accent/15 border border-accent/30", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { className: "size-7 text-accent" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-2xl bg-accent/5 blur-sm" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display font-bold text-xl text-foreground leading-none", children: [
                "TalentScan",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "AI" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-xs text-muted-foreground mt-0.5 font-body", children: "AI Resume Screening Portal" })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "w-full",
          initial: { opacity: 0, y: 16 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 rounded-2xl pointer-events-none",
                style: {
                  background: "radial-gradient(ellipse at top, oklch(0.72 0.18 198 / 0.06) 0%, transparent 70%)"
                },
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2 relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Welcome back" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "Sign in to access the resume screening dashboard." })
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
                          placeholder: "you@portal.com",
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end -mt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
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
                        /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4 shrink-0" }),
                        submitLabel
                      ]
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-sm text-muted-foreground", children: [
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
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/20 backdrop-blur-sm py-4 px-6 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-center text-xs text-muted-foreground", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      ". Built with love using",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "a",
        {
          href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`,
          target: "_blank",
          rel: "noopener noreferrer",
          className: "text-accent hover:underline",
          children: "caffeine.ai"
        }
      )
    ] }) })
  ] });
}
export {
  LoginPage as default
};
