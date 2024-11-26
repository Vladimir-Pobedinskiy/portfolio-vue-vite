<script setup lang="ts">
import AuthLogin from '@/components/Auth/AuthLogin.vue'
</script>

<template>
	<div class="login-page offset-page">
		<div class="container-auth">
			<h1 class="login-page__title title h2">Вход</h1>
			<AuthLogin />
		</div>
	</div>
</template>

<style lang="scss">
.login-page {
	width: 100%;
	height: 100% !important;
	display: flex;
	align-items: center;
	justify-content: center;

	&__title {
		text-align: center;
	}
}
</style>
