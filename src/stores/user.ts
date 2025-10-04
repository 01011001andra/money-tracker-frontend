/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { getToken } from "@/utils/helper/helper";
import type { User } from "@/types/auth";
import { Capacitor } from "@capacitor/core";

// --- Types ---

interface StateType {
  user: User | null;
  token: string | null;
  isNativeMobile: boolean;
}

interface ActionType {
  setUser: (user: User | null) => void;
}

type AppStore = StateType & ActionType;

// --- Store ---
export const useUserStore = create<AppStore>()((set) => {
  // STATE
  const state: StateType = {
    user: null,
    isNativeMobile: Capacitor.isNativePlatform(),
    token: getToken(),
  };

  // ACTIONS
  const actions: ActionType = {
    setUser(user) {
      set((s) => ({ ...s, user }));
    },
  };

  return { ...state, ...actions };
});
