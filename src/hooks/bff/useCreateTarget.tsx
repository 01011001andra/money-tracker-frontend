import { useMutation } from "@tanstack/react-query";

import api from "../../api";
import type { Transaction } from "@/types/transaction";
import type { ResponseType } from "@/types/http-resource";
import type { TargetActionType } from "@/types/apps/target-action";

// --- MUTATION: Login ---
export function useCreateTarget() {
  return useMutation({
    mutationFn: async (payload: TargetActionType) => {
      const payloadSubmit = {
        dailyTarget: payload.dailyTarget,
        weeklyTarget: payload.weeklyTarget,
        monthlyTarget: payload.monthlyTarget,
        yearlyTarget: payload.yearlyTarget,
      };

      const { data } = await api.request<ResponseType<Transaction>>({
        method: "POST",
        url: "/income-target",
        data: payloadSubmit,
      });
      return data;
    },
  });
}
