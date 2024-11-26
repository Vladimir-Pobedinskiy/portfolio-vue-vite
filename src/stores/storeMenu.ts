import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useScrollController } from '@/composables/useScrollController'

export const useMenuStore = defineStore('menu', () => {
	const isOpen = ref<string | undefined>(undefined)

	const toggleState = (name: string) => {
		if (isOpen.value === name) {
			useScrollController.enableScroll()
			isOpen.value = ''
		} else {
			useScrollController.disableScroll()
			isOpen.value = name
		}
	}

	const closeMenu = () => {
		isOpen.value = ''
	}

	return { isOpen, toggleState, closeMenu }
})
