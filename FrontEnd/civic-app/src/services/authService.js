import api from "./api";

export const authService = {
  login: async (email, password) => {
    try {
      const response = await api.post("/auth/login", { email, password });
      if (response.data.success) {
        localStorage.setItem("token", response.data.data.token);
        localStorage.setItem("officer", JSON.stringify(response.data.data));
      }
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  logout: async () => {
    try {
      await api.post("/auth/logout");
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      localStorage.removeItem("token");
      localStorage.removeItem("officer");
    }
  },

  getCurrentOfficer: () => {
    const officer = localStorage.getItem("officer");
    return officer ? JSON.parse(officer) : null;
  },

  isAuthenticated: () => {
    return !!localStorage.getItem("token");
  },

  getMe: async () => {
    const response = await api.get("/auth/me");
    return response.data;
  },
};
