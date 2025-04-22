import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSplashScreenStore = defineStore(
	'splash-screen',
	() => {
		const isSplashScreen = ref<boolean>(false)

		const startSplashScreen = (flag: boolean) => {
			isSplashScreen.value = flag
		}

		return { isSplashScreen, startSplashScreen }
	},
	{
		persist: {
			storage: localStorage,
		},
	}
)
