import { reactive } from 'vue'
import { defineStore } from 'pinia'
import { useRouter } from 'vue-router'
import { clearObject } from '@/utils/utils'

interface IUser {
	token: string | null
}

export const useUserStore = defineStore(
	'user',
	() => {
		const router = useRouter()
		const user = reactive<IUser>({
			token: null,
		})

		const setUser = (token: string) => {
			user.token = token
		}

		const logout = () => {
			clearObject(user)
			router.push({ name: 'home-view' })
		}

		return { user, setUser, logout }
	},
	{
		persist: {
			storage: localStorage,
		},
	}
)
