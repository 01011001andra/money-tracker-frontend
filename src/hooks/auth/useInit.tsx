import * as React from "react";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../stores/auth";
import { authKeys } from "./keys";
import api from "../../api";

// --- Types (samakan dengan respons API kamu) ---
export interface User {
  id: string;
  name: string;
  email: string;
}

// --- QUERY: Ambil profil user (GET /me) ---
export function useInitQuery(options?: { enabled?: boolean }) {
  const setUser = useAuthStore((s) => s.setUser);

  const q = useQuery<User>({
    queryKey: authKeys.profile(),
    queryFn: async () => {
      const { data } = await api.get<User>("/me");
      return data;
    },
    enabled: options?.enabled ?? true,
  });

  // ganti onSuccess -> useEffect
  React.useEffect(() => {
    if (q.data) setUser(q.data);
  }, [q.data, setUser]);

  return q;
}
