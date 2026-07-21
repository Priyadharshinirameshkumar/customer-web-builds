import axios from "axios";
import {
  clearAuthToken,
  getAuthToken,
  setAuthToken,
} from "../utils/authStorage";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = getAuthToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      clearAuthToken();

      const isLoginRequest = error.config?.url?.includes("/auth/login");
      const isOnLoginPage = window.location.pathname === "/admin/login";

      if (!isLoginRequest && !isOnLoginPage) {
        const returnUrl = encodeURIComponent(
          `${window.location.pathname}${window.location.search}`
        );
        window.location.href = `/admin/login?returnUrl=${returnUrl}`;
      }
    }

    return Promise.reject(error);
  }
);

export { setAuthToken };
export default api;
