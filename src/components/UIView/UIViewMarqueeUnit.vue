<script setup lang="ts">
import UIMarquee from '@/components/UI/UIMarquee.vue'
import type { IMarquee } from '@/interfaces/ui'

defineProps<{
	marquee: IMarquee | undefined
}>()
</script>

<template>
	<section class="marquee-unit offset">
		<div class="container">
			<h2 class="marquee-unit__title h2">{{ marquee?.title }}</h2>
		</div>
		<UIMarquee direction="normal" :duration="40" class="marquee-unit__marquee">
			<template #marquee-content>
				<div v-for="(item, i) in marquee?.marqueeImages" :key="i" class="marquee-unit__marquee-img-wrapper">
					<img class="marquee-unit__marquee-img" :src="item.url" :alt="item.title" :title="item.title" />
				</div>
			</template>
		</UIMarquee>
	</section>
</template>

<style lang="scss">
.marquee-unit {
	&__title {
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
}
</style>
