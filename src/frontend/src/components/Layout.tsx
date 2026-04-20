/**
 * Layout — Next-gen SaaS sidebar layout for authenticated users.
 * Left sidebar (fixed, collapsible), main content right, dark AI theme.
 * Back arrow uses navigate() with explicit routes — never window.history.back().
 */

import { cn } from "@/lib/utils";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  ArrowLeft,
  BrainCircuit,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Menu,
  Monitor,
  Share2,
  Smartphone,
  Upload,
  User,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { Button } from "./ui/AppButton";

// ── Nav config ────────────────────────────────────────────────────────────────

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  ocid: string;
  back: string; // explicit back-route for this page
}

const USER_NAV_ITEMS: NavItem[] = [
  {
    to: "/upload",
    label: "Upload Resume",
    icon: <Upload className="size-4.5" />,
    ocid: "nav.upload",
    back: "/",
  },
  {
    to: "/match",
    label: "Job Match",
    icon: <Zap className="size-4.5" />,
    ocid: "nav.match",
    back: "/upload",
  },
  {
    to: "/profile",
    label: "My Profile",
    icon: <User className="size-4.5" />,
    ocid: "nav.profile",
    back: "/upload",
  },
];

// Map path prefix → back route
const BACK_MAP: Record<string, string> = {
  "/upload": "/",
  "/match": "/upload",
  "/profile": "/upload",
  "/dashboard": "/upload",
};

// ── Install Modal ─────────────────────────────────────────────────────────────

function InstallModal({ onClose }: { onClose: () => void }) {
  const [platform, setPlatform] = useState<"android" | "ios" | "desktop">(
    "android",
  );

  const steps: Record<
    string,
    { icon: React.ReactNode; title: string; desc: string }[]
  > = {
    android: [
      {
        icon: <BrainCircuit className="size-4 text-accent" />,
        title: "Open in Chrome",
        desc: "Make sure you're using Google Chrome or another Chromium-based browser.",
      },
      {
        icon: <Menu className="size-4 text-accent" />,
        title: "Tap the menu icon",
        desc: "Tap the three-dot menu (⋮) in the top-right corner of Chrome.",
      },
      {
        icon: <Monitor className="size-4 text-accent" />,
        title: 'Tap "Add to Home screen"',
        desc: 'Select "Add to Home screen" from the menu, then tap "Add" to confirm.',
      },
      {
        icon: <Smartphone className="size-4 text-accent" />,
        title: "Launch like an app",
        desc: "The portal icon will appear on your home screen — tap it to open full-screen.",
      },
    ],
    ios: [
      {
        icon: <BrainCircuit className="size-4 text-accent" />,
        title: "Open in Safari",
        desc: "Must use Safari on iOS — other browsers don't support Add to Home Screen.",
      },
      {
        icon: <Share2 className="size-4 text-accent" />,
        title: "Tap the Share icon",
        desc: "Tap the Share button (square with arrow) at the bottom of Safari.",
      },
      {
        icon: <Monitor className="size-4 text-accent" />,
        title: 'Tap "Add to Home Screen"',
        desc: 'Scroll down and tap "Add to Home Screen", then tap "Add" in the top-right.',
      },
      {
        icon: <Smartphone className="size-4 text-accent" />,
        title: "Launch like an app",
        desc: "The portal icon appears on your home screen. It opens full-screen, no browser UI.",
      },
    ],
    desktop: [
      {
        icon: <BrainCircuit className="size-4 text-accent" />,
        title: "Open in Chrome or Edge",
        desc: "Use Google Chrome, Microsoft Edge, or another PWA-capable browser.",
      },
      {
        icon: <Monitor className="size-4 text-accent" />,
        title: "Look for install icon",
        desc: "In the address bar, look for a computer/install icon on the right side.",
      },
      {
        icon: <Zap className="size-4 text-accent" />,
        title: "Click Install",
        desc: 'Click the icon and select "Install" from the popup.',
      },
      {
        icon: <Smartphone className="size-4 text-accent" />,
        title: "Open from desktop",
        desc: "The app appears as a standalone window in your taskbar/dock.",
      },
    ],
  };

  const tabs = [
    {
      key: "android" as const,
      label: "Android",
      icon: <Smartphone className="size-3.5" />,
    },
    {
      key: "ios" as const,
      label: "iPhone",
      icon: <Share2 className="size-3.5" />,
    },
    {
      key: "desktop" as const,
      label: "Desktop",
      icon: <Monitor className="size-3.5" />,
    },
  ];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-[8px]"
      aria-label="Install App"
    >
      <div
        className="glass bg-card/97 w-full max-w-md rounded-2xl border border-border/25 flex flex-col gap-5 p-6 shadow-2xl"
        data-ocid="install.dialog"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-accent/15 border border-accent/25">
              <Smartphone className="size-5 text-accent" />
            </div>
            <div>
              <h2 className="font-display font-bold text-foreground text-base">
                Install App
              </h2>
              <p className="text-xs text-muted-foreground">
                Add to home screen for a native experience
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Close"
            data-ocid="install.close_button"
          >
            <X className="size-4" />
          </button>
        </div>
        <div className="flex gap-1 p-1 rounded-xl bg-muted/20 border border-border/20">
          {tabs.map(({ key, label, icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setPlatform(key)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-smooth",
                platform === key
                  ? "bg-accent/20 text-accent border border-accent/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
              )}
            >
              {icon}
              <span>{label}</span>
            </button>
          ))}
        </div>
        <ol className="flex flex-col gap-3">
          {steps[platform].map(({ icon, title, desc }, idx) => (
            <li key={title} className="flex gap-3">
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-xs font-mono font-bold text-accent">
                  {idx + 1}
                </div>
                {idx < steps[platform].length - 1 && (
                  <div className="flex-1 w-px bg-border/20 min-h-[12px]" />
                )}
              </div>
              <div className="pb-1">
                <div className="flex items-center gap-1.5 mb-0.5">
                  {icon}
                  <span className="text-sm font-semibold text-foreground">
                    {title}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {desc}
                </p>
              </div>
            </li>
          ))}
        </ol>
        <Button
          onClick={onClose}
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-display font-semibold w-full"
          data-ocid="install.confirm_button"
        >
          Got it!
        </Button>
      </div>
    </div>
  );
}

// ── Layout ────────────────────────────────────────────────────────────────────

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [installOpen, setInstallOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
    setMobileOpen(false);
  };

  // Determine back route
  const backRoute =
    Object.entries(BACK_MAP).find(([prefix]) =>
      currentPath.startsWith(prefix),
    )?.[1] ?? "/";

  // Active page label for header
  const activeItem = USER_NAV_ITEMS.find((item) =>
    currentPath.startsWith(item.to),
  );
  const pageLabel = activeItem?.label ?? "Dashboard";

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
            to="/"
            className="flex items-center gap-2.5 group min-w-0"
            data-ocid="nav.logo"
          >
            <div className="p-1.5 rounded-lg bg-accent/15 border border-accent/30 group-hover:bg-accent/25 transition-smooth shrink-0">
              <BrainCircuit className="size-5 text-accent" />
            </div>
            {sidebarOpen && (
              <span className="font-display font-semibold text-sm tracking-tight text-sidebar-foreground truncate">
                TalentScan<span className="text-accent">AI</span>
              </span>
            )}
          </Link>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 overflow-y-auto overflow-x-hidden">
          <ul
            className={cn("flex flex-col gap-1", sidebarOpen ? "px-3" : "px-2")}
          >
            {USER_NAV_ITEMS.map((item) => {
              const active = currentPath.startsWith(item.to);
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
              <div className="size-6 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center shrink-0">
                <User className="size-3 text-accent" />
              </div>
              <span className="text-xs text-muted-foreground font-mono truncate flex-1 min-w-0">
                {displayEmail}
              </span>
            </div>
          )}
          <button
            type="button"
            onClick={handleLogout}
            data-ocid="nav.logout"
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
            data-ocid="nav.sidebar_toggle"
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
            to="/"
            className="flex items-center gap-2.5"
            data-ocid="nav.logo_mobile"
          >
            <div className="p-1.5 rounded-lg bg-accent/15 border border-accent/30">
              <BrainCircuit className="size-4 text-accent" />
            </div>
            <span className="font-display font-semibold text-sm text-sidebar-foreground">
              TalentScan<span className="text-accent">AI</span>
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
        <nav className="flex-1 py-4 px-3">
          <ul className="flex flex-col gap-1">
            {USER_NAV_ITEMS.map((item) => {
              const active = currentPath.startsWith(item.to);
              return (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    onClick={() => setMobileOpen(false)}
                    data-ocid={`${item.ocid}_mobile`}
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
              <User className="size-3.5 text-accent shrink-0" />
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
            data-ocid="nav.mobile_menu"
          >
            <Menu className="size-5" />
          </button>

          {/* Back arrow */}
          <button
            type="button"
            onClick={() =>
              navigate({
                to: backRoute as
                  | "/"
                  | "/upload"
                  | "/match"
                  | "/profile"
                  | "/login",
              })
            }
            data-ocid="nav.back_button"
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

          {/* Spacer + right side */}
          <div className="ml-auto flex items-center gap-3">
            {displayEmail && (
              <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground px-2.5 py-1.5 rounded-lg bg-muted/30 border border-border/30">
                <User
                  className="size-3 shrink-0 text-accent/70"
                  aria-hidden="true"
                />
                <span
                  className="font-mono truncate max-w-[160px]"
                  title={user?.email ?? ""}
                >
                  {displayEmail}
                </span>
              </div>
            )}
            <button
              type="button"
              onClick={() => setInstallOpen(true)}
              data-ocid="nav.install_button"
              className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-accent hover:bg-accent/10 border border-transparent hover:border-accent/20 transition-smooth"
              title="Install App"
            >
              <Smartphone className="size-3.5" />
              <span className="hidden lg:inline">Install App</span>
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 w-full">{children}</main>

        {/* Footer */}
        <footer className="border-t border-border/20 bg-card/20 backdrop-blur-sm py-4 px-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
            <span>© {new Date().getFullYear()} AI Resume Screening Portal</span>
          </div>
        </footer>
      </div>

      {installOpen && <InstallModal onClose={() => setInstallOpen(false)} />}
    </div>
  );
}
