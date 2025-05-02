<script setup lang="ts">
import { computed } from 'vue'
import { useUserStore } from '@/stores/storeUser'
import { getAuth, signOut } from 'firebase/auth'

const userStore = useUserStore()
const user = computed(() => userStore.user)

const logout = async (): Promise<void> => {
	await signOut(getAuth())
	userStore.logout()
}
</script>

<template>
	<section v-if="user" class="personal-account offset-page">
		<div class="container">
			<div class="personal-account__top">
				<h1 class="personal-account__title h2">Личный кабинет</h1>
				<UIButton
					class="personal-account__btn-out"
					variant="primary"
					size="small"
					type="button"
					label="Выйти"
					@click="logout"
				/>
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
