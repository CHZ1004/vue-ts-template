<template>
  <n-grid :cols="24" :x-gap="16">
    <n-form-item-gi :span="18" label="时间" :path="path">
      <n-popover v-model:show="show" raw trigger="click" :show-arrow="false" placement="bottom">
        <template #trigger>
          <n-input v-model:value="templateTime" readonly placeholder="选择时间">
            <template #prefix>
              <icon-mdi:clock-time-three-outline class="text-icon-color" />
            </template>
          </n-input>
        </template>
        <n-card>
          <div class="flex">
            <n-space vertical class="p-3 border-r border-[var(--n-border-color)]">
              <n-button v-for="item in DynamicTimeMap" :key="item.value" text @click="dynamic(item)">
                {{ item.label }}
              </n-button>
            </n-space>
            <n-date-picker
              v-model:value="dateTime"
              panel
              clearable
              placement="bottom"
              type="datetimerange"
              :default-time="defaultTime"
              @confirm="confirm"
            />
          </div>
        </n-card>
      </n-popover>
    </n-form-item-gi>
    <n-form-item-gi :span="6" label="颗粒度">
      <n-select :value="granularity || null" disabled placeholder="颗粒度" :options="GranularityOptions" />
    </n-form-item-gi>
  </n-grid>
</template>
<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import dayjs from 'dayjs';

const defaultTime = ['00:00:00', '23:59:59'];
const GranularityOptions = [
  {
    label: '1秒',
    value: '1s',
  },
  {
    label: '15秒',
    value: '15s',
  },
  {
    label: '1分钟',
    value: '1m',
  },
  {
    label: '30分钟',
    value: '30m',
  },
  {
    label: '1天',
    value: '1d',
  },
  {
    label: '1周',
    value: '1w',
  },
  {
    label: '一个月',
    value: '1M',
  },
];
const DynamicTimeMap = [
  {
    label: '最近五分钟',
    value: 'now-5mTOnow',
    granularity: '15s',
  },
  {
    label: '最近十五分钟',
    value: 'now-15mTOnow',
    granularity: '1m',
  },
  {
    label: '最近半个小时',
    value: 'now-30mTOnow',
    granularity: '1m',
  },
  {
    label: '最近一小时',
    value: 'now-1hTOnow',
    granularity: '1m',
  },
  {
    label: '最近一天',
    value: 'now-1dTOnow',
    granularity: '30m',
  },
  {
    label: '最近十五天',
    value: 'now-15dTOnow',
    granularity: '30m',
  },
  {
    label: '最近一个月',
    value: 'now-1MTOnow',
    granularity: '1d',
  },
  {
    label: '最近三个月',
    value: 'now-3MTOnow',
    granularity: '1d',
  },
];
const calcGranularity = ([startTime, endTime]: [number, number]) => {
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const gap = endTime - startTime;
  if (gap <= minute) {
    return '1s';
  }
  if (gap <= minute * 10) {
    return '15s';
  }
  if (gap <= hour) {
    return '1m';
  }
  if (gap <= day) {
    return '30m';
  }
  if (gap <= day * 31) {
    return '1d';
  }
  if (gap <= day * 365) {
    return '1w';
  }
  return '1M';
};
const formatTime = (times: [number, number]) => {
  const format = 'YYYY-MM-DD HH:mm:ss.SSS';
  return times.map((time) => dayjs(time).format(format)).join('TO');
};
enum TimeType {
  fixation = 'fixation',
  dynamic = 'dynamic',
}
interface Props {
  /** 提交时间 */
  time: string;
  /** 颗粒度 */
  granularity: string;
  /** 提交时间类型 */
  type: typeof TimeType | string;
  /** 校验 */
  path?: string;
}
const props = defineProps<Props>();
const emit = defineEmits(['update:time', 'update:granularity', 'update:type']);
watch(
  () => props.time,
  (newValue, oldValue) => {
    if (!dateTime.value && !oldValue && props.type === TimeType.fixation) {
      dateTime.value = newValue.split('TO').map((time) => dayjs(time).valueOf());
    }
  },
);
const templateTime = computed({
  get() {
    if (props.type === TimeType.fixation) {
      return props.time.replace(/(.000)|TO/g, ($1) => ($1 === 'TO' ? ' TO ' : ''));
    }
    if (props.type === TimeType.dynamic) {
      const data = DynamicTimeMap.filter((item) => item.value === props.time)[0];
      return data.label;
    }
    return '';
  },
  set(value) {
    emit('update:time', value);
  },
});
const dateTime = ref();
const show = ref(false);
const confirm = (date: [number, number]) => {
  if (date) {
    emit('update:type', TimeType.fixation);
    emit('update:granularity', calcGranularity(date));
    templateTime.value = formatTime(date);
  }
  show.value = false;
};
const dynamic = (data: Record<string, string>) => {
  dateTime.value = undefined;
  emit('update:type', TimeType.dynamic);
  emit('update:granularity', data.granularity);
  templateTime.value = data.value;
  show.value = false;
};
</script>
<style scoped>
:deep(.n-card__content) {
  --n-padding-bottom: 0px;
  --n-padding-left: 0px;
}
</style>
