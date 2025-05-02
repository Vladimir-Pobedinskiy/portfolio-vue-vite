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
		const getData = query(collection(db, 'pet-projects'))
		const listDocs = await getDocs(getData)
		const res = listDocs.docs.map((doc) => doc.data())
		state.breadcrumbs = [...res[0].breadcrumbs]
		state.isLoaded = true
	} catch (error: any) {
		vfm.open('modal-error')
		errorMessage.value = error
		console.error('heroes error', error)
		throw error
	} finally {
		isLoading.value = false
	}
}
getData()

const projects = {
	title: 'Pet-проекты',
	list: [
		{
			title: 'Список задач',
			description:
				'Это приложение представляет собой To-Do менеджер с расширенными функциями, позволяющими пользователям эффективно управлять своими задачами. Ключевые возможности включают добавление, удаление и редактирование задач, а также управление хэштегами (добавление и редактирование). Приложение автоматически фиксирует время создания задачи. Для хранения данных используются Store, LocalStorage и Firestore, обеспечивая гибкость и надежность.',
			url: '/tasks',
		},
		{
			title: 'Герои',
			description:
				'Данный проект представляет собой интерактивный “Слайдер героев”, который позволяет переключаться между персонажами с использованием динамически формируемых маршрутов. Это обеспечивает плавный и удобный переход между различными разделами контента.',
			url: '/heroes',
		},
		{
			title: 'UI-компоненты',
			description:
				'В данном проекте разработан набор многократно используемых UI-компонентов, которые повышают интерактивность и удобство пользовательского интерфейса.',
			url: '/ui',
		},
	],
}
</script>

<template>
	<div class="pet-projects-view offset-page">
		<template v-if="isLoading && !state.isLoaded">
			<AppLoading :is-loading-local="isLoading" />
		</template>
		<template v-else-if="state.isLoaded && !errorMessage">
			<div class="container">
				<UIBreadcrumbs :breadcrumbs="state.breadcrumbs" />

				<div class="pet-projects-view__previews">
					<p class="pet-projects-view__previews-title h1">{{ projects.title }}</p>

					<div class="pet-projects-view__previews-links">
						<template v-for="(item, i) in projects.list" :key="i">
							<RouterLink class="pet-projects-view__previews-link" :to="`${item.url}`">
								<p class="pet-projects-view__previews-item-type s2">{{ item.title }}</p>
								<p class="pet-projects-view__previews-item-title p1">{{ item.description }}</p>

								<UIButton
									as="span"
									class="pet-projects-view__fake-link"
									variant="primary"
									size="small"
									:full="true"
									label="Перейти"
								/>
							</RouterLink>
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
.pet-projects-view {
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
		grid-gap: 20px;

		@media (min-width: $tablet) {
			grid-template-columns: repeat(2, 1fr);
			grid-gap: 20px;
			row-gap: 24px;
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
	}
}
</style>
