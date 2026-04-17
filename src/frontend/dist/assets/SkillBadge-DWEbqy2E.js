import { j as jsxRuntimeExports, m as cn } from "./index-C0uoDo9R.js";
function GlassCard({
  children,
  className,
  hover = false,
  glow = false,
  "data-ocid": ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-ocid": ocid,
      className: cn(
        "glass rounded-xl p-5",
        hover && "glass-hover cursor-pointer",
        glow && "accent-glow",
        className
      ),
      children
    }
  );
}
function StatCard({
  label,
  value,
  delta,
  icon,
  positive = true,
  "data-ocid": ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(GlassCard, { "data-ocid": ocid, className: "flex flex-col gap-3 min-w-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-muted-foreground font-body leading-tight", children: label }),
      icon && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-accent/10 border border-accent/20 shrink-0 text-accent", children: icon })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-end gap-2 min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-3xl font-display font-bold text-foreground leading-none truncate", children: value }),
      delta && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: cn(
            "text-xs font-medium mb-0.5 shrink-0",
            positive ? "text-accent" : "text-destructive"
          ),
          children: delta
        }
      )
    ] })
  ] });
}
const statusStyles = {
  default: "bg-muted/50 text-muted-foreground border-border/30 hover:bg-muted/80",
  matched: "bg-accent/15 text-accent border-accent/30 hover:bg-accent/25",
  missing: "bg-destructive/15 text-destructive border-destructive/30 hover:bg-destructive/25",
  primary: "bg-primary/15 text-primary border-primary/30 hover:bg-primary/25"
};
function SkillBadge({
  label,
  status = "default",
  className
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-xs font-medium border transition-smooth",
        statusStyles[status],
        className
      ),
      children: label
    }
  );
}
function ScoreBadge({ score, className }) {
  const tier = score >= 80 ? "high" : score >= 60 ? "mid" : "low";
  const styles = {
    high: "bg-accent/15 text-accent border-accent/30",
    mid: "bg-primary/15 text-primary border-primary/30",
    low: "bg-muted/50 text-muted-foreground border-border/30"
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "span",
    {
      className: cn(
        "inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-sm font-semibold font-mono border",
        styles[tier],
        className
      ),
      children: score
    }
  );
}
export {
  GlassCard as G,
  StatCard as S,
  SkillBadge as a,
  ScoreBadge as b
};
