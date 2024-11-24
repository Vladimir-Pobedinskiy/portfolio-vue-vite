import { defineStore, acceptHMRUpdate } from 'pinia'

export interface StoreLoading {
	isLoading: boolean
}

export const useLoadingStore = defineStore('loading', {
	state(): StoreLoading {
		return {
			isLoading: false,
		}
	},

	getters: {
		getIsLoading(): boolean {
			return this.isLoading
		},
	},

	actions: {
		startLoading() {
			this.isLoading = true
		},
		endLoading() {
			this.isLoading = false
		},
	},
})
