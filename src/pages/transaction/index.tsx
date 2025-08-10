import * as React from "react";
import TransactionTabs from "./components/TransactionTabs";
import Income from "./components/Income";
import Expense from "./components/Expense";
import { Box } from "@mui/material";
import All from "./components/All";
import TransactionDetailsDrawer from "./components/TransactionDetail";

type TransactionItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number; // + = income, - = expense
  icon: string;
  iconBg: string; // contoh: "#E0E7FF"
  iconColor: string; // contoh: "#4F46E5"
};

const Transaction = () => {
  const [tab, setTab] = React.useState<"income" | "expenses" | "all">("all");
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<TransactionItem | null>(null);

  const handleItemClick = (item: TransactionItem) => {
    setSelected(item);
    setOpen(true);
  };

  return (
    <div className="min-h-screen p-4 flex flex-col gap-4 overflow-y-auto">
      <h1 className="text-center font-bold  text-xl text-primary-600">
        Transaksi
      </h1>
      <TransactionTabs tab={tab} setTab={setTab} />

      <Box sx={{ display: tab === "all" ? "block" : "none" }}>
        <All handleItemClick={handleItemClick} />
      </Box>
      <Box sx={{ display: tab === "income" ? "block" : "none" }}>
        <Income />
      </Box>
      <Box sx={{ display: tab === "expenses" ? "block" : "none" }}>
        <Expense />
      </Box>
      <TransactionDetailsDrawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        item={selected}
      />
    </div>
  );
};

export default Transaction;
