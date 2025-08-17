import { useMutation } from "@tanstack/react-query";

import api from "../../api";

export interface PayloadType {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface ResponseType {
  message: string;
}

// --- MUTATION: Login ---
export function useChangePassword() {
  return useMutation({
    mutationFn: async (payload: PayloadType) => {
      const { data } = await api.put<ResponseType>(`/users/change-password`, {
        oldPassword: payload.oldPassword,
        newPassword: payload.newPassword,
        confirmPassword: payload.confirmPassword,
      });
      return data;
    },
  });
}
