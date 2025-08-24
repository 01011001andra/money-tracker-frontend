import type { Transaction } from "@/types/transaction";
import { create } from "zustand";

type AppStoreType = {
  // state type
  selectedData?: Transaction | null;
  loading: {
    open: boolean;
    text: string | null;
  };

  // actions type
  loadingAction: ({ open, text }: { open: boolean; text?: string }) => void;
  setSelectedData: (data: Transaction | null) => void;
};

export const useAppStore = create<AppStoreType>((set) => ({
  // states
  selectedData: null,
  loading: {
    open: false,
    text: null,
  },

  // actions
  loadingAction: (data) =>
    set({ loading: { open: data.open, text: String(data.text) } }),
  setSelectedData: (data) => set({ selectedData: data }),
}));
