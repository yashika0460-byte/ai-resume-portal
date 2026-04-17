/**
 * UploadPage — PDF resume upload with drag-and-drop, real-backend progress
 * states, skill extraction display, score result card, and welcome empty state.
 *
 * Fix: progress steps now track the ACTUAL backend call, not fake timeouts.
 *  1. "Uploading" fires immediately on button click (progress 30%)
 *  2. The mutation is awaited. While it runs, a 500ms delay advances to
 *     "Analysing…" (progress 65%) to give visual feedback during the call.
 *  3. On SUCCESS  → step = "done", progress = 100, result card renders.
 *  4. On ERROR    → status = "error", error card shows, result card never shows.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { Link } from "@tanstack/react-router";
import {
  AlertCircle,
  ArrowRight,
  Brain,
  CheckCircle2,
  ChevronDown,
  ChevronLeft,
  ChevronUp,
  FileText,
  FileUp,
  History,
  Loader2,
  Lock,
  ShieldCheck,
  Sparkles,
  XCircle,
  Zap,
} from "lucide-react";
import { useCallback, useRef, useState } from "react";
import type { BackendActor } from "../api";
import { apiSetSecurityQuestion } from "../api";
import { createActor } from "../backend";
import { Button } from "../components/ui/AppButton";
import { GlassCard } from "../components/ui/GlassCard";
import { SkillBadge } from "../components/ui/SkillBadge";
import { useAuth } from "../hooks/use-auth";
import { useUploadResume } from "../hooks/use-resumes";
import type { Resume, UploadState } from "../types";

// ─── Constants ────────────────────────────────────────────────────────────────

const MAX_SIZE_MB = 10;
const ACCEPTED_TYPES = ["application/pdf"];

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1_048_576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1_048_576).toFixed(1)} MB`;
}

function getScoreTier(score: number): { label: string; color: string } {
  if (score >= 80) return { label: "Excellent", color: "text-accent" };
  if (score >= 60) return { label: "Good", color: "text-primary" };
  return { label: "Fair", color: "text-muted-foreground" };
}

// ─── Welcome / Getting Started card ──────────────────────────────────────────

const HOW_IT_WORKS = [
  {
    step: "1",
    icon: <FileUp className="size-4 text-accent" />,
    title: "Upload your PDF",
    desc: "Drag and drop or click to select a PDF resume (max 10 MB).",
  },
  {
    step: "2",
    icon: <Brain className="size-4 text-accent" />,
    title: "AI extracts skills",
    desc: "Our engine scans for 60+ tech skills across Python, cloud, DevOps, ML, and more.",
  },
  {
    step: "3",
    icon: <Zap className="size-4 text-accent" />,
    title: "Score & match",
    desc: "Receive an AI match score out of 100 and compare against any job description.",
  },
];

function WelcomeGuide() {
  return (
    <GlassCard
      className="flex flex-col gap-5 border-accent/10"
      data-ocid="welcome-guide"
    >
      <div className="flex items-center gap-2.5">
        <div className="p-1.5 rounded-lg bg-accent/15 border border-accent/25">
          <Sparkles className="size-4 text-accent" />
        </div>
        <div>
          <p className="font-display font-semibold text-foreground text-sm">
            How it works
          </p>
          <p className="text-xs text-muted-foreground">
            Get started in 3 simple steps
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {HOW_IT_WORKS.map(({ step, icon, title, desc }) => (
          <div key={step} className="flex-1 flex gap-3">
            <div className="flex flex-col items-center gap-1 shrink-0">
              <div className="w-7 h-7 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-xs font-mono font-bold text-accent">
                {step}
              </div>
              {step !== "3" && (
                <div className="flex-1 w-px bg-accent/15 hidden sm:block" />
              )}
            </div>
            <div className="pb-3">
              <div className="flex items-center gap-1.5 mb-1">
                {icon}
                <p className="text-sm font-semibold text-foreground">{title}</p>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-1 border-t border-border/15 flex flex-wrap gap-4 text-xs text-muted-foreground/60">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
          PDF only
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
          Max 10 MB
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
          Results in seconds
        </span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent/50" />
          Stored securely
        </span>
      </div>
    </GlassCard>
  );
}

// ─── Step indicator ───────────────────────────────────────────────────────────

type UploadStep = "idle" | "uploading" | "analysing" | "done";

const STEPS: { key: UploadStep; label: string; icon: React.ReactNode }[] = [
  {
    key: "uploading",
    label: "Uploading file",
    icon: <FileUp className="size-3.5" />,
  },
  {
    key: "analysing",
    label: "Analysing resume",
    icon: <Brain className="size-3.5" />,
  },
  {
    key: "done",
    label: "Scoring",
    icon: <Sparkles className="size-3.5" />,
  },
];

const STEP_ORDER: UploadStep[] = ["uploading", "analysing", "done"];

function StepProgress({ currentStep }: { currentStep: UploadStep }) {
  if (currentStep === "idle") return null;

  return (
    <div className="flex items-center gap-2 pt-1">
      {STEPS.map((step, idx) => {
        const stepIdx = STEP_ORDER.indexOf(step.key);
        const currentIdx = STEP_ORDER.indexOf(currentStep);
        const isComplete = currentIdx > stepIdx;
        const isActive = currentStep === step.key;
        const isPending = currentIdx < stepIdx;

        return (
          <div key={step.key} className="flex items-center gap-2">
            <div
              className={`flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium border transition-smooth ${
                isComplete
                  ? "bg-accent/15 text-accent border-accent/30"
                  : isActive
                    ? "bg-primary/15 text-primary border-primary/30"
                    : isPending
                      ? "bg-muted/30 text-muted-foreground/50 border-border/20"
                      : "bg-muted/30 text-muted-foreground border-border/20"
              }`}
            >
              {isActive ? (
                <Loader2 className="size-3 animate-spin" />
              ) : isComplete ? (
                <CheckCircle2 className="size-3" />
              ) : (
                step.icon
              )}
              <span className="hidden sm:inline">{step.label}</span>
            </div>
            {idx < STEPS.length - 1 && (
              <div
                className={`h-px w-4 transition-smooth ${isComplete ? "bg-accent/40" : "bg-border/30"}`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Security question options ────────────────────────────────────────────────

const SECURITY_QUESTIONS = [
  "What was the name of your first pet?",
  "What city were you born in?",
  "What is your mother's maiden name?",
  "What was the name of your primary school?",
  "What was your childhood nickname?",
  "What is the name of the street you grew up on?",
];

// ─── Account Security card ────────────────────────────────────────────────────

function AccountSecurityCard({ token }: { token: string }) {
  const { actor } = useActor(createActor);
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState(SECURITY_QUESTIONS[0]);
  const [customQuestion, setCustomQuestion] = useState("");
  const [useCustom, setUseCustom] = useState(false);
  const [answer, setAnswer] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "success" | "error">(
    "idle",
  );
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) return;
    const finalQuestion = useCustom ? customQuestion.trim() : question;
    const finalAnswer = answer.trim();
    if (!finalQuestion || !finalAnswer) return;

    setStatus("saving");
    setErrorMsg(null);

    try {
      const result = await apiSetSecurityQuestion(
        actor as BackendActor,
        token,
        finalQuestion,
        finalAnswer,
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

  return (
    <GlassCard className="border-border/20" data-ocid="account-security-card">
      {/* Header — toggle */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full text-left gap-3 group"
        aria-expanded={open}
        data-ocid="btn-security-toggle"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-muted/30 border border-border/20 shrink-0">
            <ShieldCheck className="size-4 text-muted-foreground group-hover:text-accent transition-smooth" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Account Security
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Set a security question to enable forgot-password recovery
            </p>
          </div>
        </div>
        <div className="shrink-0 text-muted-foreground group-hover:text-accent transition-smooth">
          {open ? (
            <ChevronUp className="size-4" />
          ) : (
            <ChevronDown className="size-4" />
          )}
        </div>
      </button>

      {/* Expanded content */}
      {open && (
        <div className="mt-4 pt-4 border-t border-border/15 flex flex-col gap-4">
          {/* Status: success banner */}
          {status === "success" && (
            <div
              className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg border border-accent/30 bg-accent/8"
              data-ocid="security-success"
            >
              <CheckCircle2 className="size-4 text-accent shrink-0" />
              <p className="text-xs text-accent font-medium">
                Security question saved! Your account can now use
                forgot-password.
              </p>
            </div>
          )}

          {/* Explanation */}
          <div className="flex items-start gap-2 text-xs text-muted-foreground/80 leading-relaxed">
            <Lock className="size-3.5 shrink-0 mt-0.5 text-muted-foreground/50" />
            <span>
              Your answer is stored securely and used only to verify your
              identity when resetting your password. Choose a question only you
              know the answer to.
            </span>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
            {/* Question selector */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor={
                  useCustom ? "custom-question-input" : "select-question"
                }
                className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
              >
                Security question
              </label>
              {!useCustom ? (
                <select
                  id="select-question"
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-muted/20 border border-border/30 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth"
                  data-ocid="select-security-question"
                >
                  {SECURITY_QUESTIONS.map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id="custom-question-input"
                  type="text"
                  value={customQuestion}
                  onChange={(e) => setCustomQuestion(e.target.value)}
                  placeholder="Type your own security question…"
                  maxLength={120}
                  className="w-full px-3 py-2.5 rounded-lg bg-muted/20 border border-border/30 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth"
                  data-ocid="input-custom-question"
                />
              )}
              <button
                type="button"
                onClick={() => {
                  setUseCustom((v) => !v);
                  setCustomQuestion("");
                }}
                className="self-start text-xs text-accent/80 hover:text-accent underline underline-offset-2 transition-smooth"
              >
                {useCustom ? "← Choose from list" : "Write a custom question"}
              </button>
            </div>

            {/* Answer */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="security-answer"
                className="text-xs font-medium text-muted-foreground uppercase tracking-wide"
              >
                Your answer
              </label>
              <input
                id="security-answer"
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                placeholder="Enter your answer…"
                autoComplete="off"
                required
                maxLength={120}
                className="w-full px-3 py-2.5 rounded-lg bg-muted/20 border border-border/30 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/50 transition-smooth"
                data-ocid="input-security-answer"
              />
            </div>

            {/* Error */}
            {status === "error" && errorMsg && (
              <div
                className="flex items-center gap-2 text-xs text-destructive"
                data-ocid="security-error"
              >
                <XCircle className="size-3.5 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            <Button
              type="submit"
              disabled={
                status === "saving" ||
                !answer.trim() ||
                (useCustom && !customQuestion.trim())
              }
              size="sm"
              className="bg-accent hover:bg-accent/90 text-accent-foreground font-display font-semibold w-full sm:w-auto"
              data-ocid="btn-save-security-question"
            >
              {status === "saving" ? (
                <>
                  <Loader2 className="size-3.5 animate-spin" />
                  Saving…
                </>
              ) : (
                <>
                  <ShieldCheck className="size-3.5" />
                  Save security question
                </>
              )}
            </Button>
          </form>
        </div>
      )}
    </GlassCard>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function UploadPage() {
  const { user } = useAuth();
  const [uploadState, setUploadState] = useState<UploadState>({
    status: "idle",
    progress: 0,
  });
  const [step, setStep] = useState<UploadStep>("idle");
  const [dragOver, setDragOver] = useState(false);
  const [result, setResult] = useState<Resume | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutateAsync: uploadResume } = useUploadResume();

  const processFile = useCallback((file: File) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setUploadState({
        status: "error",
        progress: 0,
        error: "Only PDF files are supported. Please select a .pdf file.",
      });
      setStep("idle");
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setUploadState({
        status: "error",
        progress: 0,
        error: `File size exceeds the ${MAX_SIZE_MB}MB limit. Please compress or split the file.`,
      });
      setStep("idle");
      return;
    }
    setSelectedFile(file);
    setUploadState({ status: "idle", progress: 0 });
    setResult(null);
    setStep("idle");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile],
  );

  /**
   * Fixed upload flow — all progress gates are tied to the real mutation:
   *
   *  1. Immediately: step = "uploading", progress = 30%
   *  2. Start mutation + brief 500ms delay to show "uploading" visually
   *  3. After delay: step = "analysing", progress = 65%  (mutation still running)
   *  4. Await mutation result:
   *     ✅ SUCCESS → step = "done", progress = 100%, result card shown
   *     ❌ ERROR   → status = "error", error card shown, result card hidden
   */
  const handleUpload = async () => {
    if (!selectedFile) return;

    // ── Step 1: show "uploading" immediately ────────────────────────────────
    setStep("uploading");
    setUploadState({ status: "uploading", progress: 30 });

    try {
      // ── Step 2: kick off the real mutation ─────────────────────────────────
      const mutationPromise = uploadResume({
        filename: selectedFile.name,
        file: selectedFile,
      });

      // ── Step 3: brief visual delay so user sees "uploading" step ──────────
      await new Promise<void>((r) => setTimeout(r, 500));
      setStep("analysing");
      setUploadState({ status: "uploading", progress: 65 });

      // ── Step 4: await the actual backend result ────────────────────────────
      const resume = await mutationPromise;

      // ── Step 5: SUCCESS ────────────────────────────────────────────────────
      setStep("done");
      setResult(resume);
      setUploadState({ status: "success", progress: 100 });
      setSelectedFile(null);
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      // ── Step 5 (alt): ERROR — set status="error" so error card renders ─────
      const raw = err instanceof Error ? err.message : String(err);
      const userMsg = raw.startsWith("Actor not ready")
        ? "The backend is still loading. Please wait a moment and try again."
        : raw || "Analysis failed. Please try again.";

      console.error("[UploadPage] Upload failed:", err);

      setStep("idle");
      setResult(null); // ensure result card never shows on error
      setUploadState({
        status: "error",
        progress: 0,
        error: userMsg,
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

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-6 fade-up">
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

      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-accent/15 border border-accent/30 shrink-0 mt-0.5">
            <FileUp className="size-5 text-accent" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Upload Resume
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Drop a PDF resume and our AI will extract skills and compute a
              match score automatically.
            </p>
          </div>
        </div>
        <Link
          to="/profile"
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-muted/30 border border-border/30 text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/8 text-xs font-medium transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40 shrink-0 mt-1"
          data-ocid="btn-view-history"
          aria-label="View upload history"
        >
          <History className="size-3.5" />
          View History
        </Link>
      </div>

      {/* ── Welcome guide (first visit, nothing selected) ── */}
      {isIdle && <WelcomeGuide />}

      {/* ── Drop zone (hidden after success) ── */}
      {uploadState.status !== "success" && (
        <GlassCard className="p-0 overflow-hidden">
          {/* Drop target area */}
          <label
            htmlFor="file-drop-input"
            aria-label="File upload drop zone — drag and drop or click to browse"
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            data-ocid="dropzone-upload"
            className={`flex flex-col items-center justify-center gap-5 py-12 px-8 cursor-pointer transition-smooth rounded-xl m-1 ${
              dragOver
                ? "bg-accent/10 border-2 border-dashed border-accent/50"
                : "border-2 border-dashed border-border/25 hover:border-accent/35 hover:bg-muted/10"
            }`}
          >
            {/* Animated icon */}
            <div
              className={`relative p-5 rounded-2xl transition-smooth ${
                dragOver ? "bg-accent/20 accent-glow" : "bg-muted/25"
              }`}
            >
              <FileText
                className={`size-10 transition-smooth ${
                  dragOver ? "text-accent scale-110" : "text-muted-foreground"
                }`}
              />
              {dragOver && (
                <div className="absolute inset-0 rounded-2xl border-2 border-accent/50 animate-pulse" />
              )}
            </div>

            <div className="text-center">
              <p className="font-display font-semibold text-foreground text-lg">
                {dragOver ? "Release to upload" : "Drag & drop your PDF resume"}
              </p>
              <p className="text-sm text-muted-foreground mt-1.5">
                or{" "}
                <span className="text-accent underline underline-offset-2">
                  click to browse files
                </span>
              </p>
              <p className="text-xs text-muted-foreground/50 mt-3 font-mono">
                PDF only · Max {MAX_SIZE_MB}MB
              </p>
            </div>

            <input
              ref={fileInputRef}
              id="file-drop-input"
              type="file"
              accept=".pdf"
              className="hidden"
              onChange={handleFileChange}
              data-ocid="input-file"
              aria-label="Choose PDF file"
            />
          </label>

          {/* Selected file + action bar */}
          {selectedFile && (
            <div className="border-t border-border/20 bg-muted/10 px-5 py-4 flex flex-col gap-3">
              {/* File info */}
              <div className="flex items-center gap-3 min-w-0">
                <div className="p-2 rounded-lg bg-primary/15 border border-primary/25 shrink-0">
                  <FileText className="size-4 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-foreground truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {formatBytes(selectedFile.size)} · PDF document
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={reset}
                  disabled={isUploading}
                  className="text-muted-foreground hover:text-destructive shrink-0 text-xs"
                  aria-label="Remove selected file"
                >
                  Remove
                </Button>
              </div>

              {/* Upload button + step progress */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <Button
                  onClick={handleUpload}
                  disabled={isUploading}
                  size="default"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-display font-semibold shrink-0 w-full sm:w-auto"
                  data-ocid="btn-upload-submit"
                >
                  {isUploading ? (
                    <>
                      <Loader2 className="size-4 animate-spin" />
                      {step === "uploading" ? "Uploading…" : "Analysing…"}
                    </>
                  ) : (
                    <>
                      <Sparkles className="size-4" />
                      Analyse Resume
                    </>
                  )}
                </Button>

                {isUploading && <StepProgress currentStep={step} />}
              </div>

              {/* Progress bar — only shown while uploading, tied to real progress */}
              {isUploading && (
                <div className="score-bar mt-1">
                  <div
                    className="score-bar-fill transition-all duration-700"
                    style={{ width: `${uploadState.progress}%` }}
                  />
                </div>
              )}
            </div>
          )}
        </GlassCard>
      )}

      {/* ── Error card — shown ONLY when status is "error" ── */}
      {uploadState.status === "error" && (
        <div
          data-ocid="upload-error"
          className="glass rounded-xl p-4 border border-destructive/30 bg-destructive/8 flex flex-col gap-3"
        >
          <div className="flex items-start gap-3">
            <XCircle className="size-5 text-destructive shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-destructive">
                Analysis Failed
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed break-words">
                {uploadState.error ?? "Something went wrong. Please try again."}
              </p>
            </div>
          </div>
          <div className="flex gap-2 pl-8">
            <Button
              variant="outline"
              size="sm"
              onClick={reset}
              className="border-destructive/30 text-destructive hover:bg-destructive/10 text-xs"
              data-ocid="btn-retry"
            >
              Try again
            </Button>
          </div>
        </div>
      )}

      {/* ── File type hint (idle, no file, no error) ── */}
      {uploadState.status === "idle" && !selectedFile && (
        <div className="flex items-start gap-2.5 px-4 py-3 rounded-xl bg-muted/20 border border-border/20">
          <AlertCircle className="size-4 text-muted-foreground/60 shrink-0 mt-0.5" />
          <p className="text-xs text-muted-foreground/70 leading-relaxed">
            Only <span className="font-mono text-muted-foreground">.pdf</span>{" "}
            files are accepted. Skill extraction works best with text-based PDFs
            — scanned images may yield lower accuracy.
          </p>
        </div>
      )}

      {/* ── Success result card — ONLY shown when status==="success" AND result is not null ── */}
      {uploadState.status === "success" && result !== null && (
        <div className="flex flex-col gap-4 fade-up">
          {/* Success banner */}
          <div
            data-ocid="upload-success"
            className="flex items-center gap-3 px-4 py-3 rounded-xl border"
            style={{
              backgroundColor: "oklch(0.72 0.18 198 / 0.1)",
              borderColor: "oklch(0.72 0.18 198 / 0.3)",
            }}
          >
            <CheckCircle2 className="size-5 text-accent shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-accent">
                Resume analysed successfully!
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {result.skills.length} skill
                {result.skills.length !== 1 ? "s" : ""} extracted · scored and
                indexed
              </p>
            </div>
          </div>

          {/* Result card */}
          <GlassCard className="border-accent/20" data-ocid="result-card">
            {/* Header row */}
            <div className="flex items-start gap-4 mb-5">
              <div className="p-2.5 rounded-xl bg-muted/30 border border-border/20 shrink-0">
                <FileText className="size-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-display font-semibold text-foreground truncate text-base">
                  {result.filename}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Uploaded {new Date(result.uploadDate).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Score section */}
            <div className="mb-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  AI Match Score
                </span>
                <div className="flex items-center gap-2">
                  {scoreTier && (
                    <span className={`text-xs font-medium ${scoreTier.color}`}>
                      {scoreTier.label}
                    </span>
                  )}
                  <span className="font-mono font-bold text-accent text-xl">
                    {result.score}
                  </span>
                  <span className="text-muted-foreground text-xs">/100</span>
                </div>
              </div>
              <div className="score-bar">
                <div
                  className="score-bar-fill"
                  style={{ width: `${result.score}%` }}
                />
              </div>
            </div>

            {/* Skills section */}
            {result.skills.length > 0 && (
              <div className="mb-5">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2.5">
                  Extracted Skills ({result.skills.length})
                </p>
                <div className="flex flex-wrap gap-1.5" data-ocid="skills-list">
                  {result.skills.map((skill) => (
                    <SkillBadge key={skill} label={skill} status="matched" />
                  ))}
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-border/15">
              <Button
                onClick={reset}
                variant="outline"
                size="sm"
                className="border-border/30 hover:border-border/60 flex-1 sm:flex-none"
                data-ocid="btn-upload-another"
              >
                <FileUp className="size-4" />
                Upload another
              </Button>
              <Link to="/dashboard" className="flex-1 sm:flex-none">
                <Button
                  size="sm"
                  className="bg-accent hover:bg-accent/90 text-accent-foreground font-display font-semibold w-full"
                  data-ocid="btn-go-dashboard"
                >
                  View all resumes
                  <ArrowRight className="size-4" />
                </Button>
              </Link>
            </div>
          </GlassCard>

          {/* Match prompt */}
          <div className="glass rounded-xl px-5 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
              <div className="p-2 rounded-lg bg-primary/15 border border-primary/25 shrink-0">
                <Sparkles className="size-4 text-primary" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">
                  Match against a job description
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  See matched and missing skills for any role
                </p>
              </div>
            </div>
            <Link to="/match" className="shrink-0">
              <Button
                size="sm"
                variant="outline"
                className="border-primary/30 text-primary hover:bg-primary/10 whitespace-nowrap"
                data-ocid="btn-go-match"
              >
                Match now
                <ArrowRight className="size-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      )}

      {/* ── Account Security card — always shown at bottom ── */}
      {user?.token && <AccountSecurityCard token={user.token} />}
    </div>
  );
}
