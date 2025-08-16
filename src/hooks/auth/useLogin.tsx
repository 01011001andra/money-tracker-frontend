import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useUserStore } from "../../stores/user";
import api from "../../api";
import { authKeys } from "./keys";
import type { User } from "@/types/auth";

// --- Types (samakan dengan respons API kamu) ---

export interface PayloadType {
  email: string;
  password: string;
}

export interface ResponseType {
  token: string;
  user: User;
}

// --- MUTATION: Login ---
export function useLoginMutation() {
  const { setUser } = useUserStore((s) => s);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: PayloadType) => {
      const { data } = await api.post<ResponseType>("/auth/login", payload);
      return data;
    },
    onSuccess: async (res) => {
      setUser(res.user);
      localStorage.setItem("token", res.token);

      // segarkan data profil agar konsisten
      await queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
  });
}
