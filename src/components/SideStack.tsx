// src/components/SideStack.tsx
import * as React from "react";
import { Drawer, type SxProps, type Theme } from "@mui/material";
import { useAppStore } from "@/stores/app"; // pakai store 1-action: side()

export type SideStackProps = {
  enterMs?: number;
  exitMs?: number;
  PaperSx?: SxProps<Theme>;
};

const SideStack: React.FC<SideStackProps> = ({
  // enterMs = 500,
  // exitMs = 500,
  PaperSx,
}) => {
  const stack = useAppStore((s) => s.sideStack);
  const side = useAppStore((s) => s.side);

  return (
    <>
      {stack.map((e, i) => {
        const anchor = e.anchor ?? "right";
        const width = "100%";
        // const offset = Math.min(i * 12, 60); // efek bertingkat

        return (
          <Drawer
            anchor={anchor}
            open
            onClose={() => side("back")}
            ModalProps={{ keepMounted: true, hideBackdrop: i > 0 }}
            transitionDuration={{ enter: 650, exit: 480 }} // durasi slide
            SlideProps={{
              appear: true, // PENTING: animasi saat mount
              easing: {
                enter: "cubic-bezier(0.2, 0.9, 0.1, 1)", // rasa “berat” masuk
                exit: "cubic-bezier(0.4, 0.0, 1, 1)", // keluar cepat
              },
            }}
            BackdropProps={{
              transitionDuration: 480,
              sx: {
                backgroundColor: i > 0 ? "transparent" : "rgba(0,0,0,0.45)",
              },
            }}
            PaperProps={{
              elevation: 8,
              sx: {
                width,
                height: "100dvh",

                display: "flex",
                flexDirection: "column",
                overflow: "hidden",
                willChange: "transform",
                ...PaperSx,
              },
            }}
          >
            <div className="flex h-full w-full overflow-auto">{e.node}</div>
          </Drawer>
        );
      })}
    </>
  );
};

export default SideStack;
