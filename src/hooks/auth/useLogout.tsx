import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api";

// --- MUTATION: Logout ---
export function useLogoutMutation() {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      try {
        await api.post("/auth/logout");
      } catch {
        // abaikan error logout server (opsional)
      }
    },
    onSuccess: () => {
      // Hapus semua cache query
      qc.clear();
    },
  });
}
