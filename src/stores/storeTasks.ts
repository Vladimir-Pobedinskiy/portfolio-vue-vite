import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { ITag, ITask } from '@/interfaces/tasks'

export const useTasksStore = defineStore(
	'tasks',
	() => {
		const tags = ref<ITag[]>([
			{ title: 'home', selected: false },
			{ title: 'travel', selected: false },
			{ title: 'work', selected: false },
			{ title: 'rest', selected: false },
		])
		const tasks = ref<ITask[]>([])

		const addTask = (id: string | number, textareaValue: string, dateTask: string, taskTags: ITag[]) => {
			tasks.value.push({
				id: id,
				title: textareaValue,
				date: dateTask,
				tags: [...taskTags],
			})
		}
		const changeTask = (index: number, inputValue: string) => {
			tasks.value.forEach((task: ITask, i: number) => {
				if (i === index) {
					task.title = inputValue
				}
			})
		}
		const changeTags = (index: number, selectedTags: ITag[]) => {
			tasks.value.forEach((task: ITask, i: number) => {
				if (i === index) {
					task.tags = [...selectedTags]
				}
			})
		}
		const deleteTask = (index: number) => {
			tasks.value.splice(index, 1)
		}
		const clearTasks = () => {
			tasks.value.splice(0)
		}

		return { tags, tasks, addTask, changeTask, changeTags, deleteTask, clearTasks }
	},
	{
		persist: {
			storage: localStorage,
		},
	}
)
