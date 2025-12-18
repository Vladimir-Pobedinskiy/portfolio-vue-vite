<script setup lang="ts">
import { onMounted } from 'vue'
import AppHeader from '@/components/App/AppHeader.vue'
import AppFooter from '@/components/App/AppFooter.vue'
import ModalError from '@/components/Modals/ModalError.vue'
import UISplashScreen from '@/components/UI/UISplashScreen.vue'
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

	<AppFooter />
	<ModalError />
	<UISplashScreen />
</template>

<style lang="scss">
.page-enter-active,
.page-leave-active {
	transition: all 0.4s;
}

.page-enter-from,
.page-leave-to {
	opacity: 0;
	filter: blur(1rem);
}
</style>
