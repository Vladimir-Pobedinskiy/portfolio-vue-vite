<script setup lang="ts">
withDefaults(
	defineProps<{
		isLoading?: boolean
		isLoadingLocal?: boolean
	}>(),
	{
		isLoading: false,
		isLoadingLocal: false,
	}
)
</script>

<template>
	<div v-if="isLoading || isLoadingLocal" :class="['loading', { 'loading-local': isLoadingLocal }]">
		<span class="loading__spinner"></span>
	</div>
</template>

<style lang="scss">
@use '@/assets/scss/general/variables';

.loading {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 100000;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 100%;
	height: 100%;
	background-color: rgba(44, 60, 74, 35%);
	backdrop-filter: blur(5.95px);

	&.loading-local {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
	}

	&__spinner {
		width: 40px;
		height: 40px;
		border: 4px solid rgba(66, 135, 196, 35%);
		border-left-color: variables.$color-vue;
		border-radius: 50%;
		animation: progress-circular 1s infinite linear;
		will-change: transform;

		@media (min-width: variables.$desktop) {
			width: 50px;
			height: 50px;
		}
	}
}
</style>
