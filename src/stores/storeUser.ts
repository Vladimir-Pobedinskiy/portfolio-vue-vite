import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
	const router = useRouter()
	const user = ref<string | undefined>(undefined)

	const setUser = (token: string) => {
		user.value = token
	}

	const logout = () => {
		user.value = undefined
		router.push({ name: 'home-view' })
	}

	return { user, setUser, logout }
})
