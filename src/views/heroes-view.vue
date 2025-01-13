<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getFirestore, query, collection, getDocs } from 'firebase/firestore'
/* eslint-disable-next-line */
// @ts-ignore
import { heroes } from '~/moke/heroes.js'
import { useVfm } from 'vue-final-modal'
import type { IBreadcrumb, IDescription } from '@/interfaces/app'
import AppLoading from '@/components/App/AppLoading.vue'
import DescriptionUnit from '@/components/DescriptionUnit.vue'
import HeroSlider from '@/components/Hero/HeroSlider.vue'

interface IState {
	isLoaded: boolean
	breadcrumbs: IBreadcrumb[] | undefined
	description: IDescription | undefined
	heroesList: any
}
const state = reactive<IState>({
	isLoaded: false,
	breadcrumbs: undefined,
	description: undefined,
	heroesList: heroes.list ? heroes.list : undefined,
})

const vfm = useVfm()
const db = getFirestore()
const isLoading = ref<boolean>(false)
const errorMessage = ref<any>(null)
const getData = async (): Promise<void> => {
	try {
		isLoading.value = true
		const getData = query(collection(db, 'heroes'))
		const listDocs = await getDocs(getData)
		const res = listDocs.docs.map((doc) => doc.data())
		state.breadcrumbs = [...res[0].breadcrumbs]
		state.description = { ...res[0].description }
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
</script>

<template>
	<div class="heroes-view offset-page">
		<template v-if="isLoading && !state.isLoaded">
			<AppLoading :is-loading-local="isLoading" />
		</template>
		<template v-else-if="state.isLoaded && !errorMessage">
			<div class="container">
				<UIBreadcrumbs :breadcrumbs="state.breadcrumbs" />
				<DescriptionUnit :description="state.description" />
				<HeroSlider :hero-list="state.heroesList" />
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
.heroes-view {
	position: relative;
	height: 100%;
	width: 100%;
}
</style>
