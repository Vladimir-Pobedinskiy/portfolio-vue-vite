<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useDesktopHandler } from '@/composables/useDesktopHandler'
import { useSwipeHandler } from '@/composables/useSwipeHandler'
import { useMenuStore } from '@/stores/storeMenu'
import { screens } from '@/utils/utils'
import UIUser from '@/components/UI/UIUser.vue'

const route = useRoute()
const { isDesktop } = useDesktopHandler(screens.desktop)

const storeMenu = useMenuStore()
const isOpen = computed(() => storeMenu.isOpen)
const toggleState = (name: string) => storeMenu.toggleState(name)

watch(route, () => {
	if (isOpen.value === 'navigation') {
		toggleState(isOpen.value)
	}
})

const handleBurgerClick = () => {
	toggleState('navigation')
}

const navigation = ref<HTMLElement | null>(null)
useSwipeHandler(navigation, isOpen, 'left', screens.desktop)
</script>

<template>
	<header class="header">
		<div class="container">
			<div class="header__inner">
				<template v-if="route.name === 'home-view'">
					<span class="header__logo h4">PORTFOLIO</span>
				</template>
				<template v-else>
					<RouterLink class="header__logo h4" :to="{ name: 'home-view' }">PORTFOLIO</RouterLink>
				</template>

				<div ref="navigation" :class="['header__nav-list-wrapper', { active: isOpen === 'navigation' }]"></div>

				<ul v-if="isDesktop" class="nav-user">
					<li class="nav-user__item">
						<UIUser />
					</li>
				</ul>

				<button
					v-if="!isDesktop"
					:class="['burger-btn', { active: isOpen === 'navigation' }]"
					type="button"
					@click="handleBurgerClick"
				>
					<span class="burger-btn__label">
						<span class="visually-hidden">открыть меню</span>
					</span>
				</button>
			</div>
		</div>
	</header>
</template>

<style lang="scss">
.header {
	position: relative;
	padding: 20px 0;
	min-height: 66px;
	background-color: $color-vue;
	z-index: 998;

	@media (min-width: $desktop) {
		padding: 25px 0;
		min-height: 82px;
	}

	&__inner {
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	&__logo {
		position: relative;
		z-index: 999;
	}

	&__nav-list-wrapper {
		@media (max-width: $desktop-for-maxWidth) {
			position: fixed;
			left: 0;
			top: 0;
			height: 100vh;
			width: 100%;
			padding: 94px 16px 150px;
			opacity: 0;
			visibility: hidden;
			overflow-y: auto;
			transform: translateX(-200%);
			background-color: $color-vue;
			z-index: 998;
			transition:
				transform 0.3s ease,
				opacity 0.3s ease,
				visibility 0.3s ease;

			&.active {
				opacity: 1;
				visibility: visible;
				transform: translateX(0);
				transition:
					transform 0.5s ease,
					opacity 0.3s ease,
					visibility 0.3s ease;
			}
		}
	}

	.nav-item {
		@media (max-width: $desktop-for-maxWidth) {
			text-transform: uppercase;
		}
	}
}

.nav-user {
	@media (min-width: $desktop) {
		display: flex;
		align-items: center;
	}

	&__item {
		display: flex;
		align-items: center;
		justify-content: center;

		@media (min-width: $desktop) {
			margin-right: 24px;

			&:last-child {
				margin-right: 0;
			}
		}
	}
}
</style>
