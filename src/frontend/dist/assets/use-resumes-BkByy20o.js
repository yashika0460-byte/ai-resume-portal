import { d as useActor, q as useQuery, u as useAuth, p as useQueryClient, E as ExternalBlob, e as createActor } from "./index-BW0DBoAl.js";
import { u as useMutation } from "./useMutation-DJ2_JvTs.js";
import { j as apiUploadResume, k as apiDeleteResume, h as apiMatchResume, f as apiGetResumes, g as apiGetMatchHistory, i as apiGetUserResumes } from "./api-D_-AFWZL.js";
function useResumes() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["resumes"],
    queryFn: async () => {
      if (!actor) return [];
      return apiGetResumes(actor);
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useUploadResume() {
  const { actor } = useActor(createActor);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      filename,
      file
    }) => {
      if (!actor) throw new Error("Actor not ready");
      if (!(user == null ? void 0 : user.token))
        throw new Error("Not authenticated. Please sign in and try again.");
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes);
      const result = await apiUploadResume(
        actor,
        user.token,
        filename,
        blob
      );
      if ("__kind__" in result && result.__kind__ === "err")
        throw new Error(result.err);
      if ("__kind__" in result && result.__kind__ === "ok") return result.ok;
      throw new Error("Unexpected result from uploadResume");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      queryClient.invalidateQueries({ queryKey: ["userResumes"] });
    }
  });
}
function useDeleteResume() {
  const { actor } = useActor(createActor);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (resumeId) => {
      if (!actor) throw new Error("Actor not ready");
      if (!(user == null ? void 0 : user.token))
        throw new Error("Not authenticated. Please sign in and try again.");
      return apiDeleteResume(actor, user.token, resumeId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resumes"] });
      queryClient.invalidateQueries({ queryKey: ["userResumes"] });
    }
  });
}
function useMatchResume() {
  const { actor } = useActor(createActor);
  const { user } = useAuth();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({
      resumeId,
      jobDescription
    }) => {
      if (!actor) throw new Error("Actor not ready");
      if (!(user == null ? void 0 : user.token))
        throw new Error("Not authenticated. Please sign in and try again.");
      return apiMatchResume(
        actor,
        user.token,
        resumeId,
        jobDescription
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["matchHistory"] });
    }
  });
}
function useMatchHistory() {
  const { actor, isFetching } = useActor(createActor);
  return useQuery({
    queryKey: ["matchHistory"],
    queryFn: async () => {
      if (!actor) return [];
      return apiGetMatchHistory(actor);
    },
    enabled: !!actor && !isFetching,
    staleTime: 3e4
  });
}
function useUserResumes() {
  const { actor, isFetching } = useActor(createActor);
  const { user } = useAuth();
  return useQuery({
    queryKey: ["userResumes", user == null ? void 0 : user.email],
    queryFn: async () => {
      if (!actor || !(user == null ? void 0 : user.token)) return [];
      const resumes = await apiGetUserResumes(
        actor,
        user.token
      );
      return resumes.slice().sort(
        (a, b) => new Date(b.uploadDate).getTime() - new Date(a.uploadDate).getTime()
      );
    },
    enabled: !!actor && !isFetching && !!(user == null ? void 0 : user.token),
    staleTime: 3e4
  });
}
export {
  useMatchHistory as a,
  useDeleteResume as b,
  useUploadResume as c,
  useUserResumes as d,
  useMatchResume as e,
  useResumes as u
};
