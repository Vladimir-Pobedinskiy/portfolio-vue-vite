import '@/assets/scss/main.scss'

import { createApp } from 'vue'
import type { Directive } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from '@/App.vue'
import { router } from '@/router'
import { initializeApp } from 'firebase/app'

import { createVfm } from 'vue-final-modal'
import 'vue-final-modal/style.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { IMaskDirective } from 'vue-imask'

// Глобальные компоненты
import UIBreadcrumbs from '@/components/UI/UIBreadcrumbs.vue'

const firebaseConfig = {
	apiKey: 'AIzaSyCDTf05XkPQ-KOSsr13C74-dKWK8dpOLUg',
	authDomain: 'vue-portfolio-vite.firebaseapp.com',
	projectId: 'vue-portfolio-vite',
	storageBucket: 'vue-portfolio-vite.firebasestorage.app',
	messagingSenderId: '165423477584',
	appId: '1:165423477584:web:db466add08ce0acb513255',
}
// Initialize Firebase
initializeApp(firebaseConfig)

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)
app.use(router)

const vfm = createVfm()
app.use(vfm)
app.use(autoAnimatePlugin)
app.directive('imask', IMaskDirective as Directive)

// Регистрируем глобальные компоненты
app.component('UIBreadcrumbs', UIBreadcrumbs)

app.mount('#app')
