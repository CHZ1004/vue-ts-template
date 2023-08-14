import VChart from 'vue-echarts';
import { use, ComposeOption } from 'echarts/core';
import { CanvasRenderer } from 'echarts/renderers';
import { PieChart, LineChart, BarChart } from 'echarts/charts';
import type { BarSeriesOption, LineSeriesOption } from 'echarts/charts';
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  DataZoomComponent,
} from 'echarts/components';
import type { App } from 'vue';

export function setupEcharts(app: App) {
  use([
    CanvasRenderer,
    PieChart,
    LineChart,
    BarChart,
    TitleComponent,
    TooltipComponent,
    LegendComponent,
    GridComponent,
    DataZoomComponent,
  ]);
  app.component('VChart', VChart);
}
export type ECOption = ComposeOption<BarSeriesOption | LineSeriesOption>;
