import { createRouter, createWebHistory } from 'vue-router'
import type { RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: routes,
	linkActiveClass: 'active',
	linkExactActiveClass: 'active',
})

router.beforeEach((to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext) => {
	let path = to.path
	// Удаляем лишние слэши, кроме первого
	path = path.replace(/\/{2,}/g, '/')

	if (to.path !== '/catalog' && !path.endsWith('/')) {
		if (window.scrollY !== 0) {
			window.scrollTo(0, 0)
		}
		next({ path: path + '/', query: to.query, hash: to.hash })
	} else if (!path.endsWith('/')) {
		next({ path: path + '/', query: to.query, hash: to.hash })
	} else {
		next()
	}
})

export { router }
