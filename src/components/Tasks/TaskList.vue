<script setup lang="ts">
import TaskListItem from '@/components/Tasks/TaskListItem.vue'
import type { ITask } from '@/interfaces/tasks'

defineProps<{
	taskList: ITask[]
}>()

const emit = defineEmits<{
	(e: 'deleteCurrentTask', value: number): void
}>()

const deleteCurrentTask = (index: number) => {
	emit('deleteCurrentTask', index)
}
</script>

<template>
	<div v-auto-animate="{ duration: 300 }" class="task-list">
		<TaskListItem
			v-for="(task, index) in taskList"
			:key="index"
			:task="task"
			:current-index="index"
			@deleteCurrentTask="deleteCurrentTask(index)"
		/>
	</div>
</template>

<style lang="scss">
.task-list {
	position: relative;
	margin: 0 auto;
	width: 100%;
	max-width: 1000px;
	will-change: transform, opacity;
}
</style>
