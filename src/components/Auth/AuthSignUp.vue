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
  - createUserWithEmailAndPassword: регистрация пользователя с помощью email & password;
*/
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import IconEye from '@/assets/icons/icon-eye-input-password.svg'
import IconEyeHidden from '@/assets/icons/icon-eye-input-password-hidden.svg'

const router = useRouter()

const userStore = useUserStore()
const setUser = (token: string) => userStore.setUser(token)

const formRef = ref<any>(null)

interface IForm {
	name: string
	tel: string
	email: string
	password: string
}
const form = reactive<IForm>({
	name: '',
	tel: '',
	email: '',
	password: '',
})
const schema = Yup.object().shape({
	name: Yup.string().required('Имя обязательно для заполнения'),
	tel: Yup.string().required('Телефон обязателен для заполнения').min(18, 'Неверный формат номера телефона'),
	email: Yup.string().required('Email обязателен для заполнения').email('Неверный формат электронной почты'),
	password: Yup.string()
		.required('Пароль обязателен для заполнения')
		.min(2, 'Пароль должен содержать минимум 6 символов'),
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
		const response = await createUserWithEmailAndPassword(getAuth(), form.email, form.password)
		setUser((await response.user.getIdTokenResult()).token)
		form.name = ''
		form.tel = ''
		form.email = ''
		form.password = ''
		await formRef.value.resetForm()
		router.push({ name: 'personal-account-view' })
	} catch (error: unknown) {
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
	<div class="sign-up">
		<VeeValidateForm
			ref="formRef"
			name="sign-up-form"
			action="#"
			method="POST"
			class="sign-up__form"
			:validation-schema="schema"
			@submit="onSubmit"
			v-slot="{ errors }"
		>
			<div class="sign-up__form-item label-wrap" :class="{ error: errors.name }">
				<label class="label">
					<Field v-model.trim="form.name" class="label__input l-input" type="text" name="name" placeholder=" " />
					<span class="label__input-title l-input">Имя</span>
					<span class="error-message marker">{{ errors.name }}</span>
				</label>
			</div>

			<div class="sign-up__form-item label-wrap" :class="{ error: errors.tel }">
				<label class="label">
					<Field
						v-model="form.tel"
						v-imask="{ mask: '+7 (000) 000-00-00' }"
						class="label__input l-input"
						type="tel"
						name="tel"
						placeholder="+7 "
					/>
					<span class="label__input-title l-input">Телефон </span>
					<span class="error-message marker">{{ errors.tel }}</span>
				</label>
			</div>

			<div class="sign-up__form-item label-wrap" :class="{ error: errors.email }">
				<label class="label">
					<Field v-model="form.email" class="label__input l-input" type="email" name="email" placeholder=" " />
					<span class="label__input-title l-input">Электронная почта</span>
					<span class="error-message marker">{{ errors.email }}</span>
				</label>
			</div>

			<div class="sign-up__form-item label-wrap" :class="{ error: errors.password }">
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
					<span class="label__input-title l-input">Пароль </span>
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

			<button class="sign-up__btn-submit btn" type="submit" :disabled="isLoading">Зарегистрироваться</button>
			<span class="sign-up__form-agreement p4">
				Нажимая кнопку «Зарегистрироваться», я соглашаюсь на обработку персональных данных
			</span>
			<div class="sign-up__sign-up-wrapper">
				<span class="sign-up__sign-up-title p3">Зарегистрированы?</span>
				<button class="sign-up__sign-up-btn" type="button" :disabled="isLoading" @click="$router.push('/login')">
					Войдите
				</button>
			</div>
		</VeeValidateForm>
	</div>
</template>

<style lang="scss">
.sign-up {
	&__btn-submit.btn {
		margin: 24px 0 12px;
		width: 100%;
	}

	&__form-agreement {
		display: inline-block;
		margin-bottom: 24px;
		color: $color-gray-medium;
	}

	&__sign-up-wrapper {
		display: flex;
		align-items: center;
		justify-content: flex-end;
	}

	&__sign-up-title {
		display: inline-block;
		margin-right: 20px;
	}

	&__sign-up-btn {
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
		}
	}
}
</style>
