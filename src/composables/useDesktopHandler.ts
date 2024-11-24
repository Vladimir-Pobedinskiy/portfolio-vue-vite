import { ref, onMounted, onUnmounted } from 'vue'

export const useDesktopHandler = (screen: string) => {
	const isDesktop = ref<boolean | null>(null)

	const updateIsDesktop = () => {
		if (window.innerWidth >= parseInt(screen)) {
			isDesktop.value = true
		} else {
			isDesktop.value = false
		}
	}

	onMounted(() => {
		updateIsDesktop()
		window.addEventListener('resize', updateIsDesktop)
	})

	onUnmounted(() => {
		window.removeEventListener('resize', updateIsDesktop)
	})

	return {
		isDesktop,
	}
}
