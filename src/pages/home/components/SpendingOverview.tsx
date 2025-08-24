import SkeletonLoader from "@/components/SkeletonLoader";
import useRouter from "@/hooks/apps/useRouter";
import { useGetDashboard } from "@/hooks/bff/useGetDashboard";
import {
  Box,
  Card,
  CardContent,
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
            className="text-base"
          >
            {formatIDR(amount)}
          </Typography>

          {typeof progress === "number" && (
            <Box mt={1}>
              <LinearProgress
                variant="determinate"
                value={progress}
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
          Spending Overview
        </Typography>
      </Box>

      {isLoading ? (
        <div className="flex gap-2">
          <SkeletonLoader type="banner" />
          <SkeletonLoader type="banner" />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-2">
          {data?.data?.spendingOverview?.map((item) => {
            return (
              <div
                className="cursor-pointer"
                onClick={() => {
                  router.push("/report");
                }}
              >
                <StatCard
                  title={item.name}
                  amount={item.total}
                  progress={item.progress}
                  progressLabel={item.label}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
