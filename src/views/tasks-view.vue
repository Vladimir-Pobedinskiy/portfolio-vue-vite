<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { getFirestore, query, collection, getDocs } from 'firebase/firestore'
import { v4 as uuidv4 } from 'uuid'
import AppLoading from '@/components/App/AppLoading.vue'
import DescriptionUnit from '@/components/DescriptionUnit.vue'
import TaskList from '@/components/Tasks/TaskList.vue'
import TaskTagList from '@/components/Tasks/TaskTagList.vue'
import { useTasksStore } from '@/stores/storeTasks'
import { useVfm } from 'vue-final-modal'
import type { IBreadcrumb, IDescription } from '@/interfaces/app'
import type { ITag } from '@/interfaces/tasks'
import { getCurrentDate } from '@/utils/utils'

interface IState {
	isLoaded: boolean
	breadcrumbs: IBreadcrumb[] | undefined
	description: IDescription | undefined
}
const state = reactive<IState>({
	isLoaded: false,
	breadcrumbs: undefined,
	description: undefined,
})

const storeTasks = useTasksStore()
const tags = computed(() => storeTasks.tags.map((tag: ITag) => tag))
const taskListStore = computed(() => storeTasks.tasks)
const addTaskStore = (id: string | number, textareaValue: string, date: string, selectedTags: ITag[]) =>
	storeTasks.addTask(id, textareaValue, date, selectedTags)
const deleteTaskStore = (index: number) => storeTasks.deleteTask(index)
const clearTasksStore = () => storeTasks.clearTasks()

const vfm = useVfm()
const db = getFirestore()
const isLoading = ref<boolean>(false)
const errorMessage = ref<any>(null)
const getData = async (): Promise<void> => {
	try {
		isLoading.value = true
		const getData = query(collection(db, 'tasks'))
		const listDocs = await getDocs(getData)
		const res = listDocs.docs.map((doc) => doc.data())
		state.breadcrumbs = [...res[0].breadcrumbs]
		state.description = { ...res[0].description }
		state.isLoaded = true
	} catch (error: any) {
		vfm.open('modal-error')
		errorMessage.value = error
		console.error('tasks error', error)
		throw error
	} finally {
		isLoading.value = false
	}
}
getData()

const textareaValue = ref<string>('')
const selectedTags = ref<ITag[]>([])

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
		addTaskStore(uuidv4(), textareaValue.value.trim(), getCurrentDate(), selectedTags.value)
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
	<div class="tasks-view offset-page">
		<template v-if="isLoading && !state.isLoaded">
			<AppLoading :is-loading-local="isLoading" />
		</template>
		<template v-else-if="state.isLoaded && !errorMessage">
			<div class="container">
				<UIBreadcrumbs :breadcrumbs="state.breadcrumbs" />
				<DescriptionUnit :description="state.description" />

				<section class="tasks-view__section offset">
					<h2 class="tasks-view__title title h2">Список задач</h2>

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
							v-if="taskListStore.length"
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
								<div class="tasks-view__empty">
									<p class="h3">Список задач пуст! Введите вашу первую задачу!</p>
								</div>
							</template>
						</div>
					</div>
				</section>
			</div>
		</template>
		<template v-else>
			<div class="empty-template offset-page">
				<div class="container">
					<div class="empty-template__inner">
						<p class="empty-template__title h2">Ошибка!</p>
						<p class="empty-template__error s2">{{ errorMessage }}</p>
						<p class="empty-template__text p1">
							Сервер недоступен! Попробуйте зайти позже. Извините за временные неудобства!
						</p>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<style lang="scss">
.tasks-view {
	position: relative;
	height: 100%;
	width: 100%;
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
		width: fit-content;
	}

	&__empty {
		padding: 32px 12px;
		width: 100%;
		border-radius: 16px;
		background-color: $color-vue-bg;
		box-shadow: 0 30px 30px rgba(0, 0, 0, 4%);
	}
}
</style>
