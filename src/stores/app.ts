import { create } from "zustand";

type AppStoreType = {
  // state type
  loading: {
    open: boolean;
    text: string | null;
  };

  // actions type
  loadingAction: ({ open, text }: { open: boolean; text: string }) => void;
};

export const useAppStore = create<AppStoreType>((set) => ({
  // states
  loading: {
    open: false,
    text: null,
  },

  // actions
  loadingAction: (data) =>
    set({ loading: { open: data.open, text: data.text } }),
}));
