import React from "react";
import type { PeriodKey } from "../../../components/PeriodDropdown";
import { Box, Typography } from "@mui/material";
import PeriodDropdown from "../../../components/PeriodDropdown";
import TransactionList, { type TransactionItem } from "./TransactionList";

const All = ({
  items = [
    {
      id: "1",
      title: "May salary payout",
      category: "Salary",
      date: "May 18",
      amount: 12000000,
      icon: "solar:wallet-money-bold-duotone",
      iconBg: "#E0E7FF",
      iconColor: "#4F46E5",
    },
    {
      id: "2",
      title: "Weekly grocery haul",
      category: "Groceries",
      date: "May 18",
      amount: -45200,
      icon: "solar:cart-3-bold-duotone",
      iconBg: "#DCFCE7",
      iconColor: "#059669",
    },
    {
      id: "3",
      title: "Ride to work",
      category: "Transport",
      date: "May 18",
      amount: -10500,
      icon: "solar:train-bold-duotone",
      iconBg: "#FEF3C7",
      iconColor: "#D97706",
    },
  ],
  handleItemClick,
}: {
  items?: TransactionItem[];
  handleItemClick: (item: TransactionItem) => void;
}) => {
  const [period, setPeriod] = React.useState<PeriodKey>("today");

  return (
    <div className="flex flex-col gap-2">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight={700}>
          Semua Transaksi
        </Typography>
        <PeriodDropdown value={period} onChange={setPeriod} />
      </Box>
      <div className="bg-white rounded-lg shadow-md px-2">
        <TransactionList items={items} onItemClick={handleItemClick} />
      </div>
    </div>
  );
};

export default All;
