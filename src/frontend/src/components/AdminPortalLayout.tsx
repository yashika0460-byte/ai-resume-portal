/**
 * AdminPortalLayout — Email-locked admin portal shell with TOP header navigation.
 * Only chandu46@gmail.com can access. Others are redirected to /login.
 * Header matches Layout.tsx style: logo left, nav links center, profile pill + logout right.
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
  BrainCircuit,
  Briefcase,
  LayoutDashboard,
  LogOut,
  Menu,
  ShieldCheck,
  Smartphone,
  Users,
  X,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../hooks/use-auth";

// ─── Constants ────────────────────────────────────────────────────────────────

const ADMIN_EMAIL = "chandu46@gmail.com";

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  ocid: string;
}

const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    to: "/admin/overview",
    label: "Overview",
    icon: <LayoutDashboard className="size-4" />,
    ocid: "admin-nav.overview",
  },
  {
    to: "/admin/candidates",
    label: "Candidates",
    icon: <Briefcase className="size-4" />,
    ocid: "admin-nav.candidates",
  },
  {
    to: "/admin/matching",
    label: "Job Matching",
    icon: <Zap className="size-4" />,
    ocid: "admin-nav.matching",
  },
  {
    to: "/admin/users",
    label: "User Management",
    icon: <Users className="size-4" />,
    ocid: "admin-nav.users",
  },
  {
    to: "/admin/activity",
    label: "Activity",
    icon: <Activity className="size-4" />,
    ocid: "admin-nav.activity",
  },
];

// ─── Email-lock guard ─────────────────────────────────────────────────────────

export function AdminEmailGuard() {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoading) return;
    const email = user?.email?.trim().toLowerCase();
    if (!email || email !== ADMIN_EMAIL.toLowerCase()) {
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
  if (!email || email !== ADMIN_EMAIL.toLowerCase()) {
    return null; // redirect pending
  }

  return <AdminPortalLayoutInner />;
}

// ─── Layout ───────────────────────────────────────────────────────────────────

function AdminPortalLayoutInner() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    void navigate({ to: "/login" });
    setMobileOpen(false);
  };

  const displayEmail = user?.email
    ? user.email.length > 22
      ? `${user.email.slice(0, 20)}…`
      : user.email
    : null;

  return (
    <div className="min-h-screen gradient-flow bg-grid-pattern flex flex-col">
      {/* ── Top Header ── */}
      <header className="sticky top-0 z-40 border-b border-border/20 bg-card/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Logo */}
          <Link
            to="/admin/overview"
            className="flex items-center gap-2.5 group shrink-0"
            data-ocid="admin-nav.logo"
          >
            <div className="p-1.5 rounded-lg bg-accent/15 border border-accent/30 group-hover:bg-accent/25 transition-smooth">
              <BrainCircuit className="size-5 text-accent" />
            </div>
            <span className="font-display font-semibold text-base tracking-tight text-foreground">
              Admin<span className="text-accent">Portal</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <nav className="hidden lg:flex items-center gap-1">
            {ADMIN_NAV_ITEMS.map((item) => {
              const active =
                currentPath === item.to ||
                currentPath.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  data-ocid={item.ocid}
                  className={cn(
                    "flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-smooth",
                    active
                      ? "bg-accent/15 text-accent border border-accent/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* Right side — admin pill + logout + mobile toggle */}
          <div className="flex items-center gap-2 ml-auto lg:ml-0">
            {/* Admin identity pill */}
            {displayEmail && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-accent px-2.5 py-1.5 rounded-lg bg-accent/10 border border-accent/20">
                <ShieldCheck className="size-3 shrink-0" aria-hidden="true" />
                <span
                  className="font-mono truncate max-w-[140px]"
                  title={user?.email ?? ""}
                >
                  {displayEmail}
                </span>
                <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-accent/20 border border-accent/30">
                  Admin
                </span>
              </div>
            )}

            <button
              type="button"
              onClick={handleLogout}
              data-ocid="admin-nav.logout"
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 border border-transparent transition-smooth"
            >
              <LogOut className="size-3.5" />
              Logout
            </button>

            {/* Mobile hamburger */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              data-ocid="admin-nav.mobile_menu"
              className="lg:hidden flex items-center justify-center size-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-smooth"
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <X className="size-5" />
              ) : (
                <Menu className="size-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile nav drawer */}
        {mobileOpen && (
          <div className="lg:hidden border-t border-border/20 bg-card/60 backdrop-blur-xl px-4 py-3 flex flex-col gap-1">
            {/* Admin email in mobile drawer */}
            {displayEmail && (
              <div className="flex items-center gap-2 px-3 py-2 mb-1 text-xs text-accent">
                <ShieldCheck className="size-3.5 shrink-0" />
                <span className="font-mono truncate">{user?.email}</span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-accent/15 border border-accent/20">
                  Admin
                </span>
              </div>
            )}

            {ADMIN_NAV_ITEMS.map((item) => {
              const active =
                currentPath === item.to ||
                currentPath.startsWith(`${item.to}/`);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  data-ocid={`${item.ocid}.mobile`}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-smooth",
                    active
                      ? "bg-accent/15 text-accent border border-accent/30"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/40",
                  )}
                >
                  {item.icon}
                  {item.label}
                </Link>
              );
            })}

            <button
              type="button"
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-smooth mt-1"
            >
              <LogOut className="size-4" />
              Logout
            </button>
          </div>
        )}
      </header>

      {/* ── Page content ── */}
      <main className="flex-1 w-full">
        <Outlet />
      </main>

      {/* ── Footer ── */}
      <footer className="border-t border-border/20 bg-card/20 backdrop-blur-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>
            © {new Date().getFullYear()} AI Resume Screening Portal — Admin
          </span>
          <div className="flex items-center gap-4">
            <Link
              to="/upload"
              className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-smooth"
            >
              <Smartphone className="size-3.5" />
              User Portal
            </Link>
            <span>
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                caffeine.ai
              </a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
