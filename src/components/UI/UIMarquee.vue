<script setup lang="ts">
import { Vue3Marquee } from 'vue3-marquee'

withDefaults(
	defineProps<{
		direction: 'reverse' | 'normal'
		duration: number
		pauseOnHover?: boolean
		pauseOnClick?: boolean
		/** Количество экземпляров, которые должна запустить анимация бегущей строки (0 — бесконечность) */
		loop?: number
		gradient?: boolean
		gradientColor?: any
		gradientLength?: string
		vertical?: boolean
		/** Анимировать ли бегущую строку, если содержимое выходит за пределы контейнера */
		animateOnOverflowOnly?: boolean
	}>(),
	{
		direction: 'normal',
		duration: 40,
		pauseOnHover: true,
		pauseOnClick: false,
		loop: 0,
		gradient: false,
		gradientColor: [240, 250, 230],
		gradientLength: '30px',
		vertical: false,
		animateOnOverflowOnly: false,
	}
)
</script>

<template>
	<Vue3Marquee
		:direction="direction"
		:duration="duration"
		:pause-on-hover="pauseOnHover"
		:pause-on-click="pauseOnClick"
		:loop="loop"
		:gradient="gradient"
		:gradient-color="gradientColor"
		:gradient-length="gradientLength"
		:vertical="vertical"
		:animate-on-overflow-only="animateOnOverflowOnly"
		class="ui-marquee"
	>
		<template v-if="$slots['marquee-content']">
			<slot name="marquee-content" />
		</template>
	</Vue3Marquee>
</template>

<style lang="scss">
.ui-marquee {
	overflow: hidden;
}
</style>
