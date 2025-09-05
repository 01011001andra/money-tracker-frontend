// useGetTransaction.ts
import { useQuery, useQueryClient } from "@tanstack/react-query";
import api from "../../api";
import type { ResponseType } from "@/types/http-resource";
import type { Transaction } from "@/types/transaction";
import { key } from "./keys";
import useRouter from "../apps/useRouter";

type UseGetTxOpts = {
  enabled?: boolean;
  page?: string; // mempertahankan bentukmu
};
type TabType = "all" | "income" | "expense";
type FilterType = "all" | "day" | "week" | "month" | "year" | undefined;
export function useGetTransaction(id?: string | null, opts: UseGetTxOpts = {}) {
  const qc = useQueryClient();
  const router = useRouter();

  const filterQuery = router.query.filter as FilterType;

  const tabQuery = router.query.tab as TabType;

  const page = opts.page ?? "1";
  const limit = "10";

  const qs = new URLSearchParams();
  qs.set("page", page);
  qs.set("limit", limit);

  if (filterQuery && filterQuery !== "all") {
    qs.set("filter", filterQuery);
  }

  if (tabQuery && tabQuery !== "all") {
    qs.set("type", tabQuery);
  }

  // SATUKAN PARAM KE DALAM KEY
  const listKey = id
    ? key.transaction(id)
    : [
        ...key.transaction(),
        { filter: filterQuery, tab: tabQuery, page, limit },
      ];

  const q = useQuery({
    queryKey: listKey,
    queryFn: async () => {
      const url = id ? `/transaction/${id}` : `/transaction?${qs.toString()}`;
      const { data } = await api.get<ResponseType<Transaction | Transaction[]>>(
        url
      );
      return data;
    },
    staleTime: id ? 0 : 5000,
    gcTime: id ? 0 : 5000,
    placeholderData: (prev) => prev,
  });

  const resetTransaction = () => {
    if (id) {
      qc.resetQueries({ queryKey: key.transaction(id), exact: true });
    } else {
      // reset seluruh list yang terkait (opsional tapi berguna)
      qc.resetQueries({ queryKey: key.transaction(), exact: false });
    }
  };

  return { ...q, resetTransaction };
}
