/**
 * AdminActivityPage — synthesized activity log from resume uploads + match history.
 * Read-only feed. No backend mutations.
 */

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useMatchHistory, useResumes } from "@/hooks/use-resumes";
import { cn } from "@/lib/utils";
import type { MatchRecord, Resume } from "@/types";
import {
  Activity,
  ArrowDownUp,
  ArrowUpDown,
  CalendarDays,
  ChevronLeft,
  Download,
  FileUp,
  Layers,
  Search,
  Users,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type ActionType = "Resume Upload" | "Job Match";

interface ActivityEvent {
  id: string;
  type: ActionType;
  timestamp: string; // ISO
  actor: string; // email or "system"
  target: string; // filename or jobDescription (truncated)
  score: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function synthesizeEvents(
  resumes: Resume[],
  matches: MatchRecord[],
): ActivityEvent[] {
  const uploadEvents: ActivityEvent[] = resumes.map((r) => ({
    id: `upload-${r.id}`,
    type: "Resume Upload",
    timestamp: r.uploadDate,
    actor: (r as Resume & { uploadedBy?: string }).uploadedBy ?? "user",
    target: r.filename,
    score: r.score,
  }));

  const matchEvents: ActivityEvent[] = matches.map((m) => ({
    id: `match-${m.id}`,
    type: "Job Match",
    timestamp: m.createdAt,
    actor: "system",
    target: m.jobDescription.slice(0, 50),
    score: m.matchScore,
  }));

  return [...uploadEvents, ...matchEvents].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime(),
  );
}

function formatDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function isToday(iso: string) {
  const today = new Date();
  const d = new Date(iso);
  return (
    d.getFullYear() === today.getFullYear() &&
    d.getMonth() === today.getMonth() &&
    d.getDate() === today.getDate()
  );
}

function exportCSV(events: ActivityEvent[]) {
  const header = ["Timestamp", "Action", "Actor", "Target", "Score"].join(",");
  const rows = events.map((e) =>
    [
      `"${e.timestamp}"`,
      `"${e.type}"`,
      `"${e.actor}"`,
      `"${e.target.replace(/"/g, '""')}"`,
      e.score,
    ].join(","),
  );
  const blob = new Blob([[header, ...rows].join("\n")], {
    type: "text/csv;charset=utf-8;",
  });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `activity-log-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}

const PAGE_SIZE = 25;

type FilterType = "All" | "Resume Upload" | "Job Match";
type SortDir = "desc" | "asc";

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatsBar({
  events,
  resumes,
}: {
  events: ActivityEvent[];
  resumes: Resume[];
}) {
  const totalUploads = events.filter((e) => e.type === "Resume Upload").length;
  const totalMatches = events.filter((e) => e.type === "Job Match").length;
  const todayCount = events.filter((e) => isToday(e.timestamp)).length;

  // Most active user by upload count
  const uploadsByActor: Record<string, number> = {};
  for (const r of resumes) {
    const actor = (r as Resume & { uploadedBy?: string }).uploadedBy ?? "user";
    uploadsByActor[actor] = (uploadsByActor[actor] ?? 0) + 1;
  }
  const mostActiveUser =
    Object.entries(uploadsByActor).sort(([, a], [, b]) => b - a)[0]?.[0] ?? "—";

  const stats = [
    {
      icon: FileUp,
      label: "Total Uploads",
      value: totalUploads,
      color: "text-primary",
      bg: "bg-primary/8",
    },
    {
      icon: Zap,
      label: "Total Matches",
      value: totalMatches,
      color: "text-accent",
      bg: "bg-accent/8",
    },
    {
      icon: Users,
      label: "Most Active",
      value: mostActiveUser,
      color: "text-chart-3",
      bg: "bg-chart-3/8",
    },
    {
      icon: CalendarDays,
      label: "Today's Activity",
      value: todayCount,
      color: "text-chart-4",
      bg: "bg-chart-4/8",
    },
  ] as const;

  return (
    <div
      className="grid grid-cols-2 lg:grid-cols-4 gap-3"
      data-ocid="admin-activity.stats"
    >
      {stats.map((s) => (
        <div
          key={s.label}
          className="glass rounded-xl p-4 flex items-center gap-3"
        >
          <div className={cn("p-2 rounded-lg", s.bg)}>
            <s.icon className={cn("size-4", s.color)} />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground leading-none mb-1">
              {s.label}
            </p>
            <p
              className={cn("font-display font-bold text-sm truncate", s.color)}
            >
              {typeof s.value === "number" ? s.value.toLocaleString() : s.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── Skeleton rows ────────────────────────────────────────────────────────────

function SkeletonRows() {
  return (
    <div
      className="divide-y divide-border/10"
      data-ocid="admin-activity.loading_state"
    >
      {["r1", "r2", "r3", "r4", "r5", "r6", "r7", "r8"].map((key) => (
        <div key={key} className="flex items-center gap-4 px-6 py-4">
          <Skeleton className="size-8 rounded-full shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-3.5 w-48 rounded" />
            <Skeleton className="h-3 w-72 rounded" />
          </div>
          <Skeleton className="h-5 w-16 rounded-full" />
        </div>
      ))}
    </div>
  );
}

// ─── Activity Row ─────────────────────────────────────────────────────────────

function ActivityRow({
  event,
  index,
}: {
  event: ActivityEvent;
  index: number;
}) {
  const isUpload = event.type === "Resume Upload";

  return (
    <div
      className="flex items-start sm:items-center gap-3 px-6 py-4 hover:bg-muted/20 transition-smooth"
      data-ocid={`admin-activity.item.${index + 1}`}
    >
      {/* Icon */}
      <div
        className={cn(
          "size-9 rounded-full flex items-center justify-center shrink-0",
          isUpload ? "bg-primary/10" : "bg-accent/10",
        )}
      >
        {isUpload ? (
          <FileUp className="size-4 text-primary" />
        ) : (
          <Zap className="size-4 text-accent" />
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-0.5">
          <Badge
            variant="secondary"
            className={cn(
              "text-xs font-medium px-2 py-0.5",
              isUpload
                ? "bg-primary/10 text-primary border-primary/20"
                : "bg-accent/10 text-accent border-accent/20",
            )}
          >
            {event.type}
          </Badge>
          <span className="text-xs text-muted-foreground">
            {formatDate(event.timestamp)}
          </span>
        </div>
        <p className="text-sm text-foreground font-medium truncate">
          {event.target}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5 truncate">
          {event.actor}
        </p>
      </div>

      {/* Score pill */}
      <div
        className={cn(
          "shrink-0 px-3 py-1 rounded-full text-xs font-bold font-mono",
          event.score >= 70
            ? "bg-accent/10 text-accent"
            : event.score >= 40
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground",
        )}
      >
        {event.score}%
      </div>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminActivityPage() {
  const resumesQuery = useResumes();
  const matchQuery = useMatchHistory();

  const isLoading = resumesQuery.isLoading || matchQuery.isLoading;

  // Synthesize all events
  const allEvents = useMemo(
    () => synthesizeEvents(resumesQuery.data ?? [], matchQuery.data ?? []),
    [resumesQuery.data, matchQuery.data],
  );

  // ── Filter / Sort state ──
  const [filterType, setFilterType] = useState<FilterType>("All");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [page, setPage] = useState(1);

  // ── Derived filtered + sorted events ──
  const filteredEvents = useMemo(() => {
    let ev = allEvents;

    // Type filter
    if (filterType !== "All") {
      ev = ev.filter((e) => e.type === filterType);
    }

    // Search
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      ev = ev.filter(
        (e) =>
          e.actor.toLowerCase().includes(q) ||
          e.target.toLowerCase().includes(q),
      );
    }

    // Date range
    if (dateFrom) {
      const from = new Date(dateFrom).getTime();
      ev = ev.filter((e) => new Date(e.timestamp).getTime() >= from);
    }
    if (dateTo) {
      const to = new Date(dateTo).getTime() + 86_400_000; // inclusive end
      ev = ev.filter((e) => new Date(e.timestamp).getTime() <= to);
    }

    // Sort
    if (sortDir === "asc") {
      ev = [...ev].sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime(),
      );
    }

    return ev;
  }, [allEvents, filterType, search, dateFrom, dateTo, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredEvents.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pagedEvents = filteredEvents.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE,
  );

  function handleFilterChange(f: FilterType) {
    setFilterType(f);
    setPage(1);
  }

  function handleSearch(v: string) {
    setSearch(v);
    setPage(1);
  }

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-6 fade-up"
      data-ocid="admin-activity.page"
    >
      {/* ── Back button ── */}
      <button
        type="button"
        onClick={() => window.history.back()}
        aria-label="Go back"
        data-ocid="admin-activity.back_button"
        className="fixed top-4 left-4 z-50 flex items-center justify-center size-9 rounded-xl bg-muted/30 border border-border/40 text-muted-foreground hover:text-accent hover:border-accent/50 hover:bg-accent/10 backdrop-blur-sm transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>

      {/* ── Page header ── */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-accent/15 border border-accent/30 shrink-0 mt-0.5">
            <Activity className="size-5 text-accent" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Activity Log
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              Track all upload and match activity — synthesized feed, newest
              first.
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => exportCSV(filteredEvents)}
          data-ocid="admin-activity.export_button"
          className="gap-2 shrink-0 mt-1"
          disabled={filteredEvents.length === 0}
        >
          <Download className="size-3.5" />
          Export CSV
        </Button>
      </div>

      {/* Stats bar */}
      {!isLoading && (
        <StatsBar events={allEvents} resumes={resumesQuery.data ?? []} />
      )}
      {isLoading && (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {(["s1", "s2", "s3", "s4"] as const).map((key) => (
            <Skeleton key={key} className="h-16 rounded-xl" />
          ))}
        </div>
      )}

      {/* Filters */}
      <div
        className="glass rounded-2xl border border-border/20 p-4 space-y-3"
        data-ocid="admin-activity.filters"
      >
        {/* Top row: search + date range */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search by actor or target…"
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="pl-9 h-9 text-sm"
              data-ocid="admin-activity.search_input"
            />
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <CalendarDays className="size-3.5 shrink-0" />
            <Input
              type="date"
              value={dateFrom}
              onChange={(e) => {
                setDateFrom(e.target.value);
                setPage(1);
              }}
              className="h-9 w-36 text-sm"
              data-ocid="admin-activity.date_from_input"
            />
            <span className="text-xs">to</span>
            <Input
              type="date"
              value={dateTo}
              onChange={(e) => {
                setDateTo(e.target.value);
                setPage(1);
              }}
              className="h-9 w-36 text-sm"
              data-ocid="admin-activity.date_to_input"
            />
          </div>
        </div>

        {/* Bottom row: type filters + sort toggle */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div
            className="flex gap-1 p-1 rounded-lg bg-muted/20 border border-border/20 w-fit"
            data-ocid="admin-activity.type_filter"
          >
            {(["All", "Resume Upload", "Job Match"] as FilterType[]).map(
              (tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => handleFilterChange(tab)}
                  data-ocid={`admin-activity.filter.${tab.toLowerCase().replace(" ", "_")}`}
                  className={cn(
                    "px-3 py-1 rounded-md text-xs font-medium transition-smooth whitespace-nowrap",
                    filterType === tab
                      ? "bg-accent/20 text-accent border border-accent/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
                  )}
                >
                  {tab}
                </button>
              ),
            )}
          </div>

          <button
            type="button"
            onClick={() => {
              setSortDir((d) => (d === "desc" ? "asc" : "desc"));
              setPage(1);
            }}
            data-ocid="admin-activity.sort_toggle"
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-smooth px-3 py-1 rounded-lg hover:bg-muted/20 border border-border/20"
          >
            {sortDir === "desc" ? (
              <ArrowDownUp className="size-3.5" />
            ) : (
              <ArrowUpDown className="size-3.5" />
            )}
            {sortDir === "desc" ? "Newest first" : "Oldest first"}
          </button>
        </div>
      </div>

      {/* Feed */}
      <div
        className="glass rounded-2xl border border-border/20 overflow-hidden"
        data-ocid="admin-activity.feed"
      >
        {/* Table header */}
        <div className="px-6 py-3.5 border-b border-border/15 flex items-center gap-2 bg-muted/20">
          <Layers className="size-4 text-accent" />
          <span className="font-display font-semibold text-sm text-foreground">
            Events
          </span>
          {!isLoading && (
            <Badge
              variant="secondary"
              className="ml-auto text-xs bg-muted/40 text-muted-foreground border-border/20"
            >
              {filteredEvents.length.toLocaleString()} results
            </Badge>
          )}
        </div>

        {/* Loading */}
        {isLoading && <SkeletonRows />}

        {/* Empty state */}
        {!isLoading && filteredEvents.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-16 gap-3"
            data-ocid="admin-activity.empty_state"
          >
            <div className="p-4 rounded-2xl bg-muted/30 border border-border/20">
              <Activity className="size-8 text-muted-foreground" />
            </div>
            <p className="font-display font-semibold text-foreground text-base">
              No activity found
            </p>
            <p className="text-sm text-muted-foreground text-center max-w-xs">
              {allEvents.length === 0
                ? "Upload resumes or run job matches to see activity here."
                : "Try adjusting your filters or search query."}
            </p>
          </div>
        )}

        {/* Rows */}
        {!isLoading && pagedEvents.length > 0 && (
          <div className="divide-y divide-border/10">
            {pagedEvents.map((event, i) => (
              <ActivityRow
                key={event.id}
                event={event}
                index={(safePage - 1) * PAGE_SIZE + i}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="px-6 py-4 border-t border-border/10 flex items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground">
              Page {safePage} of {totalPages} &bull;{" "}
              {filteredEvents.length.toLocaleString()} total events
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={safePage === 1}
                data-ocid="admin-activity.pagination_prev"
                className="text-xs h-8 px-3"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={safePage === totalPages}
                data-ocid="admin-activity.pagination_next"
                className="text-xs h-8 px-3"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
