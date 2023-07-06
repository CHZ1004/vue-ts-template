import { defineComponent, h, PropType, Ref, ref } from 'vue';
import { NButton, useDialog } from 'naive-ui';
import IconMdiClose from '~icons/mdi/close';
import type { Scene, Group, Inspection } from '@/api';

const DialogTitle = defineComponent({
  props: {
    destroy: Function,
    title: String,
  },
  setup(props) {
    const close = () => {
      props.destroy && props.destroy();
    };
    return () => (
      <div class="w-full h-11 px-5 flex items-center justify-between border-b border-gray-200">
        <h3 class="text-base font-600">{props.title || '标题名称'}</h3>
        <IconMdiClose class="text-#555F69 cursor-pointer" onClick={close} />
      </div>
    );
  },
});

const DialogAction = defineComponent({
  props: {
    destroy: Function,
    confirm: Function,
  },
  setup(props) {
    const loading = ref(false);
    const destroy = () => {
      props.destroy && props.destroy();
    };
    const confirm = async () => {
      try {
        if (props.confirm) {
          loading.value = true;
          await props.confirm();
        }
        destroy();
      } finally {
        loading.value = false;
      }
    };
    return () => (
      <div class="p-4">
        <NButton class="mr-5 px-7" onClick={destroy}>
          取消
        </NButton>
        <NButton type="primary" class="px-7" loading={loading.value} onClick={confirm}>
          确定
        </NButton>
      </div>
    );
  },
});

const moveContent = defineComponent({
  props: {
    options: {
      type: Array as PropType<Group[]>,
      default: () => [],
    },
    groupId: {
      type: String,
      default: '',
    },
  },
  emits: ['update:groupId'],
  setup(props, { emit }) {
    const value = ref(props.groupId);
    return () => (
      <div class="px-4 pt-2">
        <n-select
          value={value.value}
          placeholder="选择所属分组"
          label-field="groupName"
          value-field="groupId"
          options={props.options}
          onUpdateValue={(id: string) => {
            value.value = id;
            emit('update:groupId', value.value);
          }}
        />
      </div>
    );
  },
});
export default function useMoveDialog({
  options,
  success,
}: {
  options: Ref<Group[]>;
  success: (data: any) => Promise<void>;
}) {
  const dialog = useDialog();
  const open = (data: Scene | Inspection) => {
    const updata = (id: string) => {
      data.groupId = id;
    };
    const { destroy } = dialog.create({
      showIcon: false,
      closable: false,
      maskClosable: false,
      autoFocus: false,
      style: { width: '500px' },
      title: () => h(DialogTitle, { destroy, title: '分组移动' }),
      content: () => h(moveContent, { options: options.value, groupId: data.groupId, 'onUpdate:groupId': updata }),
      action: () => h(DialogAction, { destroy, confirm: async () => success(data) }),
    });
  };
  return {
    open,
  };
}
