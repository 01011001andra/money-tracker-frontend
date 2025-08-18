import * as React from "react";
import TransactionTabs from "./components/TransactionTabs";
import Income from "./components/Income";
import Expense from "./components/Expense";
import { Box, IconButton } from "@mui/material";
import All from "./components/All";
import TransactionDetailsDrawer from "./components/TransactionDetail";
import { Icon } from "@iconify/react/dist/iconify.js";
import useRouter from "@/hooks/apps/useRouter";
import type { Transaction } from "@/types/transaction";

const TransactionPage = () => {
  // states
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Transaction | null>(null);

  // hooks
  const router = useRouter();
  const activeTab = router.query.tab;

  const handleItemClick = (item: Transaction) => {
    setSelected(item);
    setOpen(true);
  };

  const handleOpenAdd = () => {
    router.push(
      `/transaction?sheet=transaction-action&tab=${router.query.tab}`
    );
  };

  React.useEffect(() => {
    if (!router.query.tab) {
      router.push("/transaction?tab=all");
    }
  }, [router]);

  return (
    <div className="relative max-w-xl w-full h-full">
      <IconButton
        className="absolute bottom-6 right-6 bg-primary size-12 text-white z-50"
        onClick={handleOpenAdd}
      >
        <Icon icon="line-md:plus" fontSize={24} />
      </IconButton>
      <div className="p-4 flex flex-col gap-4 overflow-y-auto relative h-full w-full ">
        <h1 className="text-center font-bold  text-xl text-primary-600">
          Transaksi
        </h1>
        <TransactionTabs />

        <Box sx={{ display: activeTab === "all" ? "block" : "none" }}>
          <All handleItemClick={handleItemClick} />
        </Box>
        <Box sx={{ display: activeTab === "income" ? "block" : "none" }}>
          <Income handleItemClick={handleItemClick} />
        </Box>
        <Box sx={{ display: activeTab === "expense" ? "block" : "none" }}>
          <Expense handleItemClick={handleItemClick} />
        </Box>
        <TransactionDetailsDrawer
          open={open}
          onOpen={() => setOpen(true)}
          onClose={() => setOpen(false)}
          item={selected}
        />
      </div>
    </div>
  );
};

export default TransactionPage;
