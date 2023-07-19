import Draggable from 'vuedraggable';
// import IconMdiPlus from '~icons/mdi/plus';
// import IconMdiMinus from '~icons/mdi/minus';
// import IconMdiCursorMove from '~icons/mdi/cursor-move';
// import { useBoolean } from '@/hooks';
import HoveHandle from './HoveHandle.vue';

const DisplayType = [
  {
    value: 'system',
    label: '对比系统',
  },
  {
    value: 'time',
    label: '对比时间',
  },
];
const rules = {
  templateName: {
    required: true,
    message: '请输入场景名称',
  },
  templateTime: {
    required: true,
    message: '请选择时间',
  },
};

const RenderItem = defineComponent({
  props: {
    element: Object,
  },
  setup(props) {
    const list = [
      {
        id: nanoid(),
        name: nanoid(),
      },
      {
        id: nanoid(),
        name: nanoid(),
      },
    ];
    const renderDefault = () => (
      <div class="p-3 border-1 border-[var(--n-border-color)]">
        <n-form-item label="系统" required size="small">
          <n-select></n-select>
        </n-form-item>
        <n-form-item
          required
          size="small"
          v-slots={{
            label: () => (
              <>
                <span>IP地址{props.element!.name}</span>
                <n-button text type="primary">
                  清空
                  {/* <icon-local-clear></icon-local-clear> */}
                </n-button>
              </>
            ),
          }}
        >
          <n-select></n-select>
        </n-form-item>
        <n-grid cols={2} x-gap={16}>
          <n-gi span={1} class="mb-6px">
            指标
          </n-gi>
          <n-gi span={1} class="mb-6px">
            图表
          </n-gi>
        </n-grid>
        <Draggable
          list={unref(list)}
          item-key="id"
          v-slots={{
            item: () => (
              <n-grid cols={2} x-gap={16}>
                <n-form-item-gi span={1} class="mb-2" size="small" show-label={false} show-feedback={false}>
                  <n-select></n-select>
                </n-form-item-gi>
                <n-form-item-gi span={1} class="mb-2" size="small" show-label={false} show-feedback={false}>
                  <n-select></n-select>
                </n-form-item-gi>
              </n-grid>
            ),
          }}
        />
      </div>
    );
    // const renderDefault = () => (
    //   <div class="absolute -top-7 right-0 flex gap-1">
    //     <icon-hove class="w-7 h-7" tooltipContent="添加">
    //       <IconMdiPlus class="text-2xl" />
    //     </icon-hove>
    //     <icon-hove class="w-7 h-7" tooltipContent="删除">
    //       <IconMdiMinus class="text-2xl" />
    //     </icon-hove>
    //     <icon-hove class="w-7 h-7 handle" tooltipContent="移动">
    //       <IconMdiCursorMove class="text-2xl" />
    //     </icon-hove>
    //   </div>
    // );
    // const { bool: isHover, setFalse, setTrue } = useBoolean(false);
    return () => (
      <HoveHandle
        v-slots={{
          default: () => renderDefault(),
        }}
      />
      // <div class="relative" onMouseenter={setTrue} onMouseleave={setFalse}>
      //   {renderTrigger()}
      //   {unref(isHover) && renderDefault()}
      // </div>
    );
  },
});
const createTemplateData = () => ({
  key: nanoid(),
  system: '',
  systemName: '',
  ips: [],
  ipIdList: [],
  dataList: [],
});
const myArray = ref([
  {
    id: nanoid(),
    name: nanoid(),
  },
  {
    id: nanoid(),
    name: nanoid(),
  },
]);
export const Test = defineComponent({
  setup() {
    const model = ref({
      displayType: 'system',
      templateName: '',
      templateTime: '',
      timeType: '',
      granularity: '',
      templateData: [createTemplateData(), createTemplateData()],
    });
    return () => (
      <n-card>
        <n-form model={unref(model)} rules={rules} label-placement="top" require-mark-placement="left">
          <n-form-item label="展示类型" label-placement="left" path="displayType">
            <n-radio-group vModel={[model.value.displayType, 'value']}>
              {DisplayType.map((item) => (
                <n-radio-button key={item.value} label={item.label} value={item.value} />
              ))}
            </n-radio-group>
          </n-form-item>
          <n-form-item label="名称" path="templateName">
            <n-input vModel={[model.value.templateName, 'value']} placeholder="输入场景名称" />
          </n-form-item>
          <date-time-picker
            v-models={[
              [model.value.templateTime, 'time'],
              [model.value.timeType, 'type'],
              [model.value.granularity, 'granularity'],
            ]}
            path="templateTime"
          />
          <n-form-item label="系统选择" required>
            <Draggable
              list={unref(myArray)}
              item-key="name"
              handle=".handle"
              class="w-full grid gap-4 grid-cols-2"
              v-slots={{
                item: ({ element }) => <RenderItem element={element} />,
              }}
            />
          </n-form-item>
        </n-form>
      </n-card>
    );
  },
});
