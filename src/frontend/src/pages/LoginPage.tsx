/**
 * LoginPage.tsx — Email/password login for AI Resume Screening Portal.
 *
 * Glass-morphism card with AI/tech background.
 * Supports show/hide password via eye icon toggle.
 * Redirects to role-appropriate page after successful login.
 */

import { useNavigate } from "@tanstack/react-router";
import {
  BrainCircuit,
  ChevronLeft,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
  UserPlus,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../components/ui/AppButton";
import { LoadingSpinner } from "../components/ui/LoadingSpinner";
import { useAuth } from "../hooks/use-auth";

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

  // Derive a descriptive label for the submit button / loading state
  const actorConnecting = isLoading && !submitting;
  const submitLabel = submitting
    ? "Signing in…"
    : actorConnecting
      ? "Connecting…"
      : "Sign in";

  // Redirect once authenticated — role-aware destination
  useEffect(() => {
    if (isAuthenticated && user) {
      navigate({ to: user.role === "admin" ? "/admin/overview" : "/upload" });
    }
  }, [isAuthenticated, user, navigate]);

  // Pick up success message from register redirect
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("registered") === "1") {
      setSuccessMessage("Account created! Sign in with your new credentials.");
      // Clean URL without reload
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
    if (!ok) setSubmitting(false);
    // Navigation handled by useEffect above once user state updates
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
        <div className="w-full max-w-sm flex flex-col items-center">
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 mb-8"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
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
          </motion.div>

          {/* Login card */}
          <motion.div
            className="w-full"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
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

              {/* Card header */}
              <div className="flex flex-col gap-2 relative">
                <h2 className="font-display font-bold text-2xl text-foreground">
                  Welcome back
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Sign in to access the resume screening dashboard.
                </p>
              </div>

              {/* Separator */}
              <div className="h-px bg-border/30" />

              {/* Login form */}
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

                {/* Email field */}
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
                      placeholder="you@portal.com"
                      required
                      disabled={submitting || isLoading}
                      data-ocid="input-email"
                      className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-muted/30 border border-border/40 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth disabled:opacity-50"
                    />
                  </div>
                </div>

                {/* Password field */}
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

                {/* Forgot password link */}
                <div className="flex justify-end -mt-2">
                  <button
                    type="button"
                    className="text-xs text-muted-foreground hover:text-accent transition-colors"
                    data-ocid="link-forgot-password"
                    onClick={() => navigate({ to: "/forgot-password" })}
                  >
                    Forgot password?
                  </button>
                </div>

                {/* Error message */}
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
                    <Sparkles className="size-4 shrink-0" />
                    {submitLabel}
                  </Button>
                )}
              </form>

              {/* Register link */}
              <div className="text-center text-sm text-muted-foreground">
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
