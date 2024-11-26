import { computed } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { useUserStore } from '@/stores/storeUser'

const checkAuth = (to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
	const userStore = useUserStore()
	const user = computed(() => userStore?.user)

	if (!user.value) {
		next({ name: 'login-view' })
	} else {
		next()
	}
}

const routes: RouteRecordRaw[] = [
	{
		path: '/login',
		name: 'login-view',
		component: () => import('../views/login-view.vue'),
	},
	{
		path: '/registration',
		name: 'registration-view',
		component: () => import('../views/registration-view.vue'),
	},
	{
		path: '/',
		name: 'home-view',
		beforeEnter: checkAuth,
		component: () => import('../views/home-view.vue'),
	},
	{
		path: '/about',
		name: 'about-view',
		beforeEnter: checkAuth,
		component: () => import('../views/about-view.vue'),
	},
	{
		path: '/personal-account',
		name: 'personal-account-view',
		beforeEnter: checkAuth,
		component: () => import('../views/personal-account-view.vue'),
	},
]

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: routes,
})

export default router
