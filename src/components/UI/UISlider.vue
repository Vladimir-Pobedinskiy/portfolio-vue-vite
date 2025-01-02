<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'

defineProps<{
	swiperOptions: any
	slides: any
}>()
</script>

<template>
	<Swiper
		v-bind="$attrs"
		:slidesPerView="swiperOptions.slidesPerView"
		:spaceBetween="swiperOptions.spaceBetween"
		:speed="swiperOptions.speed"
		:autoplay="swiperOptions.autoplay"
		:keyboard="swiperOptions.keyboard"
		:pagination="swiperOptions.pagination"
		:navigation="swiperOptions.navigation"
		:breakpoints="swiperOptions.breakpoints"
		class="slider"
	>
		<template v-if="$slots['slider-content']">
			<SwiperSlide v-for="(slide, i) in slides" :key="i" class="slider__slide">
				<slot name="slider-content" :slide="slide" />
			</SwiperSlide>
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
