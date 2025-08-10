import React from "react";
import type { PeriodKey } from "../../../components/PeriodDropdown";
import { Box, Typography } from "@mui/material";
import PeriodDropdown from "../../../components/PeriodDropdown";
import TransactionList from "./TransactionList";

type TransactionItem = {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number; // + = Expense, - = expense
  icon: string;
  iconBg: string; // contoh: "#E0E7FF"
  iconColor: string; // contoh: "#4F46E5"
};

const Expense = ({
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
  ],
}: {
  items?: TransactionItem[];
}) => {
  const [period, setPeriod] = React.useState<PeriodKey>("today");

  return (
    <div className="flex flex-col gap-2">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight={700}>
          Total Expense
        </Typography>
        <PeriodDropdown value={period} onChange={setPeriod} />
      </Box>
      <div className="bg-white rounded-lg shadow-md px-2">
        <TransactionList items={items} />
      </div>
    </div>
  );
};

export default Expense;
