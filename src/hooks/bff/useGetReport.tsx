import { useQuery } from "@tanstack/react-query";
import api from "../../api";
import type { ResponseType } from "@/types/http-resource";
import { bffKeys } from "./keys";
import type { Report } from "@/types/bff";

type ReportResponse = ResponseType<Report>;

export function useGetReport() {
  const q = useQuery({
    queryKey: bffKeys.report(),
    queryFn: async () => {
      const { data } = await api.get<ReportResponse>("/bff/report");

      return data;
    },
  });

  return q;
}
