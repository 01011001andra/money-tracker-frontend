import RenderComponent from "@/components/RenderComponent";
import useRouter from "@/hooks/apps/useRouter";
import { useGetDashboard } from "@/hooks/bff/useGetDashboard";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  LinearProgress,
  Stack,
  Typography,
} from "@mui/material";

const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(n);

type StatProps = {
  title: string;
  amount: number;
  progress?: number; // 0..100
  progressLabel?: string; // mis. "of target" / "of budget"
};

function StatCard({ title, amount, progress, progressLabel }: StatProps) {
  return (
    <Card elevation={6} className="h-full shadow-lg rounded-lg">
      <CardContent className="p-3">
        <Stack spacing={0.5}>
          <Typography
            variant="caption"
            color="text.secondary"
            className="text-xs capitalize"
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            fontWeight={800}
            lineHeight={1.1}
            className="text-xs py-1"
          >
            {formatIDR(amount)}
          </Typography>

          {typeof progress === "number" && (
            <Box mt={1}>
              <LinearProgress
                variant="determinate"
                value={progress <= 100 ? progress : 100}
                sx={{
                  height: 7,
                  borderRadius: 999,
                  bgcolor: "#ede9fe",
                  "& .MuiLinearProgress-bar": {
                    borderRadius: 999,
                    bgcolor: "#7c3aed",
                  },
                }}
              />
              <Typography variant="caption" color="text.secondary">
                {progress}% {progressLabel}
              </Typography>
            </Box>
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default function SpendingOverview() {
  const { data, isLoading } = useGetDashboard();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1" fontWeight={700}>
          Target overview
        </Typography>
        {data?.data?.overview?.length && (
          <IconButton
            onClick={() => {
              router.setQuery({ sheet: "target-action" });
            }}
          >
            <Icon icon={"mdi:edit-outline"} fontSize={18} />
          </IconButton>
        )}
      </Box>

      <RenderComponent
        isLoading={isLoading}
        skeletonType="banner"
        skeletonCount={2}
        dataTotal={data?.data?.overview?.length}
        classNameWrapper="grid grid-cols-2 gap-2"
        emptyComponent={
          <div className="flex flex-col gap-1">
            <span>Overview is empty</span>
            <button
              onClick={() => {
                router.setQuery({ sheet: "target-action" });
              }}
              className="bg-primary text-white p-2 rounded-lg text-xs"
            >
              Add Target
            </button>
          </div>
        }
      >
        <div className="grid grid-cols-2 gap-2">
          {data?.data?.overview?.map((item, index) => {
            if (item.amount == 0) return;
            return (
              <div className="cursor-pointer" key={index}>
                <StatCard
                  title={item.type}
                  amount={item.amount}
                  progress={item.percentTarget || 0}
                  progressLabel={item.label}
                />
              </div>
            );
          })}
        </div>
      </RenderComponent>
    </div>
  );
}
