<script setup lang="ts">
import TaskTagListItem from '@/components/Tasks/TaskTagListItem.vue'
import type { ITag } from '@/interfaces/tasks'

withDefaults(
	defineProps<{
		tags: ITag[]
		isPreview?: boolean
	}>(),
	{
		isPreview: false,
	}
)
const emit = defineEmits<{
	(e: 'handleSelectedTag', value: ITag): void
}>()

const handleSelectedTag = (tag: ITag) => {
	emit('handleSelectedTag', tag)
}
</script>

<template>
	<div class="task-tag-list" :class="{ 'not-preview': !isPreview }">
		<TaskTagListItem
			v-for="(item, i) in tags"
			:key="i"
			:tag="item"
			:is-preview="isPreview"
			@handleSelectedTag="handleSelectedTag"
		/>
	</div>
</template>

<style lang="scss">
.task-tag-list {
	display: flex;
	align-items: center;
}

.task-tag-list.not-preview {
	margin: 16px 0;
	width: 100%;
	max-width: 290px;

	@media (min-width: $desktop) {
		margin: 20px 0 16px;
	}
}
</style>
