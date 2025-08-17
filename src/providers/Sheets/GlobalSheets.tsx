// src/sheets/GlobalSheets.tsx
import * as React from "react";
import Sheet from "@/providers/Sheets/Sheet";
import type { TransitionProps as MuiTransitionProps } from "@mui/material/transitions";
import { useSheetRouter } from "@/providers/Sheets/useSheetRouter";
import { SHEET_REGISTRY } from "./Registry";

type Layer = { id: number; slug: string; closing: boolean };

const TP_UNIFORM: MuiTransitionProps = {
  timeout: { enter: 250, exit: 250 },
  easing: {
    enter: "cubic-bezier(.2,.8,.2,1)",
    exit: "cubic-bezier(.2,.8,.2,1)",
  },
};

export default function GlobalSheets() {
  const { stack, closeTop, closeSheet, openSheet } = useSheetRouter();

  // daftar layer yang DIRENDER (bisa mengandung yang sedang closing)
  const [layers, setLayers] = React.useState<Layer[]>(() =>
    stack.map((slug, i) => ({ id: i + 1, slug, closing: false }))
  );
  const idSeed = React.useRef(layers.length);

  // helper: indeks layer-layer yang belum closing
  const visibleIdxs = React.useMemo(
    () => layers.map((l, i) => (!l.closing ? i : -1)).filter((i) => i !== -1),
    [layers]
  );

  // Reconcile layers terhadap stack URL
  React.useEffect(() => {
    setLayers((prev) => {
      const prevVisible = prev.filter((l) => !l.closing).map((l) => l.slug);

      // hitung longest common prefix antara prevVisible dan stack
      let lcp = 0;
      while (
        lcp < prevVisible.length &&
        lcp < stack.length &&
        prevVisible[lcp] === stack[lcp]
      ) {
        lcp++;
      }

      // 1) tandai yang perlu keluar (pop) -> closing: true
      const next = [...prev];
      let toClose = prevVisible.length - lcp;
      for (let i = next.length - 1; i >= 0 && toClose > 0; i--) {
        if (!next[i].closing) {
          next[i] = { ...next[i], closing: true };
          toClose--;
        }
      }

      // 2) tambahkan yang perlu masuk (push)
      for (let i = lcp; i < stack.length; i++) {
        next.push({ id: ++idSeed.current, slug: stack[i], closing: false });
      }

      return next;
    });
  }, [stack]);

  // handler keluarnya satu layer (dipanggil dari Transition onExited)
  const handleExited = (id: number) => {
    setLayers((prev) => prev.filter((l) => l.id !== id));
  };

  if (layers.length === 0) return null;

  return (
    <>
      {layers.map((layer, idx) => {
        const Comp = SHEET_REGISTRY[layer.slug];
        if (!Comp) return null;

        const isTopVisible =
          idx ===
          (visibleIdxs.length ? visibleIdxs[visibleIdxs.length - 1] : -1);

        return (
          <Sheet
            key={layer.id}
            open={!layer.closing} // <- toggle open untuk animasi masuk/keluar
            onClose={isTopVisible ? closeTop : undefined}
            hideBackdrop={!isTopVisible} // backdrop hanya di layer teratas yang visible
            disableEscapeKeyDown={!isTopVisible}
            TransitionProps={{
              ...TP_UNIFORM,
              onExited: layer.closing
                ? () => handleExited(layer.id)
                : undefined,
            }}
          >
            <Comp
              closeSelf={() => closeSheet(layer.slug)}
              closeTop={closeTop}
              openSheet={openSheet}
            />
          </Sheet>
        );
      })}
    </>
  );
}
