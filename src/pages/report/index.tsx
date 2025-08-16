import * as React from "react";
// import TransactionDetailsDrawer from "./components/ReportDetail";
import EChart from "@/components/Echart";
import { moneyOverviewOption } from "@/utils/constant";
import { Box, Typography } from "@mui/material";
import PeriodDropdown, { type PeriodKey } from "@/components/PeriodDropdown";

// type TransactionItem = {
//   id: string;
//   title: string;
//   category: string;
//   date: string;
//   amount: number;
//   icon: string;
//   iconBg: string;
//   iconColor: string;
// };

const Transaction = () => {
  // const [open, setOpen] = React.useState(false);
  const [period, setPeriod] = React.useState<PeriodKey>("today");
  // const [selected, setSelected] = React.useState<TransactionItem | null>(null);

  // const handleItemClick = (item: TransactionItem) => {
  //   setSelected(item);
  //   setOpen(true);
  // };

  return (
    <div className=" p-4 flex flex-col gap-4 overflow-y-auto">
      <h1 className="text-center font-bold  text-xl text-primary-600">
        Report
      </h1>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1" fontWeight={700}>
          Semua Transaksi
        </Typography>
        <PeriodDropdown value={period} onChange={setPeriod} />
      </Box>
      <div className="bg-white p-4 rounded-lg flex flex-col">
        <span className="text-gray-500 text-xs">Ringkasan Uang </span>
        <span className="text-black mb-2">Rp 12.000.000.- </span>
        <EChart option={moneyOverviewOption} height={300} renderer="svg" />
      </div>
      {/* <TransactionDetailsDrawer
        open={open}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        item={selected}
      /> */}
    </div>
  );
};

export default Transaction;
