/**
 * use-auth.ts — Backend-wired email/password authentication hook.
 *
 * Stores {token, email, role} in localStorage under "auth_user".
 * On mount, restores session by calling validateSession(token).
 * Supports open self-registration via register().
 * Runs a periodic session check every 5 minutes when authenticated.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useCallback, useEffect, useRef, useState } from "react";
import type { BackendActor } from "../api";
import { createActor } from "../backend";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Waits until the ref value is truthy, polling every 250 ms up to maxMs. */
function waitForRef<T>(
  ref: React.MutableRefObject<T | null>,
  maxMs = 10_000,
): Promise<T | null> {
  return new Promise((resolve) => {
    if (ref.current) {
      resolve(ref.current);
      return;
    }
    const started = Date.now();
    const id = setInterval(() => {
      if (ref.current) {
        clearInterval(id);
        resolve(ref.current);
      } else if (Date.now() - started >= maxMs) {
        clearInterval(id);
        resolve(null);
      }
    }, 250);
  });
}

/** Returns true when the error message looks like a transient network/fetch issue. */
function isNetworkError(msg: string): boolean {
  return (
    msg.includes("fetch") ||
    msg.includes("network") ||
    msg.includes("Failed to fetch") ||
    msg.includes("CANISTER_ID_BACKEND") ||
    msg.includes("canister") ||
    msg.includes("NetworkError") ||
    msg.includes("ERR_") ||
    msg.includes("timeout")
  );
}

// ─── Types ────────────────────────────────────────────────────────────────────

export type UserRole = "admin" | "user";

export interface AuthUser {
  email: string;
  role: UserRole;
  token: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  isLoading: boolean;
  user: AuthUser | null;
  /** @deprecated use user.email instead */
  principalText: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  register: (
    email: string,
    password: string,
  ) => Promise<
    | { ok: true; token: string; role: UserRole; email: string }
    | { ok: false; error: string }
  >;
  /** Immediately persist an auth session (used after register returns a token) */
  persistSession: (token: string, email: string, role: UserRole) => void;
  error: string | null;
}

const STORAGE_KEY = "auth_user";
const SESSION_CHECK_INTERVAL = 5 * 60 * 1000; // 5 minutes

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useAuth(): AuthState {
  const { actor: rawActor, isFetching } = useActor(createActor);
  const actor = rawActor as BackendActor | null;

  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Track latest actor in a ref so waitForRef can see updates
  const actorRef = useRef<BackendActor | null>(null);
  useEffect(() => {
    actorRef.current = actor;
  }, [actor]);

  // Track latest isFetching inside callbacks without stale closures
  const isFetchingRef = useRef(isFetching);
  useEffect(() => {
    isFetchingRef.current = isFetching;
  }, [isFetching]);

  /**
   * Clears local auth state and storage — used on session expiry/logout.
   * Does NOT call backend logout (fire-and-forget on expiry).
   */
  const clearSession = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
    setError(null);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    // Redirect to login without causing a React render loop
    if (
      typeof window !== "undefined" &&
      !window.location.pathname.startsWith("/login")
    ) {
      window.location.replace("/login");
    }
  }, []);

  /**
   * Validates the given token with the backend.
   * Returns the refreshed AuthUser on success, null on failure.
   */
  const validateToken = useCallback(
    async (stored: AuthUser): Promise<AuthUser | null> => {
      if (!actor || !actor.validateSession) return null;
      try {
        const result = await actor.validateSession(stored.token);
        if (result.__kind__ === "ok") {
          const role: UserRole = result.ok.role === "admin" ? "admin" : "user";
          return { email: stored.email, role, token: stored.token };
        }
        return null;
      } catch {
        return null;
      }
    },
    [actor],
  );

  // ── Session restore on mount ──
  useEffect(() => {
    if (isFetching) return;

    const restore = async () => {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) {
          setIsLoading(false);
          return;
        }

        let stored: AuthUser;
        try {
          stored = JSON.parse(raw) as AuthUser;
        } catch {
          localStorage.removeItem(STORAGE_KEY);
          setIsLoading(false);
          return;
        }

        if (!stored.token || !stored.email || !stored.role) {
          localStorage.removeItem(STORAGE_KEY);
          setIsLoading(false);
          return;
        }

        if (!actor || !actor.validateSession) {
          // Actor not ready yet — keep loading
          return;
        }

        const restored = await validateToken(stored);
        if (restored) {
          setUser(restored);
        } else {
          // Session expired — clear silently, no redirect during restore
          localStorage.removeItem(STORAGE_KEY);
        }
      } catch {
        localStorage.removeItem(STORAGE_KEY);
      } finally {
        setIsLoading(false);
      }
    };

    void restore();
  }, [actor, isFetching, validateToken]);

  // ── Periodic session check every 5 minutes ──
  useEffect(() => {
    if (!user || !actor) return;

    // Clear any existing interval before starting a new one
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(async () => {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        clearSession();
        return;
      }
      let stored: AuthUser;
      try {
        stored = JSON.parse(raw) as AuthUser;
      } catch {
        clearSession();
        return;
      }
      const valid = await validateToken(stored);
      if (!valid) {
        clearSession();
      }
    }, SESSION_CHECK_INTERVAL);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [user, actor, validateToken, clearSession]);

  // ─────────────────────────────────────────────────────────────────────────────

  const login = useCallback(
    async (email: string, password: string): Promise<boolean> => {
      setError(null);

      // Wait up to 10 s for the actor to become ready before giving up
      let readyActor = actorRef.current;
      if (!readyActor || isFetchingRef.current) {
        readyActor = await waitForRef(actorRef, 10_000);
      }
      if (!readyActor || !readyActor.login) {
        setError(
          "Service is still loading. Please wait a moment and try again.",
        );
        return false;
      }

      const normalizedEmail = email.trim().toLowerCase();

      /** Attempt a single login call; returns true on success, throws on error. */
      const attempt = async (): Promise<boolean> => {
        if (!readyActor?.login) throw new Error("Actor unavailable");
        const result = await readyActor.login(normalizedEmail, password);
        if (result.__kind__ === "err") {
          setError("Incorrect email or password. Please try again.");
          return false;
        }
        const { token, role } = result.ok;
        const authUser: AuthUser = {
          email: normalizedEmail,
          role: role === "admin" ? "admin" : "user",
          token,
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
        setUser(authUser);
        return true;
      };

      // Try up to 3 times (initial + 2 retries) on transient network errors
      const MAX_RETRIES = 2;
      const RETRY_DELAY_MS = 2_000;

      for (let attempt_ = 0; attempt_ <= MAX_RETRIES; attempt_++) {
        try {
          return await attempt();
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);

          const isCredentialError =
            msg.includes("Invalid") ||
            msg.includes("invalid") ||
            msg.includes("Incorrect") ||
            msg.includes("incorrect") ||
            msg.includes("password") ||
            msg.includes("credentials");

          const isInitError =
            msg.includes("initializ") ||
            msg.includes("loading") ||
            msg.includes("unavailable");

          if (isCredentialError) {
            setError("Incorrect email or password. Please try again.");
            return false;
          }

          if (isInitError) {
            setError(
              "Service is still loading. Please wait a moment and try again.",
            );
            return false;
          }

          // Network / fetch error — retry if attempts remain
          if (isNetworkError(msg) && attempt_ < MAX_RETRIES) {
            await new Promise((r) => setTimeout(r, RETRY_DELAY_MS));
            continue;
          }

          setError(
            "Cannot connect. Please check your internet connection and try again.",
          );
          return false;
        }
      }

      // Exhausted retries
      setError(
        "Cannot connect. Please check your internet connection and try again.",
      );
      return false;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const logout = useCallback(async () => {
    const token = user?.token;
    setUser(null);
    setError(null);
    localStorage.removeItem(STORAGE_KEY);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    if (token) {
      try {
        await actor?.logout?.(token);
      } catch {
        // Ignore logout errors — local state already cleared
      }
    }
  }, [actor, user]);

  const persistSession = useCallback(
    (token: string, email: string, role: UserRole) => {
      const authUser: AuthUser = { email, role, token };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
      setUser(authUser);
    },
    [],
  );

  const register = useCallback(
    async (
      email: string,
      password: string,
    ): Promise<
      | { ok: true; token: string; role: UserRole; email: string }
      | { ok: false; error: string }
    > => {
      // Wait up to 10 s for the actor to become ready (mirrors login behaviour)
      let readyActor = actorRef.current;
      if (!readyActor || isFetchingRef.current) {
        readyActor = await waitForRef(actorRef, 10_000);
      }
      if (!readyActor || !readyActor.register) {
        return {
          ok: false,
          error:
            "Service is still loading. Please wait a moment and try again.",
        };
      }
      const normalizedEmail = email.trim().toLowerCase();
      try {
        const result = await readyActor.register(normalizedEmail, password);
        if (result.__kind__ === "err") {
          if (result.err === "duplicateEmail") {
            return {
              ok: false,
              error:
                "An account with this email already exists. Please sign in or use a different email.",
            };
          }
          return {
            ok: false,
            error:
              "Registration failed. Please check your input and try again.",
          };
        }
        // Backend returns LoginSuccess on success — extract token + role
        const { token, role: rawRole } = result.ok;
        const role: UserRole = rawRole === "admin" ? "admin" : "user";
        // Persist immediately so the user is logged in right away
        const authUser: AuthUser = { email: normalizedEmail, role, token };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(authUser));
        setUser(authUser);
        return { ok: true, token, role, email: normalizedEmail };
      } catch (err) {
        const msg = err instanceof Error ? err.message : String(err);
        if (
          msg.includes("fetch") ||
          msg.includes("network") ||
          msg.includes("Failed to fetch") ||
          msg.includes("CANISTER_ID_BACKEND") ||
          msg.includes("canister")
        ) {
          return {
            ok: false,
            error:
              "Cannot connect to the server. Please check your internet connection.",
          };
        }
        return {
          ok: false,
          error:
            "Registration failed. Please check your internet connection and try again.",
        };
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  return {
    isAuthenticated: user !== null,
    isLoading: isLoading || isFetching,
    user,
    principalText: user?.email ?? null,
    login,
    logout,
    register,
    persistSession,
    error,
  };
}
