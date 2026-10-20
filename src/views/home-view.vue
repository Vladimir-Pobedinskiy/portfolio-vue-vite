<script setup lang="ts">
  /* eslint-disable-next-line */
// @ts-ignore
import { profile } from '~/moke/profile.js'
import HomeHero3D from '@/components/Home/HomeHero3D.vue'
import { Pagination, Keyboard } from 'swiper/modules'
import UISlider from '@/components/UI/UISlider.vue'
import { useGLightbox } from '@/composables/useGLightbox'
import IconVk from '@/assets/icons/icon-vk.svg'
import IconTg from '@/assets/icons/icon-tg.svg'

const projectInfo = {
	title: 'Технологии и решения',
	groups: [
		{
			title: 'Стек',
			items: [
				'Vue 3, TypeScript, Vite',
				'Pinia с сохранением состояния между сессиями, Vue Router',
				'SCSS по методологии БЭМ, ESLint, Prettier и Stylelint',
			],
		},
		{
			title: 'Архитектура',
			items: [
				'Разбиение на переиспользуемые UI-компоненты, composables, store',
				'Ленивая загрузка страниц и защищённые маршруты с проверкой авторизации',
				'Страница 404 для несуществующих роутов',
			],
		},
		{
			title: 'Интерфейс и анимации',
			items: [
				'3D-сцена на Three.js с анимацией по скроллу (GSAP ScrollTrigger)',
				'Адаптивная вёрстка по принципу Mobile First',
				'Плавные переходы между страницами без перезагрузки',
			],
		},
		{
			title: 'Деплой',
			items: ['Сборка и публикация на GitHub Pages'],
		},
	],
	note: {
		comment: '// мои рабочие проекты',
		section: 'Коммерческие проекты',
		url: '/commercial-projects',
	},
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
    <HomeHero3D />

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
                      class="home-view__profile-slider-img-link glightbox"
                      :href="slide.url"
                    >
                      <div class="home-view__profile-slider-img-wrapper">
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
                Образование: Пензенский государственный университет (бывший ППИ). Факультет вычислительной техники (ФВТ)
              </p>
            </li>
          </ul>
        </div>
      </div>

      <div class="home-view__project">
        <h1 class="title h1">{{ projectInfo.title }}</h1>

        <div class="home-view__project-groups">
          <div v-for="group in projectInfo.groups" :key="group.title" class="home-view__project-group">
            <p class="home-view__project-group-title s2">{{ group.title }}</p>
            <ul class="home-view__project-list">
              <li v-for="item in group.items" :key="item" class="home-view__project-item p1">{{ item }}</li>
            </ul>
          </div>
        </div>

        <RouterLink
          class="home-view__project-note"
          :to="projectInfo.note.url"
          :aria-label="`Мои рабочие проекты — раздел «${projectInfo.note.section}»`"
        >
          <span class="home-view__project-note-line" aria-hidden="true">
            <span class="home-view__project-note-number">01</span>
            <span class="home-view__project-note-comment">{{ projectInfo.note.comment }}</span>
          </span>
          <span class="home-view__project-note-line" aria-hidden="true">
            <span class="home-view__project-note-number">02</span>
            <span>
              <span class="home-view__project-note-object">router</span>.<span
                class="home-view__project-note-method">push</span>(<span
                class="home-view__project-note-string">'{{ projectInfo.note.section }}'</span>)<span
                class="home-view__project-note-cursor"></span>
            </span>
          </span>
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@use '@/assets/scss/general/variables';

.home-view {
	&.offset-page {
		padding-top: 0;
	}

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

  &__profile-slider-img-link {
    display: block;
    width: 280px;
    min-width: 280px;
    height: 280px;
    border-radius: 50%;
    overflow: hidden;
  }

  &__profile-slider-img-wrapper {
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
    margin-bottom: 8px;
    height: 350px;

    @media (min-width: variables.$desktop) {
      margin-bottom: 0;
      width: 350px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &__profile-slider {
    padding-bottom: 16px;

    @media (min-width: variables.$desktop) {
      margin: 0 32px 0 0;
    }
  }

  &__project-groups {
    margin-bottom: 32px;
    display: grid;
    grid-template-columns: 100%;
    gap: 24px;

    @media (min-width: variables.$tablet) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (min-width: variables.$desktop) {
      grid-template-columns: repeat(4, 1fr);
      gap: 40px 32px;
    }
  }

  &__project-group-title {
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid rgba(variables.$color-vue, 0.4);
    color: variables.$color-vue;
  }

  &__project-list {
    padding-left: 22px;
  }

  &__project-item {
    margin-bottom: 8px;
    list-style: disc;

    &:last-child {
      margin-bottom: 0;
    }

    &::marker {
      color: variables.$color-vue;
    }
  }

  &__project-note {
    display: inline-flex;
    flex-direction: column;
    max-width: 100%;
    padding: 12px 20px 12px 0;
    border-left: 2px solid variables.$color-vue;
    border-radius: 0 8px 8px 0;
    font-family: ui-monospace, 'SFMono-Regular', 'Cascadia Code', Consolas, monospace;
    font-size: 15px;
    line-height: 1.7;
    color: variables.$color-gray-dark;
    transition: background-color 0.2s;

    @media (min-width: variables.$desktop) {
      font-size: 17px;
    }

    &:hover,
    &:focus-visible {
      background-color: rgba(variables.$color-vue, 0.07);

      .home-view__project-note-string {
        text-decoration: underline;
        text-underline-offset: 4px;
      }
    }
  }

  &__project-note-line {
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &__project-note-number {
    flex-shrink: 0;
    width: 3.5ch;
    margin-right: 1.5ch;
    text-align: right;
    color: variables.$color-gray-light;
    user-select: none;
  }

  &__project-note-comment {
    color: variables.$color-gray-medium;
    font-style: italic;
  }

  &__project-note-object {
    color: #0b6e99;
  }

  &__project-note-method {
    color: #795e26;
  }

  &__project-note-string {
    color: #047857;
  }

  &__project-note-cursor {
    display: inline-block;
    width: 2px;
    height: 1.1em;
    margin-left: 2px;
    vertical-align: text-bottom;
    background-color: variables.$color-gray-dark;
    animation: project-note-cursor 1.1s steps(1) infinite;

    @media (prefers-reduced-motion: reduce) {
      animation: none;
    }
  }

  &__profile-slider-pagination {
    margin-top: 16px;
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
    transform: scale(1);
    transition: transform 0.3s;

    &:last-child {
      margin-right: 0;
    }
  }

  &__profile-slider-pagination-bullet-active {
    background-color: variables.$color-vue;
    transform: scale(1.2);
    transition: transform 0.3s;
  }
}

.slider__slide {
  width: 280px;
  height: 280px;
  display: flex;
  justify-content: center;
}

@keyframes project-note-cursor {
  50% {
    opacity: 0;
  }
}
</style>
