import { c as createLucideIcon, p as useQueryClient, r as reactExports, j as jsxRuntimeExports, b as Button, Z as Zap, d as useActor, u as useAuth, X, e as createActor } from "./index-BW0DBoAl.js";
import { u as useMutation } from "./useMutation-DJ2_JvTs.js";
import { S as Skeleton, I as Input } from "./skeleton-DPufJtYQ.js";
import { h as apiMatchResume } from "./api-D_-AFWZL.js";
import { a as useMatchHistory, u as useResumes } from "./use-resumes-BkByy20o.js";
import { B as Briefcase } from "./briefcase-DfzotPZe.js";
import { L as Layers } from "./layers-cTgFLR1g.js";
import { F as FileText } from "./file-text-BdAYUBQk.js";
import { m as motion } from "./proxy-BIbc0SRU.js";
import { T as Trash2 } from "./trash-2-DbtB38ng.js";
import { D as Download } from "./download-DJwlZCMW.js";
import { S as Search } from "./search-CnM-Bvfc.js";
import { A as AnimatePresence } from "./index-Dm-E-Pqd.js";
import { C as ChevronDown } from "./chevron-down-Buq2wl4V.js";
import { C as ChevronUp } from "./chevron-up-Dj0QWSpa.js";
import { C as CircleAlert } from "./circle-alert-Vzmw5HjG.js";
import { C as CircleCheck } from "./circle-check-Cf-FaEkA.js";
import { L as LoaderCircle, C as CircleX } from "./loader-circle-DlcuGtIl.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M10 20a1 1 0 0 0 .553.895l2 1A1 1 0 0 0 14 21v-7a2 2 0 0 1 .517-1.341L21.74 4.67A1 1 0 0 0 21 3H3a1 1 0 0 0-.742 1.67l7.225 7.989A2 2 0 0 1 10 14z",
      key: "sc7q7i"
    }
  ]
];
const Funnel = createLucideIcon("funnel", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M5 12h14", key: "1ays0h" }],
  ["path", { d: "M12 5v14", key: "s699le" }]
];
const Plus = createLucideIcon("plus", __iconNode);
function scoreColorClass(score) {
  if (score >= 70) return "text-emerald-400";
  if (score >= 40) return "text-amber-400";
  return "text-red-400";
}
function scoreStroke(score) {
  if (score >= 70) return "#34d399";
  if (score >= 40) return "#fbbf24";
  return "#f87171";
}
function formatDate(iso) {
  return new Date(iso).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });
}
function truncateJD(jd, max = 120) {
  return jd.length <= max ? jd : `${jd.slice(0, max).trimEnd()}…`;
}
function exportToCSV(records) {
  const header = [
    "Candidate",
    "Match Score",
    "Matched Skills",
    "Missing Skills",
    "Date"
  ];
  const rows = records.map((r) => [
    `"${r.resumeName}"`,
    r.matchScore,
    `"${r.matchedSkills.join(", ")}"`,
    `"${r.missingSkills.join(", ")}"`,
    `"${formatDate(r.createdAt)}"`
  ]);
  const csv = [header.join(","), ...rows.map((r) => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `match-results-${Date.now()}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
function CircularGauge({ score, size = 36 }) {
  const r = (size - 6) / 2;
  const circ = 2 * Math.PI * r;
  const dash = score / 100 * circ;
  const center = size / 2;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative shrink-0", style: { width: size, height: size }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "svg",
      {
        width: size,
        height: size,
        viewBox: `0 0 ${size} ${size}`,
        "aria-hidden": "true",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: center,
              cy: center,
              r,
              stroke: "oklch(0.20 0.01 264)",
              strokeWidth: 4,
              fill: "none"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "circle",
            {
              cx: center,
              cy: center,
              r,
              stroke: scoreStroke(score),
              strokeWidth: 4,
              fill: "none",
              strokeDasharray: `${dash} ${circ}`,
              strokeLinecap: "round",
              transform: `rotate(-90 ${center} ${center})`,
              style: { transition: "stroke-dasharray 0.7s ease" }
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `absolute inset-0 flex items-center justify-center text-[9px] font-bold font-mono ${scoreColorClass(score)}`,
        children: score
      }
    )
  ] });
}
function SkillList({
  skills,
  variant
}) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const shown = expanded ? skills : skills.slice(0, 3);
  if (skills.length === 0)
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "—" });
  const cls = variant === "matched" ? "bg-emerald-500/10 text-emerald-300 border-emerald-500/25" : "bg-red-500/10 text-red-300 border-red-500/25";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-1", children: [
    shown.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: `text-[10px] px-1.5 py-0.5 rounded-md border font-medium ${cls}`,
        children: s
      },
      s
    )),
    skills.length > 3 && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        className: "text-xs text-accent hover:underline",
        onClick: () => setExpanded(!expanded),
        children: expanded ? "less" : `+${skills.length - 3} more`
      }
    )
  ] });
}
function buildJDList(records) {
  const map = /* @__PURE__ */ new Map();
  for (const r of records) {
    const existing = map.get(r.jobDescription);
    if (!existing)
      map.set(r.jobDescription, { count: 1, lastDate: r.createdAt });
    else {
      existing.count += 1;
      if (r.createdAt > existing.lastDate) existing.lastDate = r.createdAt;
    }
  }
  return Array.from(map.entries()).map(([jd, meta]) => ({ jd, ...meta })).sort((a, b) => b.lastDate.localeCompare(a.lastDate));
}
function RunMatchModal({ resumes, onClose, onDone }) {
  var _a;
  const { actor } = useActor(createActor);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [resumeId, setResumeId] = reactExports.useState(((_a = resumes[0]) == null ? void 0 : _a.id) ?? "");
  const [jd, setJd] = reactExports.useState("");
  const [error, setError] = reactExports.useState("");
  const [success, setSuccess] = reactExports.useState(false);
  const runMatch = useMutation({
    mutationFn: async () => {
      if (!actor) throw new Error("Actor not ready");
      if (!(user == null ? void 0 : user.token)) throw new Error("Not authenticated");
      if (!resumeId) throw new Error("Select a resume");
      if (!jd.trim()) throw new Error("Job description is required");
      return apiMatchResume(
        actor,
        user.token,
        resumeId,
        jd.trim()
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matchHistory"] });
      setSuccess(true);
      setTimeout(onDone, 1200);
    },
    onError: (e) => setError(e.message)
  });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "dialog",
    {
      "aria-label": "Run New Match",
      className: "fixed inset-0 z-50 m-0 flex h-full w-full max-w-none items-center justify-center bg-foreground/20 p-0 backdrop-blur-sm [&::backdrop]:hidden",
      "data-ocid": "run-match.dialog",
      onClick: (e) => e.target === e.currentTarget && onClose(),
      onKeyDown: (e) => e.key === "Escape" && onClose(),
      open: true,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95, y: 16 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.95, y: 8 },
          className: "glass rounded-2xl border border-border/30 w-full max-w-lg mx-4 p-6 space-y-5 shadow-xl",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground", children: "Run New Match" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "p-1.5 rounded-lg hover:bg-muted/40 transition-smooth",
                  onClick: onClose,
                  "data-ocid": "run-match.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4 text-muted-foreground" })
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "run-match-resume",
                    className: "text-sm font-medium text-foreground",
                    children: "Resume"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "select",
                  {
                    id: "run-match-resume",
                    className: "w-full rounded-xl bg-muted/20 border border-border/30 px-3 py-2.5 text-sm text-foreground outline-none focus:border-accent/40 transition-smooth",
                    value: resumeId,
                    onChange: (e) => setResumeId(e.target.value),
                    "data-ocid": "run-match.resume_select",
                    children: resumes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "No resumes available" }) : resumes.map((r) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: r.id, children: r.filename }, r.id))
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "run-match-jd",
                    className: "text-sm font-medium text-foreground",
                    children: "Job Description"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    id: "run-match-jd",
                    rows: 6,
                    className: "w-full rounded-xl bg-muted/20 border border-border/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent/40 resize-none transition-smooth",
                    placeholder: "Paste the job description here…",
                    value: jd,
                    onChange: (e) => {
                      setJd(e.target.value);
                      setError("");
                    },
                    "data-ocid": "run-match.jd_textarea"
                  }
                )
              ] }),
              error && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 text-destructive text-sm",
                  "data-ocid": "run-match.error_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "size-4 shrink-0" }),
                    error
                  ]
                }
              ),
              success && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-2 text-emerald-400 text-sm",
                  "data-ocid": "run-match.success_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4 shrink-0" }),
                    "Match completed!"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  variant: "outline",
                  onClick: onClose,
                  "data-ocid": "run-match.cancel_button",
                  children: "Cancel"
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  onClick: () => runMatch.mutate(),
                  disabled: runMatch.isPending || !resumeId || !jd.trim(),
                  "data-ocid": "run-match.submit_button",
                  children: runMatch.isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 animate-spin mr-2" }),
                    "Running…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-4 mr-2" }),
                    "Run Match"
                  ] })
                }
              )
            ] })
          ]
        }
      )
    }
  );
}
function BulkMatchModal({ resumes, onClose, onDone }) {
  const { actor } = useActor(createActor);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [bulkSelected, setBulkSelected] = reactExports.useState(/* @__PURE__ */ new Set());
  const [jd, setJd] = reactExports.useState("");
  const [progress, setProgress] = reactExports.useState(null);
  const [isRunning, setIsRunning] = reactExports.useState(false);
  const toggleResume = (id) => {
    setBulkSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };
  const runBulk = async () => {
    if (!actor || !(user == null ? void 0 : user.token) || bulkSelected.size === 0 || !jd.trim()) return;
    setIsRunning(true);
    const items = Array.from(bulkSelected).map((id) => {
      var _a;
      return {
        resumeId: id,
        filename: ((_a = resumes.find((r) => r.id === id)) == null ? void 0 : _a.filename) ?? id,
        status: "pending"
      };
    });
    setProgress(items);
    for (let i = 0; i < items.length; i++) {
      setProgress(
        (prev) => prev.map((p, idx) => idx === i ? { ...p, status: "running" } : p)
      );
      try {
        const result = await apiMatchResume(
          actor,
          user.token,
          items[i].resumeId,
          jd.trim()
        );
        setProgress(
          (prev) => prev.map(
            (p, idx) => idx === i ? { ...p, status: "done", score: result.matchScore } : p
          )
        );
      } catch (e) {
        setProgress(
          (prev) => prev.map(
            (p, idx) => idx === i ? {
              ...p,
              status: "error",
              error: e instanceof Error ? e.message : "Failed"
            } : p
          )
        );
      }
    }
    queryClient.invalidateQueries({ queryKey: ["matchHistory"] });
    setIsRunning(false);
    setTimeout(onDone, 1500);
  };
  const allDone = progress == null ? void 0 : progress.every(
    (p) => p.status === "done" || p.status === "error"
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "dialog",
    {
      "aria-label": "Bulk Match",
      className: "fixed inset-0 z-50 m-0 flex h-full w-full max-w-none items-center justify-center bg-foreground/20 p-0 backdrop-blur-sm [&::backdrop]:hidden",
      "data-ocid": "bulk-match.dialog",
      onClick: (e) => e.target === e.currentTarget && !isRunning && onClose(),
      onKeyDown: (e) => e.key === "Escape" && !isRunning && onClose(),
      open: true,
      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
        motion.div,
        {
          initial: { opacity: 0, scale: 0.95, y: 16 },
          animate: { opacity: 1, scale: 1, y: 0 },
          exit: { opacity: 0, scale: 0.95, y: 8 },
          className: "glass rounded-2xl border border-border/30 w-full max-w-2xl mx-4 p-6 space-y-5 shadow-xl max-h-[90vh] overflow-y-auto",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display text-lg font-bold text-foreground", children: "Bulk Match" }),
              !isRunning && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "p-1.5 rounded-lg hover:bg-muted/40 transition-smooth",
                  onClick: onClose,
                  "data-ocid": "bulk-match.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4 text-muted-foreground" })
                }
              )
            ] }),
            !progress ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-medium text-foreground", children: [
                    "Select Resumes (",
                    bulkSelected.size,
                    " of ",
                    resumes.length,
                    ")"
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 text-xs", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "text-accent hover:underline",
                        onClick: () => setBulkSelected(new Set(resumes.map((r) => r.id))),
                        "data-ocid": "bulk-match.select_all",
                        children: "All"
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "button",
                      {
                        type: "button",
                        className: "text-muted-foreground hover:underline",
                        onClick: () => setBulkSelected(/* @__PURE__ */ new Set()),
                        "data-ocid": "bulk-match.clear_all",
                        children: "Clear"
                      }
                    )
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-h-48 overflow-y-auto space-y-1 rounded-xl border border-border/20 p-2", children: resumes.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground p-2", children: "No resumes available" }) : resumes.map((r, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "label",
                  {
                    className: "flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted/30 cursor-pointer transition-smooth",
                    "data-ocid": `bulk-match.resume_checkbox.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "input",
                        {
                          type: "checkbox",
                          checked: bulkSelected.has(r.id),
                          onChange: () => toggleResume(r.id),
                          className: "rounded accent-accent"
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground truncate", children: r.filename }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "ml-auto text-xs text-muted-foreground font-mono", children: [
                        r.score,
                        "%"
                      ] })
                    ]
                  },
                  r.id
                )) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "label",
                  {
                    htmlFor: "bulk-match-jd",
                    className: "text-sm font-medium text-foreground",
                    children: "Job Description"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "textarea",
                  {
                    id: "bulk-match-jd",
                    rows: 5,
                    className: "w-full rounded-xl bg-muted/20 border border-border/30 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none focus:border-accent/40 resize-none transition-smooth",
                    placeholder: "Paste the job description here…",
                    value: jd,
                    onChange: (e) => setJd(e.target.value),
                    "data-ocid": "bulk-match.jd_textarea"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 justify-end", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    onClick: onClose,
                    "data-ocid": "bulk-match.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    onClick: runBulk,
                    disabled: bulkSelected.size === 0 || !jd.trim(),
                    "data-ocid": "bulk-match.submit_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "size-4 mr-2" }),
                      "Match",
                      " ",
                      bulkSelected.size > 0 ? `${bulkSelected.size} Resumes` : "Resumes"
                    ]
                  }
                )
              ] })
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground", children: [
                "Running matches against ",
                progress.length,
                " resume",
                progress.length !== 1 ? "s" : "",
                "…"
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "bulk-match.progress_list", children: progress.map((p, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex items-center gap-3 px-4 py-3 rounded-xl bg-muted/20 border border-border/20",
                  "data-ocid": `bulk-match.progress_item.${idx + 1}`,
                  children: [
                    p.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "size-4 rounded-full border-2 border-border/40" }),
                    p.status === "running" && /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "size-4 text-accent animate-spin shrink-0" }),
                    p.status === "done" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "size-4 text-emerald-400 shrink-0" }),
                    p.status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx(CircleX, { className: "size-4 text-destructive shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-foreground truncate flex-1 min-w-0", children: p.filename }),
                    p.status === "done" && p.score !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "span",
                      {
                        className: `text-sm font-semibold font-mono ml-auto ${scoreColorClass(p.score)}`,
                        children: [
                          p.score,
                          "%"
                        ]
                      }
                    ),
                    p.status === "error" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-destructive ml-auto", children: p.error })
                  ]
                },
                p.resumeId
              )) }),
              allDone && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onClose, "data-ocid": "bulk-match.done_button", children: "Done" }) })
            ] })
          ]
        }
      )
    }
  );
}
function AdminMatchingPage() {
  const { data: matchHistory = [], isLoading: histLoading } = useMatchHistory();
  const { data: resumes = [], isLoading: resumesLoading } = useResumes();
  const queryClient = useQueryClient();
  const [selectedJD, setSelectedJD] = reactExports.useState(null);
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [minScore, setMinScore] = reactExports.useState(0);
  const [maxScore, setMaxScore] = reactExports.useState(100);
  const [sortField, setSortField] = reactExports.useState("score");
  const [sortOrder, setSortOrder] = reactExports.useState("desc");
  const [showRunModal, setShowRunModal] = reactExports.useState(false);
  const [showBulkModal, setShowBulkModal] = reactExports.useState(false);
  const [deletedJDs, setDeletedJDs] = reactExports.useState(/* @__PURE__ */ new Set());
  const jdList = reactExports.useMemo(() => {
    const filtered = matchHistory.filter(
      (r) => !deletedJDs.has(r.jobDescription)
    );
    return buildJDList(filtered);
  }, [matchHistory, deletedJDs]);
  const filteredResults = reactExports.useMemo(() => {
    if (!selectedJD) return [];
    let results = matchHistory.filter(
      (r) => r.jobDescription === selectedJD && !deletedJDs.has(r.jobDescription)
    );
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      results = results.filter((r) => r.resumeName.toLowerCase().includes(q));
    }
    results = results.filter(
      (r) => r.matchScore >= minScore && r.matchScore <= maxScore
    );
    results = [...results].sort((a, b) => {
      const aVal = sortField === "score" ? a.matchScore : new Date(a.createdAt).getTime();
      const bVal = sortField === "score" ? b.matchScore : new Date(b.createdAt).getTime();
      return sortOrder === "desc" ? bVal - aVal : aVal - bVal;
    });
    return results;
  }, [
    matchHistory,
    selectedJD,
    searchQuery,
    minScore,
    maxScore,
    sortField,
    sortOrder,
    deletedJDs
  ]);
  const handleSort = reactExports.useCallback(
    (field) => {
      if (sortField === field)
        setSortOrder((o) => o === "desc" ? "asc" : "desc");
      else {
        setSortField(field);
        setSortOrder("desc");
      }
    },
    [sortField]
  );
  const SortIcon = ({ field }) => {
    if (sortField !== field)
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-3 text-muted-foreground/50" });
    return sortOrder === "desc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "size-3 text-accent" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { className: "size-3 text-accent" });
  };
  const selectedJDEntry = jdList.find((j) => j.jd === selectedJD);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-7xl mx-auto px-4 sm:px-6 py-10 flex flex-col gap-6 fade-up",
      "data-ocid": "admin-matching.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-accent/15 border border-accent/30 shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "size-5 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Job Matching" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Match job descriptions against candidate resumes and explore compatibility scores." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2 shrink-0 mt-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => setShowBulkModal(true),
                "data-ocid": "admin-matching.bulk_match_button",
                disabled: resumesLoading,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "size-4 mr-2" }),
                  "Bulk Match"
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                onClick: () => setShowRunModal(true),
                "data-ocid": "admin-matching.run_match_button",
                disabled: resumesLoading,
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { className: "size-4 mr-2" }),
                  "New Match"
                ]
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "flex gap-5 flex-1 min-h-0",
            style: { alignItems: "flex-start" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "w-72 shrink-0 space-y-3",
                  "data-ocid": "admin-matching.jd_panel",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold uppercase tracking-wider text-muted-foreground px-1", children: "Job Descriptions" }),
                    histLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-2xl" }, i)) }) : jdList.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "glass rounded-2xl border border-border/20 p-6 flex flex-col items-center gap-3 text-center",
                        "data-ocid": "admin-matching.jd_empty_state",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-2xl bg-accent/10 border border-accent/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-6 text-accent" }) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "No matches run yet" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Run a match to see job descriptions listed here." }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            Button,
                            {
                              size: "sm",
                              className: "mt-1",
                              onClick: () => setShowRunModal(true),
                              "data-ocid": "admin-matching.empty_run_button",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-3.5 mr-1.5" }),
                                "Run a Match"
                              ]
                            }
                          )
                        ]
                      }
                    ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-2", "data-ocid": "admin-matching.jd_list", children: jdList.map((entry, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      motion.div,
                      {
                        initial: { opacity: 0, x: -8 },
                        animate: { opacity: 1, x: 0 },
                        transition: { delay: idx * 0.05 },
                        className: `glass rounded-2xl border p-4 cursor-pointer transition-smooth group relative ${selectedJD === entry.jd ? "border-accent/40 bg-accent/5" : "border-border/20 hover:border-accent/20"}`,
                        onClick: () => setSelectedJD(entry.jd === selectedJD ? null : entry.jd),
                        "data-ocid": `admin-matching.jd_card.${idx + 1}`,
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-foreground leading-relaxed line-clamp-3 pr-5", children: truncateJD(entry.jd) }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-2.5 flex items-center gap-2", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                              entry.count,
                              " match",
                              entry.count !== 1 ? "es" : ""
                            ] }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground/30", children: "·" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDate(entry.lastDate) })
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              className: "absolute top-3 right-3 p-1 rounded-lg opacity-0 group-hover:opacity-100 hover:bg-destructive/10 hover:text-destructive transition-smooth",
                              onClick: (e) => {
                                e.stopPropagation();
                                setDeletedJDs((prev) => /* @__PURE__ */ new Set([...prev, entry.jd]));
                                if (selectedJD === entry.jd) setSelectedJD(null);
                              },
                              "aria-label": "Remove job description",
                              "data-ocid": `admin-matching.jd_delete_button.${idx + 1}`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-3" })
                            }
                          )
                        ]
                      },
                      entry.jd
                    )) })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "div",
                {
                  className: "flex-1 min-w-0 space-y-4",
                  "data-ocid": "admin-matching.results_panel",
                  children: !selectedJD ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    "div",
                    {
                      className: "glass rounded-2xl border border-border/20 flex flex-col items-center justify-center py-24 gap-4 text-center",
                      "data-ocid": "admin-matching.select_jd_state",
                      children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-2xl bg-accent/10 border border-accent/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-8 text-accent" }) }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base", children: jdList.length > 0 ? "Select a job description" : "No matches yet" }),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground max-w-xs", children: jdList.length > 0 ? "Choose a job description from the left panel to see match results." : "Run your first match to see how candidates compare." })
                      ]
                    }
                  ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl border border-border/20 p-4 space-y-3", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-4 text-accent shrink-0" }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm font-semibold text-foreground", children: [
                            (selectedJDEntry == null ? void 0 : selectedJDEntry.count) ?? 0,
                            " candidates matched"
                          ] })
                        ] }),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs(
                          Button,
                          {
                            variant: "outline",
                            size: "sm",
                            onClick: () => exportToCSV(filteredResults),
                            "data-ocid": "admin-matching.csv_export_button",
                            disabled: filteredResults.length === 0,
                            children: [
                              /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-3.5 mr-1.5" }),
                              "Export CSV"
                            ]
                          }
                        )
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed line-clamp-2 border-t border-border/15 pt-2", children: truncateJD(selectedJD, 200) })
                    ] }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "glass rounded-2xl border border-border/20 p-4 flex flex-wrap gap-3 items-center",
                        "data-ocid": "admin-matching.filters_panel",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-1 min-w-[160px]", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "size-4 text-muted-foreground shrink-0" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              Input,
                              {
                                type: "search",
                                placeholder: "Search candidates…",
                                className: "h-8 text-sm bg-transparent border-none shadow-none focus-visible:ring-0",
                                value: searchQuery,
                                onChange: (e) => setSearchQuery(e.target.value),
                                "data-ocid": "admin-matching.search_input"
                              }
                            )
                          ] }),
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx(Funnel, { className: "size-3.5 shrink-0" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "score-min", className: "text-xs", children: "Score:" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "input",
                              {
                                id: "score-min",
                                type: "number",
                                min: 0,
                                max: 100,
                                value: minScore,
                                onChange: (e) => setMinScore(Number(e.target.value)),
                                className: "w-12 h-7 rounded-lg bg-muted/30 border border-border/20 px-2 text-xs text-center outline-none focus:border-accent/40 transition-smooth",
                                "data-ocid": "admin-matching.score_min_input"
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "—" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx(
                              "input",
                              {
                                type: "number",
                                min: 0,
                                max: 100,
                                value: maxScore,
                                onChange: (e) => setMaxScore(Number(e.target.value)),
                                className: "w-12 h-7 rounded-lg bg-muted/30 border border-border/20 px-2 text-xs text-center outline-none focus:border-accent/40 transition-smooth",
                                "data-ocid": "admin-matching.score_max_input"
                              }
                            )
                          ] })
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      "div",
                      {
                        className: "glass rounded-2xl border border-border/20 overflow-hidden",
                        "data-ocid": "admin-matching.results_table",
                        children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-5 py-3.5 border-b border-border/15 bg-muted/30 grid grid-cols-[2fr_80px_1.5fr_1.5fr_1fr] gap-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider", children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Candidate" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "button",
                              {
                                type: "button",
                                className: "flex items-center gap-1 hover:text-foreground transition-smooth text-left",
                                onClick: () => handleSort("score"),
                                "data-ocid": "admin-matching.sort_score",
                                children: [
                                  "Score ",
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, { field: "score" })
                                ]
                              }
                            ),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Matched Skills" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Missing Skills" }),
                            /* @__PURE__ */ jsxRuntimeExports.jsxs(
                              "button",
                              {
                                type: "button",
                                className: "flex items-center gap-1 hover:text-foreground transition-smooth text-left",
                                onClick: () => handleSort("date"),
                                "data-ocid": "admin-matching.sort_date",
                                children: [
                                  "Date ",
                                  /* @__PURE__ */ jsxRuntimeExports.jsx(SortIcon, { field: "date" })
                                ]
                              }
                            )
                          ] }),
                          histLoading ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "div",
                            {
                              className: "p-4 space-y-3",
                              "data-ocid": "admin-matching.loading_state",
                              children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-xl" }, i))
                            }
                          ) : filteredResults.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            "div",
                            {
                              className: "flex flex-col items-center justify-center py-16 gap-3 text-center",
                              "data-ocid": "admin-matching.results_empty_state",
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-2xl bg-muted/30 border border-border/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "size-6 text-muted-foreground" }) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: "No results found" }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Try adjusting your filters or search query." })
                              ]
                            }
                          ) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "admin-matching.results_list", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { mode: "popLayout", children: filteredResults.map((record, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
                            motion.div,
                            {
                              initial: { opacity: 0, y: 6 },
                              animate: { opacity: 1, y: 0 },
                              exit: { opacity: 0, y: -4 },
                              transition: { delay: idx * 0.03 },
                              className: "px-5 py-4 border-b border-border/10 last:border-0 grid grid-cols-[2fr_80px_1.5fr_1.5fr_1fr] gap-4 items-start hover:bg-muted/15 transition-smooth",
                              "data-ocid": `admin-matching.result_row.${idx + 1}`,
                              children: [
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: record.resumeName }) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  CircularGauge,
                                  {
                                    score: record.matchScore,
                                    size: 40
                                  }
                                ) }),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  SkillList,
                                  {
                                    skills: record.matchedSkills,
                                    variant: "matched"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx(
                                  SkillList,
                                  {
                                    skills: record.missingSkills,
                                    variant: "missing"
                                  }
                                ),
                                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDate(record.createdAt) })
                              ]
                            },
                            record.id
                          )) }) })
                        ]
                      }
                    )
                  ] })
                }
              )
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(AnimatePresence, { children: [
          showRunModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
            RunMatchModal,
            {
              resumes,
              onClose: () => setShowRunModal(false),
              onDone: () => {
                setShowRunModal(false);
                queryClient.invalidateQueries({ queryKey: ["matchHistory"] });
              }
            }
          ),
          showBulkModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
            BulkMatchModal,
            {
              resumes,
              onClose: () => setShowBulkModal(false),
              onDone: () => {
                setShowBulkModal(false);
              }
            }
          )
        ] })
      ]
    }
  );
}
export {
  AdminMatchingPage as default
};
