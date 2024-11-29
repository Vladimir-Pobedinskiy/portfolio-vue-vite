import { computed } from 'vue'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useUserStore } from '@/stores/storeUser'

export const auth = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
	const userStore = useUserStore()
	const token = computed(() => userStore.user.token)

	if (!token.value) {
		next({ name: 'login-view' })
	} else {
		next()
	}
}
