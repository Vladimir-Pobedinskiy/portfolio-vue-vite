<script setup lang="ts">
import { ref } from 'vue'
import IconEye from '@/assets/icons/icon-eye-input-password.svg'
import IconEyeHidden from '@/assets/icons/icon-eye-input-password-hidden.svg'

const props = withDefaults(
	defineProps<{
		type: 'text' | 'password' | 'number' | 'email' | 'tel'
		name: string
		placeholder: string
		min?: number
		max?: number
		errorValue?: string
		disabled?: boolean
		autocomplete?: string
	}>(),
	{
		type: 'text',
		placeholder: ' ',
		min: 0,
		max: 1000000000000,
		errorValue: '',
		disabled: false,
		autocomplete: 'on',
	}
)

const value = defineModel<string | number>('value')

const isShowPassword = ref<boolean>(false)
const togglePasswordVisibility = () => {
	if (props.type !== 'password') return
	isShowPassword.value = !isShowPassword.value
}

const preventInvalidKeys = (event: KeyboardEvent) => {
	if (props.type !== 'number') return

	const allowedKeys = ['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', ',']
	if (allowedKeys.includes(event.key)) {
		return
	}

	if (!/^\d$/.test(event.key) && event.key !== ',') {
		event.preventDefault()
	}

	if (props.type === 'number' && event.target instanceof HTMLInputElement && Number(event.target.value) >= props.max) {
		event.target.value = props.max.toString()
	}
}
</script>

<template>
	<div :class="['label-wrapper', { error: errorValue }, { disabled: disabled }]">
		<label class="label">
			<input
				v-model="value"
				:class="['label__input l-input', { error: errorValue }]"
				:type="type !== 'password' ? type : isShowPassword ? 'text' : 'password'"
				v-imask="type === 'tel' ? { mask: '+7 (000) 000-00-00' } : undefined"
				:name="name"
				:placeholder="type === 'tel' ? '+7 ' : ' '"
				:max="type === 'number' ? max : undefined"
				:min="type === 'number' ? min : undefined"
				:autocomplete="autocomplete"
				:disabled="disabled"
				@keydown="preventInvalidKeys"
			/>
			<span class="label__input-title l-input">{{ placeholder }}</span>
			<span v-if="errorValue" class="error-message">{{ errorValue }}</span>
		</label>

		<button
			v-if="type === 'password'"
			class="toggle-password-visibility-btn"
			type="button"
			tabindex="1"
			:disabled="disabled"
			@click="togglePasswordVisibility"
		>
			<template v-if="isShowPassword">
				<IconEye class="icon-eye-password" />
			</template>
			<template v-else>
				<IconEyeHidden class="icon-eye-password-hidden" />
			</template>
		</button>
	</div>
</template>

<style lang="scss">
@use '@/assets/scss/general/variables';

.label-wrapper {
	position: relative;
	margin-bottom: 18px;
	height: 44px;
	pointer-events: all;

	@media (min-width: variables.$mobile-big) {
		height: 56px;
	}

	&.disabled {
		opacity: 0.6;
		pointer-events: none;

		.label__input-title {
			color: variables.$color-gray-light;
			cursor: default !important;
		}
	}

	&.error {
		margin-bottom: 32px;
	}
}

.label {
	height: 100%;
	width: 100%;

	&__input {
		padding: 23px 16px 8px;
		width: 100%;
		height: 100%;
		border: 1px solid variables.$color-gray-light;
		background-color: variables.$color-white;
		color: variables.$color-black;
		outline: transparent;
		border-radius: 16px;
		pointer-events: all;
		transition: border-color 0.4s ease-in-out;

		&:hover {
			border-color: variables.$color-black;
			transition: border-color 0.4s ease-in-out;
		}

		&:active,
		&:focus {
			border-color: variables.$color-black;
			transition: border-color 0.4s ease-in-out;
		}

		&:disabled {
			opacity: 0.3;
			border-color: variables.$color-gray-light;
			background-color: variables.$color-white;
			cursor: default;
			pointer-events: none;
			transition:
				border-color 0.3s ease,
				background-color 0.3s ease;
		}

		&.error {
			border-color: variables.$color-error;
			background-color: variables.$color-error-light;
			transition:
				border-color 0.3s ease,
				background-color 0.3s ease;
		}
	}

	&__input-title {
		position: absolute;
		left: 16px;
		top: 50%;
		transform: translateY(-50%);
		background-color: transparent;
		color: variables.$color-gray-light;
		cursor: text;
		will-change: transform, font-size;
		transition:
			transform 0.3s ease-in-out,
			font-size 0.3s ease;
	}

	&__input:focus + &__input-title,
	&__input:not(:placeholder-shown) + &__input-title {
		transform: translateY(-20px);
		font-size: 12px;
		transition:
			transform 0.3s ease-in-out,
			font-size 0.3s ease;

		@media (min-width: variables.$mobile-big) {
			transform: translateY(-23px);
		}
	}
}

// скрываем у input[type="tel"] placeholder в обычном состоянии
[type='tel']::placeholder {
	font-size: 0;
	transition: font-size 0.3s ease;
}

input[type='tel']:focus::placeholder {
	font-size: 14px;
	transition: font-size 0.3s ease;
}

// убираем стрелки у input[type="number"]
input[type='number']::-webkit-outer-spin-button,
input[type='number']::-webkit-inner-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

input[type='number'] {
	-moz-appearance: textfield;
}

input[type='number']:hover,
input[type='number']:focus {
	-moz-appearance: number-input;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

// password

input[name='password'],
input[name='repeatPassword'] {
	padding-right: 62px;
	letter-spacing: 1px;
}

.toggle-password-visibility-btn {
	position: absolute;
	right: 16px;
	top: 50%;
	transform: translateY(-50%);
	width: 24px;
	height: 24px;
	z-index: 10;
	background-color: transparent;

	svg {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
}

.icon-eye-password-hidden {
	width: 24px;
	height: 24px;
	fill: transparent;
}
.icon-eye-password {
	width: 24px;
	height: 24px;
	fill: transparent;
}

.error-message {
	padding-top: 2px;
	padding-left: 6px;
	color: variables.$color-error;
	transition: color 0.3s ease;

	@media (min-width: variables.$mobile) {
		padding-left: 8px;
	}

	@media (min-width: variables.$desktop) {
		padding-left: 12px;
	}
}
</style>
