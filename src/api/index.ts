import router from "@/routes";
import { useUserStore } from "@/stores/user";
import axios from "axios";

// Buat instance axios
const api = axios.create({
  baseURL: 'https://money-tracker-backend-psi.vercel.app/api/v1', // Ganti sesuai API kamu
  timeout: 10000, // 10 detik
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    // if (config.method?.toLowerCase() === "get") {
    //   const optOut = (config.headers as any)?.["x-cache-bust"] === false;
    //   if (!optOut) {
    //     config.params = { ...(config.params || {}), _t: Date.now() };
    //   }
    // }

    return config;
  },
  (error) => Promise.reject(error)
);

// Response Interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.warn("Token invalid atau expired");

      localStorage.removeItem("token");

      router.navigate("/login");

      useUserStore.setState({ user: null });
    }
    return Promise.reject(error);
  }
);

export default api;
