<script setup lang="ts">
import { ref, computed } from 'vue'
import UIModal from '@/components/UI/UIModal.vue'
import UIStarRating from '@/components/UI/UIStarRating.vue'
import { useTasksStore } from '@/stores/storeTasks'
import IconEdit from '@/assets/icons/icon-edit.svg'

const props = defineProps<{
	currentIndex: number
}>()

const emit = defineEmits<{
	(e: 'editTaskPriority', value: number): void
}>()

const storeTasks = useTasksStore()
const currentTaskStore = computed(() => storeTasks.tasks.find((item, index) => index === props.currentIndex))

const currentPriority = ref<number>(0)
const isOpenModalPriority = ref<boolean>(false)

const openEditPriorityModal = (flag: boolean) => {
	const currentTask = currentTaskStore.value
	if (currentTask) currentPriority.value = currentTask.priority
	isOpenModalPriority.value = flag
}

const editTaskPriority = () => {
	emit('editTaskPriority', currentPriority.value)
	isOpenModalPriority.value = false
}
</script>

<template>
	<div class="modal-priority-wrapper">
		<UIModal
			v-model:model-value="isOpenModalPriority"
			modal-id="modal-priority"
			class="modal-priority"
			:click-to-close="true"
			:esc-to-close="true"
			:hide-overlay="false"
			@update:model-value="openEditPriorityModal"
		>
			<template #header>
				<span class="modal-priority__title s2">Измените приоритет</span>
			</template>
			<template #body>
				<UIStarRating
					v-model:rating="currentPriority"
					:increment="1"
					:read-only="false"
					:clearable="true"
					class="modal-priority__task-priority"
				/>

				<UIButton
					as="button"
					class="modal-priority__btn-save"
					variant="primary"
					size="small"
					:full="true"
					type="button"
					label="Сохранить"
					@click="editTaskPriority"
				/>
			</template>
		</UIModal>

		<button
			:class="currentTaskStore && currentTaskStore.priority ? 'modal-priority__priority-edit-btn' : 'btn-primary small'"
			type="button"
			aria-label="Открыть редактирование приоритета"
			@click="openEditPriorityModal(true)"
		>
			<template v-if="currentTaskStore && currentTaskStore.priority">
				<IconEdit class="icon-edit" />
			</template>
			<template v-else>
				<span class="p3">Добавить приоритет</span>
			</template>
		</button>
	</div>
</template>

<style lang="scss">
.modal-priority {
	&__title {
		display: block;
		margin-bottom: 24px;
	}

	&__task-priority {
		margin-bottom: 24px;
	}

	&__btn-save {
		margin-top: 24px;
	}

	&__priority-edit-btn {
		margin-left: 18px;
		width: 24px;
		height: 24px;
		display: flex;
		align-items: flex-start;
		justify-content: center;
	}
}
</style>
