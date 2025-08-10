import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "../../stores/auth";
import api from "../../api";
import { authKeys } from "./keys";

// --- MUTATION: Logout ---
export function useLogoutMutation() {
  const logout = useAuthStore((s) => s.logout);
  const queryClient = useQueryClient();

  return useMutation({
    // Jika backend punya endpoint logout, panggil di sini.
    // Kalau tidak ada, biarkan kosong dan langsung bersihkan sesi.
    mutationFn: async () => {
      try {
        await api.post("/auth/logout");
      } catch {
        // abaikan error logout server (opsional)
      }
    },
    onSettled: async () => {
      logout();
      // bersihkan cache auth
      await queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
  });
}
