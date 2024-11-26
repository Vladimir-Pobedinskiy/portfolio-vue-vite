import './assets/scss/main.scss'

import { createApp } from 'vue'
import type { Directive } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import { router } from './router'
import { initializeApp } from 'firebase/app'
import { IMaskDirective } from 'vue-imask'

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
app.directive('imask', IMaskDirective as Directive)

app.mount('#app')
