<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useGeneralStore } from '@/stores/storeGeneral'
import { useMenuStore } from '@/stores/storeMenu'
import { useDesktopHandler } from '@/composables/useDesktopHandler'
import { useSwipeHandler } from '@/composables/useSwipeHandler'
import { screens } from '@/utils/utils'
import UIUserLink from '@/components/UI/UIUserLink.vue'

const route = useRoute()
const { isDesktop } = useDesktopHandler(screens.desktop)

const storeGeneral = useGeneralStore()
const navStore = computed(() => storeGeneral.nav)

const storeMenu = useMenuStore()
const menuName = computed(() => storeMenu.menuName)
const toggleState = (name: string) => storeMenu.toggleState(name)

watch(route, () => {
	if (menuName.value === 'navigation') {
		toggleState(menuName.value)
	}
})

const handleBurgerClick = () => {
	toggleState('navigation')
}

const navigation = ref<HTMLElement | null>(null)
useSwipeHandler(navigation, 'navigation', 'left', screens.desktop)
</script>

<template>
	<header class="header">
		<div class="container">
			<div class="header__inner">
				<button
					v-if="!isDesktop"
					:class="['burger-btn', { active: menuName === 'navigation' }]"
					type="button"
					@click="handleBurgerClick"
				>
					<span class="burger-btn__label">
						<span class="visually-hidden">открыть меню</span>
					</span>
				</button>

				<template v-if="route.name === 'home-view'">
					<span class="header__logo h4">PORTFOLIO</span>
				</template>
				<template v-else>
					<RouterLink class="header__logo h4" :to="{ name: 'home-view' }">PORTFOLIO</RouterLink>
				</template>
				<div ref="navigation" :class="['header__nav-list-wrapper', { active: menuName === 'navigation' }]">
					<ul class="nav-list">
						<li v-for="(item, i) in navStore" :key="i" class="nav-item">
							<RouterLink class="nav-link p1 hover-from-center" :to="`${item.url}`">{{ item.title }}</RouterLink>
						</li>
					</ul>
				</div>

				<ul class="nav-user">
					<li class="nav-user__item">
						<UIUserLink />
					</li>
				</ul>
			</div>
		</div>
	</header>
</template>

<style lang="scss">
.header {
	width: 100%;
	position: fixed;
	left: 0;
	top: 0;
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
