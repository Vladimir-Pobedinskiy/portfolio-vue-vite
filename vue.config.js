export default defineConfig(({ mode }) => {
	const env = loadEnv(mode, process.cwd(), '')
	return {
		base: env.BASE_URL || '/', // например /portfolio-vue-vite/
		// ... остальное как у тебя

		build: {
			outDir: 'dist',
			assetsDir: 'assets',
			rollupOptions: {
				// Это важно!
				input: {
					main: path.resolve(__dirname, 'index.html'),
					404: path.resolve(__dirname, '404.html'), // добавляем 404.html в сборку
				},
			},
		},
	}
})
