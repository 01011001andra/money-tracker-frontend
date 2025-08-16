import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "../../stores/user";
import { authKeys } from "./keys";
import api from "../../api";
import type { User } from "@/types/auth";

// --- Types (samakan dengan respons API kamu) ---

// --- QUERY: Ambil profil user (GET /me) ---
export function useInitQuery() {
  const { setUser, token } = useUserStore((s) => s);
  const q = useQuery({
    queryKey: authKeys.profile(),
    queryFn: async () => {
      const { data } = await api.get<User>("/auth/initial");
      if (data) {
        setUser(data);
      } else {
        setUser(null);
      }
      return data;
    },
    enabled: token ? true : false,
  });

  return q;
}
