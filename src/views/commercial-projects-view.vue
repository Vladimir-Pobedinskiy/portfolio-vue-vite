<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getFirestore, query, collection, getDocs } from 'firebase/firestore'
import { useVfm } from 'vue-final-modal'
import type { IBreadcrumb } from '@/interfaces/app'
import AppLoading from '@/components/App/AppLoading.vue'

interface IState {
	isLoaded: boolean
	breadcrumbs: IBreadcrumb[] | undefined
}
const state = reactive<IState>({
	isLoaded: false,
	breadcrumbs: undefined,
})

const vfm = useVfm()
const db = getFirestore()
const isLoading = ref<boolean>(false)
const errorMessage = ref<any>(null)
const getData = async (): Promise<void> => {
	try {
		isLoading.value = true
		const getData = query(collection(db, 'commercial-projects'))
		const listDocs = await getDocs(getData)
		const res = listDocs.docs.map((doc) => doc.data())
		state.breadcrumbs = [...res[0].breadcrumbs]
		state.isLoaded = true
	} catch (error: any) {
		vfm.open('modal-error')
		errorMessage.value = error
		console.error('commercial-projects error', error)
		throw error
	} finally {
		isLoading.value = false
	}
}
getData()

const portfolio = {
	portfolioTitle: 'Коммерческие проекты (разработка с нуля)',
	portfolioList: [
		{
			type: 'Благотворительный фонд',
			title: 'Фонд "Вера в детство"',
			description:
				'Проект разработан с использованием Nuxt 3 — современного фреймворка для создания веб-приложений на Vue.js',
			url: 'https://veravdetstvo.com',
		},
		{
			type: 'Интернет-магазин',
			title: 'Интернет-магазин мебели "STOPМебель"',
			description:
				'Проект разработан с использованием Nuxt 3 — современного фреймворка для создания веб-приложений на Vue.js',
			url: 'https://stop-mebel.com',
		},
		{
			type: 'Интернет-магазин',
			title: 'Интернет-магазин ювелирных изделий "Центр обручальных колец"',
			description: 'Проект разработан с использованием Nuxt 2 — фреймворка для создания веб-приложений на Vue.js',
			url: 'https://centr-kolec.ru',
		},
		{
			type: 'Многостраничный сайт',
			title: 'Многостраничный сайт по ремонту "Alvic center"',
			description:
				'Проект создан с использованием JavaScript для верстки, а также Vue 3 и Webpack для разработки и сборки фронтенд-части. Такой подход позволил создать эффективное и масштабируемое приложение.',
			url: 'https://alviccenter.ru',
		},
	],
}
</script>

<template>
	<div class="commercial-projects-view offset-page">
		<template v-if="isLoading && !state.isLoaded">
			<AppLoading :is-loading-local="isLoading" />
		</template>
		<template v-else-if="state.isLoaded && !errorMessage">
			<div class="container">
				<UIBreadcrumbs :breadcrumbs="state.breadcrumbs" />

				<div class="commercial-projects-view__previews">
					<p class="commercial-projects-view__previews-title h1">{{ portfolio.portfolioTitle }}</p>

					<div class="commercial-projects-view__previews-links">
						<template v-for="(item, i) in portfolio.portfolioList" :key="i">
							<a class="commercial-projects-view__previews-link" :href="`${item.url}`" target="_blank">
								<p class="commercial-projects-view__previews-item-type s2">{{ item.type }}</p>
								<p class="commercial-projects-view__previews-item-title p1">{{ item.title }}</p>
								<p class="commercial-projects-view__previews-item-title p2">{{ item.description }}</p>
								<span class="commercial-projects-view__fake-link btn btn-small"> Перейти на сайт </span>
							</a>
						</template>
					</div>
				</div>
			</div>
		</template>
		<template v-else>
			<div class="empty-template offset-page">
				<div class="container">
					<div class="empty-template__inner">
						<p class="empty-template__title h2">Ошибка!</p>
						<p class="empty-template__error s2">{{ errorMessage }}</p>
						<p class="empty-template__text p1">
							Сервер недоступен! Попробуйте зайти позже. Извините за временные неудобства!
						</p>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<style lang="scss">
.commercial-projects-view {
	position: relative;
	height: 100%;
	width: 100%;

	&__previews {
		padding-bottom: 0;
	}

	&__previews-title {
		margin-bottom: 32px;
		text-transform: uppercase;

		@media (min-width: $desktop) {
			margin-bottom: 40px;
		}
	}

	&__previews-links {
		display: grid;
		grid-template-columns: 100%;
		grid-gap: 12px;

		@media (min-width: $tablet) {
			grid-template-columns: repeat(2, 1fr);
			grid-gap: 20px;
		}
	}

	&__previews-link {
		display: flex;
		flex-direction: column;
		padding: 16px;
		border-radius: 8px;
		background-color: $color-vue-bg;

		@media (min-width: $desktop) {
			transition: background-color 0.3s;

			&:hover {
				background-color: $color-vue;
				transition: background-color 0.3s;
			}
		}
	}

	&__previews-item-type {
		margin-bottom: 12px;
		text-align: center;
	}

	&__previews-item-title {
		margin-bottom: 24px;
		text-align: center;
	}

	&__fake-link {
		display: block;
		margin-top: auto;
		width: 100%;
	}
}
</style>
