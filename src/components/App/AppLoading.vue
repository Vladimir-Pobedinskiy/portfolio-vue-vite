<script setup lang="ts">
withDefaults(
	defineProps<{
		isLoading: boolean
	}>(),
	{
		isLoading: false,
	}
)
</script>

<template>
	<div v-if="isLoading" class="loading">
		<span class="loading__spinner"></span>
	</div>
</template>

<style lang="scss">
.loading {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 100000;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-color: rgba(39, 39, 42, 0.6);

	&__spinner {
		width: 40px;
		height: 40px;
		backdrop-filter: blur(5.95px);
		border: 4px solid rgba(66, 135, 196, 0.35);
		border-left-color: $color-vue;
		border-radius: 50%;
		animation: progress-circular 1s infinite linear;
		will-change: transform;

		@media (min-width: $desktop) {
			width: 50px;
			height: 50px;
		}
	}
}
</style>
