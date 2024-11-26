import { computed } from 'vue'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useUserStore } from '@/stores/storeUser'

export const auth = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
	const userStore = useUserStore()
	const user = computed(() => userStore?.user)

	if (!user.value) {
		next({ name: 'login-view' })
	} else {
		next()
	}
}
