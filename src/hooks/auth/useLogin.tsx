import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useAuthStore } from "../../stores/auth";
import api from "../../api";
import { authKeys } from "./keys";

// --- Types (samakan dengan respons API kamu) ---
export interface User {
  id: string;
  name: string;
  email: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  user: User;
}

// --- MUTATION: Login ---
export function useLoginMutation() {
  const setToken = useAuthStore((s) => s.setToken);
  const setUser = useAuthStore((s) => s.setUser);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: LoginPayload) => {
      const { data } = await api.post<LoginResponse>("/auth/login", payload);
      return data;
    },
    onSuccess: async (res) => {
      setToken(res.accessToken);
      setUser(res.user);
      // segarkan data profil agar konsisten
      await queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
  });
}
