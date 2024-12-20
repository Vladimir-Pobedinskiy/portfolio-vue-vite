import { auth } from './middlewares/auth'
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
	{
		path: '/login',
		name: 'login-view',
		component: () => import('@/views/login-view.vue'),
	},
	{
		path: '/registration',
		name: 'registration-view',
		component: () => import('@/views/registration-view.vue'),
	},
	{
		path: '/',
		name: 'home-view',
		beforeEnter: [auth],
		component: () => import('@/views/home-view.vue'),
	},
	{
		path: '/about',
		name: 'about-view',
		beforeEnter: [auth],
		component: () => import('@/views/about-view.vue'),
	},
	{
		path: '/personal-account',
		name: 'personal-account-view',
		beforeEnter: [auth],
		component: () => import('@/views/personal-account-view.vue'),
	},
]
