import { create } from "zustand";

/* ============================ Types ============================ */
export type AppState = {
  isWalkThrough: boolean;
};

export type AppActions = {
  setWalkThrough: (seen: boolean) => void;
  reset: () => void;
};

export type AppStore = {
  state: AppState;
  actions: AppActions;
};

/* ========================== Defaults ========================== */
const defaultState = (): AppState => ({
  isWalkThrough: false,
});

/* =========================== Store ============================ */
export const useAppStore = create<AppStore>((set) => ({
  state: defaultState(),
  actions: {
    setWalkThrough: (seen) =>
      set((s) => ({ state: { ...s.state, isWalkThrough: seen } })),

    reset: () => set(() => ({ state: defaultState() })),
  },
}));

// uncomment jika perlu, fungsinya agar tidak perlu mengambil state saat pendefinisian useAppStore(disini_selector)
// /* ========================== Selectors ========================= */
// export const selectState = (s: AppStore) => s.state;
// export const selectActions = (s: AppStore) => s.actions;
// export const selectIsWalkThrough = (s: AppStore) => s.state.isWalkThrough;
