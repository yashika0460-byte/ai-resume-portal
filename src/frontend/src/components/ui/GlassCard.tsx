/**
 * GlassCard — Dark glass-morphism card with glow border.
 * Wraps content in the standard glass panel style.
 */

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: "indigo" | "violet" | boolean;
  padding?: "sm" | "md" | "lg" | "none";
  "data-ocid"?: string;
}

const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-7",
};

export function GlassCard({
  children,
  className,
  hover = false,
  glow = false,
  padding = "md",
  "data-ocid": ocid,
}: GlassCardProps) {
  return (
    <div
      data-ocid={ocid}
      className={cn(
        "glass rounded-xl",
        paddingMap[padding],
        hover && "glass-hover cursor-pointer",
        glow === "indigo" && "accent-glow",
        glow === "violet" && "accent-glow-violet",
        glow === true && "accent-glow",
        className,
      )}
    >
      {children}
    </div>
  );
}

// ── Stat card — KPI metric panel ──────────────────────────────────────────────

interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  icon?: ReactNode;
  positive?: boolean;
  trend?: "up" | "down" | "neutral";
  "data-ocid"?: string;
}

export function StatCard({
  label,
  value,
  delta,
  icon,
  positive = true,
  "data-ocid": ocid,
}: StatCardProps) {
  return (
    <GlassCard data-ocid={ocid} className="flex flex-col gap-3 min-w-0">
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm text-muted-foreground font-body leading-tight">
          {label}
        </span>
        {icon && (
          <div className="p-1.5 rounded-lg bg-accent/10 border border-accent/20 shrink-0 text-accent">
            {icon}
          </div>
        )}
      </div>
      <div className="flex items-end gap-2 min-w-0">
        <span className="text-3xl font-display font-bold text-foreground leading-none truncate">
          {value}
        </span>
        {delta && (
          <span
            className={cn(
              "text-xs font-medium mb-0.5 shrink-0",
              positive ? "text-accent" : "text-destructive",
            )}
          >
            {delta}
          </span>
        )}
      </div>
    </GlassCard>
  );
}

// ── Score badge — circular gauge display ──────────────────────────────────────

interface ScoreBadgeProps {
  score: number;
  size?: "sm" | "md" | "lg";
  "data-ocid"?: string;
}

const SCORE_SIZES = {
  sm: {
    outer: "w-14 h-14",
    text: "text-lg",
    sub: "text-[9px]",
    stroke: 4,
    r: 22,
  },
  md: {
    outer: "w-20 h-20",
    text: "text-2xl",
    sub: "text-[10px]",
    stroke: 5,
    r: 32,
  },
  lg: {
    outer: "w-28 h-28",
    text: "text-3xl",
    sub: "text-xs",
    stroke: 6,
    r: 44,
  },
};

export function ScoreBadge({
  score,
  size = "md",
  "data-ocid": ocid,
}: ScoreBadgeProps) {
  const s = SCORE_SIZES[size];
  const circumference = 2 * Math.PI * s.r;
  const dashoffset = circumference * (1 - Math.min(score, 100) / 100);
  const color =
    score >= 70
      ? "oklch(0.54 0.2 151)"
      : score >= 40
        ? "oklch(0.65 0.18 79)"
        : "oklch(0.62 0.22 22)";

  return (
    <div
      data-ocid={ocid}
      className={cn("relative flex items-center justify-center", s.outer)}
    >
      <svg
        className="absolute inset-0 -rotate-90"
        viewBox={`0 0 ${s.r * 2 + s.stroke * 2} ${s.r * 2 + s.stroke * 2}`}
        aria-hidden="true"
        role="img"
      >
        <title>Score gauge</title>
        <circle
          cx={s.r + s.stroke}
          cy={s.r + s.stroke}
          r={s.r}
          fill="none"
          stroke="oklch(0.18 0.012 264 / 0.5)"
          strokeWidth={s.stroke}
        />
        <circle
          cx={s.r + s.stroke}
          cy={s.r + s.stroke}
          r={s.r}
          fill="none"
          stroke={color}
          strokeWidth={s.stroke}
          strokeDasharray={circumference}
          strokeDashoffset={dashoffset}
          strokeLinecap="round"
        />
      </svg>
      <div className="relative flex flex-col items-center">
        <span
          className={cn(
            "font-display font-bold text-foreground leading-none",
            s.text,
          )}
        >
          {score}
        </span>
        <span className={cn("text-muted-foreground font-mono", s.sub)}>
          /100
        </span>
      </div>
    </div>
  );
}
