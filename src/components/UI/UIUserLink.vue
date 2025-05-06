<script setup lang="ts">
import IconUser from '@/assets/icons/icon-user.svg'
</script>

<template>
	<RouterLink :to="{ name: 'personal-account-view' }" class="ui-user-link" aria-label="В Личный кабинет">
		<span class="visually-hidden">В Личный кабинет</span>
		<IconUser class="ui-user-link__icon" />
	</RouterLink>
</template>

<style lang="scss">
.ui-user-link {
	width: 28px;
	height: 28px;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 999;

	@media (min-width: $desktop) {
		transition: color 0.3s ease;

		&:hover {
			color: $color-white;
			transition: color 0.3s ease;
		}
	}

	&__icon {
		width: 28px;
		height: 28px;
	}
}
</style>
