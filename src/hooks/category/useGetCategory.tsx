import { useQuery, useQueryClient } from "@tanstack/react-query";
import { authKeys } from "./keys";
import api from "../../api";
import type { Category } from "@/types/category";
import type { ResponseType } from "@/types/http-resource";

type CategoryResponse = ResponseType<Category[]>;

export function useGetCategory() {
  const qc = useQueryClient();
  const resetCategory = () =>
    qc.resetQueries({
      queryKey: authKeys.category(),
      exact: true,
    });
  const q = useQuery({
    queryKey: authKeys.category(),
    queryFn: async () => {
      const { data } = await api.get<CategoryResponse>("/category");

      return data;
    },
    enabled: false,
    initialData: { message: "", status: "success", data: [] },
  });

  return { ...q, resetCategory };
}
