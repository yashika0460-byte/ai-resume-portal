import { c as createLucideIcon, a as useNavigate, d as useActor, r as reactExports, j as jsxRuntimeExports, B as BrainCircuit, L as LoadingSpinner, b as Button, e as createActor } from "./index-C0uoDo9R.js";
import { a as apiGetSecurityQuestion, b as apiResetPasswordBySecurityQuestion } from "./api-D_-AFWZL.js";
import { C as ChevronLeft } from "./chevron-left-BAAQAeGr.js";
import { m as motion } from "./proxy-Ds80ngds.js";
import { M as Mail, E as Eye } from "./mail-dBIi1Y1w.js";
import { A as AnimatePresence } from "./index-BJruk7Te.js";
import { S as ShieldCheck } from "./shield-check-CxpDo2en.js";
import { A as ArrowRight } from "./arrow-right-CA5Iy8wj.js";
import { L as Lock } from "./lock-6omcHBRA.js";
import { E as EyeOff } from "./eye-off-CVumWf_P.js";
import { S as Sparkles } from "./sparkles-DVsEdvjY.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3", key: "1u773s" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const CircleHelp = createLucideIcon("circle-help", __iconNode$1);
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
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
];
const KeyRound = createLucideIcon("key-round", __iconNode);
function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { actor: rawActor } = useActor(createActor);
  const actor = rawActor;
  const [email, setEmail] = reactExports.useState("");
  const [emailError, setEmailError] = reactExports.useState(null);
  const [fetchingQuestion, setFetchingQuestion] = reactExports.useState(false);
  const [step1Error, setStep1Error] = reactExports.useState(null);
  const [step, setStep] = reactExports.useState(1);
  const [securityQuestion, setSecurityQuestion] = reactExports.useState("");
  const [answer, setAnswer] = reactExports.useState("");
  const [newPassword, setNewPassword] = reactExports.useState("");
  const [confirmPassword, setConfirmPassword] = reactExports.useState("");
  const [showNewPassword, setShowNewPassword] = reactExports.useState(false);
  const [showConfirm, setShowConfirm] = reactExports.useState(false);
  const [answerError, setAnswerError] = reactExports.useState(null);
  const [newPasswordError, setNewPasswordError] = reactExports.useState(null);
  const [confirmError, setConfirmError] = reactExports.useState(null);
  const [resetting, setResetting] = reactExports.useState(false);
  const [step2Error, setStep2Error] = reactExports.useState(null);
  const [successMessage, setSuccessMessage] = reactExports.useState(null);
  const emailRef = reactExports.useRef(null);
  const answerRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    var _a;
    (_a = emailRef.current) == null ? void 0 : _a.focus();
  }, []);
  reactExports.useEffect(() => {
    if (step === 2) {
      setTimeout(() => {
        var _a;
        return (_a = answerRef.current) == null ? void 0 : _a.focus();
      }, 100);
    }
  }, [step]);
  function validateEmail(v) {
    if (!v) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
      return "Enter a valid email address.";
    return null;
  }
  function validateAnswer(v) {
    if (!v.trim()) return "Answer is required.";
    return null;
  }
  function validateNewPassword(v) {
    if (!v) return "New password is required.";
    if (v.length < 8) return "Password must be at least 8 characters.";
    return null;
  }
  function validateConfirm(pw, confirm) {
    if (!confirm) return "Please confirm your new password.";
    if (pw !== confirm) return "Passwords do not match.";
    return null;
  }
  const handleStep1Submit = async (e) => {
    e.preventDefault();
    const err = validateEmail(email);
    setEmailError(err);
    if (err) return;
    setFetchingQuestion(true);
    setStep1Error(null);
    try {
      if (!actor) {
        setStep1Error("Service not available. Please try again.");
        return;
      }
      const question = await apiGetSecurityQuestion(actor, email);
      if (question === null) {
        setStep1Error(
          "No security question set for this account. Contact admin."
        );
      } else {
        setSecurityQuestion(question);
        setStep(2);
      }
    } catch {
      setStep1Error("Unable to retrieve security question. Please try again.");
    } finally {
      setFetchingQuestion(false);
    }
  };
  const handleStep2Submit = async (e) => {
    e.preventDefault();
    const aErr = validateAnswer(answer);
    const pErr = validateNewPassword(newPassword);
    const cErr = validateConfirm(newPassword, confirmPassword);
    setAnswerError(aErr);
    setNewPasswordError(pErr);
    setConfirmError(cErr);
    if (aErr || pErr || cErr) return;
    setResetting(true);
    setStep2Error(null);
    try {
      if (!actor) {
        setStep2Error("Service not available. Please try again.");
        return;
      }
      const result = await apiResetPasswordBySecurityQuestion(
        actor,
        email,
        answer,
        newPassword
      );
      if (result.success) {
        setSuccessMessage(
          "Password reset successfully! Redirecting to sign in…"
        );
        setTimeout(() => navigate({ to: "/login" }), 2e3);
      } else {
        setStep2Error(result.error ?? "Incorrect answer. Please try again.");
      }
    } catch {
      setStep2Error("Reset failed. Please try again.");
    } finally {
      setResetting(false);
    }
  };
  const isStep2Valid = !answerError && !newPasswordError && !confirmError && answer.trim().length > 0 && newPassword.length > 0 && confirmPassword.length > 0;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen gradient-flow bg-grid-pattern flex flex-col relative overflow-hidden", children: [
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
                "Recover your",
                " ",
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-accent relative", children: [
                  "account",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-accent to-transparent" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0", children: "Answer your security question to verify your identity and set a new password." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-3", children: [
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4" }),
                label: "Enter your email",
                active: step === 1,
                done: step === 2
              },
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(CircleHelp, { className: "size-4" }),
                label: "Answer security question",
                active: step === 2,
                done: false
              },
              {
                icon: /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { className: "size-4" }),
                label: "Set new password",
                active: step === 2,
                done: false
              }
            ].map((s, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: `flex items-center gap-3 text-sm transition-smooth ${s.active ? "text-accent" : s.done ? "text-accent/60" : "text-muted-foreground/50"}`,
                initial: { opacity: 0, x: -12 },
                animate: { opacity: 1, x: 0 },
                transition: {
                  delay: 0.2 + i * 0.08,
                  duration: 0.4,
                  ease: [0.16, 1, 0.3, 1]
                },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: `p-1.5 rounded-lg border shrink-0 transition-smooth ${s.active ? "bg-accent/10 border-accent/20 text-accent" : s.done ? "bg-accent/5 border-accent/10 text-accent/60" : "bg-muted/20 border-border/20"}`,
                      children: s.icon
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: s.label })
                ]
              },
              s.label
            )) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        motion.div,
        {
          className: "w-full max-w-sm lg:w-[380px] shrink-0",
          initial: { opacity: 0, x: 24 },
          animate: { opacity: 1, x: 0 },
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
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 relative", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `size-6 rounded-full flex items-center justify-center text-xs font-bold border transition-smooth ${step === 1 ? "bg-accent/20 border-accent/40 text-accent" : "bg-accent/10 border-accent/20 text-accent/60"}`,
                  children: "1"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex-1 h-px bg-border/30" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: `size-6 rounded-full flex items-center justify-center text-xs font-bold border transition-smooth ${step === 2 ? "bg-accent/20 border-accent/40 text-accent" : "bg-muted/20 border-border/30 text-muted-foreground/40"}`,
                  children: "2"
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "wait", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              motion.div,
              {
                className: "flex flex-col gap-2 relative",
                initial: { opacity: 0, y: 8 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: -8 },
                transition: { duration: 0.25 },
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                    step === 1 ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                      KeyRound,
                      {
                        className: "size-5 text-accent",
                        "aria-hidden": "true"
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx(
                      ShieldCheck,
                      {
                        className: "size-5 text-accent",
                        "aria-hidden": "true"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-bold text-2xl text-foreground", children: step === 1 ? "Forgot password" : "Verify identity" })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: step === 1 ? "Enter your email to retrieve your security question." : "Answer your security question and set a new password." })
                ]
              },
              `header-${step}`
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-px bg-border/30" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: successMessage && /* @__PURE__ */ jsxRuntimeExports.jsx(
              motion.div,
              {
                className: "text-xs text-accent bg-accent/10 border border-accent/20 rounded-lg px-3 py-2",
                initial: { opacity: 0, y: -6 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0 },
                "aria-live": "polite",
                "data-ocid": "reset-success",
                children: successMessage
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { mode: "wait", children: [
              step === 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.form,
                {
                  onSubmit: handleStep1Submit,
                  className: "flex flex-col gap-4 relative",
                  noValidate: true,
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: -20 },
                  transition: { duration: 0.25 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "fp-email",
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
                            id: "fp-email",
                            type: "email",
                            autoComplete: "email",
                            value: email,
                            onChange: (e) => {
                              setEmail(e.target.value);
                              setEmailError(null);
                              setStep1Error(null);
                            },
                            onBlur: () => setEmailError(validateEmail(email)),
                            placeholder: "you@portal.com",
                            required: true,
                            disabled: fetchingQuestion,
                            "data-ocid": "input-fp-email",
                            "aria-describedby": emailError ? "fp-email-err" : void 0,
                            "aria-invalid": !!emailError,
                            className: `w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50 ${emailError ? "border-destructive/50" : "border-border/40"}`
                          }
                        )
                      ] }),
                      emailError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          id: "fp-email-err",
                          className: "text-xs text-destructive",
                          role: "alert",
                          children: emailError
                        }
                      )
                    ] }),
                    step1Error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.p,
                      {
                        className: "text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2",
                        initial: { opacity: 0, y: -6 },
                        animate: { opacity: 1, y: 0 },
                        "data-ocid": "fp-step1-error",
                        role: "alert",
                        children: step1Error
                      }
                    ),
                    fetchingQuestion ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex flex-col items-center gap-3 py-3",
                        "aria-live": "polite",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-medium text-foreground", children: "Looking up account…" })
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "submit",
                        disabled: !email,
                        size: "lg",
                        className: "w-full bg-accent hover:bg-accent/90 text-accent-foreground font-display font-semibold accent-glow transition-smooth gap-2 mt-1",
                        "data-ocid": "btn-fp-next",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { className: "size-4 shrink-0" }),
                          "Continue"
                        ]
                      }
                    )
                  ]
                },
                "step1"
              ),
              step === 2 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.form,
                {
                  onSubmit: handleStep2Submit,
                  className: "flex flex-col gap-4 relative",
                  noValidate: true,
                  initial: { opacity: 0, x: 20 },
                  animate: { opacity: 1, x: 0 },
                  exit: { opacity: 0, x: -20 },
                  transition: { duration: 0.25 },
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "rounded-xl p-3.5 flex items-start gap-2.5 text-xs",
                        style: { background: "oklch(0.90 0.012 240 / 0.6)" },
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            CircleHelp,
                            {
                              className: "size-3.5 shrink-0 mt-0.5 text-accent/70",
                              "aria-hidden": "true"
                            }
                          ),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "leading-relaxed space-y-0.5", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/70 font-medium uppercase tracking-wide text-[10px]", children: "Your security question" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-foreground/90 text-sm font-medium", children: securityQuestion })
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "fp-answer",
                          className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                          children: "Your answer"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          ShieldCheck,
                          {
                            className: "absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60 pointer-events-none",
                            "aria-hidden": "true"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "input",
                          {
                            ref: answerRef,
                            id: "fp-answer",
                            type: "text",
                            autoComplete: "off",
                            value: answer,
                            onChange: (e) => {
                              setAnswer(e.target.value);
                              setAnswerError(null);
                              setStep2Error(null);
                            },
                            onBlur: () => setAnswerError(validateAnswer(answer)),
                            placeholder: "Enter your answer",
                            required: true,
                            disabled: resetting || !!successMessage,
                            "data-ocid": "input-fp-answer",
                            "aria-describedby": answerError ? "fp-answer-err" : void 0,
                            "aria-invalid": !!answerError,
                            className: `w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50 ${answerError ? "border-destructive/50" : "border-border/40"}`
                          }
                        )
                      ] }),
                      answerError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          id: "fp-answer-err",
                          className: "text-xs text-destructive",
                          role: "alert",
                          children: answerError
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "fp-new-password",
                          className: "text-xs font-medium text-muted-foreground uppercase tracking-wide",
                          children: "New password"
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
                            id: "fp-new-password",
                            type: showNewPassword ? "text" : "password",
                            autoComplete: "new-password",
                            value: newPassword,
                            onChange: (e) => {
                              setNewPassword(e.target.value);
                              setNewPasswordError(null);
                            },
                            onBlur: () => setNewPasswordError(
                              validateNewPassword(newPassword)
                            ),
                            placeholder: "Min. 8 characters",
                            required: true,
                            disabled: resetting || !!successMessage,
                            "data-ocid": "input-fp-new-password",
                            "aria-describedby": newPasswordError ? "fp-new-pw-err" : void 0,
                            "aria-invalid": !!newPasswordError,
                            className: `w-full pl-10 pr-11 py-2.5 rounded-xl bg-muted/30 border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50 ${newPasswordError ? "border-destructive/50" : "border-border/40"}`
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => setShowNewPassword((v) => !v),
                            "aria-label": showNewPassword ? "Hide password" : "Show password",
                            disabled: resetting || !!successMessage,
                            "data-ocid": "btn-toggle-new-password",
                            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-accent transition-colors focus:outline-none focus-visible:text-accent disabled:opacity-40",
                            children: showNewPassword ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-4", "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-4", "aria-hidden": "true" })
                          }
                        )
                      ] }),
                      newPasswordError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          id: "fp-new-pw-err",
                          className: "text-xs text-destructive",
                          role: "alert",
                          children: newPasswordError
                        }
                      )
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "label",
                        {
                          htmlFor: "fp-confirm",
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
                            id: "fp-confirm",
                            type: showConfirm ? "text" : "password",
                            autoComplete: "new-password",
                            value: confirmPassword,
                            onChange: (e) => {
                              setConfirmPassword(e.target.value);
                              setConfirmError(null);
                            },
                            onBlur: () => setConfirmError(
                              validateConfirm(newPassword, confirmPassword)
                            ),
                            placeholder: "Repeat new password",
                            required: true,
                            disabled: resetting || !!successMessage,
                            "data-ocid": "input-fp-confirm",
                            "aria-describedby": confirmError ? "fp-confirm-err" : void 0,
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
                            disabled: resetting || !!successMessage,
                            "data-ocid": "btn-toggle-confirm",
                            className: "absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-accent transition-colors focus:outline-none focus-visible:text-accent disabled:opacity-40",
                            children: showConfirm ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "size-4", "aria-hidden": "true" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-4", "aria-hidden": "true" })
                          }
                        )
                      ] }),
                      confirmError && /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "p",
                        {
                          id: "fp-confirm-err",
                          className: "text-xs text-destructive",
                          role: "alert",
                          children: confirmError
                        }
                      )
                    ] }),
                    step2Error && /* @__PURE__ */ jsxRuntimeExports.jsx(
                      motion.p,
                      {
                        className: "text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2",
                        initial: { opacity: 0, y: -6 },
                        animate: { opacity: 1, y: 0 },
                        "data-ocid": "fp-step2-error",
                        role: "alert",
                        children: step2Error
                      }
                    ),
                    resetting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "flex flex-col items-center gap-3 py-3",
                        "aria-live": "polite",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(LoadingSpinner, { size: "lg" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-display font-medium text-foreground", children: "Resetting password…" })
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Button,
                      {
                        type: "submit",
                        disabled: !isStep2Valid || !!successMessage,
                        size: "lg",
                        className: "w-full bg-accent hover:bg-accent/90 text-accent-foreground font-display font-semibold accent-glow transition-smooth gap-2 mt-1",
                        "data-ocid": "btn-fp-reset",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4 shrink-0" }),
                          "Reset password"
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "text-xs text-muted-foreground hover:text-accent transition-colors text-center",
                        onClick: () => {
                          setStep(1);
                          setStep2Error(null);
                          setAnswer("");
                          setNewPassword("");
                          setConfirmPassword("");
                        },
                        "data-ocid": "btn-fp-back-step1",
                        children: "← Use a different email"
                      }
                    )
                  ]
                },
                "step2"
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center text-sm text-muted-foreground", children: [
              "Remember your password?",
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
  ForgotPasswordPage as default
};
