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
		path: '/personal-account',
		name: 'personal-account-view',
		beforeEnter: [auth],
		component: () => import('@/views/personal-account-view.vue'),
	},
	{
		path: '/',
		name: 'home-view',
		component: () => import('@/views/home-view.vue'),
	},
	{
		path: '/about',
		name: 'about-view',
		component: () => import('@/views/about-view.vue'),
	},
	{
		path: '/tasks',
		name: 'tasks-view',
		component: () => import('@/views/tasks-view.vue'),
	},
	{
		path: '/heroes',
		name: 'heroes-view',
		component: () => import('@/views/heroes-view.vue'),
	},
	{
		path: '/:catchAll(.*)*',
		component: () => import('@/views/not-found-view.vue'),
	},
]
