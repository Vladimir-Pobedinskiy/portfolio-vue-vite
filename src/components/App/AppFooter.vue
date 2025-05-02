<script setup lang="ts">
import { computed } from 'vue'
import { useGeneralStore } from '@/stores/storeGeneral'
import AppNavigation from '@/components/App/AppNavigation.vue'

const storeGeneral = useGeneralStore()
const navStore = computed(() => storeGeneral.nav)

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
	<footer class="footer">
		<div class="container">
			<div class="footer__inner">
				<div class="footer__top">
					<AppNavigation :nav="navStore" />
				</div>
				<div class="footer__bottom">
					<p class="footer__title">© {{ currentYear }} Все права защищены.</p>
				</div>
			</div>
		</div>
	</footer>
</template>

<style lang="scss">
.footer {
	padding: 30px 0;
	background-color: $color-vue;
	z-index: 999;

	@media (min-width: $desktop) {
		padding: 40px 0;
	}

	&__inner {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	&__top {
		margin-bottom: 16px;
	}

	&__title {
		font-size: 16px;
	}

	// nav

	.nav__list {
		text-align: center;

		@media (min-width: $tablet) {
			flex-direction: row;
		}
	}

	.nav__item {
		@media (max-width: $tablet-for-maxWidth) {
			margin-bottom: 16px;
		}

		@media (min-width: $tablet) {
			margin-right: 20px;
			margin-bottom: 0;

			&:last-child {
				margin-right: 0;
			}
		}
	}
}
</style>
