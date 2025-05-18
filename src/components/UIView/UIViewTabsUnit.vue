<script setup lang="ts">
import { ref } from 'vue'
import UITabs from '@/components/UI/UITabs.vue'
import { Tab, TabPanel } from '@headlessui/vue'
import type { ITabs } from '@/interfaces/ui'

withDefaults(
	defineProps<{
		tabs: ITabs | undefined
		isLoading: boolean
	}>(),
	{
		isLoading: false,
	}
)

const activeTab = ref<number>(0)
const handleActiveTab = (index: number) => {
	activeTab.value = index
}
</script>

<template>
	<section class="tabs-unit offset">
		<div class="container">
			<h2 class="tabs-unit__title h2">Компонент "Tabs"</h2>
			<UITabs v-model:active-tab="activeTab" class="tabs" @update:active-tab="handleActiveTab">
				<template #tab-nav>
					<Tab v-for="(tab, i) in tabs?.nav" :key="i" v-slot="{ selected }" as="template">
						<button :class="['tabs__nav-btn', { selected: selected }]" :disabled="isLoading" type="button">
							{{ tab.title }}
						</button>
					</Tab>
				</template>

				<template #tab-panels>
					<TabPanel class="tabs__panel tabs-panel" :key="0">
						<div class="tabs__panel-left-side">
							<div class="tabs__panel-img-wrapper">
								<img src="https://vladimir-pobedinskiy.github.io/portfolio-vue-vite/img/hero/wizard.png" alt="wizard" />
							</div>
						</div>
						<div class="tabs__panel-right-side">
							<div class="user-content">
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde corrupti fugit totam similique
									voluptatibus sint labore quidem esse distinctio.
								</p>
							</div>
						</div>
					</TabPanel>
					<TabPanel class="tabs__panel tabs-panel" :key="1">
						<div class="tabs__panel-left-side">
							<div class="tabs__panel-img-wrapper">
								<img src="https://vladimir-pobedinskiy.github.io/portfolio-vue-vite/img/hero/archer.png" alt="archer" />
							</div>
						</div>
						<div class="tabs__panel-right-side">
							<div class="user-content">
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde corrupti fugit totam similique officiis
									blanditiis sequi architecto laboriosam, facere, neque, laborum obcaecati et harum voluptatibus sint
									labore quidem esse distinctio.
								</p>
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde corrupti fugit totam similique officiis
									blanditiis sequi architecto laboriosam, facere, neque, laborum obcaecati et harum voluptatibus sint
									labore quidem esse distinctio.
								</p>
							</div>
						</div>
					</TabPanel>
					<TabPanel class="tabs__panel tabs-panel" :key="2">
						<div class="tabs__panel-left-side">
							<div class="tabs__panel-img-wrapper">
								<img src="https://vladimir-pobedinskiy.github.io/portfolio-vue-vite/img/hero/giant.png" alt="giant" />
							</div>
						</div>
						<div class="tabs__panel-right-side">
							<div class="user-content">
								<p>
									Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde corrupti fugit totam similique officiis
									blanditiis sequi architecto laboriosam, facere, neque, laborum obcaecati et harum voluptatibus sint
									labore quidem esse distinctio.
								</p>
							</div>
						</div>
					</TabPanel>
				</template>
			</UITabs>
		</div>
	</section>
</template>

<style lang="scss">
@use '@/assets/scss/general/variables';

.tabs-unit {
	&__title {
		margin-bottom: 32px;

		@media (min-width: variables.$desktop) {
			margin-bottom: 40px;
		}
	}
}

.tabs {
	.tabs-nav {
		margin-bottom: 24px;
		display: flex;
		align-items: center;

		@media (min-width: variables.$desktop) {
			margin-bottom: 32px;
		}
	}

	&__nav-btn {
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
		font-family: variables.$font;
		font-size: 14px;
		font-weight: 450;
		line-height: 1.4;
		background-color: variables.$color-white;
		color: variables.$color-gray-dark;
		border: 1px solid variables.$color-gray-dark;
		transition:
			background-color 0.4s ease,
			color 0.4s ease,
			border-color 0.4s ease;

		@media (min-width: variables.$mobile-big) {
			padding: 12px 24px;
			font-weight: 450;
			font-size: 18px;
			line-height: 1.35;
			width: fit-content;
		}

		@media (min-width: variables.$desktop-small) {
			&:hover {
				background-color: variables.$color-gray-dark;
				color: variables.$color-white;
				transition:
					background-color 0.4s ease,
					color 0.4s ease;
			}
		}

		&.selected {
			background-color: variables.$color-gray-dark;
			color: variables.$color-white;
			transition:
				background-color 0.4s ease,
				color 0.4s ease,
				fill 0.4s ease;
		}

		&:last-child {
			margin-right: 0;
		}
	}

	&__panel {
		display: grid;
		grid-template-columns: 100%;
		grid-gap: 24px;

		@media (min-width: variables.$tablet) {
			grid-template-columns: repeat(12, 1fr);
		}
	}

	&__panel-left-side {
		@media (min-width: variables.$tablet) {
			grid-column: 5 span;
			display: flex;
			align-items: flex-start;
			justify-content: center;
		}
	}

	&__panel-img-wrapper {
		@media (min-width: variables.$tablet) {
			width: 100%;
			max-width: 400px;
		}
	}

	&__panel-right-side {
		@media (min-width: variables.$tablet) {
			grid-column: 6 / -1;
		}
	}
}
</style>
