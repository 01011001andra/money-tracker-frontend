/** warna netral untuk axis/label */
const axisText = "#94a3b8"; // slate-400
const gridLine = "#e2e8f0"; // slate-200
const primary = "#7c3aed"; // ungu (primary-600)
const expense = "red"; // ungu pastel untuk expense

/** 1) Total wealth — line smooth + area gradient */
export const totalWealthOption: any = {
  tooltip: { trigger: "axis", axisPointer: { type: "line" }, confine: true },
  grid: { left: 12, right: 12, top: 14, bottom: 10, containLabel: true },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ["1–7", "8–15", "16–22", "23–30"],
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: { color: axisText },
  },
  yAxis: {
    type: "value",
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      color: axisText,
      formatter: (v: number) => (v >= 1000 ? `${v / 1000}k` : v),
    },
    splitLine: { lineStyle: { color: gridLine, type: "dashed" } },
  },
  series: [
    {
      name: "Wealth",
      type: "line",
      smooth: true,
      symbol: "circle",
      symbolSize: 6,
      sampling: "lttb",
      lineStyle: {
        width: 2.5,
        color: primary,
        shadowColor: "rgba(124,58,237,.25)",
        shadowBlur: 8,
      },
      itemStyle: { color: primary },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            { offset: 0, color: "rgba(124,58,237,.18)" },
            { offset: 1, color: "rgba(124,58,237,0)" },
          ],
        },
      },
      data: [2200, 3800, 3400, 5600], // contoh data
    },
  ],
  color: [primary],
};

/** 2) Money overview — grouped bars Income vs Expense */
export const moneyOverviewOption: any = {
  legend: {
    top: 0,
    left: "left",
    icon: "circle",
    itemWidth: 8,
    itemHeight: 8,
    textStyle: { color: axisText, fontSize: 12, fontWeight: 600 },
  },
  tooltip: { trigger: "axis", axisPointer: { type: "shadow" }, confine: true },
  grid: { left: 12, right: 12, top: 26, bottom: 12, containLabel: true },
  xAxis: {
    type: "category",
    data: ["W1", "W2", "W3", "W4"],
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: { color: axisText },
  },
  yAxis: {
    type: "value",
    axisTick: { show: false },
    axisLine: { show: false },
    axisLabel: {
      color: axisText,
      formatter: (v: number) => (v >= 1000 ? `${v / 1000}k` : v),
    },
    splitLine: { lineStyle: { color: gridLine } },
  },
  series: [
    {
      name: "Income",
      type: "bar",
      barWidth: 14,
      itemStyle: { color: primary, borderRadius: [6, 6, 0, 0] },
      data: [3200, 2100, 2600, 3800],
    },
    {
      name: "Expense",
      type: "bar",
      barWidth: 14,
      barGap: "30%",
      itemStyle: { color: expense, borderRadius: [6, 6, 0, 0] },
      data: [1800, 1400, 2000, 2200],
    },
  ],
};

export const INPUT_TEXT_SX = {
  "&:hover .MuiInputLabel-root:not(.Mui-focused):not(.Mui-disabled)": {
    color: "var(--color-primary-600)",
  },
};

export const INPUT_BG_SX = {
  bgcolor: "common.white",
  "&:hover": { bgcolor: "common.white" },
  "&.Mui-focused": { bgcolor: "common.white" },
  "&.Mui-disabled": { bgcolor: "common.white" },

  // 🔽 border default/hover/focus
  "& .MuiOutlinedInput-notchedOutline:not(.Mui-disabled)": {
    borderColor: "rgba(0,0,0,0.12)", // default
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--color-primary-500)", // hover
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "var(--color-primary-600)", // focus
    borderWidth: 2,
  },
  "&.Mui-focused.MuiInputLabel-shrink": {
    color: "var(--color-primary-600)",
  },
} as const;
