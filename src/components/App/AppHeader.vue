<script setup lang="ts"></script>

<template>
	<header class="header">
		<div class="container">
			<div class="header__inner">
				<router-link class="header__logo h4" :to="{ name: 'home-view' }">
					<h1 class="h1">PORTFOLIO</h1>
				</router-link>
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

	&__burger-btn {
		z-index: 999;

		@media (min-width: $desktop) {
			display: none;
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
