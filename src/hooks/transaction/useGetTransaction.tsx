// useGetTransaction.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import type { ResponseType } from "@/types/http-resource";
import type { Transaction } from "@/types/transaction";
import { key } from "./keys";

export function useGetTransaction(id?: string, opts?: { enabled?: boolean }) {
  const qc = useQueryClient();

  const q = useQuery({
    queryKey: key.transaction(id),
    queryFn: async () => {
      const url = id ? `/transaction/${id}` : "/transaction";
      const { data } = await api.get<ResponseType<Transaction | Transaction[]>>(
        url
      );
      return data;
    },
    // default behavior:
    // - tanpa id: enabled true (langsung fetch list)
    // - dengan id: enabled false (biar kamu kontrol kapan fetch-nya siap)
    enabled: opts?.enabled ?? (!id ? true : false),
  });

  const resetTransaction = () =>
    qc.resetQueries({ queryKey: key.transaction(id), exact: true });

  return { ...q, resetTransaction };
}
