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
		path: '/commercial-projects',
		name: 'commercial-projects-view',
		component: () => import('@/views/commercial-projects-view.vue'),
	},
	{
		path: '/pet-projects',
		name: 'pet-projects-view',
		component: () => import('@/views/pet-projects-view.vue'),
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
		path: '/heroes/:slug',
		name: 'hero-view',
		component: () => import('@/views/hero-view.vue'),
	},
	{
		path: '/ui',
		name: 'ui-view',
		component: () => import('@/views/ui-view.vue'),
	},
	{
		path: '/:catchAll(.*)*',
		name: 'not-found-view',
		component: () => import('@/views/not-found-view.vue'),
	},
]
