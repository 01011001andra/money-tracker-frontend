import { useMutation, useQueryClient } from "@tanstack/react-query";

import { useUserStore } from "../../stores/user";
import api from "../../api";
import { authKeys } from "./keys";
import type { User } from "@/types/auth";

// --- Types (samakan dengan respons API kamu) ---

export interface PayloadType {
  id?: string;
  email: string;
  name: string;
  image?: string;
}

export interface ResponseType {
  user: User;
}

// --- MUTATION: Login ---
export function useUpdateProfile() {
  const { setUser } = useUserStore((s) => s);
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: PayloadType) => {
      const { data } = await api.put<ResponseType>(`/users/${payload?.id}`, {
        name: payload.name,
        image: payload.image,
      });
      return data;
    },
    onSuccess: async (res) => {
      setUser(res.user);

      // segarkan data profil agar konsisten
      await queryClient.invalidateQueries({ queryKey: authKeys.profile() });
    },
  });
}
