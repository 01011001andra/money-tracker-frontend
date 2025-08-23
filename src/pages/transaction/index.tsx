import * as React from "react";
import TransactionTabs from "./components/TransactionTabs";
import { Box, IconButton } from "@mui/material";
import TransactionDetailsDrawer from "./components/TransactionDetail";
import { Icon } from "@iconify/react/dist/iconify.js";
import useRouter from "@/hooks/apps/useRouter";
import type { Transaction } from "@/types/transaction";
import PeriodDropdown from "@/components/PeriodDropdown";
import TransactionList from "./components/TransactionList";
import { useGetTransaction } from "@/hooks/transaction/useGetTransaction";

const TransactionPage = () => {
  // states
  const [page, setPage] = React.useState(1);
  const [tabs, setTabs] = React.useState<undefined | "income" | "expense">(
    undefined
  );
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState<Transaction | null>(null);

  // hooks
  const router = useRouter();
  const { data, refetch } = useGetTransaction(null, {
    enabled: false,
    page: String(page),
  });

  const handleItemClick = (item: Transaction) => {
    setSelected(item);
    setOpen(true);
  };

  const handlePaginate = (type: "previous" | "next") => {
    if (!data?.meta) return;

    if (type == "previous") {
      if (data?.meta?.page <= 1) return;
      setPage((prev) => prev - 1);
    }
    if (type == "next") {
      if (page >= data?.meta.totalPages) return;
      setPage((prev) => prev + 1);
    }
  };

  const handleOpenAdd = () => {
    router.setQuery({ sheet: "transaction-action" });
  };

  React.useEffect(() => {
    if (!router.query.tab && !router.query.filter) {
      router.push("/transaction?tab=all&filter=all");
      refetch();
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

        <TransactionTabs
          setTabs={setTabs}
          page={page}
          setPage={setPage}
          tabs={tabs}
        />

        <Box>
          <div className="flex flex-col gap-2">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 4,
                }}
              >
                <IconButton
                  onClick={() => {
                    handlePaginate("previous");
                  }}
                  className="bg-primary text-white"
                >
                  <Icon icon={"ooui:next-rtl"} fontSize={12} />
                </IconButton>
                <span>{page}</span>
                <IconButton
                  onClick={() => {
                    handlePaginate("next");
                  }}
                  className="bg-primary text-white"
                >
                  <Icon icon={"ooui:next-ltr"} fontSize={12} />
                </IconButton>
              </Box>
              <PeriodDropdown setPage={setPage} />
            </Box>
            <div className="bg-white rounded-lg shadow-md px-2">
              <TransactionList onItemClick={handleItemClick} page={page} />
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
