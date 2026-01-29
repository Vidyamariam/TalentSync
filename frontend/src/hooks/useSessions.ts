import { useQuery, useMutation } from "@tanstack/react-query";
import { sessionApi } from "../api/sessions";
import toast from "react-hot-toast";

export const useActiveSessions = () => {
  const result = useQuery({
    queryKey: ["activeSessions"],
    queryFn: sessionApi.getActiveSessions,
  });

  return result;
};

export const useMyRecentSessions = () => {
  const result = useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: sessionApi.getMyRecentSessions,
  });
  return result;
};

export const useCreateSession = () => {
  const result = useMutation({
    mutationFn: sessionApi.createSession,
    onSuccess: () => toast.success("Session created successfully"),
    onError: (error: any) =>
      toast.error(error.response.data.message || "Failed to create session"),
  });

  return result;
};

export const useGetSessionById = (id: string) => {
  const result = useQuery({
    queryKey: ["session", id],
    queryFn: () => sessionApi.getSessionById(id),
    enabled: !!id,
  });

  return result;
};

export const useJoinSession = () => {
  const result = useMutation({
    mutationKey: ["joinSession"],
    mutationFn: sessionApi.joinSession,
    onSuccess: () => toast.success("Joined session successfully"),
    onError: (error: any) =>
      toast.error(error.response.data.message || "Failed to join session"),
  });

  return result;
};

export const useEndSession = () => {
  const result = useMutation({
    mutationKey: ["endSession"],
    mutationFn: sessionApi.endSession,
    onSuccess: () => toast.success("Ended session successfully"),
    onError: (error: any) =>
      toast.error(error.response.data.message || "Failed to end session"),
  });

  return result;
};
