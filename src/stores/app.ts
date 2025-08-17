// src/stores/app.ts
import { create } from "zustand";
import type { ReactNode } from "react";
import { randomString } from "@/utils/helper/helper";

type SideEntry = {
  key: string;
  node: ReactNode;
  width?: number | string;
  anchor?: "left" | "right";
  closing?: boolean;
};
type SideOp = "open" | "push" | "replace" | "back" | "close";
type SideOpts = Omit<SideEntry, "key" | "node" | "closing">;

type AppState = {
  sideStack: SideEntry[];
  drawerPopByBrowser: boolean; // ⬅️ NEW
  markPopstate: () => void; // ⬅️ NEW
  side: {
    (op: "open" | "push" | "replace", node: ReactNode, opts?: SideOpts): void;
    (op: "back" | "close"): void;
  };
};

export const useAppStore = create<AppState>((set, get) => ({
  sideStack: [],
  drawerPopByBrowser: false,
  markPopstate: () => set({ drawerPopByBrowser: true }),

  side: ((op: SideOp, node?: ReactNode, opts?: SideOpts) => {
    const { sideStack, drawerPopByBrowser } = get();

    switch (op) {
      case "open": {
        if (!node) return;
        set({ sideStack: [{ key: randomString(), node, ...opts }] });
        break;
      }
      case "push": {
        if (!node) return;
        set({
          sideStack: [...sideStack, { key: randomString(), node, ...opts }],
        });
        break;
      }
      case "replace": {
        if (!node) return;
        set({
          sideStack: sideStack.length
            ? [
                ...sideStack.slice(0, -1),
                { key: randomString(), node, ...opts },
              ]
            : [{ key: randomString(), node, ...opts }],
        });
        break;
      }
      case "back": {
        if (!sideStack.length) return;
        const topIndex = sideStack.length - 1;
        const top = sideStack[topIndex];

        if (!top.closing) {
          // Back pertama kali
          const next = [...sideStack];
          next[topIndex] = { ...top, closing: true };
          set({ sideStack: next });

          if (drawerPopByBrowser) {
            // Datang dari tombol Back browser → JANGAN panggil history.back() lagi
            set({ drawerPopByBrowser: false });
          } else {
            // Back dari tombol di UI → sinkronkan dengan history
            window.history.back();
          }
        } else {
          // Sudah closing → benar-benar pop
          set({ sideStack: sideStack.slice(0, -1) });
        }
        break;
      }
      case "close": {
        set({ sideStack: [] });
        break;
      }
    }
  }) as AppState["side"],
}));
