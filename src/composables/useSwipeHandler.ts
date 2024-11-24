import { ref, onMounted, onUnmounted, type Ref } from 'vue'
import { useSwipe } from '@vueuse/core'
import type { UseSwipeDirection } from '@vueuse/core'
import { useMenuStore } from '@/stores/storeMenu'

export function useSwipeHandler(
	target: Ref<HTMLElement | null>,
	isOpen: Ref,
	directionSwipe: 'left' | 'right' | 'up' | 'down',
	breakpoint: string
) {
	// Флаг для предотвращения многократной обработки одного свайпа
	const swipeProcessed = ref<boolean>(false)
	const storeMenu = useMenuStore()
	const toggleState = (isOpen: Ref) => storeMenu.toggleState(isOpen.value ? isOpen.value : '')

	const handleSwipe = () => {
		const { direction } = useSwipe(target, {
			passive: false,
			onSwipe: () => {
				if (window.innerWidth <= parseInt(breakpoint)) {
					if (!swipeProcessed.value) {
						if (direction.value === directionSwipe) {
							swipeProcessed.value = true
						}
					}
				}
			},
			onSwipeEnd: (e: TouchEvent, direction: UseSwipeDirection) => {
				if (e.type === 'touchend' && swipeProcessed.value && direction === directionSwipe) {
					toggleState(isOpen.value)
				}
				swipeProcessed.value = false
			},
		})
	}

	onMounted(() => {
		handleSwipe()
		window.addEventListener('resize', handleSwipe)
	})

	onUnmounted(() => {
		window.removeEventListener('resize', handleSwipe)
	})
}
