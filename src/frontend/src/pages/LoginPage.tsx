/**
 * LoginPage.tsx — Email/password login for AI Resume Screening Portal.
 *
 * Glass-morphism card with AI/tech background.
 * Left panel: brand + feature highlights.
 * Right panel: sign-in form.
 * Supports show/hide password via eye icon toggle.
 * Redirects to role-appropriate page after successful login.
 */

import { useNavigate } from "@tanstack/react-router";
import {
  BrainCircuit,
  ChevronLeft,
  Eye,
  EyeOff,
  FileSearch,
  Lock,
  Mail,
  Sparkles,
  Star,
  Target,
  UserPlus,
  Zap,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/AppButton";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { useAuth } from "../hooks/use-auth";

// ─── Feature highlights shown in the left panel ───────────────────────────────

const FEATURES = [
  {
    icon: <FileSearch className="size-4" />,
    title: "AI-Powered Extraction",
    desc: "NLP parses skills from any PDF resume in seconds",
  },
  {
    icon: <Target className="size-4" />,
    title: "Job Match Scoring",
    desc: "Compare candidates against a job description instantly",
  },
  {
    icon: <Zap className="size-4" />,
    title: "Real-Time Analytics",
    desc: "Live dashboards track every candidate and their progress",
  },
];

// ─── Stat pills in the hero strip ─────────────────────────────────────────────

const STATS = [
  { value: "98%", label: "Accuracy" },
  { value: "<3s", label: "Parse time" },
  { value: "80+", label: "Skills detected" },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function LoginPage() {
  const { isAuthenticated, isLoading, user, login, error } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const actorConnecting = isLoading && !submitting;
  const submitLabel = submitting
    ? "Signing in…"
    : actorConnecting
      ? "Connecting…"
      : "Sign in";

  // Redirect once authenticated — role-aware destination
  useEffect(() => {
    if (isAuthenticated && user) {
      const dest = user.role === "admin" ? "/admin/overview" : "/upload";
      navigate({ to: dest as "/admin/overview" | "/upload" });
    }
  }, [isAuthenticated, user, navigate]);

  // Pick up success message from register redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("registered") === "1") {
      setSuccessMessage("Account created! Sign in with your new credentials.");
      window.history.replaceState({}, "", window.location.pathname);
    }
  }, []);

  // Focus email on mount
  useEffect(() => {
    emailRef.current?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    setSubmitting(true);
    const ok = await login(email, password);
    if (!ok) {
      setSubmitting(false);
    }
    // Navigation is handled by the useEffect below once user state is updated
  };

  return (
    <div className="min-h-screen gradient-flow bg-grid-pattern flex flex-col relative overflow-hidden">
      {/* ── Back button ── */}
      <button
        type="button"
        onClick={() => navigate({ to: "/" })}
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
        <div className="absolute -top-40 -left-40 w-[560px] h-[560px] rounded-full bg-primary/10 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 w-[560px] h-[560px] rounded-full bg-accent/10 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-secondary/5 blur-[80px]" />
        {/* Subtle floating stars */}
        <motion.div
          className="absolute top-[15%] right-[25%] w-1.5 h-1.5 rounded-full bg-accent/60"
          animate={{ y: [0, -8, 0], opacity: [0.6, 1, 0.6] }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-[40%] right-[10%] w-1 h-1 rounded-full bg-primary/60"
          animate={{ y: [0, -6, 0], opacity: [0.4, 0.8, 0.4] }}
          transition={{
            duration: 4,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 1,
          }}
        />
        <motion.div
          className="absolute bottom-[30%] left-[12%] w-1.5 h-1.5 rounded-full bg-accent/40"
          animate={{ y: [0, -10, 0], opacity: [0.3, 0.7, 0.3] }}
          transition={{
            duration: 5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />
      </div>

      {/* ── Main content ── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-16 relative z-10">
        <div className="w-full max-w-5xl flex flex-col lg:flex-row items-center gap-14 lg:gap-20">
          {/* ── Left — Branding + Features ── */}
          <motion.div
            className="hidden lg:flex flex-1 flex-col gap-8"
            initial={{ opacity: 0, x: -28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative p-3 rounded-2xl bg-accent/15 border border-accent/30">
                <BrainCircuit className="size-8 text-accent" />
                <div className="absolute inset-0 rounded-2xl bg-accent/5 blur-sm" />
              </div>
              <div>
                <div className="font-display font-bold text-2xl text-foreground leading-none">
                  TalentScan<span className="text-accent">AI</span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5 font-body">
                  AI Resume Screening Portal
                </div>
              </div>
            </div>

            {/* Headline */}
            <div className="flex flex-col gap-4">
              <h1 className="font-display font-bold text-5xl xl:text-6xl leading-[1.05] text-foreground">
                Screen smarter.{" "}
                <span className="text-accent relative inline-block">
                  Hire faster.
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-accent via-accent/70 to-transparent rounded-full" />
                </span>
              </h1>
              <p className="text-muted-foreground text-lg leading-relaxed max-w-md">
                AI-powered resume analysis that extracts skills, calculates
                scores, and matches candidates to your job description — in
                seconds.
              </p>
            </div>

            {/* Stats strip */}
            <div className="flex items-center gap-6">
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className="flex flex-col items-center gap-0.5"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.07, duration: 0.4 }}
                >
                  <span className="font-display font-bold text-2xl text-accent">
                    {s.value}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {s.label}
                  </span>
                </motion.div>
              ))}
              <div className="h-10 w-px bg-border/30 mx-2" />
              <div className="flex items-center gap-1.5">
                {["s1", "s2", "s3", "s4", "s5"].map((id) => (
                  <Star
                    key={id}
                    className="size-4 fill-accent/70 text-accent/70"
                    aria-hidden="true"
                  />
                ))}
                <span className="text-xs text-muted-foreground ml-1">
                  Trusted by hiring teams
                </span>
              </div>
            </div>

            {/* Feature cards */}
            <div className="flex flex-col gap-3">
              {FEATURES.map((f, i) => (
                <motion.div
                  key={f.title}
                  className="glass-hover glass flex items-start gap-4 p-4 rounded-xl cursor-default"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.3 + i * 0.1,
                    duration: 0.45,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <div className="p-2 rounded-lg bg-accent/10 border border-accent/20 text-accent shrink-0 mt-0.5">
                    {f.icon}
                  </div>
                  <div>
                    <div className="font-display font-semibold text-sm text-foreground">
                      {f.title}
                    </div>
                    <div className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                      {f.desc}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right — Sign-in card ── */}
          <motion.div
            className="w-full max-w-sm lg:w-[380px] shrink-0"
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.55,
              delay: 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {/* Mobile logo — only shown on small screens */}
            <div className="flex items-center gap-3 mb-8 lg:hidden justify-center">
              <div className="relative p-2.5 rounded-2xl bg-accent/15 border border-accent/30">
                <BrainCircuit className="size-7 text-accent" />
              </div>
              <div>
                <div className="font-display font-bold text-xl text-foreground leading-none">
                  TalentScan<span className="text-accent">AI</span>
                </div>
                <div className="text-xs text-muted-foreground mt-0.5">
                  AI Resume Screening Portal
                </div>
              </div>
            </div>

            <div className="glass rounded-2xl p-8 flex flex-col gap-6 relative overflow-hidden">
              {/* Inner radial glow */}
              <div
                className="absolute inset-0 rounded-2xl pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 0%, oklch(0.62 0.22 300 / 0.07) 0%, transparent 65%)",
                }}
                aria-hidden="true"
              />

              {/* Card header */}
              <div className="relative flex flex-col gap-1.5">
                <h2 className="font-display font-bold text-2xl text-foreground">
                  Welcome back
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sign in to access your screening dashboard.
                </p>
              </div>

              <div className="h-px bg-border/30" />

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="flex flex-col gap-4 relative"
                noValidate
              >
                {/* Success message */}
                {successMessage && (
                  <motion.div
                    className="text-xs text-accent bg-accent/10 border border-accent/20 rounded-lg px-3 py-2"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    aria-live="polite"
                  >
                    {successMessage}
                  </motion.div>
                )}

                {/* Email */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="login-email"
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
                      id="login-email"
                      type="email"
                      autoComplete="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@company.com"
                      required
                      disabled={submitting || isLoading}
                      data-ocid="input-email"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border border-border/40 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="login-password"
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
                      id="login-password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      required
                      disabled={submitting || isLoading}
                      data-ocid="input-password"
                      className="w-full pl-10 pr-11 py-2.5 rounded-xl bg-muted/30 border border-border/40 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      disabled={submitting || isLoading}
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
                </div>

                {/* Forgot password */}
                <div className="flex justify-end -mt-1">
                  <button
                    type="button"
                    className="text-xs text-muted-foreground hover:text-accent transition-colors"
                    data-ocid="link-forgot-password"
                    onClick={() => navigate({ to: "/forgot-password" })}
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Error */}
                {error && (
                  <motion.p
                    className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2"
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    data-ocid="login-error"
                    role="alert"
                  >
                    {error}
                  </motion.p>
                )}

                {/* Submit */}
                {submitting || isLoading ? (
                  <div
                    className="flex flex-col items-center gap-3 py-3"
                    data-ocid="login-loading"
                    aria-live="polite"
                  >
                    <LoadingSpinner size="lg" />
                    <p className="text-sm font-display font-medium text-foreground">
                      {submitLabel}
                    </p>
                  </div>
                ) : (
                  <Button
                    type="submit"
                    disabled={!email || !password || actorConnecting}
                    size="lg"
                    className="w-full bg-accent hover:bg-accent/90 text-accent-foreground font-display font-semibold accent-glow transition-smooth gap-2 mt-1"
                    data-ocid="btn-login"
                  >
                    <Sparkles className="size-4 shrink-0" aria-hidden="true" />
                    {submitLabel}
                  </Button>
                )}
              </form>

              {/* Register link */}
              <div className="text-center text-sm text-muted-foreground border-t border-border/20 pt-4">
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-accent hover:text-accent/80 font-medium transition-colors inline-flex items-center gap-1"
                  data-ocid="link-register"
                  onClick={() => navigate({ to: "/register" })}
                >
                  <UserPlus className="size-3.5" aria-hidden="true" />
                  Register
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
