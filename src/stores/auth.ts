/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";
import { persist } from "zustand/middleware";
import api from "../api";

// --- Types ---
interface GlobalFormState {
  isOpen: boolean;
  forms: any[];
}

interface User {
  id: string;
  name: string;
  email: string;
  // tambahkan field lain sesuai respons API kamu
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  loading: boolean;
}

interface AppStoreState {
  globalForm: GlobalFormState;
  auth: AuthState;
}

interface GlobalFormActions {
  globalFormFn: (data: { action: "open" | "close"; forms?: any[] }) => void;
}

interface AuthActions {
  login: (payload: { email: string; password: string }) => Promise<void>;
  logout: () => void;
  setUser: (user: User | null) => void;
  setToken: (token: string | null) => void;
}

type AppStore = AppStoreState & GlobalFormActions & AuthActions;

// --- Store ---
export const useAuthStore = create<AppStore>()(
  persist(
    (set) => {
      // STATE
      const state: AppStoreState = {
        globalForm: { isOpen: false, forms: [] },
        auth: {
          user: null,
          token: null,
          isAuthenticated: false,
          loading: false,
        },
      };

      // ACTIONS
      const actions: GlobalFormActions & AuthActions = {
        globalFormFn: (data) => {
          if (data.action === "open") {
            set({ globalForm: { isOpen: true, forms: data.forms ?? [] } });
          }
          if (data.action === "close") {
            set({ globalForm: { isOpen: false, forms: [] } });
          }
        },

        // Login: call API -> simpan token & user
        async login({ email, password }) {
          set((s) => ({ auth: { ...s.auth, loading: true } }));
          try {
            const res = await api.post("/auth/login", { email, password });
            // Harapkan respons: { accessToken: string, user: {...} }
            const token: string = res.data?.accessToken;
            const user: User = res.data?.user;

            if (!token) throw new Error("Token tidak ditemukan di respons.");

            set({
              auth: {
                user,
                token,
                isAuthenticated: true,
                loading: false,
              },
            });
          } catch (e) {
            set((s) => ({ auth: { ...s.auth, loading: false } }));
            throw e;
          }
        },

        // Logout: bersihkan semua jejak auth
        logout() {
          set({
            auth: {
              user: null,
              token: null,
              isAuthenticated: false,
              loading: false,
            },
          });
        },

        setUser(user) {
          set((s) => ({ auth: { ...s.auth, user } }));
        },

        setToken(token) {
          set((s) => ({
            auth: {
              ...s.auth,
              token,
              isAuthenticated: Boolean(token),
            },
          }));
        },
      };

      return { ...state, ...actions };
    },
    {
      name: "app-store", // key localStorage
      partialize: (state) => ({
        // simpan yang perlu saja
        auth: {
          user: state.auth.user,
          token: state.auth.token,
          isAuthenticated: state.auth.isAuthenticated,
        },
      }),
    }
  )
);
