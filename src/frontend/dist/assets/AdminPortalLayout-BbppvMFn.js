import { u as useAuth, a as useNavigate, r as reactExports, j as jsxRuntimeExports, m as useRouterState, f as Link, B as BrainCircuit, g as cn, n as LogOut, C as ChevronLeft, o as ChevronRight, X, M as Menu, A as ArrowLeft, O as Outlet, Z as Zap } from "./index-BW0DBoAl.js";
import { S as ShieldCheck } from "./shield-check-ByDfaybr.js";
import { L as LayoutDashboard } from "./layout-dashboard-BPG7NZXq.js";
import { B as Briefcase } from "./briefcase-DfzotPZe.js";
import { U as Users } from "./users-BKF81TpZ.js";
import { A as Activity } from "./activity-Bt_CRpMw.js";
const ADMIN_EMAIL = "chandu46@gmail.com";
const ADMIN_NAV_ITEMS = [
  {
    to: "/admin/overview",
    label: "Overview",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutDashboard, { className: "size-4.5" }),
    ocid: "admin-nav.overview",
    back: "/login"
  },
  {
    to: "/admin/candidates",
    label: "Candidates",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Briefcase, { className: "size-4.5" }),
    ocid: "admin-nav.candidates",
    back: "/admin/overview"
  },
  {
    to: "/admin/matching",
    label: "Job Matching",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { className: "size-4.5" }),
    ocid: "admin-nav.matching",
    back: "/admin/overview"
  },
  {
    to: "/admin/users",
    label: "User Management",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Users, { className: "size-4.5" }),
    ocid: "admin-nav.users",
    back: "/admin/overview"
  },
  {
    to: "/admin/activity",
    label: "Activity Log",
    icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "size-4.5" }),
    ocid: "admin-nav.activity",
    back: "/admin/overview"
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
    const isAdmin2 = (user == null ? void 0 : user.role) === "admin" && email2 === ADMIN_EMAIL.toLowerCase();
    if (!isAdmin2) {
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
  const isAdmin = (user == null ? void 0 : user.role) === "admin" && email === ADMIN_EMAIL.toLowerCase();
  if (!isAdmin) {
    return null;
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(AdminPortalLayoutInner, {});
}
function AdminPortalLayoutInner() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const [sidebarOpen, setSidebarOpen] = reactExports.useState(true);
  const [mobileOpen, setMobileOpen] = reactExports.useState(false);
  const handleLogout = async () => {
    await logout();
    void navigate({ to: "/login" });
    setMobileOpen(false);
  };
  const activeItem = ADMIN_NAV_ITEMS.find(
    (item) => currentPath === item.to || currentPath.startsWith(`${item.to}/`)
  );
  const pageLabel = (activeItem == null ? void 0 : activeItem.label) ?? "Admin Portal";
  const backRoute = (activeItem == null ? void 0 : activeItem.back) ?? "/admin/overview";
  const displayEmail = (user == null ? void 0 : user.email) ? user.email.length > 26 ? `${user.email.slice(0, 24)}…` : user.email : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen gradient-flow bg-grid-pattern flex", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: cn(
          "hidden md:flex flex-col fixed left-0 top-0 h-full z-40 transition-all duration-300 ease-in-out admin-sidebar border-r border-sidebar-border",
          sidebarOpen ? "w-60" : "w-16"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: cn(
                "h-16 flex items-center border-b border-sidebar-border shrink-0",
                sidebarOpen ? "px-4 gap-3" : "px-0 justify-center"
              ),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                Link,
                {
                  to: "/admin/overview",
                  className: "flex items-center gap-2.5 group min-w-0",
                  "data-ocid": "admin-nav.logo",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-accent/15 border border-accent/30 group-hover:bg-accent/25 transition-smooth shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { className: "size-5 text-accent" }) }),
                    sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-w-0", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-semibold text-sm tracking-tight text-sidebar-foreground block truncate", children: [
                      "Admin",
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "Portal" })
                    ] }) })
                  ]
                }
              )
            }
          ),
          sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 border-b border-sidebar-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-2 py-1.5 rounded-lg bg-accent/8 border border-accent/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-3 text-accent shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-accent truncate", children: "Admin Access" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 py-4 overflow-y-auto overflow-x-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            "ul",
            {
              className: cn("flex flex-col gap-1", sidebarOpen ? "px-3" : "px-2"),
              children: ADMIN_NAV_ITEMS.map((item) => {
                const active = currentPath === item.to || currentPath.startsWith(`${item.to}/`);
                return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Link,
                  {
                    to: item.to,
                    "data-ocid": item.ocid,
                    title: sidebarOpen ? void 0 : item.label,
                    className: cn(
                      "flex items-center rounded-lg text-sm font-medium transition-smooth",
                      sidebarOpen ? "gap-3 px-3 py-2.5" : "justify-center px-0 py-3",
                      active ? "bg-accent/15 text-accent border border-accent/25" : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-muted/30"
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "shrink-0", children: item.icon }),
                      sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
                    ]
                  }
                ) }, item.to);
              })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: cn(
                "border-t border-sidebar-border py-3",
                sidebarOpen ? "px-3" : "px-2"
              ),
              children: [
                sidebarOpen && displayEmail && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-2 py-1.5 mb-2 rounded-lg bg-muted/20 border border-border/20", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-3 text-accent shrink-0" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono truncate flex-1 min-w-0", children: displayEmail })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  "button",
                  {
                    type: "button",
                    onClick: handleLogout,
                    "data-ocid": "admin-nav.logout",
                    title: sidebarOpen ? void 0 : "Logout",
                    className: cn(
                      "w-full flex items-center rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth",
                      sidebarOpen ? "gap-3 px-3 py-2.5" : "justify-center px-0 py-2.5"
                    ),
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4 shrink-0" }),
                      sidebarOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Logout" })
                    ]
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    onClick: () => setSidebarOpen((v) => !v),
                    "data-ocid": "admin-nav.sidebar_toggle",
                    title: sidebarOpen ? "Collapse sidebar" : "Expand sidebar",
                    className: "mt-1 w-full flex items-center justify-center py-2 rounded-lg text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/20 transition-smooth",
                    children: sidebarOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronLeft, { className: "size-4" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-4" })
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    mobileOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "button",
      {
        type: "button",
        className: "fixed inset-0 z-30 bg-background/60 backdrop-blur-sm md:hidden cursor-default",
        onClick: () => setMobileOpen(false),
        onKeyDown: (e) => e.key === "Escape" && setMobileOpen(false),
        "aria-label": "Close menu",
        tabIndex: -1
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "aside",
      {
        className: cn(
          "fixed left-0 top-0 h-full w-64 z-40 transition-transform duration-300 admin-sidebar border-r border-sidebar-border md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "h-16 flex items-center justify-between px-4 border-b border-sidebar-border", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/admin/overview",
                className: "flex items-center gap-2.5",
                "data-ocid": "admin-nav.logo_mobile",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-1.5 rounded-lg bg-accent/15 border border-accent/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BrainCircuit, { className: "size-4 text-accent" }) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-display font-semibold text-sm text-sidebar-foreground", children: [
                    "Admin",
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-accent", children: "Portal" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setMobileOpen(false),
                className: "p-1.5 rounded-lg hover:bg-muted/40 text-muted-foreground",
                "aria-label": "Close menu",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "size-5" })
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 border-b border-sidebar-border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-2 py-1.5 rounded-lg bg-accent/8 border border-accent/20", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-3 text-accent shrink-0" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-mono text-accent truncate", children: "Admin Access" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("nav", { className: "flex-1 py-4 px-3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "flex flex-col gap-1", children: ADMIN_NAV_ITEMS.map((item) => {
            const active = currentPath === item.to || currentPath.startsWith(`${item.to}/`);
            return /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: item.to,
                onClick: () => setMobileOpen(false),
                "data-ocid": `${item.ocid}.mobile`,
                className: cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                  active ? "bg-accent/15 text-accent border border-accent/25" : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-muted/30"
                ),
                children: [
                  item.icon,
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
                ]
              }
            ) }, item.to);
          }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "border-t border-sidebar-border px-3 py-3", children: [
            displayEmail && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 px-2 py-1.5 mb-2 rounded-lg bg-muted/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-3 text-accent shrink-0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-mono truncate", children: displayEmail })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: handleLogout,
                className: "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LogOut, { className: "size-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Logout" })
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
        className: cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300",
          sidebarOpen ? "md:ml-60" : "md:ml-16"
        ),
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-30 h-16 border-b border-border/20 bg-card/40 backdrop-blur-xl flex items-center px-4 sm:px-6 gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "button",
              {
                type: "button",
                onClick: () => setMobileOpen(true),
                className: "md:hidden p-2 rounded-lg hover:bg-muted/40 text-muted-foreground transition-smooth",
                "aria-label": "Open menu",
                "data-ocid": "admin-nav.mobile_menu",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: "size-5" })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "button",
              {
                type: "button",
                onClick: () => navigate({ to: backRoute }),
                "data-ocid": "admin-nav.back_button",
                "aria-label": "Go back",
                className: "flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 border border-transparent hover:border-border/30 transition-smooth",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "size-4" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden sm:inline text-xs", children: "Back" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-display font-semibold text-foreground text-base truncate", children: pageLabel }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "ml-auto flex items-center gap-2", children: displayEmail && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden sm:flex items-center gap-1.5 text-xs text-accent px-2.5 py-1.5 rounded-lg bg-accent/10 border border-accent/20", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "size-3 shrink-0", "aria-hidden": "true" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: "font-mono truncate max-w-[140px]",
                  title: (user == null ? void 0 : user.email) ?? "",
                  children: displayEmail
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "px-1.5 py-0.5 rounded text-[10px] font-medium bg-accent/20 border border-accent/30", children: "Admin" })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-1 w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "border-t border-border/20 bg-card/20 backdrop-blur-sm py-4 px-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " AI Resume Screening Portal — Admin"
          ] }) }) })
        ]
      }
    )
  ] });
}
export {
  AdminEmailGuard
};
