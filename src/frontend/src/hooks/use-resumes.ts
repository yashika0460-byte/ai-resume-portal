/**
 * use-resumes.ts — TanStack Query hooks for resume and match data.
 *
 * All backend calls go through api.ts functions.
 * Session token is read from useAuth() and passed to every resume operation
 * so the backend can validate the caller's identity.
 */

import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  type BackendActor,
  apiDeleteResume,
  apiExtractSkills,
  apiGetMatchHistory,
  apiGetResumeMatchHistory,
  apiGetResumes,
  apiGetUserResumes,
  apiMatchResume,
  apiUploadResume,
} from "../api";
import { ExternalBlob, createActor } from "../backend";
import type { MatchResult, Resume } from "../types";
import { useAuth } from "./use-auth";

// ─── Resumes ──────────────────────────────────────────────────────────────────

export function useResumes() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery<Resume[]>({
    queryKey: ["resumes"],
    queryFn: async () => {
      if (!actor) return [];
      return apiGetResumes(actor as BackendActor);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

// ─── Upload ───────────────────────────────────────────────────────────────────

export function useUploadResume() {
  const { actor } = useActor(createActor);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      filename,
      file,
    }: { filename: string; file: File }) => {
      if (!actor) throw new Error("Actor not ready");
      if (!user?.token)
        throw new Error("Not authenticated. Please sign in and try again.");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);
      const result = await apiUploadResume(
        actor as BackendActor,
        user.token,
        filename,
        blob,
      );
      if ("__kind__" in result && result.__kind__ === "err")
        throw new Error(result.err);
      if ("__kind__" in result && result.__kind__ === "ok") return result.ok;
      throw new Error("Unexpected result from uploadResume");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      queryClient.invalidateQueries({ queryKey: ["userResumes"] });
    },
  });
}

// ─── Delete ───────────────────────────────────────────────────────────────────

export function useDeleteResume() {
  const { actor } = useActor(createActor);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (resumeId: string) => {
      if (!actor) throw new Error("Actor not ready");
      if (!user?.token)
        throw new Error("Not authenticated. Please sign in and try again.");
      return apiDeleteResume(actor as BackendActor, user.token, resumeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      queryClient.invalidateQueries({ queryKey: ["userResumes"] });
    },
  });
}

// ─── Match ────────────────────────────────────────────────────────────────────

export function useMatchResume() {
  const { actor } = useActor(createActor);
  const { user } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      resumeId,
      jobDescription,
    }: {
      resumeId: string;
      jobDescription: string;
    }): Promise<MatchResult> => {
      if (!actor) throw new Error("Actor not ready");
      if (!user?.token)
        throw new Error("Not authenticated. Please sign in and try again.");
      return apiMatchResume(
        actor as BackendActor,
        user.token,
        resumeId,
        jobDescription,
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matchHistory"] });
    },
  });
}

// ─── Match history ────────────────────────────────────────────────────────────

export function useMatchHistory() {
  const { actor, isFetching } = useActor(createActor);

  return useQuery({
    queryKey: ["matchHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return apiGetMatchHistory(actor as BackendActor);
    },
    enabled: !!actor && !isFetching,
    staleTime: 30_000,
  });
}

export function useResumeMatchHistory(resumeId: string) {
  const { actor, isFetching } = useActor(createActor);

  return useQuery({
    queryKey: ["matchHistory", resumeId],
    queryFn: async () => {
      if (!actor) return [];
      return apiGetResumeMatchHistory(actor as BackendActor, resumeId);
    },
    enabled: !!actor && !isFetching && !!resumeId,
    staleTime: 30_000,
  });
}

// ─── Skills extraction ────────────────────────────────────────────────────────

export function useExtractSkills() {
  const { actor } = useActor(createActor);

  return useMutation({
    mutationFn: async (text: string): Promise<string[]> => {
      if (!actor) return [];
      return apiExtractSkills(actor as BackendActor, text);
    },
  });
}

// ─── User resume history ──────────────────────────────────────────────────────

/**
 * useUserResumes — fetches the current user's own resume history.
 * Uses session token (not userId) so the backend can scope results to the caller.
 */
export function useUserResumes() {
  const { actor, isFetching } = useActor(createActor);
  const { user } = useAuth();

  return useQuery<Resume[]>({
    queryKey: ["userResumes", user?.email],
    queryFn: async () => {
      if (!actor || !user?.token) return [];
      const resumes = await apiGetUserResumes(
        actor as BackendActor,
        user.token,
      );
      return resumes
        .slice()
        .sort(
          (a, b) =>
            new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime(),
        );
    },
    enabled: !!actor && !isFetching && !!user?.token,
    staleTime: 30_000,
  });
}
