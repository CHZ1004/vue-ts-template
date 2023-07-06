import { PropType, computed, defineComponent, ref } from 'vue';
import { debounce } from 'lodash-es';
import IconMdiChevronRight from '~icons/mdi/chevron-right';
import IconMdiSquareEditOutline from '~icons/mdi/square-edit-outline';
import IconMdiPlus from '~icons/mdi/plus';
import type { Group } from '@/api';

export const GroupIcon = defineComponent({
  name: 'GroupsIcon',
  setup(_, { slots }) {
    const clasess = 'w-6 h-6 flex-center m-1 hover:bg-primary text-icon-color hover:text-white cursor-pointer rounded';
    return () => <div class={clasess}>{slots.default && slots.default()}</div>;
  },
});

export const GroupSearch = defineComponent({
  name: 'GroupSearch',
  emits: ['shrink', 'search', 'add'],
  setup(_, { emit }) {
    const searchValue = ref('');
    const searchDebounce = debounce((value: string) => {
      emit('search', value);
    }, 500);
    const searchInput = (value: string) => {
      searchValue.value = value;
      searchDebounce(value);
    };
    const addChange = (value: string) => {
      emit('add', { groupName: value });
    };
    const render = ({ show }: { show: () => void }) => (
      <div class="flex-y-center -mx-3">
        <GroupIcon>
          <IconMdiChevronRight class="text-2xl" onClick={() => emit('shrink')} />
        </GroupIcon>
        <n-input value={searchValue.value} placeholder="输入搜索内容" onInput={searchInput} />
        <GroupIcon>
          <IconMdiPlus class="text-2xl" onClick={show} />
        </GroupIcon>
      </div>
    );
    return () => <auto-input v-slots={{ default: render }} onChange={addChange} />;
  },
});

export const GroupItem = defineComponent({
  name: 'GroupItem',
  props: {
    value: String,
    groupData: {
      type: Object as PropType<Group>,
    },
  },
  emits: ['update:value', 'update', 'delete'],
  setup(props, { emit }) {
    const clasess = computed(() => {
      const baseClass = 'flex-y-center justify-between h-10 px-3 rounded cursor-pointer hover:text-primary';
      const hoverClass = 'bg-blue-100 text-primary';
      return (id: string) => {
        return props.value === id ? `${baseClass} ${hoverClass}` : baseClass;
      };
    });
    const change = () => {
      emit('update:value', props.groupData?.groupId || '');
    };
    const render = ({ show }: { show: () => void }) => {
      const renderIcon = () => <IconMdiSquareEditOutline class="text-base" />;
      const renderTrigger = () => (
        <n-button
          v-slots={{ icon: renderIcon }}
          strong
          secondary
          circle
          type="primary"
          size="small"
          class="mr-1"
          onClick={show}
        />
      );
      return (
        <>
          <n-ellipsis>{props.groupData?.groupName || ''}</n-ellipsis>
          <span v-show="!showOper" class="flex-shrink-0 pl-2">
            {props.groupData?.count || 0}
          </span>
          <div v-show="showOper" class="flex-shrink-0 flex">
            <n-button
              v-slots={{ icon: renderIcon }}
              strong
              secondary
              circle
              type="primary"
              size="small"
              class="mr-1"
              onClickStop={show}
            />
            <n-popconfirm
              v-slots={{ trigger: renderTrigger }}
              onPositiveClick={() => emit('delete', props.groupData?.groupId || '')}
            >
              确定删除【{props.groupData?.groupName || ''}】吗?
            </n-popconfirm>
          </div>
        </>
      );
    };
    return () => (
      <div class={clasess.value(props.groupData?.groupId || '')} onClick={change}>
        <auto-input v-slots={{ default: render }} />
      </div>
    );
  },
});

export const GroupList = defineComponent({
  name: 'GroupList',
  props: {
    value: String,
    listData: {
      type: Array as PropType<Group[]>,
    },
  },
  emits: ['update', 'delete', 'update:value'],
  setup() {
    return () => <div></div>;
  },
});
