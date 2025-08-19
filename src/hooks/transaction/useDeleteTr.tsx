import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../../api";
import type { Transaction } from "@/types/transaction";
import { key } from "./keys";

// --- MUTATION: delete ---
export function useDeleteTr() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Transaction) => {
      const { data } = await api.delete(`/transaction/${payload.id}`);
      return data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: key.transaction(),
      });
    },
  });
}
