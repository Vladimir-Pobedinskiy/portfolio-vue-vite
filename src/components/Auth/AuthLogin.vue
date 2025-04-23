<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Form as VeeValidateForm, Field } from 'vee-validate'
import * as Yup from 'yup'
import { useLoadingStore } from '@/stores/storeLoading'
import { useUserStore } from '@/stores/storeUser'
import AppLoading from '@/components/App/AppLoading.vue'
import UIInput from '@/components/UI/UIInput.vue'
/*
  - getAuth: информация о пользователе в системе;
  - signInWithEmailAndPassword: вход с помощью email & password;
*/
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()

const userStore = useUserStore()
const setUser = (token: string) => userStore.setUser(token)

const formRef = ref<any>(null)

interface IForm {
	email: string
	password: string
}
const form = reactive<IForm>({
	email: '',
	password: '',
})
const schema = Yup.object().shape({
	email: Yup.string().required('Email обязателен для заполнения').email('Неверный формат электронной почты'),
	password: Yup.string().required('Пароль обязателен для заполнения').min(6, 'Неверный пароль'),
})

const loadingStore = useLoadingStore()
const isLoading = computed(() => loadingStore.isLoading)
const startLoading = () => loadingStore.startLoading()
const endLoading = () => loadingStore.endLoading()

const onSubmit = async (): Promise<void> => {
	try {
		startLoading()
		const response = await signInWithEmailAndPassword(getAuth(), form.email, form.password)
		setUser((await response.user.getIdTokenResult()).token)
		form.email = ''
		form.password = ''
		await formRef.value.resetForm()
		router.push({ name: 'personal-account-view' })
	} catch (error: any) {
		if (error instanceof Error) {
			formRef.value.setErrors({ password: `${error.message}` })
		} else {
			console.error('Error fetching AuthLogin:', error)
			throw error
		}
	} finally {
		endLoading()
	}
}
</script>

<template>
	<template v-if="isLoading">
		<AppLoading :is-loading="isLoading" />
	</template>
	<div class="login">
		<VeeValidateForm
			ref="formRef"
			v-slot="{ errors }"
			:validation-schema="schema"
			name="login"
			action="#"
			method="POST"
			class="login__form"
			@submit="onSubmit"
		>
			<Field v-slot="{ field }" validate-on-change name="email">
				<UIInput
					v-bind="field"
					v-model:value="form.email"
					:error-value="errors.email"
					type="email"
					name="email"
					placeholder="Электронная почта"
					:disabled="isLoading"
				/>
			</Field>

			<Field v-slot="{ field }" name="password">
				<UIInput
					v-bind="field"
					v-model:value="form.password"
					:error-value="errors.password"
					type="password"
					name="password"
					placeholder="Пароль"
					autocomplete="off"
					:disabled="isLoading"
				/>
			</Field>

			<UIButton
				class="login__btn-submit"
				variant="primary"
				:full="true"
				type="submit"
				:disabled="isLoading"
				text="Войти"
			/>

			<div class="login__btn-wrapper">
				<span class="login__login-title p3">Не зарегистрированы?</span>
				<button class="login__btn" type="button" :disabled="isLoading" @click="$router.push('/registration')">
					Зарегистрироваться
				</button>
			</div>
		</VeeValidateForm>
	</div>
</template>

<style lang="scss">
.login {
	&__btn-submit {
		margin-bottom: 16px;
	}

	&__btn-wrapper {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	&__login-title {
		display: inline-block;
		margin-right: 20px;
		line-height: 1.4;
	}

	&__btn {
		position: relative;
		background-color: transparent;
		transition: color 0.3s ease;

		&::after {
			content: '';
			position: absolute;
			left: 0;
			top: 103%;
			width: 100%;
			height: 1px;
			background-color: $color-gray-dark;
			transition: all 0.3s ease;
		}
	}
}

.label {
	&__input-title {
		color: $color-gray-light;
	}
}
</style>
