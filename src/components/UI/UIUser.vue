<script setup lang="ts">
import { RouterLink } from 'vue-router'
import IconUser from '@/assets/icons/icon-user.svg'
</script>

<template>
	<RouterLink :to="{ name: 'personal-account-view' }" class="ui-user" aria-label="В Личный кабинет">
		<IconUser class="ui-user__icon" />
	</RouterLink>
</template>

<style lang="scss">
.ui-user {
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
