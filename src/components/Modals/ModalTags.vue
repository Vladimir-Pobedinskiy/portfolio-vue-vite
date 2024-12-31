<script setup lang="ts">
import { ref, computed } from 'vue'
import UIModal from '@/components/UI/UIModal.vue'
import TaskTagList from '@/components/Tasks/TaskTagList.vue'
import { useTasksStore } from '@/stores/storeTasks'
import IconEdit from '@/assets/icons/icon-edit.svg'
import type { ITag } from '@/interfaces'

const props = defineProps<{
	currentTags: ITag[]
	currentIndex: number
}>()

const emit = defineEmits<{
	(e: 'editSelectedTags', value: ITag[]): void
}>()

const storeTasks = useTasksStore()
const tagsStore = computed(() => storeTasks.tags)
const taskListTagsStore = computed(() => storeTasks.tasks.find((item, index) => index === props.currentIndex))

const combinedTags = ref<ITag[]>([])

const initCombinedTags = () => {
	const generalTags = tagsStore.value
	const currentTask = taskListTagsStore.value

	if (!currentTask || !currentTask.tags) {
		combinedTags.value = generalTags.map((tag) => ({ ...tag, selected: false }))
		return
	}

	const selectedTagTitles = currentTask.tags
		.filter((selectedTag) => selectedTag.selected)
		.map((selectedTag) => selectedTag.title)

	combinedTags.value = generalTags.map((tag) => ({
		...tag,
		selected: selectedTagTitles.includes(tag.title),
	}))
}

const isOpenModalTags = ref<boolean>(false)
const handleShowModalTags = (flag: boolean) => {
	initCombinedTags()
	isOpenModalTags.value = flag
}

const savedTags = ref<ITag[]>([])
const handleSelectedTag = (tag: ITag) => {
	if (!savedTags.value.length) {
		const selectedTags = combinedTags.value.filter((item) => item.selected)
		if (selectedTags) savedTags.value = [...selectedTags]
		const selectedIndex = savedTags.value.findIndex((item) => item.title === tag.title)
		if (selectedIndex !== -1) {
			savedTags.value.splice(selectedIndex, 1)
		} else {
			savedTags.value.push({
				title: tag.title,
				selected: true,
			})
		}
	} else {
		const selectedIndex = savedTags.value.findIndex((item) => item.title === tag.title)
		if (selectedIndex !== -1) {
			savedTags.value.splice(selectedIndex, 1)
		} else {
			savedTags.value.push({
				title: tag.title,
				selected: true,
			})
		}
	}

	const selectedTag = combinedTags.value.find((item) => item.title === tag.title)
	if (selectedTag && selectedTag.selected) {
		selectedTag.selected = false
	} else {
		if (selectedTag) selectedTag.selected = true
	}
}

const editSelectedTags = () => {
	emit('editSelectedTags', savedTags.value)
	isOpenModalTags.value = false
}
</script>

<template>
	<div class="modal-tags">
		<UIModal
			v-model:model-value="isOpenModalTags"
			modal-id="modal-tags"
			class="modal-tags"
			:click-to-close="true"
			:esc-to-close="true"
			:hide-overlay="false"
			@update:model-value="handleShowModalTags"
		>
			<template #header>
				<span class="modal-tags-title s2">Выберите теги</span>
			</template>
			<template #body>
				<TaskTagList :tags="combinedTags" @handle-selected-tag="handleSelectedTag" />
				<button class="modal-tags-btn-save btn btn-small" type="button" @click="editSelectedTags">Сохранить</button>
			</template>
		</UIModal>

		<button
			:class="currentTags.length ? 'modal-tags-btn-open' : 'btn btn-small'"
			type="button"
			aria-label="Открыть модальное окно"
			@click="handleShowModalTags(true)"
		>
			<template v-if="currentTags.length">
				<IconEdit class="icon-edit" />
			</template>
			<template v-else>
				<span class="p3">Добавить теги</span>
			</template>
		</button>
	</div>
</template>

<style lang="scss">
.modal-tags-btn-open {
	margin-left: 20px;
	width: 24px;
	height: 24px;
	outline: transparent;
}

.modal-tags-btn-open-icon {
	width: 23px;
	height: 23px;
}

.modal-tags-btn-save.btn.btn-small {
	margin-top: 24px;
	width: 100%;
}
</style>
