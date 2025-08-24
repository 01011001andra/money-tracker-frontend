import useRouter from "@/hooks/apps/useRouter";
// import { useGetTransaction } from "@/hooks/transaction/useGetTransaction";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";
import type React from "react";

type TransactionTabsProps = {
  actualPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setActualPage: React.Dispatch<React.SetStateAction<number>>;
};

const TransactionTabs: React.FC<TransactionTabsProps> = ({
  setPage,
  setActualPage,
}) => {
  const router = useRouter();
  // const { data } = useGetTransaction(null, {
  //   enabled: false,
  //   page: String(actualPage),
  // });

  const handleChangeTab = (v: "all" | "income" | "expense") => {
    if (!v) return;
    router.setQuery((prev) => ({ ...prev, tab: v }));

    setPage(1);
    setActualPage(1);
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
        ALL
      </ToggleButton>
      <ToggleButton value="income" className="w-full">
        INCOME
      </ToggleButton>
      <ToggleButton value="expense" className="w-full">
        EXPENSE
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default TransactionTabs;
