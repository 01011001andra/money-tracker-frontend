import type { MessagesType } from "@/types/apps/chat";
import { create } from "zustand";

type AppStoreType = {
  // state type
  messages: MessagesType[];

  // actions type
  addMessage: (data: MessagesType) => void;
};

export const useMessageStore = create<AppStoreType>((set) => ({
  // states
  messages: [
    {
      id: "1",
      role: "assistant",
      message: `👋 Halo! Aku Muscash Bot.
Kamu bisa ketik perintah seperti:
• /catat beli jus apel 20rb
• /pengeluaran 24 Mei 2025
• /pemasukan 24 Mei 2025

—
Catatan:\nAnda sedang berinteraksi dengan asisten otomatis. Sesi percakapan ini bersifat sementara dan tidak disimpan; seluruh pesan akan terhapus saat aplikasi dimulai ulang.
`,
      createdAt: new Date(Date.now() - 60_000).toISOString(),
    },
  ],
  // actions
  addMessage: (arr) =>
    set((state) => ({
      messages: [...state.messages, arr],
    })),
}));
