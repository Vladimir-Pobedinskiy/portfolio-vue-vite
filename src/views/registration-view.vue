<script setup lang="ts">
import AuthSignUp from '@/components/Auth/AuthSignUp.vue'
</script>

<template>
	<section class="registration-page offset-page">
		<div class="container-auth">
			<h1 class="registration-page__title title h2">Регистрация</h1>
			<AuthSignUp />
		</div>
	</section>
</template>

<style lang="scss">
.registration-page {
	width: 100%;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: center;

	&__title {
		text-align: center;
	}
}
</style>
