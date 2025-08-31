import { useMutation, useQueryClient } from "@tanstack/react-query";
import useRouter from "../apps/useRouter";
import { useUserStore } from "@/stores/user";
// import api from "../../api";

// --- MUTATION: Logout ---
export function useLogoutMutation() {
  const qc = useQueryClient();
  const router = useRouter();
  const { setUser } = useUserStore();

  return useMutation({
    mutationFn: async () => {
      try {
        // await api.post("/auth/logout");
        setUser(null);
        localStorage.removeItem("token");
      } catch {
        // abaikan error logout server (opsional)
      } finally {
        router.push("/login");
        qc.clear();
      }
    },
  });
}
