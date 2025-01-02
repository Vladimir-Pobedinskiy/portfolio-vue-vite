<script setup lang="ts">
const description = {
	title: 'В этом портфолио реализовано:',
	descriptionList: [
		'Установка и настройка Vite с TypeScript',
		'Настройка vite.config.ts',
		'Установка и настройка Vue-router для навигации и Pinia для управления состоянием',
		'Использование Composition API совместно с TypeScript',
		'Динамическая перерисовка без перезагрузки страницы',
		'Обработка несуществующих routes',
		'Registration & Login через Firebase',
		'Адаптивная верстка по принципу Mobile First',
		'На других views реализованы мини-приложения, такие как "Список задач" и другие...',
	],
	portfolioTitle:
		'Представленные ниже проекты демонстрируют мои навыки и опыт в разработке фронтенда. Разработаны с нуля на Nuxt 3 и Nuxt.js 2, также верстка в связке с Vue 3',
	portfolioList: [
		{
			type: 'Благотворительный фонд',
			title: 'Фонд "Вера в детство"',
			url: 'https://veravdetstvo.com',
		},
		{
			type: 'Интернет-магазин',
			title: 'Интернет-магазин мебели "STOPМебель"',
			url: 'https://stop-mebel.com',
		},
		{
			type: 'Интернет-магазин',
			title: 'Интернет-магазин ювелирных изделий "Центр обручальных колец"',
			url: 'https://centr-kolec.ru',
		},
		{
			type: 'Многостраничный сайт',
			title: 'Многостраничный сайт по ремонту "Alvic center"',
			url: 'https://alviccenter.ru',
		},
	],
}
</script>

<template>
	<main>
		<div class="home-view offset-page">
			<div class="container">
				<h1 class="home-view__title title h2">{{ description.title }}</h1>
				<ul class="home-view__description-list description-list">
					<li
						class="home-view__description-list-item description-item p1"
						v-for="(item, i) in description.descriptionList"
						:key="i"
					>
						{{ item }}
					</li>
				</ul>

				<div class="home-view__previews offset">
					<p class="home-view__previews-title h3">{{ description.portfolioTitle }}</p>

					<div class="home-view__previews-links">
						<template v-for="(item, i) in description.portfolioList" :key="i">
							<a class="home-view__previews-link" :href="`${item.url}`" target="_blank">
								<p class="home-view__previews-item-type s2">{{ item.type }}</p>
								<p class="home-view__previews-item-title p1">{{ item.title }}</p>
								<span class="home-view__span btn btn-small"> Перейти на сайт </span>
							</a>
						</template>
					</div>
				</div>
			</div>
		</div>
	</main>
</template>

<style lang="scss">
.home-view {
	&__previews {
		padding-bottom: 0;
	}

	&__previews-title {
		margin-bottom: 32px;

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
		}

		@media (min-width: $desktop) {
			grid-template-columns: repeat(4, 1fr);
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

	&__span {
		display: block;
		margin-top: auto;
		width: 100%;
	}
}
</style>
