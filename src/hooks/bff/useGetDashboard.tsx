import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import type { ResponseType } from "@/types/http-resource";
import { bffKeys } from "./keys";
import type { Dashboard } from "@/types/bff";

type DashboardResponse = ResponseType<Dashboard>;

export function useGetDashboard() {
  const q = useQuery({
    queryKey: bffKeys.dashboard(),
    queryFn: async () => {
      const { data } = await api.get<DashboardResponse>("/bff/dashboard");

      return data;
    },
  });

  return q;
}
