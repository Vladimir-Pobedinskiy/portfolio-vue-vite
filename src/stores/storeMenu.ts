import { defineStore, acceptHMRUpdate } from 'pinia'
import { useScrollController } from '@/composables/useScrollController'

export interface StoreMenu {
	isOpen: string
}

export const useMenuStore = defineStore('menu', {
	state(): StoreMenu {
		return {
			isOpen: '',
		}
	},

	getters: {
		getIsOpen(): string {
			return this.isOpen
		},
	},

	actions: {
		toggleState(menuName: string) {
			if (this.isOpen === menuName) {
				useScrollController.enableScroll()
				this.isOpen = ''
			} else {
				useScrollController.disableScroll()
				this.isOpen = menuName
			}
		},
		closeMenu() {
			this.isOpen = ''
		},
	},
})
