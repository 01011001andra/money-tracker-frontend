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
  changePct: number; // negatif = turun
  progress?: number; // 0..100
  progressLabel?: string; // mis. "of target" / "of budget"
  icon: string;
  iconBg: string; // hex / rgb / tailwind var -> dipakai ke sx.bgcolor
  iconColor: string;
};

function StatCard({ title, amount, progress, progressLabel }: StatProps) {
  return (
    <Card elevation={6} className="h-full shadow-lg rounded-lg">
      <CardContent className="p-3">
        <Stack spacing={0.5}>
          <Typography
            variant="caption"
            color="text.secondary"
            className="text-xs"
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
  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between">
        <Typography variant="subtitle1" fontWeight={700}>
          Spending Overview
        </Typography>
      </Box>

      {/* Cards */}
      <div className="grid grid-cols-2 gap-2">
        <StatCard
          title="Monthly income"
          amount={23000000}
          changePct={12.4}
          progress={78}
          progressLabel="of target"
          icon="solar:wallet-money-bold-duotone"
          iconBg="#EDE9FE" // ungu soft
          iconColor="#7C3AED"
        />
        <StatCard
          title="Monthly expense"
          amount={12500000}
          changePct={-5.2}
          progress={62}
          progressLabel="of budget used"
          icon="solar:cart-3-bold-duotone"
          iconBg="#FEE2E2" // merah soft
          iconColor="#E11D48"
        />
      </div>
    </div>
  );
}
