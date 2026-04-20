/**
 * AdminCandidatesPage — full candidate management page with status badges.
 *
 * Features:
 * - Dark styled table with status badges (Shortlisted=emerald, Reviewed=slate, Pending=amber)
 * - Sortable columns with dark header row + alternating rows
 * - Text search, score range, skill filter, date range filters
 * - Checkbox bulk select + bulk delete + CSV export
 * - Individual row: delete (confirm modal), download PDF
 * - Pagination (20/page)
 */

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDeleteResume, useResumes } from "@/hooks/use-resumes";
import type { Resume } from "@/types";
import { useQueryClient } from "@tanstack/react-query";
import {
  AlertTriangle,
  ArrowDown,
  ArrowUp,
  ArrowUpDown,
  Briefcase,
  Download,
  FileDown,
  Search,
  Trash2,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

// ─── Constants ─────────────────────────────────────────────────────────────────

const PAGE_SIZE = 20;
const SKELETON_KEYS = ["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8"] as const;

type SortField = "rank" | "filename" | "score" | "uploadDate";
type SortDir = "asc" | "desc";
type CandidateStatus = "Pending" | "Reviewed" | "Shortlisted";

// ─── Helpers ───────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  try {
    return new Date(iso).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return iso;
  }
}

function exportCSV(rows: Resume[], filename = "candidates.csv") {
  const headers = ["Rank", "Filename", "Score", "Skills", "Upload Date"];
  const lines = rows.map((r, i) => [
    i + 1,
    `"${r.filename.replace(/"/g, '""')}"`,
    r.score,
    `"${r.skills.join(", ").replace(/"/g, '""')}"`,
    `"${formatDate(r.uploadDate)}"`,
  ]);
  const csv = [headers.join(","), ...lines.map((l) => l.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Status Badge ──────────────────────────────────────────────────────────────

function StatusBadge({
  status,
  onChange,
  rank,
}: {
  status: CandidateStatus;
  onChange: (s: CandidateStatus) => void;
  rank: number;
}) {
  const styles: Record<CandidateStatus, string> = {
    Shortlisted: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    Reviewed: "bg-muted/50 text-muted-foreground border-muted/30",
    Pending: "bg-amber-500/10 text-amber-400 border-amber-500/30",
  };

  const next: Record<CandidateStatus, CandidateStatus> = {
    Pending: "Reviewed",
    Reviewed: "Shortlisted",
    Shortlisted: "Pending",
  };

  return (
    <button
      type="button"
      onClick={() => onChange(next[status])}
      data-ocid={`admin-candidates.status_badge.${rank}`}
      title="Click to cycle status"
      className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border transition-all duration-200 hover:scale-105 cursor-pointer ${styles[status]}`}
    >
      {status}
    </button>
  );
}

// ─── Score cell ────────────────────────────────────────────────────────────────

function ScoreCell({ score }: { score: number }) {
  const color =
    score >= 70
      ? "text-emerald-400"
      : score >= 40
        ? "text-amber-400"
        : "text-red-400";
  const barColor =
    score >= 70
      ? "bg-emerald-500"
      : score >= 40
        ? "bg-amber-400"
        : "bg-red-500";
  return (
    <div className="flex items-center gap-2 min-w-[110px]">
      <span className={`text-sm font-mono font-bold w-7 shrink-0 ${color}`}>
        {score}
      </span>
      <div className="flex-1 h-1.5 rounded-full bg-muted/30 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ${barColor}`}
          style={{ width: `${score}%` }}
        />
      </div>
    </div>
  );
}

// ─── Skills chips ──────────────────────────────────────────────────────────────

function SkillChips({ skills }: { skills: string[] }) {
  const MAX_VISIBLE = 4;
  const visible = skills.slice(0, MAX_VISIBLE);
  const overflow = skills.length - MAX_VISIBLE;
  if (skills.length === 0)
    return <span className="text-muted-foreground text-xs italic">—</span>;
  return (
    <TooltipProvider>
      <div className="flex flex-wrap gap-1 max-w-[240px]">
        {visible.map((s) => (
          <Badge
            key={s}
            variant="secondary"
            className="text-[10px] px-1.5 py-0 font-mono bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
          >
            {s}
          </Badge>
        ))}
        {overflow > 0 && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Badge
                variant="outline"
                className="text-[10px] px-1.5 py-0 cursor-default border-border/30 text-muted-foreground"
              >
                +{overflow}
              </Badge>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              className="max-w-[220px] flex flex-wrap gap-1 p-2"
            >
              {skills.slice(MAX_VISIBLE).map((s) => (
                <span
                  key={s}
                  className="text-[10px] bg-muted px-1.5 py-0.5 rounded font-mono"
                >
                  {s}
                </span>
              ))}
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}

// ─── Loading skeleton row ──────────────────────────────────────────────────────

function SkeletonRow() {
  return (
    <tr className="border-b border-border/10">
      <td className="px-4 py-3">
        <Skeleton className="w-4 h-4 rounded" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="w-6 h-4 rounded" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="w-40 h-4 rounded" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="w-28 h-4 rounded" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="w-48 h-4 rounded" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="w-20 h-4 rounded" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="w-20 h-4 rounded" />
      </td>
      <td className="px-4 py-3">
        <Skeleton className="w-16 h-4 rounded" />
      </td>
    </tr>
  );
}

// ─── Sort indicator ────────────────────────────────────────────────────────────

function SortIcon({ active, dir }: { active: boolean; dir: SortDir }) {
  if (!active) return <ArrowUpDown className="size-3 opacity-30" />;
  return dir === "asc" ? (
    <ArrowUp className="size-3 text-accent" />
  ) : (
    <ArrowDown className="size-3 text-accent" />
  );
}

// ─── Main page component ───────────────────────────────────────────────────────

export default function AdminCandidatesPage() {
  const { data: resumes = [], isLoading } = useResumes();
  const deleteResume = useDeleteResume();
  const queryClient = useQueryClient();

  const getParams = () => new URLSearchParams(window.location.search);
  const [search, setSearch] = useState(() => getParams().get("q") ?? "");
  const [minScore, setMinScore] = useState(
    () => getParams().get("minScore") ?? "",
  );
  const [maxScore, setMaxScore] = useState(
    () => getParams().get("maxScore") ?? "",
  );
  const [skillFilter, setSkillFilter] = useState(
    () => getParams().get("skills") ?? "",
  );
  const [dateFrom, setDateFrom] = useState(
    () => getParams().get("dateFrom") ?? "",
  );
  const [dateTo, setDateTo] = useState(() => getParams().get("dateTo") ?? "");
  const [sortField, setSortField] = useState<SortField>(
    () => (getParams().get("sort") as SortField) ?? "score",
  );
  const [sortDir, setSortDir] = useState<SortDir>(
    () => (getParams().get("dir") as SortDir) ?? "desc",
  );
  const [page, setPage] = useState(() =>
    Number(getParams().get("page") ?? "1"),
  );

  // Status map — keyed by resume.id, value is CandidateStatus
  const [statusMap, setStatusMap] = useState<Map<string, CandidateStatus>>(
    new Map(),
  );

  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  // Sync URL params
  const syncTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => {
    if (syncTimeout.current) clearTimeout(syncTimeout.current);
    syncTimeout.current = setTimeout(() => {
      const params = new URLSearchParams();
      if (search) params.set("q", search);
      if (minScore) params.set("minScore", minScore);
      if (maxScore) params.set("maxScore", maxScore);
      if (skillFilter) params.set("skills", skillFilter);
      if (dateFrom) params.set("dateFrom", dateFrom);
      if (dateTo) params.set("dateTo", dateTo);
      if (sortField !== "score") params.set("sort", sortField);
      if (sortDir !== "desc") params.set("dir", sortDir);
      if (page > 1) params.set("page", String(page));
      const qs = params.toString();
      window.history.replaceState(
        null,
        "",
        qs ? `?${qs}` : window.location.pathname,
      );
    }, 200);
  }, [
    search,
    minScore,
    maxScore,
    skillFilter,
    dateFrom,
    dateTo,
    sortField,
    sortDir,
    page,
  ]);

  // Filter + sort pipeline
  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim();
    const skillTerms = skillFilter
      .split(",")
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean);
    const min = minScore !== "" ? Number(minScore) : null;
    const max = maxScore !== "" ? Number(maxScore) : null;
    const from = dateFrom ? new Date(dateFrom).getTime() : null;
    const to = dateTo ? new Date(`${dateTo}T23:59:59`).getTime() : null;
    return resumes.filter((r) => {
      if (q && !r.filename.toLowerCase().includes(q)) return false;
      if (min !== null && r.score < min) return false;
      if (max !== null && r.score > max) return false;
      if (skillTerms.length > 0) {
        const rSkills = r.skills.map((s) => s.toLowerCase());
        if (!skillTerms.every((t) => rSkills.some((s) => s.includes(t))))
          return false;
      }
      if (from !== null || to !== null) {
        const d = new Date(r.uploadDate).getTime();
        if (from !== null && d < from) return false;
        if (to !== null && d > to) return false;
      }
      return true;
    });
  }, [resumes, search, minScore, maxScore, skillFilter, dateFrom, dateTo]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      let cmp = 0;
      if (sortField === "score") cmp = a.score - b.score;
      else if (sortField === "filename")
        cmp = a.filename.localeCompare(b.filename);
      else if (sortField === "uploadDate")
        cmp =
          new Date(a.uploadDate).getTime() - new Date(b.uploadDate).getTime();
      return sortDir === "asc" ? cmp : -cmp;
    });
    return copy;
  }, [filtered, sortField, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = sorted.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE,
  );

  const prevFiltered = useRef(filtered.length);
  useEffect(() => {
    if (prevFiltered.current !== filtered.length) {
      setPage(1);
      prevFiltered.current = filtered.length;
    }
  }, [filtered.length]);

  const toggleSort = useCallback(
    (field: SortField) => {
      if (sortField === field)
        setSortDir((d) => (d === "asc" ? "desc" : "asc"));
      else {
        setSortField(field);
        setSortDir("desc");
      }
    },
    [sortField],
  );

  const allPageSelected =
    pageItems.length > 0 && pageItems.every((r) => selected.has(r.id));
  const someSelected = selected.size > 0;

  const toggleAll = () => {
    if (allPageSelected) {
      setSelected((prev) => {
        const next = new Set(prev);
        for (const r of pageItems) next.delete(r.id);
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        for (const r of pageItems) next.add(r.id);
        return next;
      });
    }
  };

  const toggleRow = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const setStatus = (id: string, status: CandidateStatus) => {
    setStatusMap((prev) => {
      const next = new Map(prev);
      next.set(id, status);
      return next;
    });
  };

  const handleDelete = async (id: string) => {
    queryClient.setQueryData<Resume[]>(["resumes"], (old = []) =>
      old.filter((r) => r.id !== id),
    );
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    setDeleteTarget(null);
    await deleteResume.mutateAsync(id).catch(() => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
    });
  };

  const handleBulkDelete = async () => {
    const ids = Array.from(selected);
    queryClient.setQueryData<Resume[]>(["resumes"], (old = []) =>
      old.filter((r) => !ids.includes(r.id)),
    );
    setSelected(new Set());
    setBulkDeleteOpen(false);
    await Promise.all(ids.map((id) => deleteResume.mutateAsync(id))).catch(
      () => {
        queryClient.invalidateQueries({ queryKey: ["resumes"] });
      },
    );
  };

  const exportSelected = () =>
    exportCSV(
      sorted.filter((r) => selected.has(r.id)),
      "selected-candidates.csv",
    );
  const exportFiltered = () => exportCSV(sorted, "candidates.csv");
  const hasFilters =
    search || minScore || maxScore || skillFilter || dateFrom || dateTo;
  const clearFilters = () => {
    setSearch("");
    setMinScore("");
    setMaxScore("");
    setSkillFilter("");
    setDateFrom("");
    setDateTo("");
  };

  const Th = ({
    field,
    label,
    className = "",
  }: { field: SortField; label: string; className?: string }) => (
    <th
      scope="col"
      className={`px-4 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider cursor-pointer select-none ${className}`}
      onClick={() => toggleSort(field)}
      onKeyDown={(e) =>
        (e.key === "Enter" || e.key === " ") && toggleSort(field)
      }
      aria-sort={
        sortField === field
          ? sortDir === "asc"
            ? "ascending"
            : "descending"
          : "none"
      }
    >
      <span className="flex items-center gap-1.5">
        {label}
        <SortIcon active={sortField === field} dir={sortDir} />
      </span>
    </th>
  );

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-5 fade-up"
      data-ocid="admin-candidates.page"
    >
      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-accent/15 border border-accent/30 shrink-0 mt-0.5">
            <Users className="size-5 text-accent" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              Candidates
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              {isLoading
                ? "Loading resumes…"
                : `${resumes.length} resume${resumes.length !== 1 ? "s" : ""} · ${filtered.length} matching`}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="gap-2 self-start mt-1"
          onClick={exportFiltered}
          data-ocid="admin-candidates.export_button"
        >
          <FileDown className="size-4" />
          Export CSV
        </Button>
      </div>

      {/* Filter bar */}
      <div
        className="glass rounded-2xl p-4 border border-border/20 space-y-3"
        data-ocid="admin-candidates.filter_bar"
      >
        <div className="flex flex-wrap gap-3 items-end">
          <div className="relative flex-1 min-w-[180px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="Search filename…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 h-9 text-sm bg-background/40 border-border/30 focus:border-accent/40"
              data-ocid="admin-candidates.search_input"
            />
          </div>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              placeholder="Min"
              value={minScore}
              onChange={(e) => setMinScore(e.target.value)}
              className="w-20 h-9 text-sm bg-background/40 border-border/30"
              min={0}
              max={100}
              data-ocid="admin-candidates.min_score_input"
            />
            <span className="text-muted-foreground text-xs">–</span>
            <Input
              type="number"
              placeholder="Max"
              value={maxScore}
              onChange={(e) => setMaxScore(e.target.value)}
              className="w-20 h-9 text-sm bg-background/40 border-border/30"
              min={0}
              max={100}
              data-ocid="admin-candidates.max_score_input"
            />
          </div>
          <Input
            placeholder="Skills (comma-separated)"
            value={skillFilter}
            onChange={(e) => setSkillFilter(e.target.value)}
            className="w-48 h-9 text-sm bg-background/40 border-border/30"
            data-ocid="admin-candidates.skill_filter_input"
          />
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
            className="w-36 h-9 text-sm bg-background/40 border-border/30"
            data-ocid="admin-candidates.date_from_input"
          />
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            className="w-36 h-9 text-sm bg-background/40 border-border/30"
            data-ocid="admin-candidates.date_to_input"
          />
          {hasFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="h-9 gap-1.5 text-muted-foreground hover:text-foreground"
              onClick={clearFilters}
              data-ocid="admin-candidates.clear_filters_button"
            >
              <X className="size-3.5" />
              Clear
            </Button>
          )}
        </div>
      </div>

      {/* Bulk actions toolbar */}
      {someSelected && (
        <div
          className="glass rounded-xl px-4 py-2.5 border border-accent/30 flex items-center gap-3 animate-in fade-in slide-in-from-top-1 duration-200"
          data-ocid="admin-candidates.bulk_toolbar"
        >
          <span className="text-sm font-medium text-foreground">
            <Badge
              variant="default"
              className="mr-2 font-mono bg-accent text-accent-foreground"
            >
              {selected.size}
            </Badge>
            selected
          </span>
          <div className="ml-auto flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              className="gap-2"
              onClick={exportSelected}
              data-ocid="admin-candidates.bulk_export_button"
            >
              <FileDown className="size-3.5" />
              Export
            </Button>
            <Button
              variant="destructive"
              size="sm"
              className="gap-2"
              onClick={() => setBulkDeleteOpen(true)}
              data-ocid="admin-candidates.bulk_delete_button"
            >
              <Trash2 className="size-3.5" />
              Delete {selected.size}
            </Button>
          </div>
        </div>
      )}

      {/* Table */}
      <div
        className="glass rounded-2xl border border-border/20 overflow-hidden"
        data-ocid="admin-candidates.table"
      >
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/20 bg-muted/40">
                <th className="px-4 py-3.5 w-10">
                  <Checkbox
                    checked={allPageSelected}
                    onCheckedChange={toggleAll}
                    aria-label="Select all"
                    data-ocid="admin-candidates.select_all_checkbox"
                  />
                </th>
                <Th field="rank" label="#" className="w-12" />
                <Th field="filename" label="Filename" />
                <Th field="score" label="Score" className="w-44" />
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Skills
                </th>
                <th className="px-4 py-3.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider w-28">
                  Status
                </th>
                <Th field="uploadDate" label="Uploaded" className="w-36" />
                <th className="px-4 py-3.5 text-right text-xs font-semibold text-muted-foreground uppercase tracking-wider w-24">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading && SKELETON_KEYS.map((k) => <SkeletonRow key={k} />)}

              {!isLoading && resumes.length === 0 && (
                <tr>
                  <td colSpan={8}>
                    <div
                      className="flex flex-col items-center justify-center py-16 gap-3"
                      data-ocid="admin-candidates.empty_state"
                    >
                      <div className="p-4 rounded-2xl bg-accent/10 border border-accent/20">
                        <Briefcase className="size-8 text-accent" />
                      </div>
                      <p className="font-display font-semibold text-foreground text-base">
                        No candidates yet
                      </p>
                      <p className="text-sm text-muted-foreground text-center max-w-xs">
                        Candidates will appear here once resumes are uploaded.
                      </p>
                    </div>
                  </td>
                </tr>
              )}

              {!isLoading && resumes.length > 0 && filtered.length === 0 && (
                <tr>
                  <td colSpan={8}>
                    <div
                      className="flex flex-col items-center justify-center py-12 gap-3"
                      data-ocid="admin-candidates.filter_empty_state"
                    >
                      <AlertTriangle className="size-8 text-muted-foreground" />
                      <p className="font-display font-semibold text-foreground">
                        No results match your filters
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={clearFilters}
                        data-ocid="admin-candidates.clear_filters_button"
                      >
                        Clear filters
                      </Button>
                    </div>
                  </td>
                </tr>
              )}

              {!isLoading &&
                pageItems.map((resume, idx) => {
                  const rank = (currentPage - 1) * PAGE_SIZE + idx + 1;
                  const isChecked = selected.has(resume.id);
                  const status = statusMap.get(resume.id) ?? "Pending";
                  return (
                    <tr
                      key={resume.id}
                      className={`border-b border-border/10 transition-colors duration-150 hover:bg-muted/15 ${isChecked ? "bg-accent/5" : idx % 2 === 0 ? "" : "bg-muted/5"}`}
                      data-ocid={`admin-candidates.item.${rank}`}
                    >
                      <td className="px-4 py-3">
                        <Checkbox
                          checked={isChecked}
                          onCheckedChange={() => toggleRow(resume.id)}
                          aria-label={`Select ${resume.filename}`}
                          data-ocid={`admin-candidates.checkbox.${rank}`}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-mono text-muted-foreground">
                          {rank}
                        </span>
                      </td>
                      <td className="px-4 py-3 max-w-[180px]">
                        <span
                          className="font-medium text-foreground truncate block"
                          title={resume.filename}
                        >
                          {resume.filename}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <ScoreCell score={resume.score} />
                      </td>
                      <td className="px-4 py-3">
                        <SkillChips skills={resume.skills} />
                      </td>
                      <td className="px-4 py-3">
                        <StatusBadge
                          status={status}
                          onChange={(s) => setStatus(resume.id, s)}
                          rank={rank}
                        />
                      </td>
                      <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                        {formatDate(resume.uploadDate)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center justify-end gap-1">
                          {resume.fileUrl && (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <a
                                    href={resume.fileUrl}
                                    download
                                    target="_blank"
                                    rel="noreferrer"
                                    data-ocid={`admin-candidates.download_button.${rank}`}
                                  >
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="size-8 text-muted-foreground hover:text-accent"
                                      aria-label="Download PDF"
                                    >
                                      <Download className="size-3.5" />
                                    </Button>
                                  </a>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  Download PDF
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="size-8 text-muted-foreground hover:text-destructive"
                                  onClick={() => setDeleteTarget(resume.id)}
                                  aria-label="Delete resume"
                                  data-ocid={`admin-candidates.delete_button.${rank}`}
                                >
                                  <Trash2 className="size-3.5" />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="top">
                                Delete resume
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {!isLoading && totalPages > 1 && (
          <div className="px-6 py-3 border-t border-border/15 bg-muted/10 flex items-center justify-between gap-4">
            <span className="text-xs text-muted-foreground">
              Page {currentPage} of {totalPages} · {sorted.length} result
              {sorted.length !== 1 ? "s" : ""}
            </span>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                data-ocid="admin-candidates.pagination_prev"
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={currentPage >= totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                data-ocid="admin-candidates.pagination_next"
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Single delete confirm */}
      <AlertDialog
        open={!!deleteTarget}
        onOpenChange={(o) => !o && setDeleteTarget(null)}
      >
        <AlertDialogContent data-ocid="admin-candidates.delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this resume?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The resume and all its match history
              will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel data-ocid="admin-candidates.delete_cancel_button">
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={() => deleteTarget && handleDelete(deleteTarget)}
              data-ocid="admin-candidates.delete_confirm_button"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Bulk delete confirm */}
      <AlertDialog open={bulkDeleteOpen} onOpenChange={setBulkDeleteOpen}>
        <AlertDialogContent data-ocid="admin-candidates.bulk_delete_dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {selected.size} resume{selected.size !== 1 ? "s" : ""}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete all {selected.size} selected resume
              {selected.size !== 1 ? "s" : ""} and their match history.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel
              onClick={() => setBulkDeleteOpen(false)}
              data-ocid="admin-candidates.bulk_delete_cancel_button"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={handleBulkDelete}
              data-ocid="admin-candidates.bulk_delete_confirm_button"
            >
              Delete all
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
