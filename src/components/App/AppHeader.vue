<script setup lang="ts">
import { computed } from 'vue'
import { useGeneralStore } from '@/stores/storeGeneral'
import { useScreenHandler } from '@/composables/useScreenHandler'
import { screens } from '@/utils/utils'
import AppBurger from '@/components/App/AppBurger.vue'
import AppLogo from '@/components/App/AppLogo.vue'
import AppNavigation from '@/components/App/AppNavigation.vue'
import UIUserLink from '@/components/UI/UIUserLink.vue'

const { isMatchedScreen } = useScreenHandler(screens.desktop)
const storeGeneral = useGeneralStore()
const navStore = computed(() => storeGeneral.nav)
</script>

<template>
	<header class="header">
		<div class="container">
			<div class="header__inner">
				<AppBurger />
				<AppLogo />
				<AppNavigation v-if="isMatchedScreen" :nav="navStore" />

				<UIUserLink />
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
}
</style>
