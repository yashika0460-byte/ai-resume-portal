/**
 * SkillBadge — domain-specific styled skill chips with category variants.
 *
 * Categories:
 *   technical  → indigo  (React, Node, Python, SQL, Docker, AWS, etc.)
 *   tools      → violet  (Figma, Jira, GitHub, VS Code, Postman, etc.)
 *   soft       → emerald (Communication, Leadership, Teamwork, etc.)
 *   matched    → accent/teal (skill matched against a JD)
 *   missing    → destructive (skill not found in resume)
 *   default    → slate/muted
 */

import { cn } from "@/lib/utils";

// ─── Skill category classification ───────────────────────────────────────────

const TECHNICAL_SKILLS = new Set([
  "react",
  "reactjs",
  "react.js",
  "node",
  "nodejs",
  "node.js",
  "python",
  "java",
  "javascript",
  "typescript",
  "sql",
  "mongodb",
  "docker",
  "kubernetes",
  "aws",
  "azure",
  "gcp",
  "git",
  "html",
  "css",
  "rest",
  "graphql",
  "express",
  "django",
  "flask",
  "spring",
  "angular",
  "vue",
  "vuejs",
  "php",
  "ruby",
  "rails",
  "golang",
  "rust",
  "c++",
  "c#",
  "scala",
  "kotlin",
  "swift",
  "mysql",
  "postgresql",
  "redis",
  "elasticsearch",
  "kafka",
  "rabbitmq",
  "terraform",
  "ansible",
  "jenkins",
  "ci/cd",
  "devops",
  "machine learning",
  "ml",
  "deep learning",
  "nlp",
  "tensorflow",
  "pytorch",
  "scikit-learn",
  "pandas",
  "numpy",
  "linux",
  "bash",
  "shell",
  "nginx",
  "apache",
  "microservices",
  "api",
  "restful",
]);

const TOOLS_SKILLS = new Set([
  "figma",
  "jira",
  "slack",
  "github",
  "gitlab",
  "bitbucket",
  "vscode",
  "vs code",
  "postman",
  "swagger",
  "confluence",
  "notion",
  "trello",
  "asana",
  "webpack",
  "vite",
  "npm",
  "yarn",
  "pnpm",
  "jest",
  "cypress",
  "selenium",
  "junit",
  "maven",
  "gradle",
  "xcode",
  "android studio",
  "photoshop",
  "illustrator",
  "sketch",
  "zeplin",
  "storybook",
  "datadog",
  "grafana",
  "prometheus",
  "splunk",
  "tableau",
  "power bi",
  "excel",
  "google analytics",
]);

const SOFT_SKILLS = new Set([
  "communication",
  "leadership",
  "teamwork",
  "problem-solving",
  "problem solving",
  "critical thinking",
  "time management",
  "adaptability",
  "collaboration",
  "creativity",
  "presentation",
  "mentoring",
  "project management",
  "agile",
  "scrum",
  "kanban",
  "analytical",
  "attention to detail",
  "decision making",
  "conflict resolution",
  "negotiation",
  "customer service",
  "research",
  "documentation",
  "planning",
  "organization",
]);

export type SkillCategory =
  | "technical"
  | "tools"
  | "soft"
  | "matched"
  | "missing"
  | "default";

export function classifySkill(label: string): SkillCategory {
  const normalized = label.toLowerCase().trim();
  if (TECHNICAL_SKILLS.has(normalized)) return "technical";
  if (TOOLS_SKILLS.has(normalized)) return "tools";
  if (SOFT_SKILLS.has(normalized)) return "soft";
  return "default";
}

// ─── SkillBadge ───────────────────────────────────────────────────────────────

type SkillStatus = "default" | "matched" | "missing" | "primary";

interface SkillBadgeProps {
  label: string;
  /** Explicit status (matched/missing for JD comparison) or auto-categorize */
  status?: SkillStatus;
  /** Force a specific category; if omitted and status is "matched", auto-classify */
  category?: SkillCategory;
  className?: string;
}

const categoryStyles: Record<SkillCategory, string> = {
  technical:
    "bg-indigo-500/15 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/25",
  tools:
    "bg-violet-500/15 text-violet-300 border-violet-500/30 hover:bg-violet-500/25",
  soft: "bg-emerald-500/15 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25",
  matched: "bg-accent/15 text-accent border-accent/30 hover:bg-accent/25",
  missing:
    "bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/25",
  default:
    "bg-muted/50 text-muted-foreground border-border/30 hover:bg-muted/80",
};

// Legacy status → category mapping for backward compat
const statusToCategory: Record<SkillStatus, SkillCategory> = {
  default: "default",
  matched: "matched",
  missing: "missing",
  primary: "technical",
};

export function SkillBadge({
  label,
  status = "default",
  category,
  className,
}: SkillBadgeProps) {
  // Determine effective category:
  //  1. explicit category prop wins
  //  2. if status="matched", auto-classify by skill name
  //  3. fall back to status → category mapping
  const effectiveCategory: SkillCategory =
    category ??
    (status === "matched" ? classifySkill(label) : statusToCategory[status]);

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border transition-smooth",
        categoryStyles[effectiveCategory],
        className,
      )}
    >
      {label}
    </span>
  );
}

// ─── ScoreGauge — animated SVG radial ring ───────────────────────────────────

interface ScoreGaugeProps {
  score: number;
  /** "lg" = 128px (result card), "sm" = 56px (history list) */
  size?: "lg" | "sm";
  className?: string;
  /** Animate on mount */
  animate?: boolean;
}

function getGaugeColor(score: number): string {
  if (score >= 85) return "oklch(0.72 0.18 162)"; // emerald
  if (score >= 70) return "oklch(0.67 0.22 264)"; // indigo
  if (score >= 50) return "oklch(0.78 0.18 75)"; // amber
  return "oklch(0.65 0.23 27)"; // red
}

function getScoreTierLabel(score: number): string {
  if (score >= 85) return "Excellent";
  if (score >= 70) return "Good";
  if (score >= 50) return "Fair";
  return "Low";
}

export function ScoreGauge({
  score,
  size = "lg",
  className,
  animate = true,
}: ScoreGaugeProps) {
  const isLg = size === "lg";
  const dim = isLg ? 128 : 56;
  const r = isLg ? 54 : 22;
  const cx = dim / 2;
  const cy = dim / 2;
  const strokeW = isLg ? 9 : 5;
  const circumference = 2 * Math.PI * r;
  const filled = (score / 100) * circumference;
  const dashoffset = circumference - filled;
  const color = getGaugeColor(score);
  const tier = getScoreTierLabel(score);

  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className,
      )}
      style={{ width: dim, height: dim }}
    >
      <svg
        width={dim}
        height={dim}
        viewBox={`0 0 ${dim} ${dim}`}
        aria-label={`Score: ${score} out of 100 — ${tier}`}
        role="img"
      >
        <title>{`Score: ${score}/100 — ${tier}`}</title>
        {/* Track */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke="oklch(1 0 0 / 0.08)"
          strokeWidth={strokeW}
        />
        {/* Filled arc */}
        <circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={color}
          strokeWidth={strokeW}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={animate ? dashoffset : dashoffset}
          transform={`rotate(-90 ${cx} ${cy})`}
          style={
            animate
              ? {
                  transition: "stroke-dashoffset 1.5s ease-out",
                  strokeDashoffset: dashoffset,
                }
              : undefined
          }
        />
      </svg>
      {/* Center text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        {isLg ? (
          <>
            <span
              className="font-mono font-bold leading-none"
              style={{ fontSize: 28, color }}
            >
              {score}
            </span>
            <span className="text-xs text-muted-foreground mt-0.5 font-medium">
              {tier}
            </span>
          </>
        ) : (
          <span
            className="font-mono font-bold leading-none"
            style={{ fontSize: 12, color }}
          >
            {score}
          </span>
        )}
      </div>
    </div>
  );
}

// ─── ScoreBadge (legacy text badge, kept for backward compat) ────────────────

interface ScoreBadgeProps {
  score: number;
  className?: string;
}

export function ScoreBadge({ score, className }: ScoreBadgeProps) {
  const tier = score >= 80 ? "high" : score >= 60 ? "mid" : "low";
  const styles = {
    high: "bg-accent/15 text-accent border-accent/30",
    mid: "bg-primary/15 text-primary border-primary/30",
    low: "bg-muted/50 text-muted-foreground border-border/30",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-semibold font-mono border",
        styles[tier],
        className,
      )}
    >
      {score}
    </span>
  );
}
