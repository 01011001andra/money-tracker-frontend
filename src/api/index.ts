import router from "@/routes";
import axios from "axios";

// Buat instance axios
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // Ganti sesuai API kamu
  timeout: 10000, // 10 detik
});

// Request Interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
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

      // Hapus token
      localStorage.removeItem("token");

      // Redirect ke login
      router.navigate("/login");

      // Bisa juga dispatch ke redux/pinia jika perlu
    }
    return Promise.reject(error);
  }
);

export default api;
