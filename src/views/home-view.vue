<script setup lang="ts">
  /* eslint-disable-next-line */
// @ts-ignore
import { profile } from '~/moke/profile.js'
import DescriptionUnit from '@/components/DescriptionUnit.vue'
import { Pagination, Keyboard } from 'swiper/modules'
import UISlider from '@/components/UI/UISlider.vue'
import { useGLightbox } from '@/composables/useGLightbox'
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

useGLightbox()

const modules = [Pagination, Keyboard]
const swiperOptions = {
	slidesPerView: 1,
	spaceBetween: 8,
	speed: 900,
	pagination: {
		el: '.home-view__profile-slider-pagination',
		bulletClass: 'home-view__profile-slider-pagination-bullet',
		bulletActiveClass: 'home-view__profile-slider-pagination-bullet-active',
		clickable: true
	},
	keyboard: true,
}
</script>

<template>
  <div class="home-view offset-page">
    <div class="container">
      <div class="home-view__about">
        <div class="home-view__about-inner">
          <div class="home-view__about-left-side">
            <div class="home-view__about-left-side-inner">
              <div class="home-view__profile-slider-wrapper">
                <UISlider
                  class="home-view__profile-slider"
                  :modules="modules"
                  :swiper-options="swiperOptions"
                  :slides="profile.photos"
                >
                  <template #slider-content="{ slide }">
                    <a
                      class="home-view__about-img-link glightbox"
                      :href="slide.url"
                    >
                      <div class="home-view__about-img-wrapper">
                        <img
                          :src="slide.url"
                          :alt="slide.alt"
                          width="280px"
                          height="280px"
                        />
                      </div>
                    </a>
                  </template>
                  <template #pagination>
                    <div
                      v-if="profile.photos && profile.photos.length >= 1"
                      class="home-view__profile-slider-pagination swiper-pagination"
                    >
                      <span class="visually-hidden">Пагинация</span>
                    </div>
                  </template>
                </UISlider>
              </div>

              <div class="home-view__about-left-side-inner-content">
                <p class="home-view__about-name s1">{{ profile.name }}</p>
                <p class="home-view__about-position s3">{{ profile.position }}</p>
                <ul class="home-view__about-social-list">
                  <li class="home-view__about-social-item">
                    <a class="home-view__about-social-link" href="https://vk.com/id9716085" target="_blank">
                      <IconVk class="home-view__about-icon" /> <span>/id9716085</span>
                    </a>
                  </li class="home-view__about-social-item">
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
                Frontend-разработчик с практическим опытом работы на Vue/Nuxt. Специализируюсь на
                использовании как Options API, так и Composition API совместно с Typescript. Постоянно совершенствую
                свои навыки и стремлюсь к профессиональному росту в области frontend-разработки
              </p>
            </li>
            <li>
              <p class="home-view__about-description p1">
                Образование: Пензенский государственный университет (бывший ППИ). Факультет информатики и
                вычислительной техники (ФВТ)
              </p>
            </li>
          </ul>
        </div>
      </div>

      <DescriptionUnit :description="description" />
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/scss/general/variables';

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
			background-color: variables.$color-vue;

			@media (min-width: variables.$desktop) {
				bottom: -40px;
			}
		}

		@media (min-width: variables.$desktop) {
			margin-bottom: 80px;
		}
	}

	&__about-inner {
		display: grid;
		grid-template-columns: 100%;
		grid-gap: 24px;

		@media (min-width: variables.$desktop) {
			margin-bottom: 32px;
			grid-template-columns: repeat(12, 1fr);
		}
	}

	&__about-left-side {
		@media (min-width: variables.$desktop) {
			grid-column: 1 / 10;
		}
	}

	&__about-left-side-inner {
		display: flex;
		flex-direction: column;

		@media (min-width: variables.$desktop) {
			flex-direction: row;
		}
	}

  &__about-img-link {
    display: block;
    width: 280px;
		min-width: 280px;
		height: 280px;
		border-radius: 50%;
		overflow: hidden;
  }

	&__about-img-wrapper {
		width: 280px;
		min-width: 280px;
		height: 280px;
		border-radius: 50%;
		overflow: hidden;
	}

	&__about-name {
		margin-bottom: 4px;

		@media (min-width: variables.$desktop) {
			margin-bottom: 8px;
		}
	}

	&__about-position {
		margin-bottom: 16px;

		@media (min-width: variables.$desktop) {
			margin-bottom: 24px;
		}
	}

  &__about-social-item {
    margin-bottom: 12px;

    &:last-child {
      margin-bottom: 0;
    }
  }

	&__about-social-link {
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
		@media (min-width: variables.$desktop) {
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

  &__profile-slider-wrapper {
    width: 350px;
    height: 350px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
  }

  &__profile-slider {
    margin: 0 0 32px;
    padding-bottom: 30px;

    @media (min-width: variables.$desktop) {
      margin: 0 32px 0 0;
    }
  }

  &__profile-slider-pagination {
    margin-top: 12px;
    display: flex;
    justify-content: center;
  }

  &__profile-slider-pagination-bullet {
    margin-right: 6px;
    display: block;
    width: 10px;
    height: 10px;
    background-color: variables.$color-vue-bg;
    border-radius: 50%;

    &:last-child {
      margin-right: 0;
    }
  }

  &__profile-slider-pagination-bullet-active {
    background-color: variables.$color-vue;
  }
}

.slider__slide {
  width: 280px;
  height: 280px;
  display: flex;
  justify-content: center;
}
</style>
