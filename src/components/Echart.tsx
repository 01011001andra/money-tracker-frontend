import React from "react";
import ReactEChartsCore from "echarts-for-react/lib/core";
import * as echarts from "echarts/core";
import type { ECharts, EChartsOption, SetOptionOpts } from "echarts";

// Chart types yang umum dipakai — tambah/kurangi sesuai kebutuhan
import {
  LineChart,
  BarChart,
  PieChart,
  GaugeChart,
  ScatterChart,
} from "echarts/charts";

// Komponen pendukung
import {
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  DatasetComponent,
  ToolboxComponent,
  VisualMapComponent,
} from "echarts/components";

// Renderer
import { CanvasRenderer, SVGRenderer } from "echarts/renderers";

// Registrasi (tree-shakable)
echarts.use([
  LineChart,
  BarChart,
  PieChart,
  GaugeChart,
  ScatterChart,
  GridComponent,
  TooltipComponent,
  LegendComponent,
  TitleComponent,
  DatasetComponent,
  ToolboxComponent,
  VisualMapComponent,
  CanvasRenderer,
  SVGRenderer,
]);

export type EChartProps = {
  option: EChartsOption;
  /** default: "canvas" */
  renderer?: "canvas" | "svg";
  /** contoh: "light" | "dark" | nama custom theme */
  theme?: string;
  /** style tambahan */
  style?: React.CSSProperties;
  className?: string;
  /** default: 320 */
  height?: number | string;
  /** default: "100%" */
  width?: number | string;
  /** passthrough ke setOption */
  notMerge?: SetOptionOpts["notMerge"];
  lazyUpdate?: SetOptionOpts["lazyUpdate"];
  /** dipanggil saat chart siap */
  onReady?: (chart: ECharts) => void;
  /** event echarts: { click: fn, mouseover: fn, ... } */
  onEvents?: Record<string, (params: any) => void>;
};

const EChart: React.FC<EChartProps> = ({
  option,
  renderer = "canvas",
  theme,
  style,
  className,
  height = 320,
  width = "100%",
  notMerge,
  lazyUpdate,
  onReady,
  onEvents,
}) => {
  return (
    <ReactEChartsCore
      echarts={echarts}
      option={option}
      theme={theme}
      notMerge={notMerge}
      lazyUpdate={lazyUpdate}
      onChartReady={onReady}
      onEvents={onEvents}
      opts={{ renderer }}
      className={className}
      style={{ height, width, ...style }}
    />
  );
};

export default EChart;
