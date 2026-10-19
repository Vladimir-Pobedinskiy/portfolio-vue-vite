import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getFirestore, getDoc, doc } from 'firebase/firestore'
import type { INav } from '@/interfaces/app'
import { router } from '@/router'
import { useUserStore } from '@/stores/storeUser'

export const useGeneralStore = defineStore('general', () => {
	const allNav = ref<INav[]>([])
	const userStore = useUserStore()

	// Ссылки на страницы с requiresAuth показываем только авторизованным
	const nav = computed(() =>
		userStore.user.token ? allNav.value : allNav.value.filter((link) => !router.resolve(link.url).meta.requiresAuth)
	)

	const db = getFirestore()
	const isLoading = ref<boolean>(false)
	const getData = async (): Promise<void> => {
		try {
			isLoading.value = true
			const docRef = doc(db, 'general', '9azrkqLoosCRB7x11WmH')
			const docSnap = await getDoc(docRef)
			allNav.value = docSnap.exists() ? [...docSnap.data().nav] : []
		} catch (error: any) {
			console.error('general from store error', error)
			throw error
		} finally {
			isLoading.value = false
		}
	}
	getData()

	return { nav, getData }
})
