import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useLoadingStore = defineStore('loading', () => {
	const isLoading = ref<boolean>(false)

	const startLoading = () => {
		isLoading.value = true
	}

	const endLoading = () => {
		isLoading.value = false
	}

	return { isLoading, startLoading, endLoading }
})
