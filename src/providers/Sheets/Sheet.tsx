// src/components/Sheet.tsx
import * as React from "react";
import { Dialog, Slide, type SlideProps } from "@mui/material";
import type { TransitionProps as MuiTransitionProps } from "@mui/material/transitions";

const Transition = React.forwardRef(function Transition(
  props: SlideProps & { children: React.ReactElement<any, any> },
  ref: React.Ref<unknown>
) {
  // SELALU sama: slide ke kiri (masuk dari kanan), durasi & easing seragam
  return <Slide direction="left" ref={ref} {...props} />;
});

const DEFAULT_TP: MuiTransitionProps = {
  timeout: { enter: 250, exit: 250 },
  easing: {
    enter: "cubic-bezier(.2,.8,.2,1)",
    exit: "cubic-bezier(.2,.8,.2,1)",
  },
};

type SheetProps = React.PropsWithChildren<{
  open: boolean;
  onClose?: () => void;
  width?: number | string;
  hideBackdrop?: boolean;
  disableEscapeKeyDown?: boolean;
  TransitionProps?: MuiTransitionProps; // opsional override
}>;

export default function Sheet({
  open,
  onClose,
  children,
  hideBackdrop,
  disableEscapeKeyDown,
  TransitionProps,
}: SheetProps) {
  return (
    <Dialog
      fullScreen
      fullWidth
      open={open}
      onClose={onClose}
      TransitionComponent={Transition}
      TransitionProps={{ ...DEFAULT_TP, ...TransitionProps }} // seragam
      keepMounted
      hideBackdrop={hideBackdrop ?? false}
      disableEscapeKeyDown={disableEscapeKeyDown}
      PaperProps={{
        sx: {
          m: 0,
          height: "100dvh",
          borderRadius: 0,
          overflow: "hidden",
          bgcolor: "var(--color-primary-50)",
        },
      }}
    >
      <div className="h-full max-w-xl w-full mx-auto">{children}</div>
    </Dialog>
  );
}
