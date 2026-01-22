import axiosInstance from "../lib/axios";

export const sessionApi = {
  getActiveSessions: async () => {
    const response = await axiosInstance.get("/api/session/active");
    return response.data;
  },
  getMyRecentSessions: async () => {
    const response = await axiosInstance.get("/api/session/my-recent");
    return response.data;
  },
  getSessionById: async (id: string) => {
    const response = await axiosInstance.get(`/session/:${id}`);

    return response.data;
  },
  createSession: async (sessionData: {
    problemTitle: string;
    difficulty: string;
  }) => {
    const response = await axiosInstance.post("/api/session", sessionData);

    return response.data;
  },
  joinSession: async (id: string) => {
    const response = await axiosInstance.get(`/session/:${id}/join`);

    return response.data;
  },
  endSession: async (id: string) => {
    const response = await axiosInstance.get(`/session/:${id}/end`);

    return response.data;
  },
  getStreamToken: async () => {
    const response = await axiosInstance.get("/chat/token");

    return response.data;
  },
};
