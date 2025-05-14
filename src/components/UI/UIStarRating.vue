<script lang="ts" setup>
import StarRating from 'vue-star-rating'

withDefaults(
	defineProps<{
		increment?: number
		maxRating?: number
		showRating?: boolean
		readOnly: boolean
		padding?: number
		size?: number
		inactiveColor?: string
		activeColor?: string
		borderColor?: string
		borderWidth?: number
		roundedCorners?: boolean
		inline?: boolean
		glow?: number
		glowColor?: string
		starPoints?: number[]
		animate?: boolean
	}>(),
	{
		increment: 1,
		maxRating: 5,
		showRating: false,
		readOnly: true,
		padding: 4,
		size: 23,
		inactiveColor: '#ffffff',
		activeColor: '#7fbfa4',
		borderColor: '#7fbfa4',
		borderWidth: 1,
		roundedCorners: true,
		inline: false,
		glow: 1,
		glowColor: '#0b873e',
		starPoints: () => [23, 2, 14, 17, 0, 19, 10, 34, 7, 50, 23, 43, 38, 50, 36, 34, 46, 19, 31, 17],
		animate: false,
	}
)

const rating = defineModel<number>('rating')
</script>

<template>
	<StarRating
		v-model:rating="rating"
		:increment="increment"
		:max-rating="maxRating"
		:show-rating="showRating"
		:read-only="readOnly"
		:padding="padding"
		:star-size="size"
		:inactive-color="inactiveColor"
		:active-color="activeColor"
		:border-color="borderColor"
		:border-width="borderWidth"
		:rounded-corners="roundedCorners"
		:inline="inline"
		:glow="glow"
		:glow-color="glowColor"
		:star-points="starPoints"
		:animate="animate"
		class="ui-rating"
	/>
</template>

<style lang="scss">
.vue-star-rating-pointer .vue-star-rating-star {
	display: flex;
	align-items: center;
	justify-content: center;
}
</style>
