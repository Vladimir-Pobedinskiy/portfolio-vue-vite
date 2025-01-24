<script setup lang="ts">
import DescriptionUnit from '@/components/DescriptionUnit.vue'

const description = {
	title: 'В этом портфолио реализовано:',
	descriptionList: [
		'Установка и настройка Vite (Vue 3 с TypeScript)',
		'Настройка vite.config.ts',
		'Установка и настройка Vue-router для навигации и Pinia для управления состоянием',
		'Использование Composition API совместно с TypeScript',
		'Динамическая перерисовка без перезагрузки страницы',
		'Обработка несуществующих routes',
		'Registration & Login через Firebase',
		'Адаптивная верстка по принципу Mobile First',
		'На других views демонстрируются мои "Коммерческие проекты" и "Pet-проекты"',
	],
}
</script>

<template>
	<main>
		<div class="home-view offset-page">
			<div class="container">
				<div class="home-view__about">
					<div class="home-view__about-left-side">
						<div class="home-view__about-img-wrapper">
							<img src="https://vladimir-pobedinskiy.github.io/portfolio-vue-vite/img/vlad-photo.jpg" alt="Владимир" />
						</div>
						<p class="home-view__about-name s1">Владимир Побединский</p>
					</div>
					<div class="home-view__about-right-side">
						<ul>
							<li>
								<p class="home-view__about-description p1">
									Frontend-разработчик (стаж работы более 3 лет) с практическим опытом работы на Vue 3 и Nuxt (версии 2
									и 3). Специализируюсь на использовании как Options API, так и Composition API совместно с Typescript.
									Разработал с нуля несколько проектов на Nuxt 3 и Nuxt.js 2, имею полноценное портфолио на Vue 3.
									Постоянно совершенствую свои навыки и стремлюсь к профессиональному росту в области
									frontend-разработки.
								</p>
							</li>
							<li>
								<p class="home-view__about-description p1">
									Образование: Пензенский государственный университет (бывший ППИ). Факультет информатики и
									вычислительной техники (ФВТ)
								</p>
							</li>
							<li>
								<p class="home-view__about-description p1">Дополнительное образование: курс по Vue.js от TOCODE</p>
							</li>
						</ul>
					</div>
				</div>

				<DescriptionUnit :description="description" />
			</div>
		</div>
	</main>
</template>

<style lang="scss">
.home-view {
	&__about {
		position: relative;
		margin-bottom: 48px;
		display: grid;
		grid-template-columns: 100%;
		grid-gap: 24px;

		&::after {
			content: '';
			position: absolute;
			left: 0;
			bottom: -24px;
			height: 1px;
			width: 100%;
			background-color: $color-vue;

			@media (min-width: $desktop) {
				bottom: -40px;
			}
		}

		@media (min-width: $tablet) {
			grid-template-columns: repeat(12, 1fr);
		}

		@media (min-width: $desktop) {
			margin-bottom: 80px;
		}
	}

	&__about-left-side {
		@media (min-width: $tablet) {
			grid-column: 1 / 5;
		}
	}

	&__about-img-wrapper {
		margin-bottom: 32px;
		width: 100%;
		max-width: 350px;
		border-radius: 50%;
		overflow: hidden;
	}

	&__about-right-side {
		@media (min-width: $tablet) {
			grid-column: 5 / -1;
		}

		ul {
			padding-left: 22px;
			list-style: disc;
		}

		li {
			margin-bottom: 12px;

			&:last-child {
				margin-bottom: 0;
			}
		}
	}
}
</style>
