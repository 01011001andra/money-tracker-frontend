// import TransactionDetailsDrawer from "./components/ReportDetail";
import EChart from "@/components/Echart";
import RenderComponent from "@/components/RenderComponent";
import { useGetReport } from "@/hooks/bff/useGetReport";
import { Box, Typography } from "@mui/material";

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
  const { data, isLoading } = useGetReport();
  // const [open, setOpen] = React.useState(false);
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
      <RenderComponent
        isLoading={isLoading}
        dataTotal={data?.data.length}
        skeletonCount={4}
        emptyComponent="Report is not available"
        skeletonType="image"
      >
        {data?.data.map((item, index) => {
          return (
            <div className="mt-2 flex flex-col gap-2" key={index}>
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="subtitle1" fontWeight={700}>
                  {item.name}
                </Typography>
              </Box>
              <div className="space-y-3">
                {item.charts.map((chart) => {
                  return (
                    <div className="bg-white p-4 rounded-lg flex flex-col ">
                      <span className="text-gray-500 text-xs">
                        {chart.header.title}
                      </span>
                      <span className="text-black mb-2">
                        {chart.header.subTitle}
                      </span>
                      <EChart
                        option={chart.option}
                        height={300}
                        renderer="svg"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </RenderComponent>
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
