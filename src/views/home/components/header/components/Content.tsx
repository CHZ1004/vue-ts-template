import { defineComponent, ref, watch } from 'vue';
import { useRequest } from 'alova';
import IconMdiSync from '~icons/mdi/sync';
import { getSceneGroups, getScenes, setEnableScene } from '@/api';
import type { Scene } from '@/api';
import { successMessage } from '@/utils';

export const Content = defineComponent({
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
      await setEnableScene(templateId as string).send();
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
                    <IconMdiSync class="text-primary text-xl" />
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
