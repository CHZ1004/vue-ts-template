// import { ECOption } from '@/lib/echarts';

/** 排名表格 */
export const columns = [
  {
    title: '排名',
    dataIndex: 'index',
    key: 'index',
  },
  {
    title: '省份',
    dataIndex: 'province',
    key: 'province',
  },
  {
    title: '规模',
    dataIndex: 'stock',
    key: 'stock',
  },
];

export const handleProvinceNames = ['北京', '上海', '重庆', '天津'];
/** 图表名称 */
export const ChartTitles = ['外部主体评级', '内部主体评级', '债券中债隐含评级', '期限分布', '财政层级分布'];
/** x轴映射 */
export const XMap: Record<string, string> = {
  AA: 'AA',
  AA2: 'AA(2)',
  AAA: 'AAA',
  NotRated: '未评级',
  AAUnder: 'AA以下',
  AAJ: 'AA++',
  Interior9: '9',
  Interior8: '8',
  Interior7: '7',
  Interior6: '6',
  Interior5: '5',
  Interior4: '4',
  Interior3: '3',
  Interior2: '2',
  Interior1: '1',
  '1': '1年及以内',
  '1_3': '1-3年',
  '3_5': '3-5年',
  '5_7': '5-7年',
  '7_10': '7-10年',
  '10': '10年以上',
  province_zone: '省(开发区)',
  province: '省',
  cities: '地市',
  cities_zone: '地市(开发区)',
  district: '区县',
  nationalNewDistrict: '国家新区',
  district_zone: '区县(开发区)',
  empty: '空白',
};
/** 创建图表的option */
export const createChartOption = (text: string) => {
  return {
    title: {
      text,
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow',
      },
    },
    grid: {
      top: '24%',
      left: '3%',
      right: '3%',
      bottom: '3%',
      containLabel: true,
    },
    xAxis: [
      {
        type: 'category',
        data: [] as string[],
        axisTick: {
          alignWithLabel: true,
        },
      },
    ],
    yAxis: [
      {
        type: 'value',
      },
    ],
    series: [
      {
        // name: '规模',
        type: 'bar',
        barWidth: '60%',
        data: [] as string[],
      },
    ],
  };
};
