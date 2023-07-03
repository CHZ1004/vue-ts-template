import { useRequest } from 'alova';
import { NButton } from 'naive-ui';
import { defineComponent, ref, watch } from 'vue';
import IconMdiClose from '~icons/mdi/close';
import IconMdiSync from '~icons/mdi/sync';
import { Scene, getSceneGroups, getScenes, setEnableScene } from '@/api';
import { successMessage } from '@/utils';

export const DialogTitle = defineComponent({
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

export const DialogAction = defineComponent({
  props: {
    destroy: Function,
  },
  setup(props) {
    return () => (
      <div class="p-4">
        <NButton class="mr-5 px-7" onClick={() => props.destroy && props.destroy()}>
          取消
        </NButton>
        <NButton type="primary" class="px-7">
          确定
        </NButton>
      </div>
    );
  },
});

export const DialogContent = defineComponent({
  emits: ['change'],
  setup(_, { emit }) {
    const value = ref('');
    const { data: options } = useRequest(getSceneGroups);
    const { data: scenes, send } = useRequest(() => getScenes(value.value), { initialData: [] });
    watch(
      () => value.value,
      (id: string) => {
        send(id);
      },
    );
    const switchScene = async ({ templateId, templateName }: Scene) => {
      await setEnableScene(templateId).send();
      await send(value.value);
      successMessage('修改成功');
      emit('change', templateName);
    };
    return () => (
      <div class="p-4 pb-0">
        <n-select
          value={value.value}
          label-field="groupName"
          value-field="groupId"
          size="large"
          options={options.value}
          onUpdateValue={(id: string) => {
            value.value = id;
          }}
        />
        <div class="mt-4 h-392px overflow-y-auto">
          {scenes.value.length ? (
            scenes.value.map((scene) => (
              <div class="flex items-center h-10 -mb-px px-3 border border-gray-200">
                <span>{scene.templateName}</span>
                {scene.enableStatus === '0' && (
                  <div class="flex items-center ml-auto cursor-pointer" onClick={() => switchScene(scene)}>
                    <span class="mr-2 text-icon-color">切换视图</span>
                    <IconMdiSync class="text-#0F5EF7 text-xl" />
                  </div>
                )}
              </div>
            ))
          ) : (
            <n-empty description="场景空空如也~~~" class="h-full justify-center" />
          )}
        </div>
      </div>
    );
  },
});
