<script setup lang="ts">
import { ref } from 'vue'
import ModalTags from '@/components/Modals/ModalTags.vue'
import ModalPriority from '@/components/Modals/ModalPriority.vue'
import TaskTagList from '@/components/Tasks/TaskTagList.vue'
import UIStarRating from '@/components/UI/UIStarRating.vue'
import type { ITag, ITask } from '@/interfaces/tasks'
import { useTasksStore } from '@/stores/storeTasks'
import IconClose from '@/assets/icons/icon-close.svg'
import IconEdit from '@/assets/icons/icon-edit.svg'

const props = defineProps<{
	task: ITask
	currentIndex: number
}>()

const emit = defineEmits<{
	(e: 'deleteCurrentTask', value: number): void
}>()

const inputHiddenFlag = ref<boolean>(true)
const inputValue = ref<string>('')

const storeTasks = useTasksStore()
const changeTaskStore = (currentIndex: number, inputValue: string) => storeTasks.changeTask(currentIndex, inputValue)
const changePriorityStore = (currentIndex: number, priority: number) =>
	storeTasks.changePriority(currentIndex, priority)
const changeTagsStore = (currentIndex: number, selectedTags: ITag[]) =>
	storeTasks.changeTags(currentIndex, selectedTags)

const deleteCurrentTask = (index: number) => {
	emit('deleteCurrentTask', index)
}
const openEditInput = () => {
	inputHiddenFlag.value = false
	inputValue.value = props.task.title
}
const editCurrentTask = () => {
	if (inputValue.value.trim().length) {
		changeTaskStore(props.currentIndex, inputValue.value.trim())
	}
}
const editTaskPriority = (priority: number) => {
	changePriorityStore(props.currentIndex, priority)
}
const editSelectedTags = (selectedTags: ITag[]) => {
	changeTagsStore(props.currentIndex, selectedTags)
}
</script>

<template>
	<div class="task-list-item">
		<div class="task-list-item__header">
			<div class="task-list-item__title-wrapper">
				<span class="task-list-item__title p1">{{ task.title }}</span>
				<button
					class="task-list-item__title-edit-btn"
					type="button"
					aria-label="Открыть редактирование задачи"
					@click="openEditInput"
				>
					<IconEdit class="icon-edit" />
				</button>
			</div>
			<div class="task-list-item__input-wrapper" :class="{ 'visually-hidden': inputHiddenFlag }">
				<input v-model="inputValue" class="task-list-item__input p3" type="text" name="task-name" />
				<button
					class="task-list-item__btn-close-input"
					type="button"
					@click="(editCurrentTask(), (inputHiddenFlag = true))"
				>
					{{ !inputValue.length ? 'Закрыть' : 'Сохранить' }}
				</button>
			</div>

			<button
				class="task-list-item__remove-btn"
				type="button"
				aria-label="Закрыть задачу"
				@click="deleteCurrentTask(currentIndex)"
			>
				<IconClose class="task-list-item__remove-icon" />
			</button>
		</div>

		<div class="task-list-item__priority-wrapper">
			<UIStarRating
				v-if="task.priority && task.priority > 0"
				v-model:rating="task.priority"
				:read-only="true"
				:size="18"
				class="task-list-item__priority"
			/>

			<ModalPriority :current-index="currentIndex" @editTaskPriority="editTaskPriority" />
		</div>

		<div class="task-list-item__footer">
			<div class="tag-list-wrapper">
				<TaskTagList v-if="task.tags && task.tags.length" :tags="task.tags" isPreview />
				<ModalTags :current-tags="task.tags" :current-index="currentIndex" @editSelectedTags="editSelectedTags" />
			</div>
			<span v-if="task.date" class="task-list-item__date p5">{{ task.date }}</span>
		</div>
	</div>
</template>

<style lang="scss">
@use '@/assets/scss/general/variables';

.task-list-item {
	margin-top: 20px;
	padding: 12px;
	width: 100%;
	border-radius: 16px;
	background-color: variables.$color-white;
	box-shadow: 0 30px 30px rgba(0, 0, 0, 4%);

	&:first-child {
		margin-top: 0;
	}

	@media (min-width: variables.$mobile) {
		padding: 20px;
	}

	@media (min-width: variables.$desktop) {
		transition: box-shadow 0.25s ease;

		&:hover {
			box-shadow: 0 30px 30px rgba(0, 0, 0, 6%);
			transition: box-shadow 0.25s ease;
		}
	}

	&__header {
		position: relative;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&__title-wrapper {
		display: flex;
		align-items: center;
		flex: 1 1 65%;
		overflow: hidden;
		z-index: 1;
	}

	&__title {
		text-align: left;
		overflow: hidden;
	}

	&__title-edit-btn {
		margin-left: 20px;
		width: 24px;
		height: 24px;
	}

	&__input-wrapper {
		width: 80%;
		position: absolute;
		left: 0;
		top: 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: variables.$color-white;
		z-index: 2;
	}

	&__input {
		flex: 1 1 80%;
		padding: 8px;
		border: 1px solid rgb(227, 221, 221);
		border-radius: 12px;
	}

	&__btn-close-input {
		margin-left: 10px;
		flex: 1 1 15%;
	}

	&__remove-btn {
		margin-left: 10px;
		width: 32px;
		height: 32px;

		@media (max-width: variables.$mobile) {
			transform: translateY(150%);
		}
	}

	&__priority-wrapper {
		margin-top: 10px;
		display: flex;
		align-items: center;
	}

	&__footer {
		margin-top: 10px;
		text-align: left;
	}

	.tag-list-wrapper {
		margin: 12px 0;
		width: 100%;
		max-width: 290px;
		display: flex;
		align-items: center;
		flex: 1 1 90%;
		z-index: 1;
	}
}
</style>
