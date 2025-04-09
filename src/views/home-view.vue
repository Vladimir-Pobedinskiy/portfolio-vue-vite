<script setup lang="ts">
import DescriptionUnit from '@/components/DescriptionUnit.vue'
import { useBaguetteBox } from '@/composables/useBaguetteBox'
import IconVk from '@/assets/icons/icon-vk.svg'
import IconTg from '@/assets/icons/icon-tg.svg'

const description = {
	title: 'В портфолио реализовано:',
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

useBaguetteBox('.gallery-baguettebox-js')
</script>

<template>
	<main>
		<div class="home-view offset-page">
			<div class="container">
				<div class="home-view__about">
					<div class="home-view__about-inner">
						<div class="home-view__about-left-side gallery-baguettebox-js">
							<div class="home-view__about-left-side-inner">
								<a
									class="home-view__about-img-link"
									href="https://vladimir-pobedinskiy.github.io/portfolio-vue-vite/img/vlad-photo.jpg"
								>
									<div class="home-view__about-img-wrapper">
										<img
											src="https://vladimir-pobedinskiy.github.io/portfolio-vue-vite/img/vlad-photo.jpg"
											alt="Владимир"
											width="350px"
											height="350px"
										/>
									</div>
								</a>
								<div class="home-view__about-left-side-inner-content">
									<p class="home-view__about-name s1">Владимир Побединский</p>
									<p class="home-view__about-position s3">Frontend-разработчик (Vue и Nuxt)</p>
									<ul>
										<li>
											<a class="home-view__about-social-link" href="https://vk.com/id9716085" target="_blank">
												<IconVk class="home-view__about-icon" /> <span>/id9716085</span>
											</a>
										</li>
										<li>
											<a class="home-view__about-social-link" href="https://t.me/vldmrtl058" target="_blank">
												<IconTg class="home-view__about-icon" /> <span>@vldmrtl058</span>
											</a>
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div class="home-view__about-right-side"></div>
					</div>

					<div class="home-view__about-content">
						<ul>
							<li>
								<p class="home-view__about-description p1">
									Frontend-разработчик с практическим опытом работы на Vue и Nuxt (версии 2 и 3). Специализируюсь на
									использовании как Options API, так и Composition API совместно с Typescript. Разработал с нуля
									несколько проектов на Nuxt 3 и Nuxt.js 2, имею полноценное портфолио на Vue 3. Постоянно совершенствую
									свои навыки и стремлюсь к профессиональному росту в области frontend-разработки
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

		@media (min-width: $desktop) {
			margin-bottom: 80px;
		}
	}

	&__about-inner {
		margin-bottom: 32px;
		display: grid;
		grid-template-columns: 100%;
		grid-gap: 24px;

		@media (min-width: $desktop) {
			grid-template-columns: repeat(12, 1fr);
		}
	}

	&__about-left-side {
		@media (min-width: $desktop) {
			grid-column: 1 / 10;
		}
	}

	&__about-left-side-inner {
		display: flex;
		flex-direction: column;

		@media (min-width: $desktop) {
			flex-direction: row;
		}
	}

	&__about-img-wrapper {
		margin-bottom: 32px;
		width: 250px;
		min-width: 250px;
		height: 250px;
		border-radius: 50%;
		overflow: hidden;

		@media (min-width: $desktop) {
			margin-right: 32px;
			margin-bottom: 0;
		}
	}

	&__about-name {
		margin-bottom: 8px;
	}

	&__about-position {
		margin-bottom: 24px;
	}

	&__about-social-link {
		margin-bottom: 12px;
		width: fit-content;
		display: flex;
		align-items: center;
	}

	&__about-icon {
		margin-right: 16px;
		width: 40px;
		height: 40px;
	}

	&__about-content {
		@media (min-width: $desktop) {
			grid-column: 10 / -1;
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
