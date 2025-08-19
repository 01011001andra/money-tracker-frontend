import * as React from "react";
import TransactionTabs from "./components/TransactionTabs";
import { Box, IconButton, Typography } from "@mui/material";
import TransactionDetailsDrawer from "./components/TransactionDetail";
import { Icon } from "@iconify/react/dist/iconify.js";
import useRouter from "@/hooks/apps/useRouter";
import type { Transaction } from "@/types/transaction";
import PeriodDropdown from "@/components/PeriodDropdown";
import TransactionList from "./components/TransactionList";

const TransactionPage = () => {
  // hooks
  const router = useRouter();
  const activeTab = router.query.tab as "all" | "income" | "expense";

  // states
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Transaction | null>(null);

  const handleItemClick = (item: Transaction) => {
    setSelected(item);
    setOpen(true);
  };

  const handleOpenAdd = () => {
    router.setQuery({ sheet: "transaction-action" });
  };

  const tab = () => {
    if (activeTab == "all") {
      return "All Transaction";
    }
    if (activeTab == "income") {
      return "Income";
    }

    if (activeTab == "expense") {
      return "Expense";
    }
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

        <Box>
          <div className="flex flex-col gap-2">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="subtitle1" fontWeight={700}>
                {tab()}
              </Typography>
              <PeriodDropdown />
            </Box>
            <div className="bg-white rounded-lg shadow-md px-2">
              <TransactionList onItemClick={handleItemClick} />
            </div>
          </div>
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
