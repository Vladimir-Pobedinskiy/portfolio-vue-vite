<script setup lang="ts">
import { watch, computed } from 'vue'
import { useUserStore } from '../stores/storeUser'

const userStore = useUserStore()
const user = computed(() => userStore.user)
const logout = userStore.logout
</script>

<template>
	<section v-if="user" class="personal-account offset-page">
		<div class="container">
			<div class="personal-account__top">
				<h1 class="personal-account__title h2">Личный кабинет</h1>
				<button class="personal-account__btn-out btn btn-small" type="button" @click="logout">Выйти</button>
			</div>
			<div class="personal-account__content">
				<p class="p1">Контент персонального аккаунта</p>
			</div>
		</div>
	</section>
</template>

<style lang="scss">
.personal-account {
	&__top {
		margin-top: 32px;
		display: flex;
		align-items: center;
		justify-content: space-between;

		@media (min-width: $desktop) {
			margin-bottom: 40px;
		}
	}

	&__title {
		text-transform: uppercase;
	}

	&__btn-out {
		width: 100%;
		max-width: 100px;
	}
}
</style>
