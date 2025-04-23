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
  - createUserWithEmailAndPassword: регистрация пользователя с помощью email & password;
*/
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()

const userStore = useUserStore()
const setUser = (token: string) => userStore.setUser(token)

const formRef = ref<any>(null)

interface IForm {
	name: string
	tel: string
	email: string
	password: string
	repeatPassword: string
}
const form = reactive<IForm>({
	name: '',
	tel: '',
	email: '',
	password: '',
	repeatPassword: '',
})
const schema = Yup.object().shape({
	name: Yup.string().trim().required('Имя обязательно для заполнения').min(2, 'Введите минимум 2 символа'),
	tel: Yup.string().required('Телефон обязателен для заполнения').min(18, 'Неверный формат номера телефона'),
	email: Yup.string().required('Email обязателен для заполнения').email('Неверный формат электронной почты'),
	password: Yup.string().required('Обязательное поле').min(6, 'Минимум 6 символов'),
	repeatPassword: Yup.string()
		.oneOf([Yup.ref('password')], 'Пароли не совпадают')
		.required('Обязательное поле'),
})

const loadingStore = useLoadingStore()
const isLoading = computed(() => loadingStore.isLoading)
const startLoading = () => loadingStore.startLoading()
const endLoading = () => loadingStore.endLoading()

const onSubmit = async (): Promise<void> => {
	try {
		startLoading()
		const response = await createUserWithEmailAndPassword(getAuth(), form.email, form.password)

		setUser((await response.user.getIdTokenResult()).token)
		form.name = ''
		form.tel = ''
		form.email = ''
		form.password = ''
		form.repeatPassword = ''
		await formRef.value.resetForm()
		router.push({ name: 'personal-account-view' })
	} catch (error: unknown) {
		if (error instanceof Error) {
			formRef.value.setErrors({ repeatPassword: `${error.message}` })
		} else {
			console.error('Error fetching AuthSignUp:', error)
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
			v-slot="{ errors }"
			:validation-schema="schema"
			name="sign-up-form"
			action="#"
			method="POST"
			class="sign-up__form"
			@submit="onSubmit"
		>
			<Field v-slot="{ field }" name="name">
				<UIInput
					v-bind="field"
					v-model:value="form.name"
					v-model:error-value="errors.name"
					type="text"
					name="name"
					placeholder="Имя"
					:disabled="isLoading"
				/>
			</Field>

			<Field v-slot="{ field }" name="tel">
				<UIInput
					v-bind="field"
					v-model:value="form.tel"
					v-model:error-value="errors.tel"
					type="tel"
					name="tel"
					placeholder="Телефон"
					:disabled="isLoading"
				/>
			</Field>

			<Field v-slot="{ field }" validate-on-change name="email">
				<UIInput
					v-bind="field"
					v-model:value="form.email"
					v-model:error-value="errors.email"
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
					v-model:error-value="errors.password"
					type="password"
					name="password"
					placeholder="Пароль"
					autocomplete="off"
					:disabled="isLoading"
				/>
			</Field>

			<Field v-slot="{ field }" name="repeatPassword">
				<UIInput
					v-bind="field"
					v-model:value="form.repeatPassword"
					v-model:error-value="errors.repeatPassword"
					type="password"
					name="repeatPassword"
					placeholder="Повторите пароль"
					autocomplete="off"
					:disabled="isLoading"
				/>
			</Field>

			<UIButton
				class="sign-up__btn-submit"
				variant="primary"
				:full="true"
				type="submit"
				:disabled="isLoading"
				text="Зарегистрироваться"
			/>

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
	&__btn-submit {
		margin: 24px 0 12px;
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
