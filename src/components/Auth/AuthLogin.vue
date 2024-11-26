<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Form as VeeValidateForm, Field } from 'vee-validate'
import * as Yup from 'yup'
import { passwordVisibility } from '@/utils/utils'
import { useLoadingStore } from '@/stores/storeLoading'
import { useUserStore } from '@/stores/storeUser'
import AppLoading from '@/components/App/AppLoading.vue'
/*
  - getAuth: информация о пользователе в системе;
  - signInWithEmailAndPassword: вход с помощью email & password;
*/
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import IconEye from '@/assets/icons/icon-eye-input-password.svg'
import IconEyeHidden from '@/assets/icons/icon-eye-input-password-hidden.svg'

const router = useRouter()

const userStore = useUserStore()
const setUser = (token: string) => userStore.setUser(token)

const formRef = ref<any>(null)
const form = reactive({
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

const togglePasswordVisibility = (event: Event) => {
	passwordVisibility(event)
}

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
			name="login"
			action="#"
			method="POST"
			class="login__form"
			:validation-schema="schema"
			@submit="onSubmit"
			v-slot="{ errors }"
		>
			<div class="login__form-item">
				<div class="login__form-label-wrap label-wrap" :class="{ error: errors.email }">
					<label class="label">
						<Field v-model="form.email" class="label__input l-input" type="email" name="email" placeholder=" " />
						<span class="label__input-title l-input">Электронная почта</span>
						<span class="error-message marker">{{ errors.email }}</span>
					</label>
				</div>
			</div>
			<div class="login__form-item">
				<div class="login__form-label-wrap label-wrap" :class="{ error: errors.password }">
					<label class="label">
						<Field
							v-model="form.password"
							class="label__input l-input"
							type="password"
							name="password"
							placeholder=" "
							autocomplete="off"
							:disabled="isLoading"
						/>
						<span class="label__input-title l-input">Пароль</span>
						<span class="error-message marker">{{ errors.password }}</span>
					</label>
					<button
						class="toggle-password-visibility-btn"
						data-show="false"
						type="button"
						tabindex="1"
						:disabled="isLoading"
						@click="togglePasswordVisibility"
					>
						<IconEye class="icon-eye-password" />
						<IconEyeHidden class="icon-eye-password-hidden" />
					</button>
				</div>
			</div>

			<div class="login__password-recovery-btn-wrapper">
				<button
					class="login__password-recovery-btn p3"
					type="button"
					:disabled="isLoading"
					@click="$router.push('/password-recovery/')"
				>
					Забыли пароль?
				</button>
			</div>
			<button class="login__btn-submit btn" type="submit" :disabled="isLoading">Войти</button>
			<div class="login__btn-wrapper">
				<button class="login__btn" type="button" :disabled="isLoading" @click="$router.push('/registration')">
					Зарегистрироваться
				</button>
			</div>
		</VeeValidateForm>
	</div>
</template>

<style lang="scss">
.login {
	&__password-recovery-btn-wrapper {
		margin-bottom: 24px;
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}

	&__password-recovery-btn {
		position: relative;
		background-color: transparent;

		&::after {
			content: '';
			position: absolute;
			left: 0;
			top: 102%;
			width: 100%;
			height: 1px;
			background-color: $color-gray-dark;
		}
	}

	&__btn-submit.btn {
		margin-bottom: 16px;
		width: 100%;
	}

	&__btn-wrapper {
		display: flex;
		align-items: center;
		justify-content: flex-end;
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
