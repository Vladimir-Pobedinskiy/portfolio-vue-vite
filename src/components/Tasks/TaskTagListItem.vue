<script setup lang="ts">
import type { ITag } from '@/interfaces/tasks'

const props = withDefaults(
	defineProps<{
		tag: ITag
		isPreview?: boolean
	}>(),
	{
		isPreview: false,
	}
)
const emit = defineEmits<{
	(e: 'handleSelectedTag', value: ITag): void
}>()

const handleSelectedTag = () => {
	emit('handleSelectedTag', props.tag)
}
</script>

<template>
	<div
		class="task-tag-list-item"
		:class="{ selected: tag.selected && !isPreview, isPreview: isPreview }"
		@click="handleSelectedTag"
	>
		{{ tag.title }}
	</div>
</template>

<style lang="scss">
@use '@/assets/scss/general/variables';

.task-tag-list-item {
	margin-right: 10px;
	padding: 8px 0;
	width: 33.333%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: variables.$color-white;
	color: variables.$color-black;
	border: 1px solid rgb(227, 221, 221);
	border-radius: 22px;
	user-select: none;
	cursor: pointer;
	transition:
		background-color 0.2s ease,
		color 0.2s ease,
		border-color 0.2s ease;

	@media (min-width: variables.$desktop) {
		transition: border-color 0.3s ease;

		&:hover {
			border-color: variables.$color-violet;
			transition: border-color 0.3s ease;
		}
	}

	&.selected {
		background-color: variables.$color-violet;
		border-color: variables.$color-violet;
		color: variables.$color-white;
		transition:
			background-color 0.3s ease,
			color 0.2s ease,
			border-color 0.3s ease;
	}

	&.isPreview {
		padding: 0;
		width: fit-content;
		border: none;
		cursor: default;

		/* stylelint-disable */
		&:before {
			content: '#';
		}
	}

	&:last-child {
		margin-right: 0;
	}
}
</style>
