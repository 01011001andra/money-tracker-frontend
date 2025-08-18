import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../../api";
import type { Transaction } from "@/types/transaction";
import { key } from "./keys";
import type { ResponseType } from "@/types/http-resource";

// --- MUTATION: Login ---
export function useCreateUpdateTr() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: Transaction) => {
      const isPost = !payload?.id;
      const payloadSubmit = {
        title: payload.title,
        transactionDate: payload.transactionDate,
        amount: payload.amount,
        note: payload?.note ?? null,
        type: payload.type,
        categoryId: payload.categoryId,
      };

      const { data } = await api.request<ResponseType<Transaction>>({
        method: isPost ? "POST" : "PUT",
        url: isPost ? "/transaction" : `/transaction/${payload.id}`,
        data: payloadSubmit,
      });
      return data;
    },
    onSuccess: async (res, variables) => {
      console.log(variables);

      await queryClient.invalidateQueries({
        queryKey: key.transaction(),
      });
    },
  });
}
