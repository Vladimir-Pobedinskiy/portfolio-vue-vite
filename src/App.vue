<script setup lang="ts">
import AppHeader from '@/components/App/AppHeader.vue'
</script>

<template>
	<AppHeader />
	<main class="main">
		<RouterView v-slot="{ Component }">
			<Transition name="page" mode="out-in">
				<component :is="Component" />
			</Transition>
		</RouterView>
	</main>
</template>

<style lang="scss">
.page-enter-active,
.page-leave-active {
	transition:
		opacity 0.3s ease-in-out,
		visibility 0.3s ease-in-out;
}

.page-enter-from,
.page-leave-to {
	opacity: 0;
	visibility: hidden;
}
</style>
