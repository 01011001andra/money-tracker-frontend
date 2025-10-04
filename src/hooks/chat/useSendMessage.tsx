import { useMutation } from "@tanstack/react-query";

import api from "../../api";
import type { SendMessageType } from "@/types/apps/chat";

// --- MUTATION: Login ---
export function useSendMessage() {
  return useMutation({
    mutationFn: async (payload: SendMessageType) => {
      const fd = new FormData();
      fd.append("userId", payload.userId);
      fd.append("message", payload.message);
      if (payload.image) {
        fd.append("image", payload.image);
      }

      const { data } = await api.request<string>({
        method: "POST",
        url: "https://n8n.musyan.my.id/webhook/bf4943a9-7361-4103-b0d9-dbf89bee1208",
        data: fd,
      });
      return data;
    },
  });
}
