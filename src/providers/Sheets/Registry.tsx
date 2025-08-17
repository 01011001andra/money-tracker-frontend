// src/sheets/registry.tsx
import useRouter from "@/hooks/apps/useRouter";
import EditProfile from "@/pages/setting/sheets/EditProfile";
import { Button } from "@mui/material";
import * as React from "react";

export type SheetScreenProps = {
  closeSelf: () => void;
  closeTop: () => void;
  openSheet: (key: string) => void;
};

// --- contoh dummy screens:

export const ChangePasswordSheet: React.FC<SheetScreenProps> = ({
  closeSelf,
}) => {
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col">
      <header className="p-4 font-bold">Change Password</header>
      <div className="p-4 flex-1 overflow-auto">…form ganti password…</div>
      <div className="p-4">
        <button onClick={closeSelf} className="px-3 py-2 border rounded">
          Close
        </button>
        <Button
          onClick={() =>
            router.push("/setting?sheet=change-password&sheet=profile")
          }
        >
          Buka
        </Button>
      </div>
    </div>
  );
};

// daftar semua sheet
// eslint-disable-next-line react-refresh/only-export-components
export const SHEET_REGISTRY: Record<
  string,
  React.ComponentType<SheetScreenProps>
> = {
  "edit-profile": EditProfile,
  "change-password": ChangePasswordSheet,
  // tambah: "nama-sheet": Komponennya
};
