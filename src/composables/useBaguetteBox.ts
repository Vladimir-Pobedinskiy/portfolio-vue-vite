import baguetteBox from 'baguettebox.js'
import 'baguettebox.js/dist/baguetteBox.css'
import { onMounted } from 'vue'
import { useScrollController } from '@/composables/useScrollController'

export function useBaguetteBox(selector: string) {
	onMounted(() => {
		const options = {
			bodyClass: 'lock-js',
			afterShow: function () {
				useScrollController.disableScroll()
			},
			afterHide: function () {
				useScrollController.enableScroll()
			},
			onChange: function (currentIndex: number, imagesCount: number) {
				const previousButton = document.querySelector('#previous-button') as HTMLButtonElement | null
				const nextButton = document.querySelector('#next-button') as HTMLButtonElement | null
				if (previousButton && nextButton) {
					currentIndex === 0 ? (previousButton.disabled = true) : (previousButton.disabled = false)
					currentIndex === imagesCount - 1 ? (nextButton.disabled = true) : (nextButton.disabled = false)
				}
			},
		}

		if (selector) baguetteBox.run(selector, options)
	})
}
