import React from "react";
import type { PeriodKey } from "../../../components/PeriodDropdown";
import { Box, Typography } from "@mui/material";
import PeriodDropdown from "../../../components/PeriodDropdown";
import TransactionList from "./TransactionList";
import type { Transaction } from "@/types/transaction";

const Income = ({
  handleItemClick,
}: {
  handleItemClick: (item: Transaction) => void;
}) => {
  const [period, setPeriod] = React.useState<PeriodKey>("today");

  return (
    <div className="flex flex-col gap-2">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight={700}>
          Total income
        </Typography>
        <PeriodDropdown value={period} onChange={setPeriod} />
      </Box>
      <div className="bg-white rounded-lg shadow-md px-2">
        <TransactionList onItemClick={handleItemClick} />
      </div>
    </div>
  );
};

export default Income;
