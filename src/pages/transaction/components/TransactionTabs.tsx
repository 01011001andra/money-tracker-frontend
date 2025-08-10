import { ToggleButtonGroup, ToggleButton } from "@mui/material";

type TabKey = "income" | "expenses" | "all";

type TransactionTabsProps = {
  tab: TabKey;
  setTab: React.Dispatch<React.SetStateAction<TabKey>>;
};

const TransactionTabs: React.FC<TransactionTabsProps> = ({ tab, setTab }) => {
  return (
    <ToggleButtonGroup
      value={tab}
      exclusive
      onChange={(_, v) => v && setTab(v)}
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
      <ToggleButton value="expenses" className="w-full">
        Pengeluaran
      </ToggleButton>
    </ToggleButtonGroup>
  );
};

export default TransactionTabs;
