import { ref } from 'vue'
import { defineStore } from 'pinia'
import { getFirestore, getDoc, doc } from 'firebase/firestore'
import type { INav } from '@/interfaces/app'

export const useGeneralStore = defineStore('general', () => {
	const nav = ref<INav[]>([])

	const db = getFirestore()
	const isLoading = ref<boolean>(false)
	const getData = async (): Promise<void> => {
		try {
			isLoading.value = true
			const docRef = doc(db, 'general', '9azrkqLoosCRB7x11WmH')
			const docSnap = await getDoc(docRef)
			nav.value = docSnap.exists() ? [...docSnap.data().nav] : []
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
