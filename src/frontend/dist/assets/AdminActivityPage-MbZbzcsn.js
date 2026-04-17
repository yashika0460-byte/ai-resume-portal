import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, b as Button, m as cn, Z as Zap } from "./index-C0uoDo9R.js";
import { S as Skeleton, I as Input, B as Badge } from "./skeleton-DxQsomYT.js";
import { u as useResumes, a as useMatchHistory } from "./use-resumes-U5T9p0Y7.js";
import { C as ChevronLeft } from "./chevron-left-BAAQAeGr.js";
import { A as Activity } from "./activity-BcyXHvVH.js";
import { D as Download } from "./download-DDcVfCS6.js";
import { S as Search } from "./search-DDF7a46k.js";
import { A as ArrowUpDown } from "./arrow-up-down-DZ8is5MK.js";
import { L as Layers } from "./layers-CotdXmeU.js";
import { F as FileUp } from "./file-up-BRLw-tVE.js";
import { U as Users } from "./users-sZU7Bq5d.js";
import "./useMutation-IWYl8V_O.js";
import "./api-D_-AFWZL.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "m3 16 4 4 4-4", key: "1co6wj" }],
  ["path", { d: "M7 20V4", key: "1yoxec" }],
  ["path", { d: "m21 8-4-4-4 4", key: "1c9v7m" }],
  ["path", { d: "M17 4v16", key: "7dpous" }]
];
const ArrowDownUp = createLucideIcon("arrow-down-up", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode);
function synthesizeEvents(resumes, matches) {
  const uploadEvents = resumes.map((r) => ({
    id: `upload-${r.id}`,
    type: "Resume Upload",
    timestamp: r.uploadDate,
    actor: r.uploadedBy ?? "user",
    target: r.filename,
    score: r.score
  }));
  const matchEvents = matches.map((m) => ({
    id: `match-${m.id}`,
    type: "Job Match",
    timestamp: m.createdAt,
    actor: "system",
    target: m.jobDescription.slice(0, 50),
    score: m.matchScore
  }));
  return [...uploadEvents, ...matchEvents].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}
function formatDate(iso) {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}
function isToday(iso) {
  const today = /* @__PURE__ */ new Date();
  const d = new Date(iso);
  return d.getFullYear() === today.getFullYear() && d.getMonth() === today.getMonth() && d.getDate() === today.getDate();
}
function exportCSV(events) {
  const header = ["Timestamp", "Action", "Actor", "Target", "Score"].join(",");
  const rows = events.map(
    (e) => [
      `"${e.timestamp}"`,
      `"${e.type}"`,
      `"${e.actor}"`,
      `"${e.target.replace(/"/g, '""')}"`,
      e.score
    ].join(",")
  );
  const blob = new Blob([[header, ...rows].join("\n")], {
    type: "text/csv;charset=utf-8;"
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `activity-log-${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
const PAGE_SIZE = 25;
function StatsBar({
  events,
  resumes
}) {
  var _a;
  const totalUploads = events.filter((e) => e.type === "Resume Upload").length;
  const totalMatches = events.filter((e) => e.type === "Job Match").length;
  const todayCount = events.filter((e) => isToday(e.timestamp)).length;
  const uploadsByActor = {};
  for (const r of resumes) {
    const actor = r.uploadedBy ?? "user";
    uploadsByActor[actor] = (uploadsByActor[actor] ?? 0) + 1;
  }
  const mostActiveUser = ((_a = Object.entries(uploadsByActor).sort(([, a], [, b]) => b - a)[0]) == null ? void 0 : _a[0]) ?? "—";
  const stats = [
    {
      icon: FileUp,
      label: "Total Uploads",
      value: totalUploads,
      color: "text-primary",
      bg: "bg-primary/8"
    },
    {
      icon: Zap,
      label: "Total Matches",
      value: totalMatches,
      color: "text-accent",
      bg: "bg-accent/8"
    },
    {
      icon: Users,
      label: "Most Active",
      value: mostActiveUser,
      color: "text-chart-3",
      bg: "bg-chart-3/8"
    },
    {
      icon: CalendarDays,
      label: "Today's Activity",
      value: todayCount,
      color: "text-chart-4",
      bg: "bg-chart-4/8"
    }
  ];
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "grid grid-cols-2 lg:grid-cols-4 gap-3",
      "data-ocid": "admin-activity.stats",
      children: stats.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "glass rounded-xl p-4 flex items-center gap-3",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: cn("p-2 rounded-lg", s.bg), children: /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { className: cn("size-4", s.color) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-none mb-1", children: s.label }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: cn("font-display font-bold text-sm truncate", s.color),
                  children: typeof s.value === "number" ? s.value.toLocaleString() : s.value
                }
              )
            ] })
          ]
        },
        s.label
      ))
    }
  );
}
function SkeletonRows() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "div",
    {
      className: "divide-y divide-border/10",
      "data-ocid": "admin-activity.loading_state",
      children: ["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 px-6 py-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "size-8 rounded-full shrink-0" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3.5 w-48 rounded" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-72 rounded" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-16 rounded-full" })
      ] }, key))
    }
  );
}
function ActivityRow({
  event,
  index
}) {
  const isUpload = event.type === "Resume Upload";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex items-start sm:items-center gap-3 px-6 py-4 hover:bg-muted/20 transition-smooth",
      "data-ocid": `admin-activity.item.${index + 1}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "size-9 rounded-full flex items-center justify-center shrink-0",
              isUpload ? "bg-primary/10" : "bg-accent/10"
            ),
            children: isUpload ? /* @__PURE__ */ jsxRuntimeExports.jsx(FileUp, { className: "size-4 text-primary" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-4 text-accent" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Badge,
              {
                variant: "secondary",
                className: cn(
                  "text-xs font-medium px-2 py-0.5",
                  isUpload ? "bg-primary/10 text-primary border-primary/20" : "bg-accent/10 text-accent border-accent/20"
                ),
                children: event.type
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDate(event.timestamp) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium truncate", children: event.target }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5 truncate", children: event.actor })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: cn(
              "shrink-0 px-3 py-1 rounded-full text-xs font-bold font-mono",
              event.score >= 70 ? "bg-accent/10 text-accent" : event.score >= 40 ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
            ),
            children: [
              event.score,
              "%"
            ]
          }
        )
      ]
    }
  );
}
function AdminActivityPage() {
  const resumesQuery = useResumes();
  const matchQuery = useMatchHistory();
  const isLoading = resumesQuery.isLoading || matchQuery.isLoading;
  const allEvents = reactExports.useMemo(
    () => synthesizeEvents(resumesQuery.data ?? [], matchQuery.data ?? []),
    [resumesQuery.data, matchQuery.data]
  );
  const [filterType, setFilterType] = reactExports.useState("All");
  const [sortDir, setSortDir] = reactExports.useState("desc");
  const [search, setSearch] = reactExports.useState("");
  const [dateFrom, setDateFrom] = reactExports.useState("");
  const [dateTo, setDateTo] = reactExports.useState("");
  const [page, setPage] = reactExports.useState(1);
  const filteredEvents = reactExports.useMemo(() => {
    let ev = allEvents;
    if (filterType !== "All") {
      ev = ev.filter((e) => e.type === filterType);
    }
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      ev = ev.filter(
        (e) => e.actor.toLowerCase().includes(q) || e.target.toLowerCase().includes(q)
      );
    }
    if (dateFrom) {
      const from = new Date(dateFrom).getTime();
      ev = ev.filter((e) => new Date(e.timestamp).getTime() >= from);
    }
    if (dateTo) {
      const to = new Date(dateTo).getTime() + 864e5;
      ev = ev.filter((e) => new Date(e.timestamp).getTime() <= to);
    }
    if (sortDir === "asc") {
      ev = [...ev].sort(
        (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );
    }
    return ev;
  }, [allEvents, filterType, search, dateFrom, dateTo, sortDir]);
  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagedEvents = filteredEvents.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  );
  function handleFilterChange(f) {
    setFilterType(f);
    setPage(1);
  }
  function handleSearch(v) {
    setSearch(v);
    setPage(1);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-6 fade-up",
      "data-ocid": "admin-activity.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => window.history.back(),
            "aria-label": "Go back",
            "data-ocid": "admin-activity.back_button",
            className: "fixed top-4 left-4 z-50 flex items-center justify-center size-9 rounded-xl bg-muted/30 border border-border/40 text-muted-foreground hover:text-accent hover:border-accent/50 hover:bg-accent/10 backdrop-blur-sm transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-5", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-accent/15 border border-accent/30 shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "size-5 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "Activity Log" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "Track all upload and match activity — synthesized feed, newest first." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              size: "sm",
              onClick: () => exportCSV(filteredEvents),
              "data-ocid": "admin-activity.export_button",
              className: "gap-2 shrink-0 mt-1",
              disabled: filteredEvents.length === 0,
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-3.5" }),
                "Export CSV"
              ]
            }
          )
        ] }),
        !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(StatsBar, { events: allEvents, resumes: resumesQuery.data ?? [] }),
        isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-3", children: ["s1", "s2", "s3", "s4"].map((key) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-16 rounded-xl" }, key)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass rounded-2xl border border-border/20 p-4 space-y-3",
            "data-ocid": "admin-activity.filters",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-3 items-center", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative flex-1 min-w-[200px]", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      placeholder: "Search by actor or target…",
                      value: search,
                      onChange: (e) => handleSearch(e.target.value),
                      className: "pl-9 h-9 text-sm",
                      "data-ocid": "admin-activity.search_input"
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { className: "size-3.5 shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "date",
                      value: dateFrom,
                      onChange: (e) => {
                        setDateFrom(e.target.value);
                        setPage(1);
                      },
                      className: "h-9 w-36 text-sm",
                      "data-ocid": "admin-activity.date_from_input"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs", children: "to" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      type: "date",
                      value: dateTo,
                      onChange: (e) => {
                        setDateTo(e.target.value);
                        setPage(1);
                      },
                      className: "h-9 w-36 text-sm",
                      "data-ocid": "admin-activity.date_to_input"
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: "flex gap-1 p-1 rounded-lg bg-muted/20 border border-border/20 w-fit",
                    "data-ocid": "admin-activity.type_filter",
                    children: ["All", "Resume Upload", "Job Match"].map(
                      (tab) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          onClick: () => handleFilterChange(tab),
                          "data-ocid": `admin-activity.filter.${tab.toLowerCase().replace(" ", "_")}`,
                          className: cn(
                            "px-3 py-1 rounded-md text-xs font-medium transition-smooth whitespace-nowrap",
                            filterType === tab ? "bg-accent/20 text-accent border border-accent/30" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                          ),
                          children: tab
                        },
                        tab
                      )
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: () => {
                      setSortDir((d) => d === "desc" ? "asc" : "desc");
                      setPage(1);
                    },
                    "data-ocid": "admin-activity.sort_toggle",
                    className: "flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-smooth px-3 py-1 rounded-lg hover:bg-muted/20 border border-border/20",
                    children: [
                      sortDir === "desc" ? /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownUp, { className: "size-3.5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "size-3.5" }),
                      sortDir === "desc" ? "Newest first" : "Oldest first"
                    ]
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
            "data-ocid": "admin-activity.feed",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-3.5 border-b border-border/15 flex items-center gap-2 bg-muted/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Layers, { className: "size-4 text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-display font-semibold text-sm text-foreground", children: "Events" }),
                !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Badge,
                  {
                    variant: "secondary",
                    className: "ml-auto text-xs bg-muted/40 text-muted-foreground border-border/20",
                    children: [
                      filteredEvents.length.toLocaleString(),
                      " results"
                    ]
                  }
                )
              ] }),
              isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRows, {}),
              !isLoading && filteredEvents.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "div",
                {
                  className: "flex flex-col items-center justify-center py-16 gap-3",
                  "data-ocid": "admin-activity.empty_state",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-2xl bg-muted/30 border border-border/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "size-8 text-muted-foreground" }) }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-base", children: "No activity found" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center max-w-xs", children: allEvents.length === 0 ? "Upload resumes or run job matches to see activity here." : "Try adjusting your filters or search query." })
                  ]
                }
              ),
              !isLoading && pagedEvents.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "divide-y divide-border/10", children: pagedEvents.map((event, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ActivityRow,
                {
                  event,
                  index: (safePage - 1) * PAGE_SIZE + i
                },
                event.id
              )) }),
              !isLoading && totalPages > 1 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-6 py-4 border-t border-border/10 flex items-center justify-between gap-4", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
                  "Page ",
                  safePage,
                  " of ",
                  totalPages,
                  " •",
                  " ",
                  filteredEvents.length.toLocaleString(),
                  " total events"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => setPage((p) => Math.max(1, p - 1)),
                      disabled: safePage === 1,
                      "data-ocid": "admin-activity.pagination_prev",
                      className: "text-xs h-8 px-3",
                      children: "Previous"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Button,
                    {
                      variant: "outline",
                      size: "sm",
                      onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
                      disabled: safePage === totalPages,
                      "data-ocid": "admin-activity.pagination_next",
                      className: "text-xs h-8 px-3",
                      children: "Next"
                    }
                  )
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
export {
  AdminActivityPage as default
};
