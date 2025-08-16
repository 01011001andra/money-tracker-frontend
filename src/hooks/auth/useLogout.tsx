import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useUserStore } from "../../stores/user";
import api from "../../api";
import { authKeys } from "./keys";

// --- MUTATION: Logout ---
export function useLogoutMutation() {
  const setUser = useUserStore((s) => s.setUser);
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
      setUser(null);
      // bersihkan cache auth
      await queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
  });
}
