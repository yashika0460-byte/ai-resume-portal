import { cn } from "@/lib/utils";
import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  BrainCircuit,
  LayoutDashboard,
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

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  ocid: string;
}

const ADMIN_NAV_ITEMS: NavItem[] = [
  {
    to: "/dashboard",
    label: "Dashboard",
    icon: <LayoutDashboard className="size-4" />,
    ocid: "nav-dashboard",
  },
  {
    to: "/upload",
    label: "Upload Resume",
    icon: <Upload className="size-4" />,
    ocid: "nav-upload",
  },
  {
    to: "/match",
    label: "Job Match",
    icon: <Zap className="size-4" />,
    ocid: "nav-match",
  },
];

const USER_NAV_ITEMS: NavItem[] = [
  {
    to: "/upload",
    label: "Upload Resume",
    icon: <Upload className="size-4" />,
    ocid: "nav-upload",
  },
  {
    to: "/match",
    label: "Job Match",
    icon: <Zap className="size-4" />,
    ocid: "nav-match",
  },
];

// ─── Install App Modal ────────────────────────────────────────────────────────

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
        desc: 'Click the icon and select "Install" from the popup — or use the browser menu → "Install [app name]".',
      },
      {
        icon: <Smartphone className="size-4 text-accent" />,
        title: "Open from desktop",
        desc: "The app appears as a standalone window in your taskbar/dock, just like a native app.",
      },
    ],
  };

  const platformLabels = [
    {
      key: "android",
      label: "Android",
      icon: <Smartphone className="size-3.5" />,
    },
    {
      key: "ios",
      label: "iPhone / iPad",
      icon: <Share2 className="size-3.5" />,
    },
    {
      key: "desktop",
      label: "Desktop",
      icon: <Monitor className="size-3.5" />,
    },
  ] as const;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-[8px]"
      aria-labelledby="install-modal-title"
    >
      <div
        className="glass bg-card/97 w-full max-w-md rounded-2xl border border-border/25 flex flex-col gap-5 p-6 shadow-2xl"
        data-ocid="install-modal"
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-accent/15 border border-accent/25">
              <Smartphone className="size-5 text-accent" />
            </div>
            <div>
              <h2
                id="install-modal-title"
                className="font-display font-bold text-foreground text-base"
              >
                Install App
              </h2>
              <p className="text-xs text-muted-foreground">
                Add to your home screen for a native experience
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-muted/40 text-muted-foreground hover:text-foreground transition-smooth"
            aria-label="Close install instructions"
            data-ocid="install-modal-close"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Platform tabs */}
        <div className="flex gap-1 p-1 rounded-xl bg-muted/20 border border-border/20">
          {platformLabels.map(({ key, label, icon }) => (
            <button
              key={key}
              type="button"
              onClick={() => setPlatform(key)}
              data-ocid={`install-tab-${key}`}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-2 px-2 rounded-lg text-xs font-medium transition-smooth",
                platform === key
                  ? "bg-accent/20 text-accent border border-accent/30"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/30",
              )}
            >
              {icon}
              <span className="hidden xs:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Steps */}
        <ol className="flex flex-col gap-3">
          {steps[platform].map(({ icon, title, desc }, stepIdx) => (
            <li key={title} className="flex gap-3">
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div className="w-6 h-6 rounded-full bg-accent/10 border border-accent/20 flex items-center justify-center text-xs font-mono font-bold text-accent">
                  {stepIdx + 1}
                </div>
                {stepIdx < steps[platform].length - 1 && (
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

        {/* Note */}
        <div className="rounded-xl px-4 py-3 bg-muted/15 border border-border/15 text-xs text-muted-foreground leading-relaxed">
          <span className="text-accent font-medium">Tip:</span> Once installed,
          the app opens in full-screen without any browser chrome — just like a
          native mobile or desktop app from the app store.
        </div>

        <Button
          onClick={onClose}
          className="bg-accent hover:bg-accent/90 text-accent-foreground font-display font-semibold w-full"
          data-ocid="install-modal-done"
        >
          Got it!
        </Button>
      </div>
    </div>
  );
}

// ─── Layout ───────────────────────────────────────────────────────────────────

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();
  const router = useRouterState();
  const currentPath = router.location.pathname;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [installOpen, setInstallOpen] = useState(false);
  const navItems = user?.role === "admin" ? ADMIN_NAV_ITEMS : USER_NAV_ITEMS;

  const handleLogout = () => {
    logout();
    navigate({ to: "/login" });
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
            to="/"
            className="flex items-center gap-2.5 group shrink-0"
            data-ocid="nav-logo"
          >
            <div className="p-1.5 rounded-lg bg-accent/15 border border-accent/30 group-hover:bg-accent/25 transition-smooth">
              <BrainCircuit className="size-5 text-accent" />
            </div>
            <span className="font-display font-semibold text-base tracking-tight text-foreground">
              TalentScan<span className="text-accent">AI</span>
            </span>
          </Link>

          {/* Desktop nav */}
          {isAuthenticated && (
            <nav className="hidden md:flex items-center gap-1">
              {navItems.map((item) => {
                const active = currentPath.startsWith(item.to);
                return (
                  <Link
                    key={item.to}
                    to={item.to}
                    data-ocid={item.ocid}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-smooth",
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
          )}

          {/* Right side */}
          <div className="flex items-center gap-3 ml-auto md:ml-0">
            {isAuthenticated && displayEmail && (
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
                {user?.role === "admin" && (
                  <span className="ml-1 px-1.5 py-0.5 rounded text-[10px] font-medium bg-accent/15 text-accent border border-accent/20">
                    Admin
                  </span>
                )}
              </div>
            )}

            {isAuthenticated && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleLogout}
                data-ocid="nav-logout"
                className="hidden md:flex gap-2 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              >
                <LogOut className="size-4" />
                Logout
              </Button>
            )}

            {/* Mobile menu toggle */}
            {isAuthenticated && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setMobileOpen((v) => !v)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? (
                  <X className="size-5" />
                ) : (
                  <Menu className="size-5" />
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Mobile nav drawer */}
        {isAuthenticated && mobileOpen && (
          <div className="md:hidden border-t border-border/20 bg-card/60 backdrop-blur-xl px-4 py-3 flex flex-col gap-1">
            {/* User email in mobile drawer */}
            {displayEmail && (
              <div className="flex items-center gap-2 px-3 py-2 mb-1 text-xs text-muted-foreground">
                <User className="size-3.5 shrink-0 text-accent/70" />
                <span className="font-mono truncate">{user?.email}</span>
                {user?.role === "admin" && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-accent/15 text-accent border border-accent/20">
                    Admin
                  </span>
                )}
              </div>
            )}

            {navItems.map((item) => {
              const active = currentPath.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
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
              onClick={() => {
                setInstallOpen(true);
                setMobileOpen(false);
              }}
              className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:text-accent hover:bg-accent/10 transition-smooth"
              data-ocid="nav-install-mobile"
            >
              <Smartphone className="size-4" />
              Install App
            </button>

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
      <main className="flex-1 w-full">{children}</main>

      {/* ── Footer ── */}
      <footer className="border-t border-border/20 bg-card/20 backdrop-blur-sm py-4 px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} AI Resume Screening Portal</span>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setInstallOpen(true)}
              className="flex items-center gap-1.5 text-muted-foreground hover:text-accent transition-smooth"
              data-ocid="footer-install-app"
            >
              <Smartphone className="size-3.5" />
              Install App
            </button>
            <span>
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
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

      {/* ── Install Modal ── */}
      {installOpen && <InstallModal onClose={() => setInstallOpen(false)} />}
    </div>
  );
}
