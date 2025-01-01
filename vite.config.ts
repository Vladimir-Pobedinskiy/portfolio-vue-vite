import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'

// https://vite.dev/config/
export default defineConfig({
	server: {
		port: 8080,
	},
	preview: {
		port: 8080,
	},
	base: 'https://vladimir-pobedinskiy.github.io/portfolio-vue-vite/',
	plugins: [vue(), vueDevTools(), svgLoader({ svgo: false })],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	css: {
		preprocessorOptions: {
			scss: {
				additionalData: `
          @import "./src/assets/scss/general/variables";
          @import "./src/assets/scss/mixins/mixins";
        `,
			},
		},
	},
})
