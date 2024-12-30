<script setup lang="ts">
import IconUser from '@/assets/icons/icon-user.svg'
</script>

<template>
	<RouterLink :to="{ name: 'personal-account-view' }" class="ui-user-link" aria-label="В Личный кабинет">
		<IconUser class="ui-user-link__icon" />
	</RouterLink>
</template>

<style lang="scss">
.ui-user-link {
	display: flex;
	align-items: center;
	justify-content: center;

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
