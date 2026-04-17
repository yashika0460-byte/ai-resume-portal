/**
 * ForgotPasswordPage.tsx — Two-step password reset via security question.
 *
 * Step 1: Enter email → fetch security question from backend
 * Step 2: Answer security question + enter new password → reset
 *
 * Matches glass-morphism design of LoginPage and RegisterPage exactly.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BrainCircuit,
  ChevronLeft,
  Eye,
  EyeOff,
  HelpCircle,
  KeyRound,
  Lock,
  Mail,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { BackendActor } from "../api";
import {
  apiGetSecurityQuestion,
  apiResetPasswordBySecurityQuestion,
} from "../api";
import { createActor } from "../backend";
import { Button } from "../components/ui/AppButton";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";

// ─── Component ────────────────────────────────────────────────────────────────

export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { actor: rawActor } = useActor(createActor);
  const actor = rawActor as BackendActor | null;

  // Step 1 state
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [fetchingQuestion, setFetchingQuestion] = useState(false);
  const [step1Error, setStep1Error] = useState<string | null>(null);

  // Step 2 state
  const [step, setStep] = useState<1 | 2>(1);
  const [securityQuestion, setSecurityQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [answerError, setAnswerError] = useState<string | null>(null);
  const [newPasswordError, setNewPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const [resetting, setResetting] = useState(false);
  const [step2Error, setStep2Error] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);
  const answerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  useEffect(() => {
    if (step === 2) {
      setTimeout(() => answerRef.current?.focus(), 100);
    }
  }, [step]);

  // ── Validation ──

  function validateEmail(v: string): string | null {
    if (!v) return "Email is required.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v))
      return "Enter a valid email address.";
    return null;
  }

  function validateAnswer(v: string): string | null {
    if (!v.trim()) return "Answer is required.";
    return null;
  }

  function validateNewPassword(v: string): string | null {
    if (!v) return "New password is required.";
    if (v.length < 8) return "Password must be at least 8 characters.";
    return null;
  }

  function validateConfirm(pw: string, confirm: string): string | null {
    if (!confirm) return "Please confirm your new password.";
    if (pw !== confirm) return "Passwords do not match.";
    return null;
  }

  // ── Step 1: Fetch security question ──

  const handleStep1Submit = async (e: React.FormEvent) => {
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
          "No security question set for this account. Contact admin.",
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

  // ── Step 2: Reset password ──

  const handleStep2Submit = async (e: React.FormEvent) => {
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
        newPassword,
      );
      if (result.success) {
        setSuccessMessage(
          "Password reset successfully! Redirecting to sign in…",
        );
        setTimeout(() => navigate({ to: "/login" }), 2000);
      } else {
        setStep2Error(result.error ?? "Incorrect answer. Please try again.");
      }
    } catch {
      setStep2Error("Reset failed. Please try again.");
    } finally {
      setResetting(false);
    }
  };

  const isStep2Valid =
    !answerError &&
    !newPasswordError &&
    !confirmError &&
    answer.trim().length > 0 &&
    newPassword.length > 0 &&
    confirmPassword.length > 0;

  return (
    <div className="min-h-screen gradient-flow bg-grid-pattern flex flex-col relative overflow-hidden">
      {/* ── Back button ── */}
      <button
        type="button"
        onClick={() => window.history.back()}
        aria-label="Go back"
        data-ocid="btn-back"
        className="fixed top-4 left-4 z-50 flex items-center justify-center size-9 rounded-xl bg-muted/30 border border-border/40 text-muted-foreground hover:text-accent hover:border-accent/50 hover:bg-accent/10 backdrop-blur-sm transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>

      {/* ── Ambient blobs ── */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute -top-60 -left-60 w-[500px] h-[500px] rounded-full bg-primary/8 blur-[100px]" />
        <div className="absolute -bottom-60 -right-60 w-[500px] h-[500px] rounded-full bg-accent/8 blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-secondary/5 blur-[80px]" />
        <div className="absolute top-16 right-[20%] w-1.5 h-1.5 rounded-full bg-accent/40" />
        <div className="absolute top-[30%] right-[10%] w-1 h-1 rounded-full bg-primary/40" />
        <div className="absolute bottom-[25%] left-[15%] w-1.5 h-1.5 rounded-full bg-accent/30" />
        <div className="absolute bottom-16 left-[35%] w-1 h-1 rounded-full bg-primary/30" />
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 relative z-10">
        <div className="w-full max-w-4xl flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          {/* Left — Branding */}
          <motion.div
            className="flex-1 flex flex-col gap-7 text-center lg:text-left"
            initial={{ opacity: 0, x: -24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 justify-center lg:justify-start">
              <div className="relative p-2.5 rounded-2xl bg-accent/15 border border-accent/30">
                <BrainCircuit className="size-7 text-accent" />
                <div className="absolute inset-0 rounded-2xl bg-accent/5 blur-sm" />
              </div>
              <div>
                <div className="font-display font-bold text-xl text-foreground leading-none">
                  TalentScan<span className="text-accent">AI</span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 font-body">
                  AI Resume Screening Portal
                </div>
              </div>
            </div>

            {/* Headline */}
            <div className="flex flex-col gap-3">
              <h1 className="font-display font-bold text-4xl sm:text-5xl leading-[1.1] text-foreground">
                Recover your{" "}
                <span className="text-accent relative">
                  account
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-accent to-transparent" />
                </span>
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                Answer your security question to verify your identity and set a
                new password.
              </p>
            </div>

            {/* Steps */}
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: <Mail className="size-4" />,
                  label: "Enter your email",
                  active: step === 1,
                  done: step === 2,
                },
                {
                  icon: <HelpCircle className="size-4" />,
                  label: "Answer security question",
                  active: step === 2,
                  done: false,
                },
                {
                  icon: <KeyRound className="size-4" />,
                  label: "Set new password",
                  active: step === 2,
                  done: false,
                },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  className={`flex items-center gap-3 text-sm transition-smooth ${
                    s.active
                      ? "text-accent"
                      : s.done
                        ? "text-accent/60"
                        : "text-muted-foreground/50"
                  }`}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.2 + i * 0.08,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div
                    className={`p-1.5 rounded-lg border shrink-0 transition-smooth ${
                      s.active
                        ? "bg-accent/10 border-accent/20 text-accent"
                        : s.done
                          ? "bg-accent/5 border-accent/10 text-accent/60"
                          : "bg-muted/20 border-border/20"
                    }`}
                  >
                    {s.icon}
                  </div>
                  <span>{s.label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Card */}
          <motion.div
            className="w-full max-w-sm lg:w-[380px] shrink-0"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden">
              {/* Inner glow */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at top, oklch(0.72 0.18 198 / 0.06) 0%, transparent 70%)",
                }}
                aria-hidden="true"
              />

              {/* Step indicator */}
              <div className="flex items-center gap-2 relative">
                <div
                  className={`size-6 rounded-full flex items-center justify-center text-xs font-bold border transition-smooth ${step === 1 ? "bg-accent/20 border-accent/40 text-accent" : "bg-accent/10 border-accent/20 text-accent/60"}`}
                >
                  1
                </div>
                <div className="flex-1 h-px bg-border/30" />
                <div
                  className={`size-6 rounded-full flex items-center justify-center text-xs font-bold border transition-smooth ${step === 2 ? "bg-accent/20 border-accent/40 text-accent" : "bg-muted/20 border-border/30 text-muted-foreground/40"}`}
                >
                  2
                </div>
              </div>

              {/* Card header */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={`header-${step}`}
                  className="flex flex-col gap-2 relative"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                >
                  <div className="flex items-center gap-2">
                    {step === 1 ? (
                      <KeyRound
                        className="size-5 text-accent"
                        aria-hidden="true"
                      />
                    ) : (
                      <ShieldCheck
                        className="size-5 text-accent"
                        aria-hidden="true"
                      />
                    )}
                    <h2 className="font-display font-bold text-2xl text-foreground">
                      {step === 1 ? "Forgot password" : "Verify identity"}
                    </h2>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step === 1
                      ? "Enter your email to retrieve your security question."
                      : "Answer your security question and set a new password."}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Separator */}
              <div className="h-px bg-border/30" />

              {/* Success message */}
              <AnimatePresence>
                {successMessage && (
                  <motion.div
                    className="text-xs text-accent bg-accent/10 border border-accent/20 rounded-lg px-3 py-2"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    aria-live="polite"
                    data-ocid="reset-success"
                  >
                    {successMessage}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* ── Step 1 Form ── */}
              <AnimatePresence mode="wait">
                {step === 1 && (
                  <motion.form
                    key="step1"
                    onSubmit={handleStep1Submit}
                    className="flex flex-col gap-4 relative"
                    noValidate
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Email field */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="fp-email"
                        className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                      >
                        Email address
                      </label>
                      <div className="relative">
                        <Mail
                          className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          ref={emailRef}
                          id="fp-email"
                          type="email"
                          autoComplete="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                            setEmailError(null);
                            setStep1Error(null);
                          }}
                          onBlur={() => setEmailError(validateEmail(email))}
                          placeholder="you@portal.com"
                          required
                          disabled={fetchingQuestion}
                          data-ocid="input-fp-email"
                          aria-describedby={
                            emailError ? "fp-email-err" : undefined
                          }
                          aria-invalid={!!emailError}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50 ${emailError ? "border-destructive/50" : "border-border/40"}`}
                        />
                      </div>
                      {emailError && (
                        <p
                          id="fp-email-err"
                          className="text-xs text-destructive"
                          role="alert"
                        >
                          {emailError}
                        </p>
                      )}
                    </div>

                    {/* Step 1 error */}
                    {step1Error && (
                      <motion.p
                        className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        data-ocid="fp-step1-error"
                        role="alert"
                      >
                        {step1Error}
                      </motion.p>
                    )}

                    {/* Submit */}
                    {fetchingQuestion ? (
                      <div
                        className="flex flex-col items-center gap-3 py-3"
                        aria-live="polite"
                      >
                        <LoadingSpinner size="lg" />
                        <p className="text-sm font-display font-medium text-foreground">
                          Looking up account…
                        </p>
                      </div>
                    ) : (
                      <Button
                        type="submit"
                        disabled={!email}
                        size="lg"
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-display font-semibold accent-glow transition-smooth gap-2 mt-1"
                        data-ocid="btn-fp-next"
                      >
                        <ArrowRight className="size-4 shrink-0" />
                        Continue
                      </Button>
                    )}
                  </motion.form>
                )}

                {/* ── Step 2 Form ── */}
                {step === 2 && (
                  <motion.form
                    key="step2"
                    onSubmit={handleStep2Submit}
                    className="flex flex-col gap-4 relative"
                    noValidate
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25 }}
                  >
                    {/* Security question display */}
                    <div
                      className="rounded-xl p-3.5 flex items-start gap-2.5 text-xs"
                      style={{ background: "oklch(0.90 0.012 240 / 0.6)" }}
                    >
                      <HelpCircle
                        className="size-3.5 shrink-0 mt-0.5 text-accent/70"
                        aria-hidden="true"
                      />
                      <div className="leading-relaxed space-y-0.5">
                        <p className="text-foreground/70 font-medium uppercase tracking-wide text-[10px]">
                          Your security question
                        </p>
                        <p className="text-foreground/90 text-sm font-medium">
                          {securityQuestion}
                        </p>
                      </div>
                    </div>

                    {/* Answer field */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="fp-answer"
                        className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                      >
                        Your answer
                      </label>
                      <div className="relative">
                        <ShieldCheck
                          className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          ref={answerRef}
                          id="fp-answer"
                          type="text"
                          autoComplete="off"
                          value={answer}
                          onChange={(e) => {
                            setAnswer(e.target.value);
                            setAnswerError(null);
                            setStep2Error(null);
                          }}
                          onBlur={() => setAnswerError(validateAnswer(answer))}
                          placeholder="Enter your answer"
                          required
                          disabled={resetting || !!successMessage}
                          data-ocid="input-fp-answer"
                          aria-describedby={
                            answerError ? "fp-answer-err" : undefined
                          }
                          aria-invalid={!!answerError}
                          className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50 ${answerError ? "border-destructive/50" : "border-border/40"}`}
                        />
                      </div>
                      {answerError && (
                        <p
                          id="fp-answer-err"
                          className="text-xs text-destructive"
                          role="alert"
                        >
                          {answerError}
                        </p>
                      )}
                    </div>

                    {/* New password field */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="fp-new-password"
                        className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                      >
                        New password
                      </label>
                      <div className="relative">
                        <Lock
                          className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          id="fp-new-password"
                          type={showNewPassword ? "text" : "password"}
                          autoComplete="new-password"
                          value={newPassword}
                          onChange={(e) => {
                            setNewPassword(e.target.value);
                            setNewPasswordError(null);
                          }}
                          onBlur={() =>
                            setNewPasswordError(
                              validateNewPassword(newPassword),
                            )
                          }
                          placeholder="Min. 8 characters"
                          required
                          disabled={resetting || !!successMessage}
                          data-ocid="input-fp-new-password"
                          aria-describedby={
                            newPasswordError ? "fp-new-pw-err" : undefined
                          }
                          aria-invalid={!!newPasswordError}
                          className={`w-full pl-10 pr-11 py-2.5 rounded-xl bg-muted/30 border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50 ${newPasswordError ? "border-destructive/50" : "border-border/40"}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword((v) => !v)}
                          aria-label={
                            showNewPassword ? "Hide password" : "Show password"
                          }
                          disabled={resetting || !!successMessage}
                          data-ocid="btn-toggle-new-password"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-accent transition-colors focus:outline-none focus-visible:text-accent disabled:opacity-40"
                        >
                          {showNewPassword ? (
                            <EyeOff className="size-4" aria-hidden="true" />
                          ) : (
                            <Eye className="size-4" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                      {newPasswordError && (
                        <p
                          id="fp-new-pw-err"
                          className="text-xs text-destructive"
                          role="alert"
                        >
                          {newPasswordError}
                        </p>
                      )}
                    </div>

                    {/* Confirm password field */}
                    <div className="flex flex-col gap-1.5">
                      <label
                        htmlFor="fp-confirm"
                        className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                      >
                        Confirm password
                      </label>
                      <div className="relative">
                        <Lock
                          className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60 pointer-events-none"
                          aria-hidden="true"
                        />
                        <input
                          id="fp-confirm"
                          type={showConfirm ? "text" : "password"}
                          autoComplete="new-password"
                          value={confirmPassword}
                          onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setConfirmError(null);
                          }}
                          onBlur={() =>
                            setConfirmError(
                              validateConfirm(newPassword, confirmPassword),
                            )
                          }
                          placeholder="Repeat new password"
                          required
                          disabled={resetting || !!successMessage}
                          data-ocid="input-fp-confirm"
                          aria-describedby={
                            confirmError ? "fp-confirm-err" : undefined
                          }
                          aria-invalid={!!confirmError}
                          className={`w-full pl-10 pr-11 py-2.5 rounded-xl bg-muted/30 border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50 ${confirmError ? "border-destructive/50" : "border-border/40"}`}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirm((v) => !v)}
                          aria-label={
                            showConfirm
                              ? "Hide confirm password"
                              : "Show confirm password"
                          }
                          disabled={resetting || !!successMessage}
                          data-ocid="btn-toggle-confirm"
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-accent transition-colors focus:outline-none focus-visible:text-accent disabled:opacity-40"
                        >
                          {showConfirm ? (
                            <EyeOff className="size-4" aria-hidden="true" />
                          ) : (
                            <Eye className="size-4" aria-hidden="true" />
                          )}
                        </button>
                      </div>
                      {confirmError && (
                        <p
                          id="fp-confirm-err"
                          className="text-xs text-destructive"
                          role="alert"
                        >
                          {confirmError}
                        </p>
                      )}
                    </div>

                    {/* Step 2 error */}
                    {step2Error && (
                      <motion.p
                        className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        data-ocid="fp-step2-error"
                        role="alert"
                      >
                        {step2Error}
                      </motion.p>
                    )}

                    {/* Submit */}
                    {resetting ? (
                      <div
                        className="flex flex-col items-center gap-3 py-3"
                        aria-live="polite"
                      >
                        <LoadingSpinner size="lg" />
                        <p className="text-sm font-display font-medium text-foreground">
                          Resetting password…
                        </p>
                      </div>
                    ) : (
                      <Button
                        type="submit"
                        disabled={!isStep2Valid || !!successMessage}
                        size="lg"
                        className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-display font-semibold accent-glow transition-smooth gap-2 mt-1"
                        data-ocid="btn-fp-reset"
                      >
                        <Sparkles className="size-4 shrink-0" />
                        Reset password
                      </Button>
                    )}

                    {/* Back to step 1 */}
                    <button
                      type="button"
                      className="text-xs text-muted-foreground hover:text-accent transition-colors text-center"
                      onClick={() => {
                        setStep(1);
                        setStep2Error(null);
                        setAnswer("");
                        setNewPassword("");
                        setConfirmPassword("");
                      }}
                      data-ocid="btn-fp-back-step1"
                    >
                      ← Use a different email
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* Sign in link */}
              <div className="text-center text-sm text-muted-foreground">
                Remember your password?{" "}
                <button
                  type="button"
                  className="text-accent hover:text-accent/80 font-medium transition-colors"
                  data-ocid="link-login"
                  onClick={() => void navigate({ to: "/login" })}
                >
                  Sign in
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Footer ── */}
      <footer className="border-t border-border/20 backdrop-blur-sm py-4 px-6 relative z-10">
        <p className="text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent hover:underline"
          >
            caffeine.ai
          </a>
        </p>
      </footer>
    </div>
  );
}
