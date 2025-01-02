<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getFirestore, query, collection, getDocs } from 'firebase/firestore'
/* eslint-disable-next-line */
// @ts-ignore
import { marquee } from '~/moke/ui.js'
import { useVfm } from 'vue-final-modal'
import type { IBreadcrumb, IDescription } from '@/interfaces/app'
import AppLoading from '@/components/App/AppLoading.vue'
import UIMarquee from '@/components/UI/UIMarquee.vue'
import type { IMarquee } from '@/interfaces/ui'

interface IState {
	isLoaded: boolean
	breadcrumbs: IBreadcrumb[] | undefined
	description: IDescription | undefined
	marquee: IMarquee | undefined
}
const state = reactive<IState>({
	isLoaded: false,
	breadcrumbs: undefined,
	description: undefined,
	marquee: marquee ? marquee : undefined,
})

const vfm = useVfm()
const db = getFirestore()
const isLoading = ref<boolean>(false)
const errorMessage = ref<any>(null)
const getData = async (): Promise<void> => {
	try {
		isLoading.value = true
		const getData = query(collection(db, 'ui'))
		const listDocs = await getDocs(getData)
		const res = listDocs.docs.map((doc) => doc.data())
		state.breadcrumbs = [...res[0].breadcrumbs]
		state.description = { ...res[0].description }
		state.isLoaded = true
	} catch (error: any) {
		vfm.open('modal-error')
		errorMessage.value = error
		console.error('ui error', error)
		throw error
	} finally {
		isLoading.value = false
	}
}
getData()
</script>

<template>
	<div class="ui-view offset-page">
		<template v-if="isLoading && !state.isLoaded">
			<AppLoading :is-loading-local="isLoading" />
		</template>
		<template v-else-if="state.isLoaded && !errorMessage">
			<div class="container">
				<UIBreadcrumbs :breadcrumbs="state.breadcrumbs" />
				<h1 class="ui-view__title title h1">{{ state?.description?.title }}</h1>
				<ul class="description-list">
					<li class="description-item p1" v-for="(item, i) in state?.description?.descriptionList" :key="i">
						{{ item }}
					</li>
				</ul>
			</div>

			<section class="ui-view__marquee offset">
				<div class="container">
					<h2 class="ui-view__marquee-title h2">{{ marquee.title }}</h2>
				</div>
				<UIMarquee direction="normal" :duration="40" class="ui-view__marquee">
					<template #marquee-content>
						<div v-for="item in marquee.marqueeImages" :key="item" class="ui-view__marquee-img-wrapper">
							<img class="ui-view__marquee-img" :src="item.url" :alt="item.title" :title="item.title" />
						</div>
					</template>
				</UIMarquee>
			</section>
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
.ui-view {
	position: relative;
	height: 100%;
	width: 100%;

	&__marquee-title {
		margin-bottom: 32px;

		@media (min-width: $desktop) {
			margin-bottom: 40px;
		}
	}

	&__marquee-img-wrapper {
		padding: 10px;
		width: 250px;
		will-change: transform;

		@media (min-width: $mobile-big) {
			width: 300px;
		}

		@media (min-width: $tablet) {
			width: 350px;
		}

		@media (min-width: $tablet-big) {
			padding: 15px;
			width: 25%;
		}

		@media (min-width: $two-k-display) {
			width: 35%;
		}
	}

	&__marquee-img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
}
</style>
