<script setup lang="ts">
import { ref, computed } from 'vue'
import { getFirestore, query, collection, getDocs } from 'firebase/firestore'
import AppLoading from '@/components/App/AppLoading.vue'
import TaskList from '@/components/Tasks/TaskList.vue'
import TaskTagList from '@/components/Tasks/TaskTagList.vue'
import { useTasksStore } from '@/stores/storeTasks'
import { useVfm } from 'vue-final-modal'
import type { ITag, IBreadcrumb, IDescription } from '@/interfaces'

const vfm = useVfm()
const breadcrumbs = ref<IBreadcrumb[]>([])
const description = ref<IDescription>({
	title: null,
	descriptionList: null,
})
const textareaValue = ref<string>('')
const selectedTags = ref<ITag[]>([])

const storeTasks = useTasksStore()
const tags = computed(() => storeTasks.tags.map((tag) => tag))
const taskListStore = computed(() => storeTasks.tasks)
const changeTasksStore = (textareaValue: string, dateTask: string, selectedTags: ITag[]) =>
	storeTasks.changeTasks(textareaValue, dateTask, selectedTags)
const deleteTaskStore = (index: number) => storeTasks.deleteTask(index)
const clearTasksStore = () => storeTasks.clearTasks()

const db = getFirestore()
const isLoading = ref<boolean>(false)
const getLinks = async (): Promise<void> => {
	try {
		isLoading.value = true
		const getData = query(collection(db, 'tasks'))
		const listDocs = await getDocs(getData)
		const res = listDocs.docs.map((doc) => doc.data())
		breadcrumbs.value = [...res[0].breadcrumbs]
		description.value = { ...res[0].description }
	} catch (error: any) {
		vfm.open('ModalError')
		console.error('tasks error', error)
		throw error
	} finally {
		isLoading.value = false
	}
}
getLinks()

const dateTask = () => {
	const currentDate = new Date()
	const day = String(currentDate.getDate()).padStart(2, '0')
	const month = String(currentDate.getMonth() + 1).padStart(2, '0') // Месяцы начинаются с 0
	const year = currentDate.getFullYear()
	const hours = String(currentDate.getHours()).padStart(2, '0')
	const minutes = String(currentDate.getMinutes()).padStart(2, '0')
	const seconds = String(currentDate.getSeconds()).padStart(2, '0')

	return `${day}.${month}.${year}, ${hours}:${minutes}:${seconds}`
}

const handleSelectedTag = (tag: ITag) => {
	tag.selected ? (tag.selected = false) : (tag.selected = true)

	if (!selectedTags.value.length) {
		selectedTags.value.push({
			title: tag.title,
			selected: true,
		})
	} else {
		const selectedIndex = selectedTags.value.findIndex((item) => item.title === tag.title)
		if (selectedIndex !== -1) {
			selectedTags.value.splice(selectedIndex, 1)
		} else {
			selectedTags.value.push({
				title: tag.title,
				selected: true,
			})
		}
	}
}

const onSubmit = () => {
	if (textareaValue.value.length) {
		changeTasksStore(textareaValue.value.trim(), dateTask(), selectedTags.value)
		textareaValue.value = ''
		selectedTags.value.length = 0
		tags.value.forEach((item) => {
			if (item.selected) {
				item.selected = false
			}
		})
	}
}
</script>

<template>
	<div class="tasks-view offset-page-br">
		<template v-if="isLoading">
			<AppLoading :is-loading="isLoading" />
		</template>
		<template v-else>
			<div class="container">
				<UIBreadcrumbs :breadcrumbs="breadcrumbs" />
				<h1 class="tasks-view__title title h1">{{ description.title }}</h1>

				<ul class="description-list">
					<li class="description-item p1" v-for="(item, i) in description.descriptionList" :key="i">{{ item }}</li>
				</ul>

				<section class="tasks-view__section offset">
					<h2 class="tasks-view__title title h1">Список задач</h2>

					<div class="tasks-view__form-wrapper">
						<form name="tasks-form" action="#" method="POST" class="tasks-view__form" @submit.prevent="onSubmit">
							<textarea v-model="textareaValue" class="tasks-view__form-textarea" placeholder="Введите новую задачу" />
							<TaskTagList :tags="tags" @handle-selected-tag="handleSelectedTag" />
							<button class="tasks-view__form-btn btn" :disabled="!textareaValue.trim()" type="submit">
								Добавить новую задачу
							</button>
						</form>
					</div>

					<div class="tasks-view__content">
						<button
							class="tasks-view__clear-btn btn btn-small"
							:disabled="!taskListStore.length"
							type="button"
							@click="clearTasksStore"
						>
							Очистить задачи
						</button>

						<div v-auto-animate="{ duration: 300 }" class="tasks-view__task-list-wrapper">
							<template v-if="taskListStore.length">
								<div class="tasks-view__task-list-box">
									<TaskList :task-list="taskListStore" @deleteCurrentTask="deleteTaskStore" />
								</div>
							</template>
							<template v-else>
								<p class="h3">Список задач пуст! Введите вашу первую задачу!</p>
							</template>
						</div>
					</div>
				</section>
			</div>
		</template>
	</div>
</template>

<style lang="scss">
.tasks-view {
	height: 100%;
	background-color: $bg;

	&__section {
		text-align: center;
	}

	&__form-wrapper {
		margin-bottom: 40px;
	}

	&__form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	&__form-textarea {
		padding: 16px;
		width: 100%;
		max-width: 1000px;
		height: 150px;
		border: 1px solid rgb(227, 221, 221);
		border-radius: 12px;
	}

	&__form-btn.btn {
		width: 100%;
		max-width: 300px;
	}

	&__content {
		width: 100%;
		max-width: 1000px;
		margin: 0 auto;
	}

	&__clear-btn {
		margin: 0 0 32px auto;
		display: flex;
		justify-content: flex-end;
	}
}
</style>
