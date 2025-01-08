<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import gsap from 'gsap'
import AppLoading from '@/components/App/AppLoading.vue'
import { useSplashScreenStore } from '@/stores/storeSplashScreen'
import { useScrollController } from '@/composables/useScrollController'

const storeSplashScreen = useSplashScreenStore()
const isSplashScreenStore = computed(() => storeSplashScreen.isSplashScreen)
const startSplashScreenStore = (flag: boolean) => storeSplashScreen.startSplashScreen(flag)

const tlSplashScreenContent = ref<boolean>(false)
let tlSplashScreen

const animateSplashScreen = () => {
	tlSplashScreenContent.value = true
	useScrollController.disableScroll()
	tlSplashScreen = gsap.timeline()
	tlSplashScreen
		.add(
			gsap.from('.splash-screen__title', {
				duration: 2.2,
				opacity: 0,
				translateY: '440%',
			})
		)
		.add(
			gsap.from('.splash-screen__sub-title', {
				duration: 1.8,
				opacity: 0,
				translateY: '330%',
			}),
			0.9
		)
		.add(
			gsap.to('.splash-screen__title', {
				duration: 9,
				opacity: 0,
				scale: 0.2,
			}),
			2.7
		)
		.add(
			gsap.to('.splash-screen__sub-title', {
				duration: 7,
				opacity: 0,
				scale: 0.2,
			}),
			3.6
		)
		.add(
			gsap.to('.splash-screen', {
				duration: 0.5,
				opacity: 0,
			}),
			7.1
		)
	setTimeout(() => {
		startSplashScreenStore(true)
	}, 7300)
}

onMounted(() => {
	if (!isSplashScreenStore.value) animateSplashScreen()
})
</script>

<template>
	<div v-show="!isSplashScreenStore" class="splash-screen">
		<AppLoading :is-loading="!tlSplashScreenContent" />
		<div v-show="!isSplashScreenStore && tlSplashScreenContent" class="splash-screen__inner">
			<div class="container">
				<div v-show="!isSplashScreenStore && tlSplashScreenContent" class="splash-screen__inner-box">
					<p class="splash-screen__title h1">Hello my friend!</p>
					<p class="splash-screen__sub-title h2">Welcome into portfolio by Vladimir Pobedinskiy on Vue</p>
				</div>
			</div>
		</div>
	</div>
</template>

<style lang="scss">
.splash-screen {
	position: fixed;
	left: 0;
	top: 0;
	right: 0;
	bottom: 0;
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
	background-color: $color-white;
	backdrop-filter: blur(5.95px);
	z-index: 10000;

	&__inner-box {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
		color: $color-black;
	}

	&__title {
		margin-bottom: 16px;
		will-change: transform, opacity;

		@media (min-width: $desktop) {
			margin-bottom: 24px;
		}
	}

	&__sub-title {
		will-change: transform, opacity;
	}
}
</style>
