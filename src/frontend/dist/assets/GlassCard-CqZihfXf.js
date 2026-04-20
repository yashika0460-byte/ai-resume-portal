import { j as jsxRuntimeExports, g as cn } from "./index-BW0DBoAl.js";
const paddingMap = {
  none: "",
  sm: "p-4",
  md: "p-5",
  lg: "p-7"
};
function GlassCard({
  children,
  className,
  hover = false,
  glow = false,
  padding = "md",
  "data-ocid": ocid
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      "data-ocid": ocid,
      className: cn(
        "glass rounded-xl",
        paddingMap[padding],
        hover && "glass-hover cursor-pointer",
        glow === "indigo" && "accent-glow",
        glow === "violet" && "accent-glow-violet",
        glow === true && "accent-glow",
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
const SCORE_SIZES = {
  sm: {
    outer: "w-14 h-14",
    text: "text-lg",
    sub: "text-[9px]",
    stroke: 4,
    r: 22
  },
  md: {
    outer: "w-20 h-20",
    text: "text-2xl",
    sub: "text-[10px]",
    stroke: 5,
    r: 32
  },
  lg: {
    outer: "w-28 h-28",
    text: "text-3xl",
    sub: "text-xs",
    stroke: 6,
    r: 44
  }
};
function ScoreBadge({
  score,
  size = "md",
  "data-ocid": ocid
}) {
  const s = SCORE_SIZES[size];
  const circumference = 2 * Math.PI * s.r;
  const dashoffset = circumference * (1 - Math.min(score, 100) / 100);
  const color = score >= 70 ? "oklch(0.54 0.2 151)" : score >= 40 ? "oklch(0.65 0.18 79)" : "oklch(0.62 0.22 22)";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      "data-ocid": ocid,
      className: cn("relative flex items-center justify-center", s.outer),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            className: "absolute inset-0 -rotate-90",
            viewBox: `0 0 ${s.r * 2 + s.stroke * 2} ${s.r * 2 + s.stroke * 2}`,
            "aria-hidden": "true",
            role: "img",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Score gauge" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: s.r + s.stroke,
                  cy: s.r + s.stroke,
                  r: s.r,
                  fill: "none",
                  stroke: "oklch(0.18 0.012 264 / 0.5)",
                  strokeWidth: s.stroke
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "circle",
                {
                  cx: s.r + s.stroke,
                  cy: s.r + s.stroke,
                  r: s.r,
                  fill: "none",
                  stroke: color,
                  strokeWidth: s.stroke,
                  strokeDasharray: circumference,
                  strokeDashoffset: dashoffset,
                  strokeLinecap: "round"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex flex-col items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "span",
            {
              className: cn(
                "font-display font-bold text-foreground leading-none",
                s.text
              ),
              children: score
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: cn("text-muted-foreground font-mono", s.sub), children: "/100" })
        ] })
      ]
    }
  );
}
export {
  GlassCard as G,
  StatCard as S,
  ScoreBadge as a
};
