/**
 * GlassCard — glass-morphism card variant wrapping shadcn Card.
 *
 * Use this for all dashboard panels and feature sections.
 * For simple shadcn cards, import from @/components/ui/card instead.
 */

import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glow?: boolean;
  "data-ocid"?: string;
}

export function GlassCard({
  children,
  className,
  hover = false,
  glow = false,
  "data-ocid": ocid,
}: GlassCardProps) {
  return (
    <div
      data-ocid={ocid}
      className={cn(
        "glass rounded-xl p-5",
        hover && "glass-hover cursor-pointer",
        glow && "accent-glow",
        className,
      )}
    >
      {children}
    </div>
  );
}

// Stat card — used in dashboard KPI row
interface StatCardProps {
  label: string;
  value: string | number;
  delta?: string;
  icon?: ReactNode;
  positive?: boolean;
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
