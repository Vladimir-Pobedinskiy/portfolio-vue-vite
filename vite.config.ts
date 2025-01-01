import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import svgLoader from 'vite-svg-loader'
import path from 'path'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	return {
		base: env.NODE_ENV === 'production' ? '/portfolio-vue-vite/' : '/',
		server: {
			port: 8080,
		},
		preview: {
			port: 8080,
		},
		publicDir: 'public',
		plugins: [vue(), vueDevTools(), svgLoader({ svgo: false })],
		resolve: {
			alias: {
				'@': path.resolve(__dirname, 'src'),
				'~': path.resolve(__dirname, './'),
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
	}
})
