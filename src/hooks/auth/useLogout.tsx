import { useMutation } from "@tanstack/react-query";
import api from "../../api";

// --- MUTATION: Logout ---
export function useLogoutMutation() {
  return useMutation({
    mutationFn: async () => {
      try {
        await api.post("/auth/logout");
      } catch {
        // abaikan error logout server (opsional)
      }
    },
  });
}
