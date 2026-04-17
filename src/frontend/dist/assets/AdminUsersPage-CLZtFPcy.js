import { c as createLucideIcon, u as useAuth, d as useActor, r as reactExports, j as jsxRuntimeExports, X, s as useQuery, q as useQueryClient, U as User, e as createActor } from "./index-C0uoDo9R.js";
import { u as useMutation } from "./useMutation-IWYl8V_O.js";
import { i as apiGetUserResumes, d as apiDeleteUser, c as apiListUsers } from "./api-D_-AFWZL.js";
import { C as ChevronLeft } from "./chevron-left-BAAQAeGr.js";
import { U as UserCog } from "./user-cog-wWPQ5itw.js";
import { D as Download } from "./download-DDcVfCS6.js";
import { U as Users } from "./users-sZU7Bq5d.js";
import { S as Shield } from "./shield-D8btxgjf.js";
import { U as UserCheck } from "./user-check-DU82qwgl.js";
import { C as Calendar } from "./calendar-qaMcXeH-.js";
import { S as Search } from "./search-DDF7a46k.js";
import { C as ChevronDown } from "./chevron-down-B3evB4H9.js";
import { T as Trash2 } from "./trash-2-CZ5VzwHX.js";
import { C as Check } from "./check-U23IPKCd.js";
import { A as ArrowUpDown } from "./arrow-up-down-DZ8is5MK.js";
import { E as Eye, M as Mail } from "./mail-dBIi1Y1w.js";
import { F as FileText } from "./file-text-Dz7WucPQ.js";
import { T as TriangleAlert } from "./triangle-alert-Dr-vroVO.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
  ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
  ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
];
const UserMinus = createLucideIcon("user-minus", __iconNode);
function useUsers(token) {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["admin-users"],
    queryFn: async () => {
      if (!actor) return [];
      const result = await apiListUsers(actor, token);
      return result.users ?? [];
    },
    enabled: !!actor && !isFetching && !!token,
    staleTime: 3e4
  });
}
function useDeleteUserMutation(token) {
  const { actor } = useActor(createActor);
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (email) => {
      if (!actor) throw new Error("Actor not ready");
      const result = await apiDeleteUser(actor, token, email);
      if (!result.success) throw new Error(result.error ?? "Delete failed");
    },
    onMutate: async (email) => {
      await queryClient.cancelQueries({ queryKey: ["admin-users"] });
      const prev = queryClient.getQueryData(["admin-users"]);
      queryClient.setQueryData(
        ["admin-users"],
        (old) => (old ?? []).filter((u) => u.email !== email)
      );
      return { prev };
    },
    onError: (_err, _email, ctx) => {
      if (ctx == null ? void 0 : ctx.prev) queryClient.setQueryData(["admin-users"], ctx.prev);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-users"] });
    }
  });
}
function formatDate(iso) {
  try {
    return new Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric"
    }).format(new Date(iso));
  } catch {
    return "—";
  }
}
function isThisWeek(iso) {
  const d = new Date(iso);
  const now = /* @__PURE__ */ new Date();
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3);
  return d >= weekAgo && d <= now;
}
function exportCSV(users) {
  const header = "Email,Role,Registration Date";
  const rows = users.map(
    (u) => `"${u.email}","${u.role}","${formatDate(u.createdAt)}"`
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
function RoleBadge({ role }) {
  if (role === "admin") {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-accent/15 text-accent border border-accent/25", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-3" }),
      "Admin"
    ] });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold bg-muted text-muted-foreground border border-border/40", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-3" }),
    "User"
  ] });
}
function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "glass rounded-2xl p-5 border border-border/20 flex items-start gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `p-2.5 rounded-xl ${color}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { className: "size-5" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-2xl font-display font-bold text-foreground", children: value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground/80", children: label }),
      sub && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-0.5", children: sub })
    ] })
  ] });
}
function SkeletonRow({ idx }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "grid grid-cols-[auto_1fr_120px_160px_100px] gap-4 px-6 py-4 border-b border-border/10 items-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-4 h-4 shimmer rounded" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 shimmer rounded w-48" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-5 shimmer rounded-full w-16" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 shimmer rounded w-28" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-8 shimmer rounded-lg w-20 ml-auto" })
      ]
    },
    `skel-${idx}`
  );
}
function EmptyState({ filtered }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col items-center justify-center py-20 gap-4",
      "data-ocid": "admin-users.empty_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-4 rounded-2xl bg-primary/10 border border-primary/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-10 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-semibold text-foreground text-lg", children: filtered ? "No matching users" : "No users found" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground text-center max-w-xs", children: filtered ? "Try adjusting your search or filter criteria." : "Registered accounts will appear here once users sign up." })
      ]
    }
  );
}
function ProfileModal({
  data,
  onClose
}) {
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      "data-ocid": "admin-users.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-foreground/20 backdrop-blur-sm",
            onClick: onClose,
            onKeyDown: (e) => e.key === "Enter" && onClose(),
            role: "button",
            tabIndex: 0,
            "aria-label": "Close modal backdrop"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "dialog",
          {
            open: true,
            className: "relative glass rounded-2xl border border-border/30 p-6 w-full max-w-md shadow-xl fade-up bg-transparent m-0",
            "aria-label": "User profile",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "button",
                {
                  type: "button",
                  className: "absolute top-4 right-4 p-1.5 rounded-lg hover:bg-muted/50 transition-colors text-muted-foreground hover:text-foreground",
                  onClick: onClose,
                  "aria-label": "Close modal",
                  "data-ocid": "admin-users.close_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-4" })
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4 mb-6", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "size-7 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "p",
                    {
                      className: "font-display font-bold text-foreground truncate text-base",
                      title: data.user.email,
                      children: data.user.email
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role: data.user.role })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Mail, { className: "size-4 text-muted-foreground shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Email" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground truncate", children: data.user.email })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Shield, { className: "size-4 text-muted-foreground shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Role" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground capitalize", children: data.user.role })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "size-4 text-muted-foreground shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Registered" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: formatDate(data.user.createdAt) })
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 p-3 rounded-xl bg-muted/30 border border-border/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-4 text-muted-foreground shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Resumes uploaded" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: data.loading ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-block w-8 h-4 shimmer rounded" }) : data.resumeCount !== null ? `${data.resumeCount} resume${data.resumeCount !== 1 ? "s" : ""}` : "—" })
                  ] })
                ] })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function DeleteModal({
  email,
  onConfirm,
  onCancel,
  isDeleting
}) {
  reactExports.useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onCancel();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onCancel]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      "data-ocid": "admin-users.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-foreground/20 backdrop-blur-sm",
            onClick: onCancel,
            onKeyDown: (e) => e.key === "Enter" && onCancel(),
            role: "button",
            tabIndex: 0,
            "aria-label": "Close modal backdrop"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "dialog",
          {
            open: true,
            className: "relative glass rounded-2xl border border-border/30 p-6 w-full max-w-sm shadow-xl fade-up bg-transparent m-0",
            "aria-label": "Confirm delete",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-2xl bg-destructive/10 border border-destructive/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "size-7 text-destructive" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-display font-bold text-foreground text-lg", children: "Delete user account?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                  "This will permanently remove",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground break-all", children: email }),
                  " ",
                  "and cannot be undone."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 w-full mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "flex-1 px-4 py-2.5 rounded-xl border border-border/40 text-sm font-medium text-muted-foreground hover:bg-muted/40 transition-colors disabled:opacity-50",
                    onClick: onCancel,
                    disabled: isDeleting,
                    "data-ocid": "admin-users.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "flex-1 px-4 py-2.5 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:bg-destructive/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2",
                    onClick: onConfirm,
                    disabled: isDeleting,
                    "data-ocid": "admin-users.confirm_button",
                    children: isDeleting ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-4 border-2 border-destructive-foreground/40 border-t-destructive-foreground rounded-full animate-spin" }),
                      "Deleting…"
                    ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }),
                      "Delete"
                    ] })
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  );
}
function BulkDeleteModal({
  count,
  onConfirm,
  onCancel,
  isDeleting
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "fixed inset-0 z-50 flex items-center justify-center p-4",
      "data-ocid": "admin-users.dialog",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute inset-0 bg-foreground/20 backdrop-blur-sm",
            onClick: onCancel,
            onKeyDown: (e) => e.key === "Enter" && onCancel(),
            role: "button",
            tabIndex: 0,
            "aria-label": "Close modal backdrop"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "dialog",
          {
            open: true,
            className: "relative glass rounded-2xl border border-border/30 p-6 w-full max-w-sm shadow-xl fade-up bg-transparent m-0",
            "aria-label": "Confirm bulk delete",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4 text-center", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-3 rounded-2xl bg-destructive/10 border border-destructive/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserMinus, { className: "size-7 text-destructive" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-display font-bold text-foreground text-lg", children: [
                  "Delete ",
                  count,
                  " user",
                  count !== 1 ? "s" : "",
                  "?"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-muted-foreground mt-1", children: [
                  "This will permanently delete ",
                  count,
                  " selected account",
                  count !== 1 ? "s" : "",
                  ". This action cannot be undone."
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-3 w-full mt-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "flex-1 px-4 py-2.5 rounded-xl border border-border/40 text-sm font-medium text-muted-foreground hover:bg-muted/40 transition-colors disabled:opacity-50",
                    onClick: onCancel,
                    disabled: isDeleting,
                    "data-ocid": "admin-users.cancel_button",
                    children: "Cancel"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "flex-1 px-4 py-2.5 rounded-xl bg-destructive text-destructive-foreground text-sm font-semibold hover:bg-destructive/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2",
                    onClick: onConfirm,
                    disabled: isDeleting,
                    "data-ocid": "admin-users.confirm_button",
                    children: [
                      isDeleting ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "size-4 border-2 border-destructive-foreground/40 border-t-destructive-foreground rounded-full animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }),
                      isDeleting ? "Deleting…" : `Delete ${count}`
                    ]
                  }
                )
              ] })
            ] })
          }
        )
      ]
    }
  );
}
function AdminUsersPage() {
  const { user } = useAuth();
  const { actor } = useActor(createActor);
  const token = (user == null ? void 0 : user.token) ?? "";
  const adminEmail = (user == null ? void 0 : user.email) ?? "chandu46@gmail.com";
  const { data: users = [], isLoading } = useUsers(token);
  const [search, setSearch] = reactExports.useState("");
  const [roleFilter, setRoleFilter] = reactExports.useState("all");
  const [sortField, setSortField] = reactExports.useState("createdAt");
  const [sortDir, setSortDir] = reactExports.useState("desc");
  const [selected, setSelected] = reactExports.useState(/* @__PURE__ */ new Set());
  const [profileModal, setProfileModal] = reactExports.useState(
    null
  );
  const [deleteTarget, setDeleteTarget] = reactExports.useState(null);
  const [bulkDeleteOpen, setBulkDeleteOpen] = reactExports.useState(false);
  const deleteMutation = useDeleteUserMutation(token);
  const filtered = reactExports.useMemo(() => {
    let list = [...users];
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      list = list.filter((u) => u.email.toLowerCase().includes(q));
    }
    if (roleFilter !== "all") {
      list = list.filter((u) => u.role === roleFilter);
    }
    list.sort((a, b) => {
      const mult = sortDir === "asc" ? 1 : -1;
      if (sortField === "email") {
        return a.email.localeCompare(b.email) * mult;
      }
      return (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) * mult;
    });
    return list;
  }, [users, search, roleFilter, sortField, sortDir]);
  const stats = reactExports.useMemo(
    () => ({
      total: users.length,
      admins: users.filter((u) => u.role === "admin").length,
      regular: users.filter((u) => u.role === "user").length,
      thisWeek: users.filter((u) => isThisWeek(u.createdAt)).length
    }),
    [users]
  );
  const toggleSort = (field) => {
    if (sortField === field) {
      setSortDir((d) => d === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };
  const allSelectableEmails = filtered.filter((u) => u.email !== adminEmail).map((u) => u.email);
  const allSelected = allSelectableEmails.length > 0 && allSelectableEmails.every((e) => selected.has(e));
  const toggleSelectAll = () => {
    if (allSelected) {
      setSelected(/* @__PURE__ */ new Set());
    } else {
      setSelected(new Set(allSelectableEmails));
    }
  };
  const toggleSelect = (email) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(email)) next.delete(email);
      else next.add(email);
      return next;
    });
  };
  const openProfile = reactExports.useCallback(
    async (u) => {
      setProfileModal({ user: u, resumeCount: null, loading: true });
      try {
        if (actor) {
          const resumes = await apiGetUserResumes(
            actor,
            u.email
          );
          setProfileModal(
            (prev) => (prev == null ? void 0 : prev.user.email) === u.email ? { ...prev, resumeCount: resumes.length, loading: false } : prev
          );
        } else {
          setProfileModal(
            (prev) => prev ? { ...prev, loading: false } : prev
          );
        }
      } catch {
        setProfileModal((prev) => prev ? { ...prev, loading: false } : prev);
      }
    },
    [actor]
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
    const emails = [...selected];
    for (const email of emails) {
      await deleteMutation.mutateAsync(email);
    }
    setSelected(/* @__PURE__ */ new Set());
    setBulkDeleteOpen(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-7xl mx-auto px-4 sm:px-6 py-10 space-y-6 fade-up",
      "data-ocid": "admin-users.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => window.history.back(),
            "aria-label": "Go back",
            "data-ocid": "admin-users.back_button",
            className: "fixed top-4 left-4 z-50 flex items-center justify-center size-9 rounded-xl bg-muted/30 border border-border/40 text-muted-foreground hover:text-accent hover:border-accent/50 hover:bg-accent/10 backdrop-blur-sm transition-smooth focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/40",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-5", "aria-hidden": "true" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2.5 rounded-xl bg-accent/15 border border-accent/30 shrink-0 mt-0.5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(UserCog, { className: "size-5 text-accent" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-bold text-2xl text-foreground", children: "User Management" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm mt-1", children: "View and manage registered accounts." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => exportCSV(filtered),
              className: "inline-flex items-center gap-2 px-3.5 py-2 rounded-lg bg-muted/30 border border-border/30 text-muted-foreground hover:text-accent hover:border-accent/40 hover:bg-accent/8 text-xs font-medium transition-smooth shrink-0 mt-1",
              "data-ocid": "admin-users.export_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "size-3.5" }),
                "Export CSV"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: Users,
              label: "Total Users",
              value: stats.total,
              color: "bg-primary/10 text-primary border border-primary/20",
              "data-ocid": "admin-users.stats_total"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: Shield,
              label: "Admins",
              value: stats.admins,
              color: "bg-accent/10 text-accent border border-accent/20"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: UserCheck,
              label: "Regular Users",
              value: stats.regular,
              color: "bg-secondary/50 text-foreground border border-border/30"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            StatCard,
            {
              icon: Calendar,
              label: "This Week",
              value: stats.thisWeek,
              sub: "New registrations",
              color: "bg-chart-5/10 text-chart-5 border border-chart-5/20"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 glass rounded-xl border border-border/20 flex items-center gap-3 px-4 py-2.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Search, { className: "size-4 text-muted-foreground shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "input",
              {
                type: "search",
                value: search,
                onChange: (e) => setSearch(e.target.value),
                placeholder: "Search by email…",
                className: "flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none min-w-0",
                "data-ocid": "admin-users.search_input"
              }
            ),
            search && /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setSearch(""),
                className: "text-muted-foreground hover:text-foreground transition-colors",
                "aria-label": "Clear search",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-3.5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "select",
              {
                value: roleFilter,
                onChange: (e) => setRoleFilter(e.target.value),
                className: "glass rounded-xl border border-border/20 px-4 py-2.5 text-sm text-foreground bg-transparent outline-none appearance-none pr-9 cursor-pointer hover:border-accent/30 transition-colors",
                "data-ocid": "admin-users.role_filter.select",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "all", children: "All Roles" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "admin", children: "Admin" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "user", children: "User" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { className: "absolute right-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground pointer-events-none" })
          ] }),
          selected.size > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: () => setBulkDeleteOpen(true),
              className: "inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm font-semibold hover:bg-destructive/20 transition-colors",
              "data-ocid": "admin-users.bulk_delete_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" }),
                "Delete (",
                selected.size,
                ")"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            className: "glass rounded-2xl border border-border/20 overflow-hidden",
            "data-ocid": "admin-users.table",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-6 py-4 border-b border-border/15 flex items-center justify-between gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-4 text-accent" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "font-display font-semibold text-sm text-foreground", children: "Registered Accounts" }),
                !isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary", children: filtered.length })
              ] }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:grid grid-cols-[auto_1fr_130px_160px_110px] gap-4 px-6 py-3 border-b border-border/10 bg-muted/10", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    className: "w-4 h-4 rounded border-2 border-muted-foreground/40 flex items-center justify-center hover:border-primary transition-colors disabled:opacity-40",
                    onClick: toggleSelectAll,
                    disabled: allSelectableEmails.length === 0,
                    "aria-label": "Select all",
                    "data-ocid": "admin-users.select_all.checkbox",
                    children: allSelected && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3 text-primary" })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors text-left",
                    onClick: () => toggleSort("email"),
                    "data-ocid": "admin-users.sort_email.toggle",
                    children: [
                      "Email",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "size-3 opacity-60" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground uppercase tracking-widest", children: "Role" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    className: "flex items-center gap-1.5 text-xs font-medium text-muted-foreground uppercase tracking-widest hover:text-foreground transition-colors text-left",
                    onClick: () => toggleSort("createdAt"),
                    "data-ocid": "admin-users.sort_date.toggle",
                    children: [
                      "Joined",
                      /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpDown, { className: "size-3 opacity-60" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-medium text-muted-foreground uppercase tracking-widest text-right", children: "Actions" })
              ] }),
              isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "admin-users.loading_state", children: [0, 1, 2, 3, 4].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SkeletonRow, { idx: i }, `skeleton-${i}`)) }),
              !isLoading && filtered.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, { filtered: search.trim() !== "" || roleFilter !== "all" }),
              !isLoading && filtered.map((u, idx) => {
                const isSelf = u.email === adminEmail;
                const isSelected = selected.has(u.email);
                return /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "div",
                  {
                    className: `grid grid-cols-[auto_1fr] sm:grid-cols-[auto_1fr_130px_160px_110px] gap-4 px-6 py-4 border-b border-border/10 items-center hover:bg-muted/10 transition-colors ${isSelected ? "bg-primary/5" : ""}`,
                    "data-ocid": `admin-users.item.${idx + 1}`,
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "button",
                        {
                          type: "button",
                          className: `w-4 h-4 rounded border-2 flex items-center justify-center transition-colors shrink-0 ${isSelf ? "border-muted-foreground/20 cursor-not-allowed opacity-30" : isSelected ? "border-primary bg-primary" : "border-muted-foreground/40 hover:border-primary"}`,
                          onClick: () => !isSelf && toggleSelect(u.email),
                          disabled: isSelf,
                          "aria-label": `Select ${u.email}`,
                          "data-ocid": `admin-users.checkbox.${idx + 1}`,
                          children: isSelected && !isSelf && /* @__PURE__ */ jsxRuntimeExports.jsx(Check, { className: "size-3 text-primary-foreground" })
                        }
                      ),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "p",
                          {
                            className: "text-sm font-medium text-foreground truncate",
                            title: u.email,
                            children: u.email
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:hidden flex items-center gap-2 mt-1", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role: u.role }),
                          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: formatDate(u.createdAt) })
                        ] })
                      ] }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "hidden sm:block", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RoleBadge, { role: u.role }) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "hidden sm:block text-sm text-muted-foreground", children: formatDate(u.createdAt) }),
                      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-end gap-2 col-span-1 sm:col-span-1", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          "button",
                          {
                            type: "button",
                            onClick: () => openProfile(u),
                            className: "p-1.5 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors",
                            "aria-label": `View profile for ${u.email}`,
                            title: "View profile",
                            "data-ocid": `admin-users.view_profile.${idx + 1}`,
                            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "size-4" })
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative group", children: [
                          /* @__PURE__ */ jsxRuntimeExports.jsx(
                            "button",
                            {
                              type: "button",
                              onClick: () => !isSelf && setDeleteTarget(u.email),
                              disabled: isSelf,
                              className: `p-1.5 rounded-lg transition-colors ${isSelf ? "text-muted-foreground/30 cursor-not-allowed" : "text-muted-foreground hover:text-destructive hover:bg-destructive/10"}`,
                              "aria-label": isSelf ? "Cannot delete your own account" : `Delete ${u.email}`,
                              title: isSelf ? "You cannot delete your own admin account" : "Delete user",
                              "data-ocid": `admin-users.delete_button.${idx + 1}`,
                              children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { className: "size-4" })
                            }
                          ),
                          isSelf && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute bottom-full right-0 mb-2 px-2 py-1 rounded-lg bg-foreground text-background text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10", children: "Cannot delete your own account" })
                        ] })
                      ] })
                    ]
                  },
                  u.email
                );
              })
            ]
          }
        ),
        profileModal && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ProfileModal,
          {
            data: profileModal,
            onClose: () => setProfileModal(null)
          }
        ),
        deleteTarget && /* @__PURE__ */ jsxRuntimeExports.jsx(
          DeleteModal,
          {
            email: deleteTarget,
            onConfirm: handleDelete,
            onCancel: () => setDeleteTarget(null),
            isDeleting: deleteMutation.isPending
          }
        ),
        bulkDeleteOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
          BulkDeleteModal,
          {
            count: selected.size,
            onConfirm: handleBulkDelete,
            onCancel: () => setBulkDeleteOpen(false),
            isDeleting: deleteMutation.isPending
          }
        )
      ]
    }
  );
}
export {
  AdminUsersPage as default
};
