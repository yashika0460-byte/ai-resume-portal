/**
 * AdminPortalLayout — Email-locked admin portal with LEFT SIDEBAR navigation.
 * Only chandu46@gmail.com can access. Others redirected to /login.
 * Back arrow uses navigate() with explicit routes — never window.history.back().
 */

import { cn } from "@/lib/utils";
import {
  Link,
  Outlet,
  useNavigate,
  useRouterState,
} from "@tanstack/react-router";
import {
  Activity,
  ArrowLeft,
  BrainCircuit,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/use-auth";

// ── Constants ─────────────────────────────────────────────────────────────────

const ADMIN_EMAIL = "chandu46@gmail.com";

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  ocid: string;
  back: string;
}

const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    to: "/admin/overview",
    label: "Overview",
    icon: <LayoutDashboard className="size-4.5" />,
    ocid: "admin-nav.overview",
    back: "/login",
  },
  {
    to: "/admin/candidates",
    label: "Candidates",
    icon: <Briefcase className="size-4.5" />,
    ocid: "admin-nav.candidates",
    back: "/admin/overview",
  },
  {
    to: "/admin/matching",
    label: "Job Matching",
    icon: <Zap className="size-4.5" />,
    ocid: "admin-nav.matching",
    back: "/admin/overview",
  },
  {
    to: "/admin/users",
    label: "User Management",
    icon: <Users className="size-4.5" />,
    ocid: "admin-nav.users",
    back: "/admin/overview",
  },
  {
    to: "/admin/activity",
    label: "Activity Log",
    icon: <Activity className="size-4.5" />,
    ocid: "admin-nav.activity",
    back: "/admin/overview",
  },
];

// ── Email-lock guard ──────────────────────────────────────────────────────────

export function AdminEmailGuard() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    const email = user?.email?.trim().toLowerCase();
    const isAdmin =
      user?.role === "admin" && email === ADMIN_EMAIL.toLowerCase();
    if (!isAdmin) {
      void navigate({ to: "/login" });
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <div className="min-h-screen gradient-flow flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <ShieldCheck className="size-8 text-accent animate-pulse" />
          <p className="text-sm text-muted-foreground font-body">
            Verifying admin access…
          </p>
        </div>
      </div>
    );
  }

  const email = user?.email?.trim().toLowerCase();
  const isAdmin = user?.role === "admin" && email === ADMIN_EMAIL.toLowerCase();
  if (!isAdmin) {
    return null;
  }

  return <AdminPortalLayoutInner />;
}

// ── Inner layout ──────────────────────────────────────────────────────────────

function AdminPortalLayoutInner() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    void navigate({ to: "/login" });
    setMobileOpen(false);
  };

  const activeItem = ADMIN_NAV_ITEMS.find(
    (item) => currentPath === item.to || currentPath.startsWith(`${item.to}/`),
  );
  const pageLabel = activeItem?.label ?? "Admin Portal";
  const backRoute = activeItem?.back ?? "/admin/overview";

  const displayEmail = user?.email
    ? user.email.length > 26
      ? `${user.email.slice(0, 24)}…`
      : user.email
    : null;

  return (
    <div className="min-h-screen gradient-flow bg-grid-pattern flex">
      {/* ── Desktop Sidebar ── */}
      <aside
        className={cn(
          "hidden md:flex flex-col fixed left-0 top-0 h-full z-40 transition-all duration-300 ease-in-out admin-sidebar border-r border-sidebar-border",
          sidebarOpen ? "w-60" : "w-16",
        )}
      >
        {/* Sidebar header */}
        <div
          className={cn(
            "h-16 flex items-center border-b border-sidebar-border shrink-0",
            sidebarOpen ? "px-4 gap-3" : "px-0 justify-center",
          )}
        >
          <Link
            to="/admin/overview"
            className="flex items-center gap-2.5 group min-w-0"
            data-ocid="admin-nav.logo"
          >
            <div className="p-1.5 rounded-lg bg-accent/15 border border-accent/30 group-hover:bg-accent/25 transition-smooth shrink-0">
              <BrainCircuit className="size-5 text-accent" />
            </div>
            {sidebarOpen && (
              <div className="min-w-0">
                <span className="font-display font-semibold text-sm tracking-tight text-sidebar-foreground block truncate">
                  Admin<span className="text-accent">Portal</span>
                </span>
              </div>
            )}
          </Link>
        </div>

        {/* Admin badge */}
        {sidebarOpen && (
          <div className="px-4 py-2 border-b border-sidebar-border">
            <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-accent/8 border border-accent/20">
              <ShieldCheck className="size-3 text-accent shrink-0" />
              <span className="text-xs font-mono text-accent truncate">
                Admin Access
              </span>
            </div>
          </div>
        )}

        {/* Nav items */}
        <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
          <ul
            className={cn("flex flex-col gap-1", sidebarOpen ? "px-3" : "px-2")}
          >
            {ADMIN_NAV_ITEMS.map((item) => {
              const active =
                currentPath === item.to ||
                currentPath.startsWith(`${item.to}/`);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    data-ocid={item.ocid}
                    title={sidebarOpen ? undefined : item.label}
                    className={cn(
                      "flex items-center rounded-lg text-sm font-medium transition-smooth",
                      sidebarOpen
                        ? "gap-3 px-3 py-2.5"
                        : "justify-center px-0 py-3",
                      active
                        ? "bg-accent/15 text-accent border border-accent/25"
                        : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-muted/30",
                    )}
                  >
                    <span className="shrink-0">{item.icon}</span>
                    {sidebarOpen && <span>{item.label}</span>}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Bottom — user + logout */}
        <div
          className={cn(
            "border-t border-sidebar-border py-3",
            sidebarOpen ? "px-3" : "px-2",
          )}
        >
          {sidebarOpen && displayEmail && (
            <div className="flex items-center gap-2 px-2 py-1.5 mb-2 rounded-lg bg-muted/20 border border-border/20">
              <ShieldCheck className="size-3 text-accent shrink-0" />
              <span className="text-xs text-muted-foreground font-mono truncate flex-1 min-w-0">
                {displayEmail}
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={handleLogout}
            data-ocid="admin-nav.logout"
            title={sidebarOpen ? undefined : "Logout"}
            className={cn(
              "w-full flex items-center rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth",
              sidebarOpen ? "gap-3 px-3 py-2.5" : "justify-center px-0 py-2.5",
            )}
          >
            <LogOut className="size-4 shrink-0" />
            {sidebarOpen && <span>Logout</span>}
          </button>

          {/* Toggle collapse */}
          <button
            type="button"
            onClick={() => setSidebarOpen((v) => !v)}
            data-ocid="admin-nav.sidebar_toggle"
            title={sidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
            className="mt-1 w-full flex items-center justify-center py-2 rounded-lg text-muted-foreground/50 hover:text-muted-foreground hover:bg-muted/20 transition-smooth"
          >
            {sidebarOpen ? (
              <ChevronLeft className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </button>
        </div>
      </aside>

      {/* ── Mobile overlay ── */}
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm md:hidden cursor-default"
          onClick={() => setMobileOpen(false)}
          onKeyDown={(e) => e.key === "Escape" && setMobileOpen(false)}
          aria-label="Close menu"
          tabIndex={-1}
        />
      )}

      {/* ── Mobile drawer ── */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-64 z-40 transition-transform duration-300 admin-sidebar border-r border-sidebar-border md:hidden",
          mobileOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="h-16 flex items-center justify-between px-4 border-b border-sidebar-border">
          <Link
            to="/admin/overview"
            className="flex items-center gap-2.5"
            data-ocid="admin-nav.logo_mobile"
          >
            <div className="p-1.5 rounded-lg bg-accent/15 border border-accent/30">
              <BrainCircuit className="size-4 text-accent" />
            </div>
            <span className="font-display font-semibold text-sm text-sidebar-foreground">
              Admin<span className="text-accent">Portal</span>
            </span>
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            className="p-1.5 rounded-lg hover:bg-muted/40 text-muted-foreground"
            aria-label="Close menu"
          >
            <X className="size-5" />
          </button>
        </div>
        <div className="px-4 py-2 border-b border-sidebar-border">
          <div className="flex items-center gap-2 px-2 py-1.5 rounded-lg bg-accent/8 border border-accent/20">
            <ShieldCheck className="size-3 text-accent shrink-0" />
            <span className="text-xs font-mono text-accent truncate">
              Admin Access
            </span>
          </div>
        </div>
        <nav className="flex-1 py-4 px-3">
          <ul className="flex flex-col gap-1">
            {ADMIN_NAV_ITEMS.map((item) => {
              const active =
                currentPath === item.to ||
                currentPath.startsWith(`${item.to}/`);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    data-ocid={`${item.ocid}.mobile`}
                    className={cn(
                      "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                      active
                        ? "bg-accent/15 text-accent border border-accent/25"
                        : "text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-muted/30",
                    )}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="border-t border-sidebar-border px-3 py-3">
          {displayEmail && (
            <div className="flex items-center gap-2 px-2 py-1.5 mb-2 rounded-lg bg-muted/20">
              <ShieldCheck className="size-3 text-accent shrink-0" />
              <span className="text-xs text-muted-foreground font-mono truncate">
                {displayEmail}
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth"
          >
            <LogOut className="size-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── Main content area ── */}
      <div
        className={cn(
          "flex-1 flex flex-col min-h-screen transition-all duration-300",
          sidebarOpen ? "md:ml-60" : "md:ml-16",
        )}
      >
        {/* Top header bar */}
        <header className="sticky top-0 z-30 h-16 border-b border-border/20 bg-card/40 backdrop-blur-xl flex items-center px-4 sm:px-6 gap-4">
          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="md:hidden p-2 rounded-lg hover:bg-muted/40 text-muted-foreground transition-smooth"
            aria-label="Open menu"
            data-ocid="admin-nav.mobile_menu"
          >
            <Menu className="size-5" />
          </button>

          {/* Back arrow */}
          <button
            type="button"
            onClick={() =>
              navigate({ to: backRoute as "/login" | "/admin/overview" })
            }
            data-ocid="admin-nav.back_button"
            aria-label="Go back"
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-muted/30 border border-transparent hover:border-border/30 transition-smooth"
          >
            <ArrowLeft className="size-4" />
            <span className="hidden sm:inline text-xs">Back</span>
          </button>

          {/* Page title */}
          <h1 className="font-display font-semibold text-foreground text-base truncate">
            {pageLabel}
          </h1>

          {/* Right side */}
          <div className="ml-auto flex items-center gap-2">
            {displayEmail && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-accent px-2.5 py-1.5 rounded-lg bg-accent/10 border border-accent/20">
                <ShieldCheck className="size-3 shrink-0" aria-hidden="true" />
                <span
                  className="font-mono truncate max-w-[140px]"
                  title={user?.email ?? ""}
                >
                  {displayEmail}
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-accent/20 border border-accent/30">
                  Admin
                </span>
              </div>
            )}
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 w-full">
          <Outlet />
        </main>

        {/* Footer */}
        <footer className="border-t border-border/20 bg-card/20 backdrop-blur-sm py-4 px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>
              © {new Date().getFullYear()} AI Resume Screening Portal — Admin
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}
