<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
// @ts-ignore
import 'swiper/css'

defineProps<{
	swiperOptions: any
	slides: any
}>()
</script>

<template>
	<Swiper
		:slidesPerView="swiperOptions.slidesPerView"
		:spaceBetween="swiperOptions.spaceBetween"
		:speed="swiperOptions.speed"
		:autoplay="swiperOptions.autoplay"
		:keyboard="swiperOptions.keyboard"
		:pagination="swiperOptions.pagination"
		:navigation="swiperOptions.navigation"
		:breakpoints="swiperOptions.breakpoints"
		class="slider">
		<template v-if="$slots['slider-content']">
			<SwiperSlide v-for="slide in slides" :key="slide.id" class="slider__slide">
				<slot name="slider-content" :slide="slide" />
			</SwiperSlide>
		</template>
		<template v-if="$slots.pagination">
			<div v-if="slides && slides.length > 1" class="swiper-pagination-wrapper">
				<slot name="pagination" />
			</div>
		</template>
	</Swiper>
</template>

<style lang="scss">
.slider {
	overflow: hidden;
}

.swiper-wrapper {
	will-change: transform;
}
</style>
