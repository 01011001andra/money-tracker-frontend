// src/stores/app.ts
import { create } from "zustand";
import type { ReactNode } from "react";
import { randomString } from "@/utils/helper";

type SideEntry = {
  key: string;
  node: ReactNode;
  width?: number | string;
  anchor?: "left" | "right";
};
type SideOp = "open" | "push" | "replace" | "back" | "close";
type SideOpts = Omit<SideEntry, "key" | "node">;

type AppState = {
  sideStack: SideEntry[];
  side: {
    (op: "open" | "push" | "replace", node: ReactNode, opts?: SideOpts): void;
    (op: "back" | "close"): void;
  };
};

export const useAppStore = create<AppState>((set, get) => ({
  // states
  sideStack: [],

  // actions
  side: ((op: SideOp, node?: ReactNode, opts?: SideOpts) => {
    const { sideStack } = get();
    switch (op) {
      case "open":
        if (!node) return;
        set({ sideStack: [{ key: randomString(), node, ...opts }] });
        break;
      case "push":
        if (!node) return;
        set({
          sideStack: [...sideStack, { key: randomString(), node, ...opts }],
        });
        break;
      case "replace":
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
      case "back":
        if (!sideStack.length) return;
        set({ sideStack: sideStack.slice(0, -1) });
        break;
      case "close":
        set({ sideStack: [] });
        break;
    }
  }) as AppState["side"],
}));
