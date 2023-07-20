import { use, ComposeOption } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart, LineChart, BarChart, MapChart } from 'echarts/charts';
import type { BarSeriesOption, LineSeriesOption, MapSeriesOption } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  VisualMapComponent,
} from 'echarts/components';

use([
  CanvasRenderer,
  PieChart,
  LineChart,
  BarChart,
  MapChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  VisualMapComponent,
]);
export type ECOption = ComposeOption<BarSeriesOption | LineSeriesOption | MapSeriesOption>;
