<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useGeneralStore } from '@/stores/storeGeneral'
import { useScreenHandler } from '@/composables/useScreenHandler'
import { useMenuStore } from '@/stores/storeMenu'
import { useSwipeHandler } from '@/composables/useSwipeHandler'
import { screens } from '@/utils/utils'
import AppNavigation from '@/components/App/AppNavigation.vue'

const route = useRoute()

const { isMatchedScreen } = useScreenHandler(screens.desktop)
const storeGeneral = useGeneralStore()
const navStore = computed(() => storeGeneral.nav)

const storeMenu = useMenuStore()
const menuName = computed(() => storeMenu.menuName)
const toggleState = (name: string) => storeMenu.toggleState(name)

const handleBurgerClick = () => {
	toggleState('navigation')
}

watch(route, () => {
	if (menuName.value === 'navigation') {
		toggleState(menuName.value)
	}
})

const navigation = ref<HTMLElement | null>(null)
useSwipeHandler(navigation, 'navigation', 'left', screens.desktop)
</script>

<template>
	<div v-if="!isMatchedScreen" class="burger">
		<button :class="['burger-btn', { active: menuName === 'navigation' }]" type="button" @click="handleBurgerClick">
			<span class="burger-btn__label">
				<span class="visually-hidden">открыть меню</span>
			</span>
		</button>

		<div ref="navigation" :class="['burger-nav', { active: menuName === 'navigation' }]">
			<AppNavigation :nav="navStore" />
		</div>
	</div>
</template>

<style lang="scss">
$burger-height: 2px;

.burger {
	display: flex;
	align-items: center;
	justify-content: center;
}

// burger-btn
.burger-btn {
	position: relative;
	width: 25px;
	height: 18px;
	color: $color-white;
	border: none;
	outline: none;
	background-color: transparent;
	z-index: 999;

	&::before,
	&::after {
		content: '';
	}

	&::before,
	&::after,
	&__label {
		position: absolute;
		left: 0;
		width: 100%;
		height: 2px;
		transition: 0.2s;
		background-color: $color-black;
	}

	&::before {
		top: 0;
	}

	&::after {
		bottom: 0;
	}

	&.active {
		color: $color-black;
	}

	&__label {
		top: calc(50% - ($burger-height / 2));
	}

	&.active::before,
	&.active::after {
		top: calc(50% - ($burger-height / 2));
	}

	&.active::before {
		transform: rotate(45deg);
	}

	&.active::after {
		transform: rotate(-45deg);
	}

	&.active &__label {
		transform: rotate(45deg);
	}
}

// burger-nav
.burger-nav {
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

	.nav__item {
		@media (max-width: $desktop-for-maxWidth) {
			text-transform: uppercase;
		}
	}
}
</style>
