import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, n as useRouterState, l as Link, B as BrainCircuit, m as cn, o as LogOut, X, M as Menu, O as Outlet, p as Smartphone, k as LayoutDashboard, Z as Zap } from "./index-C0uoDo9R.js";
import { S as ShieldCheck } from "./shield-check-CxpDo2en.js";
import { B as Briefcase } from "./briefcase-B2ZtkQMR.js";
import { U as Users } from "./users-sZU7Bq5d.js";
import { A as Activity } from "./activity-BcyXHvVH.js";
const ADMIN_EMAIL = "chandu46@gmail.com";
const ADMIN_NAV_ITEMS = [
  {
    to: "/admin/overview",
    label: "Overview",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "size-4" }),
    ocid: "admin-nav.overview"
  },
  {
    to: "/admin/candidates",
    label: "Candidates",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "size-4" }),
    ocid: "admin-nav.candidates"
  },
  {
    to: "/admin/matching",
    label: "Job Matching",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-4" }),
    ocid: "admin-nav.matching"
  },
  {
    to: "/admin/users",
    label: "User Management",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-4" }),
    ocid: "admin-nav.users"
  },
  {
    to: "/admin/activity",
    label: "Activity",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "size-4" }),
    ocid: "admin-nav.activity"
  }
];
function AdminEmailGuard() {
  var _a;
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  reactExports.useEffect(() => {
    var _a2;
    if (isLoading) return;
    const email2 = (_a2 = user == null ? void 0 : user.email) == null ? void 0 : _a2.trim().toLowerCase();
    if (!email2 || email2 !== ADMIN_EMAIL.toLowerCase()) {
      void navigate({ to: "/login" });
    }
  }, [user, isLoading, navigate]);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen gradient-flow flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-8 text-accent animate-pulse" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground font-body", children: "Verifying admin access…" })
    ] }) });
  }
  const email = (_a = user == null ? void 0 : user.email) == null ? void 0 : _a.trim().toLowerCase();
  if (!email || email !== ADMIN_EMAIL.toLowerCase()) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPortalLayoutInner, {});
}
function AdminPortalLayoutInner() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const handleLogout = async () => {
    await logout();
    void navigate({ to: "/login" });
    setMobileOpen(false);
  };
  const displayEmail = (user == null ? void 0 : user.email) ? user.email.length > 22 ? `${user.email.slice(0, 20)}…` : user.email : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen gradient-flow bg-grid-pattern flex flex-col", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 border-b border-border/20 bg-card/40 backdrop-blur-xl", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/admin/overview",
            className: "flex items-center gap-2.5 group shrink-0",
            "data-ocid": "admin-nav.logo",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-accent/15 border border-accent/30 group-hover:bg-accent/25 transition-smooth", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { className: "size-5 text-accent" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-semibold text-base tracking-tight text-foreground", children: [
                "Admin",
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "Portal" })
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "hidden lg:flex items-center gap-1", children: ADMIN_NAV_ITEMS.map((item) => {
          const active = currentPath === item.to || currentPath.startsWith(`${item.to}/`);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: item.to,
              "data-ocid": item.ocid,
              className: cn(
                "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-smooth",
                active ? "bg-accent/15 text-accent border border-accent/30" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              ),
              children: [
                item.icon,
                item.label
              ]
            },
            item.to
          );
        }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-auto lg:ml-0", children: [
          displayEmail && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-1.5 text-xs text-accent px-2.5 py-1.5 rounded-lg bg-accent/10 border border-accent/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-3 shrink-0", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "font-mono truncate max-w-[140px]",
                title: (user == null ? void 0 : user.email) ?? "",
                children: displayEmail
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-accent/20 border border-accent/30", children: "Admin" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "button",
            {
              type: "button",
              onClick: handleLogout,
              "data-ocid": "admin-nav.logout",
              className: "hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-transparent transition-smooth",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-3.5" }),
                "Logout"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "button",
            {
              type: "button",
              onClick: () => setMobileOpen((v) => !v),
              "data-ocid": "admin-nav.mobile_menu",
              className: "lg:hidden flex items-center justify-center size-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-smooth",
              "aria-label": "Toggle menu",
              children: mobileOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "size-5" })
            }
          )
        ] })
      ] }),
      mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden border-t border-border/20 bg-card/60 backdrop-blur-xl px-4 py-3 flex flex-col gap-1", children: [
        displayEmail && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-3 py-2 mb-1 text-xs text-accent", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-3.5 shrink-0" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-mono truncate", children: user == null ? void 0 : user.email }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 rounded text-[10px] font-medium bg-accent/15 border border-accent/20", children: "Admin" })
        ] }),
        ADMIN_NAV_ITEMS.map((item) => {
          const active = currentPath === item.to || currentPath.startsWith(`${item.to}/`);
          return /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Link,
            {
              to: item.to,
              onClick: () => setMobileOpen(false),
              "data-ocid": `${item.ocid}.mobile`,
              className: cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                active ? "bg-accent/15 text-accent border border-accent/30" : "text-muted-foreground hover:text-foreground hover:bg-muted/40"
              ),
              children: [
                item.icon,
                item.label
              ]
            },
            item.to
          );
        }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            onClick: handleLogout,
            className: "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth mt-1",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4" }),
              "Logout"
            ]
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/20 bg-card/20 backdrop-blur-sm py-4 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " AI Resume Screening Portal — Admin"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Link,
          {
            to: "/upload",
            className: "flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-smooth",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Smartphone, { className: "size-3.5" }),
              "User Portal"
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
          "Built with love using",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "a",
            {
              href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`,
              target: "_blank",
              rel: "noopener noreferrer",
              className: "text-accent hover:underline",
              children: "caffeine.ai"
            }
          )
        ] })
      ] })
    ] }) })
  ] });
}
export {
  AdminEmailGuard
};
