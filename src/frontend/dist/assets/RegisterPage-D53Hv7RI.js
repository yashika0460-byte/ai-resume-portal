import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, C as ChevronLeft, B as BrainCircuit, L as LoadingSpinner, b as Button } from "./index-BW0DBoAl.js";
import { m as motion } from "./proxy-BIbc0SRU.js";
import { U as UserCheck } from "./user-check-Bm15dfdF.js";
import { S as Shield } from "./shield-Bee9K8zZ.js";
import { S as Sparkles } from "./sparkles-D7iV9PZj.js";
import { U as UserPlus } from "./user-plus-BnpaeZ3e.js";
import { M as Mail, E as Eye } from "./mail-DxZJM82z.js";
import { L as Lock } from "./lock-BX_e6_BH.js";
import { E as EyeOff } from "./eye-off-DiUdBOCP.js";
import { C as CircleHelp } from "./circle-help-B6_acZou.js";
import { R as RefreshCw } from "./refresh-cw-CQHMwaYf.js";
const SECURITY_QUESTIONS = [
  "What is the name of your first pet?",
  "What city were you born in?",
  "What is your mother's maiden name?",
  "What was the name of your first school?",
  "What is your favourite movie?",
  "What was the make of your first car?",
  "What is your oldest sibling's middle name?",
  "What street did you grow up on?"
];
function validateEmail(email) {
  if (!email) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Enter a valid email address.";
  return null;
}
function validatePassword(password) {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  return null;
}
function validateConfirmPassword(password, confirm) {
  if (!confirm) return "Please confirm your password.";
  if (password !== confirm) return "Passwords do not match.";
  return null;
}
function generateChallenge() {
  return {
    a: Math.floor(Math.random() * 9) + 1,
    b: Math.floor(Math.random() * 9) + 1
  };
}
function RegisterPage() {
  const { isAuthenticated, isLoading, user, register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showPassword, setShowPassword] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [securityQuestion, setSecurityQuestion] = reactExports.useState(
    SECURITY_QUESTIONS[0]
  );
  const [securityAnswer, setSecurityAnswer] = reactExports.useState("");
  const [securityAnswerError, setSecurityAnswerError] = reactExports.useState(
    null
  );
  const [emailError, setEmailError] = reactExports.useState(null);
  const [passwordError, setPasswordError] = reactExports.useState(null);
  const [confirmError, setConfirmError] = reactExports.useState(null);
  const [challenge, setChallenge] = reactExports.useState(
    generateChallenge
  );
  const [captchaAnswer, setCaptchaAnswer] = reactExports.useState("");
  const [captchaError, setCaptchaError] = reactExports.useState(null);
  const [submitting, setSubmitting] = reactExports.useState(false);
  const [serverError, setServerError] = reactExports.useState(null);
  const emailRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (isAuthenticated && user && !isLoading) {
      void navigate({
        to: user.role === "admin" ? "/admin/overview" : "/upload"
      });
    }
  }, [isAuthenticated, isLoading, user, navigate]);
  reactExports.useEffect(() => {
    var _a;
    (_a = emailRef.current) == null ? void 0 : _a.focus();
  }, []);
  const refreshChallenge = reactExports.useCallback(() => {
    setChallenge(generateChallenge());
    setCaptchaAnswer("");
    setCaptchaError(null);
  }, []);
  const isFormValid = reactExports.useMemo(
    () => !emailError && !passwordError && !confirmError && email.length > 0 && password.length > 0 && confirmPassword.length > 0 && securityAnswer.trim().length > 0 && captchaAnswer.length > 0 && !Number.isNaN(Number.parseInt(captchaAnswer, 10)),
    [
      emailError,
      passwordError,
      confirmError,
      email,
      password,
      confirmPassword,
      securityAnswer,
      captchaAnswer
    ]
  );
  const handleSubmit = async (e) => {
    e.preventDefault();
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    const cErr = validateConfirmPassword(password, confirmPassword);
    const sErr = !securityAnswer.trim() ? "Security answer is required." : null;
    setEmailError(eErr);
    setPasswordError(pErr);
    setConfirmError(cErr);
    setSecurityAnswerError(sErr);
    if (eErr || pErr || cErr || sErr) return;
    const expected = challenge.a + challenge.b;
    if (Number.parseInt(captchaAnswer, 10) !== expected) {
      setCaptchaError("Incorrect answer, please try again.");
      refreshChallenge();
      return;
    }
    setCaptchaError(null);
    setSubmitting(true);
    setServerError(null);
    const result = await register(email, password);
    if (!result.ok) {
      setServerError(result.error ?? "Registration failed. Please try again.");
      setSubmitting(false);
      refreshChallenge();
      return;
    }
    const destination = result.role === "admin" ? "/admin/overview" : "/upload";
    window.location.href = destination;
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen gradient-flow bg-grid-pattern flex flex-col relative overflow-hidden", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        onClick: () => void navigate({ to: "/login" }),
        "aria-label": "Go back to login",
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
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-secondary/5 blur-[80px]" })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 flex flex-col items-center justify-center px-6 py-16 relative z-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-4xl flex flex-col lg:flex-row items-center gap-12 lg:gap-16", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          className: "flex-1 flex flex-col gap-7 text-center lg:text-left",
          initial: { opacity: 0, x: -24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 justify-center lg:justify-start", children: [
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
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { className: "font-display font-bold text-4xl sm:text-5xl leading-[1.1] text-foreground", children: [
                "Join the",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-accent relative", children: [
                  "future",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-accent to-transparent" })
                ] }),
                " ",
                "of hiring"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0", children: "Create your account to start screening resumes with AI-powered skill extraction, scoring, and job matching." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: [
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCheck, { className: "size-4" }),
                text: "Free to get started — no credit card"
              },
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-4" }),
                text: "Your data is private and secure"
              },
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4" }),
                text: "AI-powered scoring and matching"
              }
            ].map((item, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "flex items-center gap-3 text-sm text-muted-foreground",
                initial: { opacity: 0, x: -12 },
                animate: { opacity: 1, x: 0 },
                transition: {
                  delay: 0.2 + i * 0.08,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1]
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-accent/10 border border-accent/20 text-accent shrink-0", children: item.icon }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.text })
                ]
              },
              item.text
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "w-full max-w-sm lg:w-[400px] shrink-0",
          initial: { opacity: 0, x: 24 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] },
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-7 flex flex-col gap-5 relative overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: "absolute inset-0 rounded-2xl pointer-events-none",
                style: {
                  background: "radial-gradient(ellipse at 30% 0%, oklch(0.62 0.22 300 / 0.06) 0%, transparent 65%)"
                },
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(UserPlus, { className: "size-5 text-accent", "aria-hidden": "true" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: "Create account" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "Fill in your details below to get started." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border/30" }),
            submitting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "flex flex-col items-center gap-3 py-6",
                "data-ocid": "reg-loading",
                "aria-live": "polite",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-medium text-foreground", children: "Creating your account…" })
                ]
              }
            ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "form",
              {
                onSubmit: handleSubmit,
                className: "flex flex-col gap-4",
                noValidate: true,
                children: [
                  serverError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                    motion.p,
                    {
                      className: "text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2",
                      initial: { opacity: 0, y: -6 },
                      animate: { opacity: 1, y: 0 },
                      "data-ocid": "reg-error",
                      role: "alert",
                      children: serverError
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "reg-email",
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
                          id: "reg-email",
                          type: "email",
                          autoComplete: "email",
                          value: email,
                          onChange: (e) => {
                            setEmail(e.target.value);
                            setEmailError(null);
                          },
                          onBlur: () => setEmailError(validateEmail(email)),
                          placeholder: "you@example.com",
                          required: true,
                          disabled: isLoading,
                          "data-ocid": "input-reg-email",
                          "aria-describedby": emailError ? "reg-email-err" : void 0,
                          "aria-invalid": !!emailError,
                          className: `w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50 ${emailError ? "border-destructive/50" : "border-border/40"}`
                        }
                      )
                    ] }),
                    emailError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        id: "reg-email-err",
                        className: "text-xs text-destructive",
                        role: "alert",
                        children: emailError
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "reg-password",
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
                          id: "reg-password",
                          type: showPassword ? "text" : "password",
                          autoComplete: "new-password",
                          value: password,
                          onChange: (e) => {
                            setPassword(e.target.value);
                            setPasswordError(null);
                          },
                          onBlur: () => setPasswordError(validatePassword(password)),
                          placeholder: "Min. 8 characters",
                          required: true,
                          disabled: isLoading,
                          "data-ocid": "input-reg-password",
                          "aria-describedby": passwordError ? "reg-password-err" : void 0,
                          "aria-invalid": !!passwordError,
                          className: `w-full pl-10 pr-11 py-2.5 rounded-xl bg-muted/30 border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50 ${passwordError ? "border-destructive/50" : "border-border/40"}`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowPassword((v) => !v),
                          "aria-label": showPassword ? "Hide password" : "Show password",
                          disabled: isLoading,
                          "data-ocid": "btn-toggle-password",
                          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-accent transition-colors focus:outline-none focus-visible:text-accent disabled:opacity-40",
                          children: showPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-4", "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-4", "aria-hidden": "true" })
                        }
                      )
                    ] }),
                    passwordError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        id: "reg-password-err",
                        className: "text-xs text-destructive",
                        role: "alert",
                        children: passwordError
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "reg-confirm",
                        className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                        children: "Confirm password"
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
                          id: "reg-confirm",
                          type: showConfirm ? "text" : "password",
                          autoComplete: "new-password",
                          value: confirmPassword,
                          onChange: (e) => {
                            setConfirmPassword(e.target.value);
                            setConfirmError(null);
                          },
                          onBlur: () => setConfirmError(
                            validateConfirmPassword(password, confirmPassword)
                          ),
                          placeholder: "Repeat your password",
                          required: true,
                          disabled: isLoading,
                          "data-ocid": "input-reg-confirm",
                          "aria-describedby": confirmError ? "reg-confirm-err" : void 0,
                          "aria-invalid": !!confirmError,
                          className: `w-full pl-10 pr-11 py-2.5 rounded-xl bg-muted/30 border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50 ${confirmError ? "border-destructive/50" : "border-border/40"}`
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => setShowConfirm((v) => !v),
                          "aria-label": showConfirm ? "Hide confirm password" : "Show confirm password",
                          disabled: isLoading,
                          "data-ocid": "btn-toggle-confirm",
                          className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-accent transition-colors focus:outline-none focus-visible:text-accent disabled:opacity-40",
                          children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-4", "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-4", "aria-hidden": "true" })
                        }
                      )
                    ] }),
                    confirmError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        id: "reg-confirm-err",
                        className: "text-xs text-destructive",
                        role: "alert",
                        children: confirmError
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "label",
                      {
                        htmlFor: "reg-security-question",
                        className: "text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "size-3", "aria-hidden": "true" }),
                          "Security question"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "select",
                        {
                          id: "reg-security-question",
                          value: securityQuestion,
                          onChange: (e) => setSecurityQuestion(e.target.value),
                          disabled: isLoading,
                          "data-ocid": "select-security-question",
                          className: "w-full pl-3 pr-8 py-2.5 rounded-xl bg-muted/30 border border-border/40 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50 appearance-none",
                          children: SECURITY_QUESTIONS.map((q) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "option",
                            {
                              value: q,
                              className: "bg-card text-foreground",
                              children: q
                            },
                            q
                          ))
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "svg",
                        {
                          className: "size-3.5",
                          fill: "none",
                          viewBox: "0 0 24 24",
                          stroke: "currentColor",
                          strokeWidth: 2,
                          "aria-hidden": "true",
                          role: "img",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Expand" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "path",
                              {
                                strokeLinecap: "round",
                                strokeLinejoin: "round",
                                d: "M19 9l-7 7-7-7"
                              }
                            )
                          ]
                        }
                      ) })
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "label",
                      {
                        htmlFor: "reg-security-answer",
                        className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                        children: "Your answer"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Shield,
                        {
                          className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60 pointer-events-none",
                          "aria-hidden": "true"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "reg-security-answer",
                          type: "text",
                          autoComplete: "off",
                          value: securityAnswer,
                          onChange: (e) => {
                            setSecurityAnswer(e.target.value);
                            setSecurityAnswerError(null);
                          },
                          onBlur: () => setSecurityAnswerError(
                            !securityAnswer.trim() ? "Security answer is required." : null
                          ),
                          placeholder: "Your answer (case-insensitive)",
                          disabled: isLoading,
                          "data-ocid": "input-security-answer",
                          "aria-describedby": securityAnswerError ? "reg-sec-err" : void 0,
                          "aria-invalid": !!securityAnswerError,
                          className: `w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50 ${securityAnswerError ? "border-destructive/50" : "border-border/40"}`
                        }
                      )
                    ] }),
                    securityAnswerError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        id: "reg-sec-err",
                        className: "text-xs text-destructive",
                        role: "alert",
                        children: securityAnswerError
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "reg-captcha",
                          className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                          children: "Verification"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "button",
                        {
                          type: "button",
                          onClick: refreshChallenge,
                          "aria-label": "New question",
                          "data-ocid": "btn-captcha-refresh",
                          className: "flex items-center gap-1 text-xs text-muted-foreground/70 hover:text-accent transition-colors focus:outline-none focus-visible:text-accent",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(RefreshCw, { className: "size-3", "aria-hidden": "true" }),
                            "New question"
                          ]
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 rounded-xl bg-muted/30 border border-border/40 px-4 py-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "div",
                        {
                          className: "flex items-center gap-1.5 shrink-0",
                          "aria-live": "polite",
                          "aria-label": `What is ${challenge.a} plus ${challenge.b}?`,
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg text-foreground tabular-nums", children: challenge.a }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent font-bold text-lg", children: "+" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-bold text-lg text-foreground tabular-nums", children: challenge.b }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground font-medium ml-0.5", children: "=" })
                          ]
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          id: "reg-captcha",
                          type: "number",
                          inputMode: "numeric",
                          min: 2,
                          max: 18,
                          value: captchaAnswer,
                          onChange: (e) => {
                            setCaptchaAnswer(e.target.value);
                            setCaptchaError(null);
                          },
                          placeholder: "?",
                          required: true,
                          disabled: isLoading,
                          "data-ocid": "input-captcha",
                          "aria-describedby": captchaError ? "reg-captcha-err" : void 0,
                          "aria-invalid": !!captchaError,
                          className: `w-16 text-center py-1.5 rounded-lg bg-card border text-sm font-display font-semibold text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${captchaError ? "border-destructive/50" : "border-border/40"}`
                        }
                      )
                    ] }),
                    captchaError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        id: "reg-captcha-err",
                        className: "text-xs text-destructive",
                        role: "alert",
                        "data-ocid": "captcha-error",
                        children: captchaError
                      }
                    )
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      type: "submit",
                      disabled: !isFormValid || isLoading,
                      size: "lg",
                      className: "w-full bg-accent hover:bg-accent/90 text-accent-foreground font-display font-semibold accent-glow transition-smooth gap-2 mt-1",
                      "data-ocid": "btn-register-submit",
                      children: "Create account"
                    }
                  )
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-sm text-muted-foreground border-t border-border/20 pt-4", children: [
              "Already have an account?",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "text-accent hover:text-accent/80 font-medium transition-colors",
                  "data-ocid": "link-login",
                  onClick: () => void navigate({ to: "/login" }),
                  children: "Sign in"
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
      " AI Resume Screening Portal"
    ] }) })
  ] });
}
export {
  RegisterPage as default
};
