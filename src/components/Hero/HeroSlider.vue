<script setup lang="ts">
import { Navigation, Autoplay, Keyboard } from 'swiper/modules'
import UISlider from '@/components/UI/UISlider.vue'
import HeroCard from '@/components/Hero/HeroCard.vue'
import type { IHeroPreview } from '@/interfaces/heroes'
import IconArrow from '@/assets/icons/icon-arrow-forward.svg'

defineProps<{
	heroList: IHeroPreview[]
}>()

const modules = [Navigation, Autoplay, Keyboard]
const swiperOptions = {
	slidesPerView: 1.2,
	spaceBetween: 8,
	speed: 900,
	autoplay: {
		delay: 4000,
	},
	keyboard: true,
	navigation: {
		nextEl: '.hero-slider__button-next',
		prevEl: '.hero-slider__button-prev',
	},
	breakpoints: {
		320: {
			slidesPerView: 1.2,
			spaceBetween: 8,
		},
		400: {
			slidesPerView: 1.3,
			spaceBetween: 8,
		},
		576: {
			slidesPerView: 1.5,
			spaceBetween: 8,
		},
		700: {
			slidesPerView: 2.1,
			spaceBetween: 8,
		},
		767: {
			slidesPerView: 2.3,
			spaceBetween: 16,
		},
		992: {
			slidesPerView: 2.5,
			spaceBetween: 16,
		},
		1200: {
			slidesPerView: 3,
			spaceBetween: 16,
		},
	},
}
</script>

<template>
	<section class="hero-slider offset">
		<div class="hero-slider__top">
			<h2 class="hero-slider__title h1">Герои</h2>
			<div class="hero-slider__navigation-wrapper">
				<span class="visually-hidden">Стрелки навигации по слайдеру</span>
				<button class="hero-slider__button-prev swiper-button-prev" type="button">
					<span class="visually-hidden">К предыдущему слайду</span>
					<IconArrow class="hero-slider__button-icon hero-slider__button--prev-icon" />
				</button>
				<button class="hero-slider__button-next swiper-button-next" type="button">
					<span class="visually-hidden">К следующему слайду</span>
					<IconArrow class="hero-slider__button-icon hero-slider__button--next-icon" />
				</button>
			</div>
		</div>
		<div class="hero-slider__inner">
			<UISlider :modules="modules" :swiper-options="swiperOptions" :slides="heroList">
				<template #slider-content="{ slide }">
					<HeroCard :hero="slide" />
				</template>
			</UISlider>
		</div>
	</section>
</template>

<style lang="scss">
.hero-slider {
	&__top {
		margin-bottom: 24px;

		@media (min-width: $tablet) {
			margin-bottom: 32px;
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
	}

	&__title {
		text-transform: uppercase;
	}

	&__navigation-wrapper {
		width: 100%;
		max-width: 130px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&__button-prev,
	&__button-next {
		@media (min-width: $desktop) {
			cursor: pointer;
		}
	}

	&__button-icon {
		width: 40px;
		height: 40px;
		color: $color-white;
		transition: color 0.3s ease;
	}
}

.hero-slider__button-prev.swiper-button-prev,
.hero-slider__button-next.swiper-button-next {
	display: none;

	@media (min-width: $desktop) {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 54px;
		height: 54px;
		background-color: $color-gray-dark;
		border-radius: 50%;
		color: $color-white;
		transition:
			background-color 0.3s ease,
			border-color 0.3s ease;

		&:hover {
			transition:
				background-color 0.3s ease,
				border-color 0.3s ease;

			.hero-slider__button-icon {
				color: $color-white;
				transition: color 0.3s ease;
			}
		}

		&:active {
			transition:
				background-color 0.3s ease,
				border-color 0.3s ease;
		}
	}
}

.hero-slider__button-prev.swiper-button-prev.swiper-button-disabled,
.hero-slider__button-next.swiper-button-next.swiper-button-disabled {
	background-color: $color-gray-disabled;
	border: none;
	transition:
		background-color 0.3s ease,
		color 0.3s ease;
	cursor: default;

	.hero-slider__button-icon {
		color: $color-gray-light;
		transition: color 0.3s ease;
	}
}

.hero-slider__button--prev-icon {
	transform: rotate(-180deg);
}
</style>
