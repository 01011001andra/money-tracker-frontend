import useRouter from "@/hooks/apps/useRouter";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import type React from "react";

type TransactionTabsProps = {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setTabs: React.Dispatch<
    React.SetStateAction<"income" | "expense" | undefined>
  >;
  tabs: "income" | "expense" | undefined;
};

const TransactionTabs: React.FC<TransactionTabsProps> = ({
  setPage,
  setTabs,
}) => {
  const router = useRouter();

  const handleChangeTab = (v: "all" | "income" | "expense") => {
    router.setQuery((prev) => ({ ...prev, tab: v }));
    if (v !== "all") {
      setTabs(v);
    } else {
      setTabs(undefined);
    }
    setPage(1);
  };
  return (
    <ToggleButtonGroup
      value={router.query.tab}
      exclusive
      onChange={(_, v) => handleChangeTab(v)}
      color="primary"
      className="bg-primary-100 w-full "
      sx={{
        bgcolor: "action.hover",
        borderRadius: 2,
        px: 0.8,
        py: 0.5,
        "& .MuiToggleButton-root": {
          textTransform: "none",
          border: 0,
          px: 2.5,
          py: 0.75,
          borderRadius: 1.5,
        },
        "& .Mui-selected": {
          bgcolor: "white !important",
          color: "#7c3aed !important",
          boxShadow: 1,
          "&:hover": { bgcolor: "background.paper" },
        },
      }}
    >
      <ToggleButton value="all" className="w-full">
        Semua
      </ToggleButton>
      <ToggleButton value="income" className="w-full">
        Pemasukan
      </ToggleButton>
      <ToggleButton value="expense" className="w-full">
        Pengeluaran
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default TransactionTabs;
