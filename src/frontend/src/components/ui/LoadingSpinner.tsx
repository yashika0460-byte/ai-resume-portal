import { cn } from "@/lib/utils";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
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
}: LoadingSpinnerProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        className,
      )}
      aria-label={label ?? "Loading"}
      aria-busy="true"
    >
      <span
        className={cn(
          "block rounded-full border-border/30 border-t-accent animate-spin",
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
}

// Skeleton block for content placeholders
interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("rounded-lg shimmer", className)} aria-hidden="true" />
  );
}
