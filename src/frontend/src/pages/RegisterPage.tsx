/**
 * RegisterPage.tsx — Self-registration for AI Resume Screening Portal.
 *
 * Fields: email, password, confirm password, security question + answer, math CAPTCHA.
 * CAPTCHA sits directly below confirm-password on the same page.
 * After register() succeeds, calls login() to persist the token before redirecting.
 */

import { useNavigate } from "@tanstack/react-router";
import {
  BrainCircuit,
  ChevronLeft,
  Eye,
  EyeOff,
  HelpCircle,
  Lock,
  Mail,
  RefreshCw,
  Shield,
  Sparkles,
  UserCheck,
  UserPlus,
} from "lucide-react";
import { motion } from "motion/react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Button } from "../components/ui/AppButton";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { useAuth } from "../hooks/use-auth";

// ─── Security question options ─────────────────────────────────────────────────

const SECURITY_QUESTIONS = [
  "What is the name of your first pet?",
  "What city were you born in?",
  "What is your mother's maiden name?",
  "What was the name of your first school?",
  "What is your favourite movie?",
  "What was the make of your first car?",
  "What is your oldest sibling's middle name?",
  "What street did you grow up on?",
];

// ─── Validation helpers ───────────────────────────────────────────────────────

function validateEmail(email: string): string | null {
  if (!email) return "Email is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return "Enter a valid email address.";
  return null;
}

function validatePassword(password: string): string | null {
  if (!password) return "Password is required.";
  if (password.length < 8) return "Password must be at least 8 characters.";
  return null;
}

function validateConfirmPassword(
  password: string,
  confirm: string,
): string | null {
  if (!confirm) return "Please confirm your password.";
  if (password !== confirm) return "Passwords do not match.";
  return null;
}

// ─── Math CAPTCHA generator ───────────────────────────────────────────────────

function generateChallenge(): { a: number; b: number } {
  return {
    a: Math.floor(Math.random() * 9) + 1,
    b: Math.floor(Math.random() * 9) + 1,
  };
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function RegisterPage() {
  const { isAuthenticated, isLoading, user, register } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // Security question
  const [securityQuestion, setSecurityQuestion] = useState(
    SECURITY_QUESTIONS[0],
  );
  const [securityAnswer, setSecurityAnswer] = useState("");
  const [securityAnswerError, setSecurityAnswerError] = useState<string | null>(
    null,
  );

  // Inline validation errors — shown on blur
  const [emailError, setEmailError] = useState<string | null>(null);
  const [passwordError, setPasswordError] = useState<string | null>(null);
  const [confirmError, setConfirmError] = useState<string | null>(null);

  // Math CAPTCHA state
  const [challenge, setChallenge] = useState<{ a: number; b: number }>(
    generateChallenge,
  );
  const [captchaAnswer, setCaptchaAnswer] = useState("");
  const [captchaError, setCaptchaError] = useState<string | null>(null);

  // Submission state
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);

  const emailRef = useRef<HTMLInputElement>(null);

  // If already logged in, redirect
  useEffect(() => {
    if (isAuthenticated && user && !isLoading) {
      void navigate({
        to: user.role === "admin" ? "/admin/overview" : "/upload",
      });
    }
  }, [isAuthenticated, isLoading, user, navigate]);

  // Focus email on mount
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const refreshChallenge = useCallback(() => {
    setChallenge(generateChallenge());
    setCaptchaAnswer("");
    setCaptchaError(null);
  }, []);

  const isFormValid = useMemo(
    () =>
      !emailError &&
      !passwordError &&
      !confirmError &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      securityAnswer.trim().length > 0 &&
      captchaAnswer.length > 0 &&
      !Number.isNaN(Number.parseInt(captchaAnswer, 10)),
    [
      emailError,
      passwordError,
      confirmError,
      email,
      password,
      confirmPassword,
      securityAnswer,
      captchaAnswer,
    ],
  );

  // ── Submit ──

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Re-validate
    const eErr = validateEmail(email);
    const pErr = validatePassword(password);
    const cErr = validateConfirmPassword(password, confirmPassword);
    const sErr = !securityAnswer.trim() ? "Security answer is required." : null;
    setEmailError(eErr);
    setPasswordError(pErr);
    setConfirmError(cErr);
    setSecurityAnswerError(sErr);
    if (eErr || pErr || cErr || sErr) return;

    // Validate CAPTCHA
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

    // register() already persisted the session token — route based on role
    const destination = result.role === "admin" ? "/admin/overview" : "/upload";
    window.location.href = destination;
  };

  return (
    <div className="min-h-screen gradient-flow bg-grid-pattern flex flex-col relative overflow-hidden">
      {/* ── Back button ── */}
      <button
        type="button"
        onClick={() => void navigate({ to: "/login" })}
        aria-label="Go back to login"
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
                Join the{" "}
                <span className="text-accent relative">
                  future
                  <span className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-accent to-transparent" />
                </span>{" "}
                of hiring
              </h1>
              <p className="text-muted-foreground text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                Create your account to start screening resumes with AI-powered
                skill extraction, scoring, and job matching.
              </p>
            </div>

            {/* Benefits */}
            <div className="flex flex-col gap-3">
              {[
                {
                  icon: <UserCheck className="size-4" />,
                  text: "Free to get started — no credit card",
                },
                {
                  icon: <Shield className="size-4" />,
                  text: "Your data is private and secure",
                },
                {
                  icon: <Sparkles className="size-4" />,
                  text: "AI-powered scoring and matching",
                },
              ].map((item, i) => (
                <motion.div
                  key={item.text}
                  className="flex items-center gap-3 text-sm text-muted-foreground"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.2 + i * 0.08,
                    duration: 0.4,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="p-1.5 rounded-lg bg-accent/10 border border-accent/20 text-accent shrink-0">
                    {item.icon}
                  </div>
                  <span>{item.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Register card */}
          <motion.div
            className="w-full max-w-sm lg:w-[400px] shrink-0"
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="glass rounded-2xl p-7 flex flex-col gap-5 relative overflow-hidden">
              {/* Inner glow */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 0%, oklch(0.62 0.22 300 / 0.06) 0%, transparent 65%)",
                }}
                aria-hidden="true"
              />

              {/* Card header */}
              <div className="flex flex-col gap-1.5 relative">
                <div className="flex items-center gap-2">
                  <UserPlus className="size-5 text-accent" aria-hidden="true" />
                  <h2 className="font-display font-bold text-2xl text-foreground">
                    Create account
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Fill in your details below to get started.
                </p>
              </div>

              <div className="h-px bg-border/30" />

              {/* ── Registration form ── */}
              {submitting ? (
                <div
                  className="flex flex-col items-center gap-3 py-6"
                  data-ocid="reg-loading"
                  aria-live="polite"
                >
                  <LoadingSpinner size="lg" />
                  <p className="text-sm font-display font-medium text-foreground">
                    Creating your account…
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                  noValidate
                >
                  {/* Server error */}
                  {serverError && (
                    <motion.p
                      className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2"
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      data-ocid="reg-error"
                      role="alert"
                    >
                      {serverError}
                    </motion.p>
                  )}

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="reg-email"
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
                        id="reg-email"
                        type="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setEmailError(null);
                        }}
                        onBlur={() => setEmailError(validateEmail(email))}
                        placeholder="you@example.com"
                        required
                        disabled={isLoading}
                        data-ocid="input-reg-email"
                        aria-describedby={
                          emailError ? "reg-email-err" : undefined
                        }
                        aria-invalid={!!emailError}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50 ${emailError ? "border-destructive/50" : "border-border/40"}`}
                      />
                    </div>
                    {emailError && (
                      <p
                        id="reg-email-err"
                        className="text-xs text-destructive"
                        role="alert"
                      >
                        {emailError}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="reg-password"
                      className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock
                        className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60 pointer-events-none"
                        aria-hidden="true"
                      />
                      <input
                        id="reg-password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="new-password"
                        value={password}
                        onChange={(e) => {
                          setPassword(e.target.value);
                          setPasswordError(null);
                        }}
                        onBlur={() =>
                          setPasswordError(validatePassword(password))
                        }
                        placeholder="Min. 8 characters"
                        required
                        disabled={isLoading}
                        data-ocid="input-reg-password"
                        aria-describedby={
                          passwordError ? "reg-password-err" : undefined
                        }
                        aria-invalid={!!passwordError}
                        className={`w-full pl-10 pr-11 py-2.5 rounded-xl bg-muted/30 border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50 ${passwordError ? "border-destructive/50" : "border-border/40"}`}
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((v) => !v)}
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                        disabled={isLoading}
                        data-ocid="btn-toggle-password"
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-accent transition-colors focus:outline-none focus-visible:text-accent disabled:opacity-40"
                      >
                        {showPassword ? (
                          <EyeOff className="size-4" aria-hidden="true" />
                        ) : (
                          <Eye className="size-4" aria-hidden="true" />
                        )}
                      </button>
                    </div>
                    {passwordError && (
                      <p
                        id="reg-password-err"
                        className="text-xs text-destructive"
                        role="alert"
                      >
                        {passwordError}
                      </p>
                    )}
                  </div>

                  {/* Confirm password */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="reg-confirm"
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
                        id="reg-confirm"
                        type={showConfirm ? "text" : "password"}
                        autoComplete="new-password"
                        value={confirmPassword}
                        onChange={(e) => {
                          setConfirmPassword(e.target.value);
                          setConfirmError(null);
                        }}
                        onBlur={() =>
                          setConfirmError(
                            validateConfirmPassword(password, confirmPassword),
                          )
                        }
                        placeholder="Repeat your password"
                        required
                        disabled={isLoading}
                        data-ocid="input-reg-confirm"
                        aria-describedby={
                          confirmError ? "reg-confirm-err" : undefined
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
                        disabled={isLoading}
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
                        id="reg-confirm-err"
                        className="text-xs text-destructive"
                        role="alert"
                      >
                        {confirmError}
                      </p>
                    )}
                  </div>

                  {/* Security question */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="reg-security-question"
                      className="text-xs font-medium text-muted-foreground uppercase tracking-wide flex items-center gap-1.5"
                    >
                      <HelpCircle className="size-3" aria-hidden="true" />
                      Security question
                    </label>
                    <div className="relative">
                      <select
                        id="reg-security-question"
                        value={securityQuestion}
                        onChange={(e) => setSecurityQuestion(e.target.value)}
                        disabled={isLoading}
                        data-ocid="select-security-question"
                        className="w-full pl-3 pr-8 py-2.5 rounded-xl bg-muted/30 border border-border/40 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50 appearance-none"
                      >
                        {SECURITY_QUESTIONS.map((q) => (
                          <option
                            key={q}
                            value={q}
                            className="bg-card text-foreground"
                          >
                            {q}
                          </option>
                        ))}
                      </select>
                      <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60">
                        <svg
                          className="size-3.5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={2}
                          aria-hidden="true"
                          role="img"
                        >
                          <title>Expand</title>
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Security answer */}
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="reg-security-answer"
                      className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                    >
                      Your answer
                    </label>
                    <div className="relative">
                      <Shield
                        className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground/60 pointer-events-none"
                        aria-hidden="true"
                      />
                      <input
                        id="reg-security-answer"
                        type="text"
                        autoComplete="off"
                        value={securityAnswer}
                        onChange={(e) => {
                          setSecurityAnswer(e.target.value);
                          setSecurityAnswerError(null);
                        }}
                        onBlur={() =>
                          setSecurityAnswerError(
                            !securityAnswer.trim()
                              ? "Security answer is required."
                              : null,
                          )
                        }
                        placeholder="Your answer (case-insensitive)"
                        disabled={isLoading}
                        data-ocid="input-security-answer"
                        aria-describedby={
                          securityAnswerError ? "reg-sec-err" : undefined
                        }
                        aria-invalid={!!securityAnswerError}
                        className={`w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50 ${securityAnswerError ? "border-destructive/50" : "border-border/40"}`}
                      />
                    </div>
                    {securityAnswerError && (
                      <p
                        id="reg-sec-err"
                        className="text-xs text-destructive"
                        role="alert"
                      >
                        {securityAnswerError}
                      </p>
                    )}
                  </div>

                  {/* ── Math CAPTCHA ── */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label
                        htmlFor="reg-captcha"
                        className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
                      >
                        Verification
                      </label>
                      <button
                        type="button"
                        onClick={refreshChallenge}
                        aria-label="New question"
                        data-ocid="btn-captcha-refresh"
                        className="flex items-center gap-1 text-xs text-muted-foreground/70 hover:text-accent transition-colors focus:outline-none focus-visible:text-accent"
                      >
                        <RefreshCw className="size-3" aria-hidden="true" />
                        New question
                      </button>
                    </div>

                    <div className="flex items-center gap-3 rounded-xl bg-muted/30 border border-border/40 px-4 py-3">
                      <div
                        className="flex items-center gap-1.5 shrink-0"
                        aria-live="polite"
                        aria-label={`What is ${challenge.a} plus ${challenge.b}?`}
                      >
                        <span className="font-display font-bold text-lg text-foreground tabular-nums">
                          {challenge.a}
                        </span>
                        <span className="text-accent font-bold text-lg">+</span>
                        <span className="font-display font-bold text-lg text-foreground tabular-nums">
                          {challenge.b}
                        </span>
                        <span className="text-muted-foreground font-medium ml-0.5">
                          =
                        </span>
                      </div>

                      <input
                        id="reg-captcha"
                        type="number"
                        inputMode="numeric"
                        min={2}
                        max={18}
                        value={captchaAnswer}
                        onChange={(e) => {
                          setCaptchaAnswer(e.target.value);
                          setCaptchaError(null);
                        }}
                        placeholder="?"
                        required
                        disabled={isLoading}
                        data-ocid="input-captcha"
                        aria-describedby={
                          captchaError ? "reg-captcha-err" : undefined
                        }
                        aria-invalid={!!captchaError}
                        className={`w-16 text-center py-1.5 rounded-lg bg-card border text-sm font-display font-semibold text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none ${captchaError ? "border-destructive/50" : "border-border/40"}`}
                      />
                    </div>

                    {captchaError && (
                      <p
                        id="reg-captcha-err"
                        className="text-xs text-destructive"
                        role="alert"
                        data-ocid="captcha-error"
                      >
                        {captchaError}
                      </p>
                    )}
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    disabled={!isFormValid || isLoading}
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-display font-semibold accent-glow transition-smooth gap-2 mt-1"
                    data-ocid="btn-register-submit"
                  >
                    Create account
                  </Button>
                </form>
              )}

              {/* Sign in link */}
              <div className="text-center text-sm text-muted-foreground border-t border-border/20 pt-4">
                Already have an account?{" "}
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
          © {new Date().getFullYear()} AI Resume Screening Portal
        </p>
      </footer>
    </div>
  );
}
