import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

type Store = {
  isWalkThrough: boolean;

  hydrated: boolean;

  setWalkThrough: (seen: boolean) => void;
  reset: () => void;
};

/** ===== Store ===== */
export const useLocalStorageStore = create<Store>()(
  persist(
    (set) => ({
      // states
      isWalkThrough: false,
      hydrated: false,

      // actions
      setWalkThrough: (seen) => set({ isWalkThrough: seen }),
      reset: () => set({ isWalkThrough: false, hydrated: true }),
    }),
    {
      name: "kaskes", // key
      storage: createJSONStorage(() => localStorage),

      // simpan hanya yang diperlukan
      partialize: (s) => ({ isWalkThrough: s.isWalkThrough }),

      // tandai siap setelah rehydrate
      onRehydrateStorage: () => () => {
        useLocalStorageStore.setState((prev) => ({ ...prev, hydrated: true }));
      },

      migrate: (persisted) => {
        // contoh migrasi ringan
        return persisted as any;
      },
    }
  )
);

/** ===== Selectors (disarankan) ===== */
export const selectIsWalkThrough = (s: Store) => s.isWalkThrough;
export const selectHydrated = (s: Store) => s.hydrated;
export const selectActions = (s: Store) => ({
  setWalkThrough: s.setWalkThrough,
  reset: s.reset,
});
