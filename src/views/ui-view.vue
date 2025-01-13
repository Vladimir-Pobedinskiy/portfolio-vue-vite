<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getFirestore, query, collection, getDocs } from 'firebase/firestore'
/* eslint-disable-next-line */
// @ts-ignore
import { marquee, heroesTabs, accordion } from '~/moke/ui.js'
import { useVfm } from 'vue-final-modal'
import type { IBreadcrumb, IDescription } from '@/interfaces/app'
import AppLoading from '@/components/App/AppLoading.vue'
import UIMarquee from '@/components/UI/UIMarquee.vue'
import UITabs from '@/components/UI/UITabs.vue'
import { Tab, TabPanel } from '@headlessui/vue'
import UIAccordion from '@/components/UI/UIAccordion.vue'
import type { IMarquee, ITabs } from '@/interfaces/ui'

interface IState {
	isLoaded: boolean
	breadcrumbs: IBreadcrumb[] | undefined
	description: IDescription | undefined
	marquee: IMarquee | undefined
	tabs: ITabs | undefined
	accordion: any
}
const state = reactive<IState>({
	isLoaded: false,
	breadcrumbs: undefined,
	description: undefined,
	marquee: marquee ? marquee : undefined,
	tabs: heroesTabs ? heroesTabs : undefined,
	accordion: accordion ? accordion : undefined,
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

const activeTab = ref<number>(0)
const handleActiveTab = (index: number) => {
	activeTab.value = index
}
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

			<section class="ui-view__tabs-unit offset">
				<div class="container">
					<h2 class="ui-view__tabs-unit-title h2">Компонент "Tabs"</h2>
					<UITabs v-model:active-tab="activeTab" class="ui-view__tabs" @update:active-tab="handleActiveTab">
						<template #tab-nav>
							<Tab v-for="(tab, i) in state?.tabs?.nav" :key="i" v-slot="{ selected }" as="template">
								<button :class="['ui-view__tabs-nav-btn', { selected: selected }]" :disabled="isLoading" type="button">
									{{ tab.title }}
								</button>
							</Tab>
						</template>

						<template #tab-panels>
							<TabPanel class="ui-view__tabs-panel tabs-panel" :key="0">
								<div class="ui-view__tabs-panel-left-side">
									<div class="ui-view__tabs-panel-img-wrapper">
										<img
											src="https://vladimir-pobedinskiy.github.io/portfolio-vue-vite/img/hero/wizard.png"
											alt="wizard"
										/>
									</div>
								</div>
								<div class="ui-view__tabs-panel-right-side">
									<div class="user-content">
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde corrupti fugit totam similique
											voluptatibus sint labore quidem esse distinctio.
										</p>
									</div>
								</div>
							</TabPanel>
							<TabPanel class="ui-view__tabs-panel tabs-panel" :key="1">
								<div class="ui-view__tabs-panel-left-side">
									<div class="ui-view__tabs-panel-img-wrapper">
										<img
											src="https://vladimir-pobedinskiy.github.io/portfolio-vue-vite/img/hero/archer.png"
											alt="archer"
										/>
									</div>
								</div>
								<div class="ui-view__tabs-panel-right-side">
									<div class="user-content">
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde corrupti fugit totam similique
											officiis blanditiis sequi architecto laboriosam, facere, neque, laborum obcaecati et harum
											voluptatibus sint labore quidem esse distinctio.
										</p>
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde corrupti fugit totam similique
											officiis blanditiis sequi architecto laboriosam, facere, neque, laborum obcaecati et harum
											voluptatibus sint labore quidem esse distinctio.
										</p>
									</div>
								</div>
							</TabPanel>
							<TabPanel class="ui-view__tabs-panel tabs-panel" :key="2">
								<div class="ui-view__tabs-panel-left-side">
									<div class="ui-view__tabs-panel-img-wrapper">
										<img
											src="https://vladimir-pobedinskiy.github.io/portfolio-vue-vite/img/hero/giant.png"
											alt="giant"
										/>
									</div>
								</div>
								<div class="ui-view__tabs-panel-right-side">
									<div class="user-content">
										<p>
											Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde corrupti fugit totam similique
											officiis blanditiis sequi architecto laboriosam, facere, neque, laborum obcaecati et harum
											voluptatibus sint labore quidem esse distinctio.
										</p>
										<p></p>
									</div>
								</div>
							</TabPanel>
						</template>
					</UITabs>
				</div>
			</section>

			<section class="ui-view__accordion-unit offset">
				<div class="container">
					<h2 class="ui-view__accordion-unit-title h2">Компонент "Accordion"</h2>
					<UIAccordion :list="state.accordion.accordionList" />
				</div>
			</section>

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

	.tabs-nav {
		margin-bottom: 24px;
		display: flex;
		align-items: center;

		@media (min-width: $desktop) {
			margin-bottom: 32px;
		}
	}

	&__tabs-unit-title {
		margin-bottom: 32px;

		@media (min-width: $desktop) {
			margin-bottom: 40px;
		}
	}

	&__tabs-nav-btn {
		margin-right: 12px;
		padding: 8px 16px;
		width: 100%;
		max-width: 100px;
		outline: transparent;
		border-radius: 16px;
		display: flex;
		justify-content: center;
		align-items: center;
		text-align: center;
		font-family: $font;
		font-size: 14px;
		font-weight: 450;
		line-height: 1.4;
		background-color: $color-white;
		color: $color-gray-dark;
		border: 1px solid $color-gray-dark;
		transition:
			background-color 0.4s ease,
			color 0.4s ease,
			border-color 0.4s ease;

		@media (min-width: $mobile-big) {
			padding: 12px 24px;
			font-weight: 450;
			font-size: 18px;
			line-height: 1.35;
			width: fit-content;
		}

		@media (min-width: $desktop-small) {
			&:hover {
				background-color: $color-gray-dark;
				color: $color-white;
				transition:
					background-color 0.4s ease,
					color 0.4s ease;
			}
		}

		&.selected {
			background-color: $color-gray-dark;
			color: $color-white;
			transition:
				background-color 0.4s ease,
				color 0.4s ease,
				fill 0.4s ease;
		}

		&:last-child {
			margin-right: 0;
		}
	}

	&__tabs-panel {
		display: grid;
		grid-template-columns: 100%;
		grid-gap: 24px;

		@media (min-width: $tablet) {
			grid-template-columns: repeat(12, 1fr);
		}
	}

	&__tabs-panel-left-side {
		@media (min-width: $tablet) {
			grid-column: 5 span;
			display: flex;
			align-items: flex-start;
			justify-content: center;
		}
	}

	&__tabs-panel-img-wrapper {
		@media (min-width: $tablet) {
			width: 100%;
			max-width: 400px;
		}
	}

	&__tabs-panel-right-side {
		@media (min-width: $tablet) {
			grid-column: 6 / -1;
		}
	}
}
</style>
