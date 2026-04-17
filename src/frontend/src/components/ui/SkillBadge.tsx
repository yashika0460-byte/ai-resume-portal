/**
 * SkillBadge — styled badge for skill tags.
 *
 * Distinct from shadcn Badge — this is domain-specific and adds
 * color variants for skill status.
 */

import { cn } from "@/lib/utils";

type SkillStatus = "default" | "matched" | "missing" | "primary";

interface SkillBadgeProps {
  label: string;
  status?: SkillStatus;
  className?: string;
}

const statusStyles: Record<SkillStatus, string> = {
  default:
    "bg-muted/50 text-muted-foreground border-border/30 hover:bg-muted/80",
  matched: "bg-accent/15 text-accent border-accent/30 hover:bg-accent/25",
  missing:
    "bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/25",
  primary: "bg-primary/15 text-primary border-primary/30 hover:bg-primary/25",
};

export function SkillBadge({
  label,
  status = "default",
  className,
}: SkillBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border transition-smooth",
        statusStyles[status],
        className,
      )}
    >
      {label}
    </span>
  );
}

// Score badge — colored by score value
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
