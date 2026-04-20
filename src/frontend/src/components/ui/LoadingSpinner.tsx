import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
  overlay?: boolean;
}

const sizeMap = {
  sm: "size-4 border-2",
  md: "size-6 border-2",
  lg: "size-10 border-[3px]",
};

const labelSizeMap = {
  sm: "text-xs",
  md: "text-sm",
  lg: "text-base",
};

export function LoadingSpinner({
  size = "md",
  label,
  className,
  overlay = false,
}: LoadingSpinnerProps) {
  const inner = (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        !overlay && className,
      )}
      aria-label={label ?? "Loading"}
      aria-busy="true"
    >
      <span
        className={cn(
          "block rounded-full border-primary/20 border-t-primary animate-spin",
          sizeMap[size],
        )}
        aria-hidden="true"
      />
      {label && (
        <span
          className={cn("text-muted-foreground font-body", labelSizeMap[size])}
        >
          {label}
        </span>
      )}
    </div>
  );

  if (overlay) {
    return (
      <div
        className={cn(
          "fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm",
          className,
        )}
      >
        {inner}
      </div>
    );
  }

  return inner;
}

// ── Skeleton block ────────────────────────────────────────────────────────────

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("rounded-lg shimmer", className)} aria-hidden="true" />
  );
}
