// hooks/queries/useInfiniteTransactions.ts
import { useInfiniteQuery } from "@tanstack/react-query";
import api from "../../api";
import type { ResponseType } from "@/types/http-resource";
import type { Transaction } from "@/types/transaction";
import useRouter from "../apps/useRouter";

type ListMeta = {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

// ResponseType kamu + meta
type ListResp = ResponseType<Transaction[]> & { meta: ListMeta };

export function useInfiniteTransactions(opts?: {
  year?: number;
  limit?: number; // default 20
  enabled?: boolean;
}) {
  const router = useRouter();
  const filter =
    (router.query.filter as "day" | "week" | "month" | "year") || undefined;
  const year =
    opts?.year ?? (router.query.year ? Number(router.query.year) : undefined);
  const limit = opts?.limit ?? 20;

  return useInfiniteQuery({
    queryKey: ["transaction", "all", { year, filter, limit }],
    initialPageParam: 1,
    enabled: opts?.enabled ?? true,
    queryFn: async ({ pageParam }) => {
      const qs = new URLSearchParams();
      if (filter) qs.set("filter", filter);
      if (year) qs.set("year", String(year));
      qs.set("page", String(pageParam));
      qs.set("limit", String(limit));

      const { data } = await api.get<ListResp>(`/transaction?${qs.toString()}`);
      return data;
    },
    getNextPageParam: (lastPage) => {
      const { page, totalPages } = lastPage.meta;
      return page < totalPages ? page + 1 : undefined;
    },
    getPreviousPageParam: (firstPage) => {
      const { page } = firstPage.meta;
      return page > 1 ? page - 1 : undefined;
    },
    staleTime: 30_000,
    refetchOnWindowFocus: false,
  });
}
