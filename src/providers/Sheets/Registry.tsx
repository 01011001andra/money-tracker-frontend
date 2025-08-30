import TargetAction from "@/pages/home/sheets/TargetAction";
import ChangePassword from "@/pages/setting/sheets/ChangePassword";
import EditProfile from "@/pages/setting/sheets/EditProfile";
import TransactionAction from "@/pages/transaction/sheets/TransactionAction";
import * as React from "react";

export type SheetScreenProps = {
  closeSelf: () => void;
  closeTop: () => void;
  openSheet: (key: string) => void;
};

// daftar semua sheet
// eslint-disable-next-line react-refresh/only-export-components
export const SHEET_REGISTRY: Record<
  string,
  React.ComponentType<SheetScreenProps>
> = {
  "edit-profile": EditProfile,
  "change-password": ChangePassword,
  "transaction-action": TransactionAction,
  "target-action": TargetAction,
};
