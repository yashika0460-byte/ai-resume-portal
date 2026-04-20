import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Layout } from "./components/Layout";
import { LoadingSpinner } from "./components/ui/LoadingSpinner";
import { useAuth } from "./hooks/use-auth";

// ─── Lazy page imports ────────────────────────────────────────────────────────
import { Suspense, lazy } from "react";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPasswordPage"));
const LandingPage = lazy(() => import("./pages/LandingPage"));
const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const UploadPage = lazy(() => import("./pages/UploadPage"));
const MatchPage = lazy(() => import("./pages/Match"));
const ProfilePage = lazy(() => import("./pages/ProfilePage"));

// Admin portal — lazy loaded
const AdminEmailGuard = lazy(() =>
  import("./components/AdminPortalLayout").then((m) => ({
    default: m.AdminEmailGuard,
  })),
);
const AdminOverviewPage = lazy(() => import("./pages/admin/AdminOverviewPage"));
const AdminCandidatesPage = lazy(
  () => import("./pages/admin/AdminCandidatesPage"),
);
const AdminMatchingPage = lazy(() => import("./pages/admin/AdminMatchingPage"));
const AdminUsersPage = lazy(() => import("./pages/admin/AdminUsersPage"));
const AdminActivityPage = lazy(() => import("./pages/admin/AdminActivityPage"));

// ─── Full-screen spinner ──────────────────────────────────────────────────────

function PageLoader({ label }: { label?: string }) {
  return (
    <div className="min-h-screen gradient-flow flex items-center justify-center">
      <LoadingSpinner size="lg" label={label ?? "Loading…"} />
    </div>
  );
}

// ─── Protected route wrapper ──────────────────────────────────────────────────

function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <PageLoader label="Restoring session…" />;

  if (!isAuthenticated) return <Navigate to="/login" />;

  return (
    <Layout>
      <Outlet />
    </Layout>
  );
}

// ─── Role-aware guards ────────────────────────────────────────────────────────

/**
 * AdminOnlyRoute — Guards the /dashboard subtree.
 * Redirects non-admin users to /upload.
 */
function AdminOnlyRoute() {
  const { user, isLoading } = useAuth();

  if (isLoading) return <PageLoader label="Verifying access…" />;

  if (!user || user.role !== "admin") return <Navigate to="/upload" />;

  return <Outlet />;
}

/**
 * AdminPortalGuard — Guards the /admin subtree.
 * Requires authenticated session before the AdminEmailGuard component takes over.
 */
function AdminPortalGuard() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <PageLoader label="Verifying access…" />;

  if (!isAuthenticated) return <Navigate to="/login" />;

  // Render the email-lock guard (which also owns the sidebar layout)
  return <AdminEmailGuard />;
}

/**
 * RoleBasedIndex — Resolves the default landing page.
 * - Unauthenticated: show public landing page
 * - Admin: /admin/overview
 * - User: /upload
 */
function RoleBasedIndex() {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) return <PageLoader />;
  if (!isAuthenticated) return <LandingPage />;

  return (
    <Navigate to={user?.role === "admin" ? "/admin/overview" : "/upload"} />
  );
}

// ─── Routes ───────────────────────────────────────────────────────────────────

const rootRoute = createRootRoute({
  component: () => (
    <Suspense fallback={<PageLoader />}>
      <Outlet />
    </Suspense>
  ),
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: RoleBasedIndex,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterPage,
});

const forgotPasswordRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/forgot-password",
  component: ForgotPasswordPage,
});

// Protected group — requires authentication
const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: ProtectedLayout,
});

// Admin-only sub-group (existing /dashboard)
const adminRoute = createRoute({
  getParentRoute: () => protectedRoute,
  id: "admin",
  component: AdminOnlyRoute,
});

const dashboardRoute = createRoute({
  getParentRoute: () => adminRoute,
  path: "/dashboard",
  component: DashboardPage,
});

const uploadRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/upload",
  component: UploadPage,
});

const matchRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/match",
  component: MatchPage,
});

const profileRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/profile",
  component: ProfilePage,
});

// ─── Admin portal routes (/admin/*) ──────────────────────────────────────────

const adminPortalRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "admin-portal",
  component: AdminPortalGuard,
});

const adminOverviewRoute = createRoute({
  getParentRoute: () => adminPortalRoute,
  path: "/admin/overview",
  component: AdminOverviewPage,
});

const adminCandidatesRoute = createRoute({
  getParentRoute: () => adminPortalRoute,
  path: "/admin/candidates",
  component: AdminCandidatesPage,
});

const adminMatchingRoute = createRoute({
  getParentRoute: () => adminPortalRoute,
  path: "/admin/matching",
  component: AdminMatchingPage,
});

const adminUsersRoute = createRoute({
  getParentRoute: () => adminPortalRoute,
  path: "/admin/users",
  component: AdminUsersPage,
});

const adminActivityRoute = createRoute({
  getParentRoute: () => adminPortalRoute,
  path: "/admin/activity",
  component: AdminActivityPage,
});

// /admin → redirect to /admin/overview
const adminIndexRoute = createRoute({
  getParentRoute: () => adminPortalRoute,
  path: "/admin",
  component: () => <Navigate to="/admin/overview" />,
});

// ─── Route tree ───────────────────────────────────────────────────────────────

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  registerRoute,
  forgotPasswordRoute,
  protectedRoute.addChildren([
    adminRoute.addChildren([dashboardRoute]),
    uploadRoute,
    matchRoute,
    profileRoute,
  ]),
  adminPortalRoute.addChildren([
    adminIndexRoute,
    adminOverviewRoute,
    adminCandidatesRoute,
    adminMatchingRoute,
    adminUsersRoute,
    adminActivityRoute,
  ]),
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// ─── App root ─────────────────────────────────────────────────────────────────

export default function App() {
  return <RouterProvider router={router} />;
}
