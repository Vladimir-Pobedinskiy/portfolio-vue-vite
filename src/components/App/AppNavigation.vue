<script setup lang="ts">
interface NavItem {
	url: string
	title: string
}

defineProps<{
	nav: NavItem[]
}>()
</script>

<template>
	<div class="nav">
		<ul class="nav__list">
			<li v-for="(link, i) in nav" :key="i" class="nav__item">
				<RouterLink class="nav__link p1 hover-from-center" :to="`${link.url}`">{{ link.title }}</RouterLink>
			</li>
		</ul>
	</div>
</template>

<style lang="scss">
.nav {
	&__list {
		display: flex;

		@media (max-width: $desktop-for-maxWidth) {
			flex-direction: column;
		}

		@media (min-width: $desktop) {
			align-items: center;
		}
	}

	&__item {
		margin-bottom: 20px;

		&:last-child {
			margin-bottom: 0;
		}

		@media (min-width: $desktop) {
			margin-bottom: 0;
			margin-right: 20px;

			&:last-child {
				margin-right: 0;
			}
		}
	}

	&__link {
		&.active {
			border-bottom: 2px solid $color-black;
		}
	}
}
</style>
