/**
 * AdminUsersPage — User management with avatar circles (initials), upload count,
 * enhanced role badges, dark table, bulk delete, confirmation dialogs.
 * Email-locked to chandu46@gmail.com.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowUpDown,
  Calendar,
  Check,
  ChevronDown,
  ChevronLeft,
  Download,
  Eye,
  FileText,
  Mail,
  Search,
  Shield,
  Trash2,
  User,
  UserCheck,
  UserCog,
  UserMinus,
  Users,
  X,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  type BackendActor,
  type UserRecord,
  apiDeleteUser,
  apiGetUserResumes,
  apiListUsers,
} from "../../api";
import { createActor } from "../../backend";
import { useAuth } from "../../hooks/use-auth";

// ─── Types ────────────────────────────────────────────────────────────────────

type SortField = "email" | "createdAt";
type SortDir = "asc" | "desc";
type RoleFilter = "all" | "admin" | "user";

interface ProfileModalData {
  user: UserRecord;
  resumeCount: number | null;
  loading: boolean;
}

// ─── Hooks ────────────────────────────────────────────────────────────────────

function useUsers(token: string) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery<UserRecord[]>({
    queryKey: ["admin-users"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await apiListUsers(actor as BackendActor, token);
      return result.users ?? [];
    },
    enabled: !!actor && !isFetching && !!token,
    staleTime: 30_000,
  });
}

function useDeleteUserMutation(token: string) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (email: string) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await apiDeleteUser(actor as BackendActor, token, email);
      if (!result.success) throw new Error(result.error ?? "Delete failed");
    },
    onMutate: async (email) => {
      await queryClient.cancelQueries({ queryKey: ["admin-users"] });
      const prev = queryClient.getQueryData<UserRecord[]>(["admin-users"]);
      queryClient.setQueryData<UserRecord[]>(["admin-users"], (old) =>
        (old ?? []).filter((u) => u.email !== email),
      );
      return { prev };
    },
    onError: (_err, _email, ctx) => {
      if (ctx?.prev) queryClient.setQueryData(["admin-users"], ctx.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    },
  });
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(iso: string): string {
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(iso));
  } catch {
    return "—";
  }
}

function isThisWeek(iso: string): boolean {
  const d = new Date(iso);
  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  return d >= weekAgo && d <= now;
}

function getInitials(email: string): string {
  const parts = email.split("@")[0].split(/[._-]/);
  if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
  return email.slice(0, 2).toUpperCase();
}

function getAvatarColor(email: string): string {
  const colors = [
    "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
    "bg-violet-500/20 text-violet-300 border-violet-500/30",
    "bg-purple-500/20 text-purple-300 border-purple-500/30",
    "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
    "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
    "bg-amber-500/20 text-amber-300 border-amber-500/30",
  ];
  const idx = email.charCodeAt(0) % colors.length;
  return colors[idx];
}

function exportCSV(users: UserRecord[]) {
  const header = "Email,Role,Registration Date";
  const rows = users.map(
    (u) => `"${u.email}","${u.role}","${formatDate(u.createdAt)}"`,
  );
  const csv = [header, ...rows].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "users-export.csv";
  a.click();
  URL.revokeObjectURL(url);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function RoleBadge({ role }: { role: string }) {
  if (role === "admin") {
    return (
      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-300 border border-indigo-500/25">
        <Shield className="size-3" />
        Admin
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-500/10 text-slate-400 border border-slate-500/25">
      <User className="size-3" />
      User
    </span>
  );
}

function KPICard({
  icon: Icon,
  label,
  value,
  sub,
  colorClass,
}: {
  icon: React.ElementType;
  label: string;
  value: number;
  sub?: string;
  colorClass: string;
}) {
  return (
    <div className="glass rounded-2xl p-5 border border-border/20 flex items-start gap-4 hover:border-accent/20 transition-all duration-200">
      <div className={`p-2.5 rounded-xl border shrink-0 ${colorClass}`}>
        <Icon className="size-5" />
      </div>
      <div className="min-w-0">
        <p className="text-2xl font-display font-bold text-foreground">
          {value}
        </p>
        <p className="text-sm font-medium text-foreground/80">{label}</p>
        {sub && <p className="text-xs text-muted-foreground mt-0.5">{sub}</p>}
      </div>
    </div>
  );
}

function SkeletonRow({ idx }: { idx: number }) {
  return (
    <div
      key={`skel-${idx}`}
      className="grid grid-cols-[auto_1fr_120px_160px_80px_100px] gap-4 px-6 py-4 border-b border-border/10 items-center"
    >
      <div className="w-9 h-9 shimmer rounded-full" />
      <div className="h-4 shimmer rounded w-48" />
      <div className="h-5 shimmer rounded-full w-16" />
      <div className="h-4 shimmer rounded w-28" />
      <div className="h-4 shimmer rounded w-8" />
      <div className="h-8 shimmer rounded-lg w-20 ml-auto" />
    </div>
  );
}

function EmptyState({ filtered }: { filtered: boolean }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-20 gap-4"
      data-ocid="admin-users.empty_state"
    >
      <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20">
        <Users className="size-10 text-primary" />
      </div>
      <p className="font-display font-semibold text-foreground text-lg">
        {filtered ? "No matching users" : "No users found"}
      </p>
      <p className="text-sm text-muted-foreground text-center max-w-xs">
        {filtered
          ? "Try adjusting your search or filter criteria."
          : "Registered accounts will appear here once users sign up."}
      </p>
    </div>
  );
}

// ─── Profile Modal ────────────────────────────────────────────────────────────

function ProfileModal({
  data,
  onClose,
}: { data: ProfileModalData; onClose: () => void }) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const avatarColor = getAvatarColor(data.user.email);
  const initials = getInitials(data.user.email);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-ocid="admin-users.dialog"
    >
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onClose}
        onKeyDown={(e) => e.key === "Enter" && onClose()}
        role="button"
        tabIndex={0}
        aria-label="Close modal backdrop"
      />
      <dialog
        open
        className="relative glass rounded-2xl border border-border/30 p-6 w-full max-w-md shadow-xl fade-up bg-transparent m-0"
        aria-label="User profile"
      >
        <button
          type="button"
          className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground"
          onClick={onClose}
          aria-label="Close modal"
          data-ocid="admin-users.close_button"
        >
          <X className="size-4" />
        </button>
        <div className="flex items-center gap-4 mb-6">
          <div
            className={`w-14 h-14 rounded-2xl border flex items-center justify-center font-display font-bold text-lg shrink-0 ${avatarColor}`}
          >
            {initials}
          </div>
          <div className="min-w-0">
            <p
              className="font-display font-bold text-foreground truncate text-base"
              title={data.user.email}
            >
              {data.user.email}
            </p>
            <RoleBadge role={data.user.role} />
          </div>
        </div>
        <div className="space-y-3">
          {[
            { icon: Mail, label: "Email", value: data.user.email },
            { icon: Shield, label: "Role", value: data.user.role },
            {
              icon: Calendar,
              label: "Registered",
              value: formatDate(data.user.createdAt),
            },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/15"
            >
              <Icon className="size-4 text-muted-foreground shrink-0" />
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium text-foreground capitalize truncate">
                  {value}
                </p>
              </div>
            </div>
          ))}
          <div className="flex items-center gap-3 p-3 rounded-xl bg-muted/20 border border-border/15">
            <FileText className="size-4 text-muted-foreground shrink-0" />
            <div>
              <p className="text-xs text-muted-foreground">Resumes uploaded</p>
              <p className="text-sm font-medium text-foreground">
                {data.loading ? (
                  <span className="inline-block w-8 h-4 shimmer rounded" />
                ) : data.resumeCount !== null ? (
                  `${data.resumeCount} resume${data.resumeCount !== 1 ? "s" : ""}`
                ) : (
                  "—"
                )}
              </p>
            </div>
          </div>
        </div>
      </dialog>
    </div>
  );
}

// ─── Delete Confirm Modal ─────────────────────────────────────────────────────

function DeleteModal({
  email,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  email: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onCancel]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-ocid="admin-users.dialog"
    >
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onCancel}
        onKeyDown={(e) => e.key === "Enter" && onCancel()}
        role="button"
        tabIndex={0}
        aria-label="Close modal backdrop"
      />
      <dialog
        open
        className="relative glass rounded-2xl border border-border/30 p-6 w-full max-w-sm shadow-xl fade-up bg-transparent m-0"
        aria-label="Confirm delete"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="p-3 rounded-2xl bg-destructive/10 border border-destructive/20">
            <AlertTriangle className="size-7 text-destructive" />
          </div>
          <div>
            <p className="font-display font-bold text-foreground text-lg">
              Delete user account?
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              This will permanently remove{" "}
              <span className="font-semibold text-foreground break-all">
                {email}
              </span>{" "}
              and cannot be undone.
            </p>
          </div>
          <div className="flex gap-3 w-full mt-2">
            <button
              type="button"
              className="flex-1 px-4 py-2.5 rounded-xl border border-border/40 text-sm font-medium text-muted-foreground hover:bg-muted/40 transition-colors disabled:opacity-50"
              onClick={onCancel}
              disabled={isDeleting}
              data-ocid="admin-users.cancel_button"
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex-1 px-4 py-2.5 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:bg-destructive/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              onClick={onConfirm}
              disabled={isDeleting}
              data-ocid="admin-users.confirm_button"
            >
              {isDeleting ? (
                <span className="size-4 border-2 border-destructive-foreground/40 border-t-destructive-foreground rounded-full animate-spin" />
              ) : (
                <Trash2 className="size-4" />
              )}
              {isDeleting ? "Deleting…" : "Delete"}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

// ─── Bulk Delete Confirm Modal ────────────────────────────────────────────────

function BulkDeleteModal({
  count,
  onConfirm,
  onCancel,
  isDeleting,
}: {
  count: number;
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      data-ocid="admin-users.dialog"
    >
      <div
        className="absolute inset-0 bg-foreground/20 backdrop-blur-sm"
        onClick={onCancel}
        onKeyDown={(e) => e.key === "Enter" && onCancel()}
        role="button"
        tabIndex={0}
        aria-label="Close modal backdrop"
      />
      <dialog
        open
        className="relative glass rounded-2xl border border-border/30 p-6 w-full max-w-sm shadow-xl fade-up bg-transparent m-0"
        aria-label="Confirm bulk delete"
      >
        <div className="flex flex-col items-center gap-4 text-center">
          <div className="p-3 rounded-2xl bg-destructive/10 border border-destructive/20">
            <UserMinus className="size-7 text-destructive" />
          </div>
          <div>
            <p className="font-display font-bold text-foreground text-lg">
              Delete {count} user{count !== 1 ? "s" : ""}?
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              This will permanently delete {count} selected account
              {count !== 1 ? "s" : ""}.
            </p>
          </div>
          <div className="flex gap-3 w-full mt-2">
            <button
              type="button"
              className="flex-1 px-4 py-2.5 rounded-xl border border-border/40 text-sm font-medium text-muted-foreground hover:bg-muted/40 transition-colors disabled:opacity-50"
              onClick={onCancel}
              disabled={isDeleting}
              data-ocid="admin-users.cancel_button"
            >
              Cancel
            </button>
            <button
              type="button"
              className="flex-1 px-4 py-2.5 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:bg-destructive/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
              onClick={onConfirm}
              disabled={isDeleting}
              data-ocid="admin-users.confirm_button"
            >
              {isDeleting ? (
                <span className="size-4 border-2 border-destructive-foreground/40 border-t-destructive-foreground rounded-full animate-spin" />
              ) : (
                <Trash2 className="size-4" />
              )}
              {isDeleting ? "Deleting…" : `Delete ${count}`}
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function AdminUsersPage() {
  const { user } = useAuth();
  const { actor } = useActor(createActor);
  const token = user?.token ?? "";
  const adminEmail = user?.email ?? "chandu46@gmail.com";
  const navigate = useNavigate();

  const { data: users = [], isLoading } = useUsers(token);

  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<RoleFilter>("all");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [profileModal, setProfileModal] = useState<ProfileModalData | null>(
    null,
  );
  const [deleteTarget, setDeleteTarget] = useState<string | null>(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = useState(false);

  const deleteMutation = useDeleteUserMutation(token);

  const filtered = useMemo(() => {
    let list = [...users];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((u) => u.email.toLowerCase().includes(q));
    }
    if (roleFilter !== "all") list = list.filter((u) => u.role === roleFilter);
    list.sort((a, b) => {
      const mult = sortDir === "asc" ? 1 : -1;
      if (sortField === "email") return a.email.localeCompare(b.email) * mult;
      return (
        (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
        mult
      );
    });
    return list;
  }, [users, search, roleFilter, sortField, sortDir]);

  const stats = useMemo(
    () => ({
      total: users.length,
      admins: users.filter((u) => u.role === "admin").length,
      regular: users.filter((u) => u.role === "user").length,
      thisWeek: users.filter((u) => isThisWeek(u.createdAt)).length,
    }),
    [users],
  );

  const toggleSort = (field: SortField) => {
    if (sortField === field) setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const allSelectableEmails = filtered
    .filter((u) => u.email !== adminEmail)
    .map((u) => u.email);
  const allSelected =
    allSelectableEmails.length > 0 &&
    allSelectableEmails.every((e) => selected.has(e));

  const toggleSelectAll = () => {
    if (allSelected) setSelected(new Set());
    else setSelected(new Set(allSelectableEmails));
  };

  const toggleSelect = (email: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(email)) next.delete(email);
      else next.add(email);
      return next;
    });
  };

  const openProfile = useCallback(
    async (u: UserRecord) => {
      setProfileModal({ user: u, resumeCount: null, loading: true });
      try {
        if (actor) {
          const resumes = await apiGetUserResumes(
            actor as BackendActor,
            u.email,
          );
          setProfileModal((prev) =>
            prev?.user.email === u.email
              ? { ...prev, resumeCount: resumes.length, loading: false }
              : prev,
          );
        } else {
          setProfileModal((prev) =>
            prev ? { ...prev, loading: false } : prev,
          );
        }
      } catch {
        setProfileModal((prev) => (prev ? { ...prev, loading: false } : prev));
      }
    },
    [actor],
  );

  const handleDelete = async () => {
    if (!deleteTarget) return;
    await deleteMutation.mutateAsync(deleteTarget);
    setDeleteTarget(null);
    setSelected((prev) => {
      const next = new Set(prev);
      next.delete(deleteTarget);
      return next;
    });
  };

  const handleBulkDelete = async () => {
    for (const email of [...selected]) {
      await deleteMutation.mutateAsync(email);
    }
    setSelected(new Set());
    setBulkDeleteOpen(false);
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-6 fade-up"
      data-ocid="admin-users.page"
    >
      {/* Back button */}
      <button
        type="button"
        onClick={() => void navigate({ to: "/admin/overview" })}
        aria-label="Go back"
        data-ocid="admin-users.back_button"
        className="fixed top-4 left-4 z-50 flex items-center justify-center size-9 rounded-xl bg-muted/30 border border-border/40 text-muted-foreground hover:text-accent hover:border-accent/50 hover:bg-accent/10 backdrop-blur-sm transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>

      {/* Page header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-xl bg-accent/15 border border-accent/30 shrink-0 mt-0.5">
            <UserCog className="size-5 text-accent" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-foreground">
              User Management
            </h1>
            <p className="text-muted-foreground text-sm mt-1">
              View and manage registered accounts.
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => exportCSV(filtered)}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-muted/30 border border-border/30 text-muted-foreground hover:text-accent hover:border-accent/40 text-xs font-medium transition-smooth shrink-0 mt-1"
          data-ocid="admin-users.export_button"
        >
          <Download className="size-3.5" />
          Export CSV
        </button>
      </div>

      {/* KPI cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          icon={Users}
          label="Total Users"
          value={stats.total}
          colorClass="bg-indigo-500/10 text-indigo-400 border-indigo-500/20"
        />
        <KPICard
          icon={Shield}
          label="Admins"
          value={stats.admins}
          colorClass="bg-violet-500/10 text-violet-400 border-violet-500/20"
        />
        <KPICard
          icon={UserCheck}
          label="Regular Users"
          value={stats.regular}
          colorClass="bg-slate-500/10 text-slate-400 border-slate-500/20"
        />
        <KPICard
          icon={Calendar}
          label="This Week"
          value={stats.thisWeek}
          sub="New registrations"
          colorClass="bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
        />
      </div>

      {/* Controls row */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="flex-1 glass rounded-xl border border-border/20 flex items-center gap-3 px-4 py-2.5">
          <Search className="size-4 text-muted-foreground shrink-0" />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by email…"
            className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0"
            data-ocid="admin-users.search_input"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Clear search"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
        <div className="relative">
          <select
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value as RoleFilter)}
            className="glass rounded-xl border border-border/20 px-4 py-2.5 text-sm text-foreground bg-transparent outline-none appearance-none pr-9 cursor-pointer hover:border-accent/30 transition-colors"
            data-ocid="admin-users.role_filter.select"
          >
            <option value="all">All Roles</option>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" />
        </div>
        {selected.size > 0 && (
          <button
            type="button"
            onClick={() => setBulkDeleteOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm font-semibold hover:bg-destructive/20 transition-colors"
            data-ocid="admin-users.bulk_delete_button"
          >
            <Trash2 className="size-4" />
            Delete ({selected.size})
          </button>
        )}
      </div>

      {/* Table */}
      <div
        className="glass rounded-2xl border border-border/20 overflow-hidden"
        data-ocid="admin-users.table"
      >
        <div className="px-6 py-4 border-b border-border/15 bg-muted/20 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Users className="size-4 text-accent" />
            <h2 className="font-display font-semibold text-sm text-foreground">
              Registered Accounts
            </h2>
            {!isLoading && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-300">
                {filtered.length}
              </span>
            )}
          </div>
        </div>

        {/* Column headers */}
        <div className="hidden sm:grid grid-cols-[auto_auto_1fr_130px_160px_100px] gap-4 px-6 py-3.5 border-b border-border/10 bg-muted/30">
          <button
            type="button"
            className="w-4 h-4 rounded border-2 border-muted-foreground/40 flex items-center justify-center hover:border-primary transition-colors disabled:opacity-40"
            onClick={toggleSelectAll}
            disabled={allSelectableEmails.length === 0}
            aria-label="Select all"
            data-ocid="admin-users.select_all.checkbox"
          >
            {allSelected && <Check className="size-3 text-primary" />}
          </button>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            Avatar
          </span>
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors text-left"
            onClick={() => toggleSort("email")}
            data-ocid="admin-users.sort_email.toggle"
          >
            Email <ArrowUpDown className="size-3 opacity-60" />
          </button>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
            Role
          </span>
          <button
            type="button"
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors text-left"
            onClick={() => toggleSort("createdAt")}
            data-ocid="admin-users.sort_date.toggle"
          >
            Joined <ArrowUpDown className="size-3 opacity-60" />
          </button>
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-widest text-right">
            Actions
          </span>
        </div>

        {isLoading && (
          <div data-ocid="admin-users.loading_state">
            {[0, 1, 2, 3, 4].map((i) => (
              <SkeletonRow key={`skeleton-${i}`} idx={i} />
            ))}
          </div>
        )}

        {!isLoading && filtered.length === 0 && (
          <EmptyState filtered={search.trim() !== "" || roleFilter !== "all"} />
        )}

        {!isLoading &&
          filtered.map((u, idx) => {
            const isSelf = u.email === adminEmail;
            const isSelected = selected.has(u.email);
            const avatarColor = getAvatarColor(u.email);
            const initials = getInitials(u.email);
            return (
              <div
                key={u.email}
                className={`grid grid-cols-[auto_auto_1fr] sm:grid-cols-[auto_auto_1fr_130px_160px_100px] gap-4 px-6 py-4 border-b border-border/10 items-center hover:bg-muted/10 transition-colors ${isSelected ? "bg-indigo-500/5" : ""}`}
                data-ocid={`admin-users.item.${idx + 1}`}
              >
                {/* Checkbox */}
                <button
                  type="button"
                  className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${isSelf ? "border-muted-foreground/20 cursor-not-allowed opacity-30" : isSelected ? "border-primary bg-primary" : "border-muted-foreground/40 hover:border-primary"}`}
                  onClick={() => !isSelf && toggleSelect(u.email)}
                  disabled={isSelf}
                  aria-label={`Select ${u.email}`}
                  data-ocid={`admin-users.checkbox.${idx + 1}`}
                >
                  {isSelected && !isSelf && (
                    <Check className="size-3 text-primary-foreground" />
                  )}
                </button>

                {/* Avatar */}
                <div
                  className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-bold font-display shrink-0 ${avatarColor}`}
                >
                  {initials}
                </div>

                {/* Email */}
                <div className="min-w-0">
                  <p
                    className="text-sm font-medium text-foreground truncate"
                    title={u.email}
                  >
                    {u.email}
                  </p>
                  <div className="sm:hidden flex items-center gap-2 mt-1">
                    <RoleBadge role={u.role} />
                    <span className="text-xs text-muted-foreground">
                      {formatDate(u.createdAt)}
                    </span>
                  </div>
                </div>

                {/* Role — desktop */}
                <div className="hidden sm:block">
                  <RoleBadge role={u.role} />
                </div>

                {/* Date — desktop */}
                <p className="hidden sm:block text-sm text-muted-foreground">
                  {formatDate(u.createdAt)}
                </p>

                {/* Actions */}
                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => openProfile(u)}
                    className="p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                    aria-label={`View profile for ${u.email}`}
                    title="View profile"
                    data-ocid={`admin-users.view_profile.${idx + 1}`}
                  >
                    <Eye className="size-4" />
                  </button>
                  <div className="relative group">
                    <button
                      type="button"
                      onClick={() => !isSelf && setDeleteTarget(u.email)}
                      disabled={isSelf}
                      className={`p-1.5 rounded-lg transition-colors ${isSelf ? "text-muted-foreground/30 cursor-not-allowed" : "text-muted-foreground hover:text-destructive hover:bg-destructive/10"}`}
                      aria-label={
                        isSelf
                          ? "Cannot delete your own account"
                          : `Delete ${u.email}`
                      }
                      data-ocid={`admin-users.delete_button.${idx + 1}`}
                    >
                      <Trash2 className="size-4" />
                    </button>
                    {isSelf && (
                      <div className="absolute bottom-full right-0 mb-2 px-2 py-1 rounded-lg bg-foreground text-background text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                        Cannot delete your own account
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
      </div>

      {/* Modals */}
      {profileModal && (
        <ProfileModal
          data={profileModal}
          onClose={() => setProfileModal(null)}
        />
      )}
      {deleteTarget && (
        <DeleteModal
          email={deleteTarget}
          onConfirm={handleDelete}
          onCancel={() => setDeleteTarget(null)}
          isDeleting={deleteMutation.isPending}
        />
      )}
      {bulkDeleteOpen && (
        <BulkDeleteModal
          count={selected.size}
          onConfirm={handleBulkDelete}
          onCancel={() => setBulkDeleteOpen(false)}
          isDeleting={deleteMutation.isPending}
        />
      )}
    </div>
  );
}
