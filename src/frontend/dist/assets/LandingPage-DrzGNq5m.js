import { j as jsxRuntimeExports, B as BrainCircuit, f as Link, Z as Zap, r as reactExports } from "./index-BW0DBoAl.js";
import { m as motion } from "./proxy-BIbc0SRU.js";
import { S as Sparkles } from "./sparkles-D7iV9PZj.js";
import { C as ChevronDown } from "./chevron-down-Buq2wl4V.js";
import { C as CircleCheck } from "./circle-check-Cf-FaEkA.js";
import { F as FileSearch } from "./file-search-rzrtZ7ty.js";
import { T as Target } from "./target-B5jH6OHt.js";
import { L as LayoutDashboard } from "./layout-dashboard-BPG7NZXq.js";
import { T as TrendingUp } from "./trending-up-rLFaq9sj.js";
import { S as ShieldCheck } from "./shield-check-ByDfaybr.js";
function useCounter(target, duration = 2e3, start = false) {
  const [value, setValue] = reactExports.useState(0);
  reactExports.useEffect(() => {
    if (!start) return;
    let frame;
    const startTime = performance.now();
    const tick = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - (1 - progress) ** 3;
      setValue(Math.floor(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [start, target, duration]);
  return value;
}
const FEATURES = [
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(FileSearch, { className: "size-6" }),
    title: "Smart PDF Analysis",
    desc: "Upload any PDF resume. Our NLP engine extracts, normalizes, and categorizes skills — no templates, no rigid formats.",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/25",
    glow: "hover:shadow-glow-indigo"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-6" }),
    title: "Instant Scoring",
    desc: "Get a transparent 0–100 skill score in seconds. No black box — every point is traceable to a detected competency.",
    color: "text-accent",
    bg: "bg-accent/10 border-accent/25",
    glow: "hover:shadow-glow-violet"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Target, { className: "size-6" }),
    title: "Job Description Matching",
    desc: "Paste any job description and instantly see matched vs. missing skills. Know exactly where the gap is before the interview.",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/25",
    glow: "hover:shadow-glow-indigo"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "size-6" }),
    title: "Admin Analytics Portal",
    desc: "Full-featured admin dashboard with candidate tables, score distributions, top-skill charts, and user management.",
    color: "text-accent",
    bg: "bg-accent/10 border-accent/25",
    glow: "hover:shadow-glow-violet"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "size-6" }),
    title: "Profile & History",
    desc: "Track all past uploads, score trends over time, and export your full history as CSV for offline reporting.",
    color: "text-primary",
    bg: "bg-primary/10 border-primary/25",
    glow: "hover:shadow-glow-indigo"
  },
  {
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-6" }),
    title: "Secure & Private",
    desc: "bcrypt-hashed passwords, role-based access control, math CAPTCHA on registration. Your data never leaves the platform.",
    color: "text-accent",
    bg: "bg-accent/10 border-accent/25",
    glow: "hover:shadow-glow-violet"
  }
];
const STATS = [
  { target: 1e4, suffix: "+", label: "Resumes Analyzed" },
  { target: 95, suffix: "%", label: "Skill Accuracy" },
  { target: 500, suffix: "+", label: "Organizations" },
  { target: 48, suffix: "h", label: "Avg. Time Saved" }
];
const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Upload Your Resume",
    desc: "Drag and drop any PDF. The system parses text in real-time with no formatting requirements."
  },
  {
    step: "02",
    title: "AI Extracts Skills",
    desc: "Advanced NLP identifies 80+ skills with synonym normalization — 'ReactJS' = 'React.js' = 'React'."
  },
  {
    step: "03",
    title: "Get Your Score",
    desc: "Receive a transparent skill score instantly, with every detected competency listed clearly."
  },
  {
    step: "04",
    title: "Match to Jobs",
    desc: "Paste any job description to see exactly which skills you have and which you need to develop."
  }
];
function StatsSection() {
  const ref = reactExports.useRef(null);
  const [started, setStarted] = reactExports.useState(false);
  reactExports.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  const values = [
    useCounter(STATS[0].target, 2200, started),
    useCounter(STATS[1].target, 1800, started),
    useCounter(STATS[2].target, 2e3, started),
    useCounter(STATS[3].target, 1600, started)
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { ref, id: "stats", className: "py-24 relative", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-6xl mx-auto px-4 sm:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "text-center mb-16",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-accent uppercase tracking-widest mb-3", children: "By the numbers" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground", children: "Trusted by developers & recruiters" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-6", children: STATS.map((stat, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.9 },
          whileInView: { opacity: 1, scale: 1 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: i * 0.1 },
          className: "glass rounded-2xl p-6 text-center",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "font-display text-4xl sm:text-5xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent mb-2", children: [
              values[i],
              stat.suffix
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-muted-foreground font-body", children: stat.label })
          ]
        },
        stat.label
      )) })
    ] })
  ] });
}
function LandingPage() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen gradient-flow bg-grid-pattern text-foreground", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("header", { className: "sticky top-0 z-50 border-b border-border/20 bg-background/40 backdrop-blur-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-8 h-16 flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-accent/15 border border-accent/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { className: "size-5 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-semibold text-base tracking-tight", children: [
          "TalentScan",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "AI" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden md:flex items-center gap-6 text-sm text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#features",
            className: "hover:text-foreground transition-colors duration-150",
            children: "Features"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#how-it-works",
            className: "hover:text-foreground transition-colors duration-150",
            children: "How it works"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: "#stats",
            className: "hover:text-foreground transition-colors duration-150",
            children: "Results"
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/login",
            "data-ocid": "landing.login_button",
            className: "px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-glow-indigo",
            children: "Sign In"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/register",
            "data-ocid": "landing.register_button",
            className: "px-4 py-2 rounded-lg text-sm font-semibold bg-primary text-primary-foreground hover:bg-primary/90 transition-smooth shadow-glow-indigo",
            children: "Create Free Account"
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("section", { className: "relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center px-4 sm:px-8 pt-16 pb-24 overflow-hidden", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 flex items-center justify-center pointer-events-none", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-[700px] h-[700px] rounded-full bg-primary/8 blur-[120px] animate-pulse" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-1/3 left-1/4 w-[300px] h-[300px] rounded-full bg-accent/6 blur-[80px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative max-w-5xl mx-auto text-center", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -12 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.5 },
            className: "inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-mono font-semibold tracking-wider uppercase mb-6",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-3.5" }),
              "AI-Powered Resume Intelligence"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.h1,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.1 },
            className: "font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight text-foreground mb-6",
            children: [
              "Screen Resumes",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent", children: "10× Faster" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
              "with Real AI"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.p,
          {
            initial: { opacity: 0, y: 20 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.6, delay: 0.2 },
            className: "text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed",
            children: "Upload a PDF resume, extract 80+ normalized skills instantly, score candidates transparently, and match them to any job description — all in one modern platform."
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 40, scale: 0.97 },
            animate: { opacity: 1, y: 0, scale: 1 },
            transition: { duration: 0.8, delay: 0.4 },
            className: "relative max-w-4xl mx-auto",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl opacity-60" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "img",
                {
                  src: "/assets/generated/hero-neural-resume.dim_1200x630.jpg",
                  alt: "AI Resume Analysis visualization showing neural network with skill extraction",
                  className: "relative rounded-2xl border border-border/30 shadow-2xl w-full object-cover"
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0 },
            animate: { opacity: 1 },
            transition: { delay: 1.2 },
            className: "mt-12 flex flex-col items-center gap-1 text-muted-foreground",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono", children: "Explore features" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-4 animate-bounce" })
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-y border-border/20 bg-card/20 backdrop-blur-sm py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-5xl mx-auto px-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-3", children: [
      "NLP Skill Extraction",
      "Transparent Scoring",
      "Job Description Matching",
      "Admin Analytics",
      "CSV Export",
      "Password Recovery"
    ].map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex items-center gap-2 text-sm text-muted-foreground",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4 text-primary shrink-0" }),
          item
        ]
      },
      item
    )) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "features", className: "py-28 px-4 sm:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "text-center mb-16",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-accent uppercase tracking-widest mb-3", children: "Platform capabilities" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground mb-4", children: "Everything you need to hire smarter" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground max-w-xl mx-auto text-base", children: "A complete resume intelligence platform — built for both individual job seekers and enterprise HR teams." })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5",
          "data-ocid": "features.list",
          children: FEATURES.map((feature, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
            motion.div,
            {
              initial: { opacity: 0, y: 24 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true },
              transition: { duration: 0.5, delay: i * 0.08 },
              "data-ocid": `features.item.${i + 1}`,
              className: `glass rounded-2xl p-6 flex flex-col gap-4 border transition-smooth ${feature.glow}`,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: `inline-flex items-center justify-center w-12 h-12 rounded-xl border ${feature.bg} ${feature.color}`,
                    children: feature.icon
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-1.5", children: feature.title }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: feature.desc })
                ] })
              ]
            },
            feature.title
          ))
        }
      )
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatsSection, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { id: "how-it-works", className: "py-28 px-4 sm:px-8 bg-muted/10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-5xl mx-auto", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true },
          transition: { duration: 0.6 },
          className: "text-center mb-16",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-mono text-primary uppercase tracking-widest mb-3", children: "Simple workflow" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-3xl sm:text-4xl font-bold text-foreground", children: "From PDF to insights in 4 steps" })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6", children: HOW_IT_WORKS.map((step, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, x: -20 },
          whileInView: { opacity: 1, x: 0 },
          viewport: { once: true },
          transition: { duration: 0.5, delay: i * 0.1 },
          className: "relative",
          children: [
            i < HOW_IT_WORKS.length - 1 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden lg:block absolute top-6 left-full w-full h-px bg-gradient-to-r from-border/60 to-transparent z-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-6 relative z-10 h-full flex flex-col gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-mono text-4xl font-bold bg-gradient-to-br from-primary/60 to-accent/60 bg-clip-text text-transparent", children: step.step }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-display font-semibold text-foreground mb-1.5 text-sm", children: step.title }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed", children: step.desc })
              ] })
            ] })
          ]
        },
        step.step
      )) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/20 bg-card/20 backdrop-blur-sm py-8 px-4 sm:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1 rounded-md bg-accent/10 border border-accent/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { className: "size-4 text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-medium text-foreground/80", children: [
          "TalentScan",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "AI" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-border/60", children: "—" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "AI Resume Screening Portal" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/login",
            className: "hover:text-foreground transition-colors duration-150",
            children: "Sign In"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/register",
            className: "hover:text-foreground transition-colors duration-150",
            children: "Register"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "© ",
          (/* @__PURE__ */ new Date()).getFullYear(),
          " AI Resume Screening Portal"
        ] })
      ] })
    ] }) })
  ] });
}
export {
  LandingPage as default
};
