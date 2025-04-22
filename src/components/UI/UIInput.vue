<script setup lang="ts">
import { ref } from 'vue'
import IconEye from '@/assets/icons/icon-eye-input-password.svg'
import IconEyeHidden from '@/assets/icons/icon-eye-input-password-hidden.svg'

const props = withDefaults(
	defineProps<{
		id?: string
		inputKey?: string
		type: 'text' | 'password' | 'number' | 'email' | 'tel'
		name: string
		placeholder: string
		min?: number
		max?: number
		disabled?: boolean
		autocomplete?: string
	}>(),
	{
		type: 'text',
		placeholder: ' ',
		min: 0,
		max: 1000000000000,
		disabled: false,
		autocomplete: 'on',
	}
)

const value = defineModel('value')
const errorValue = defineModel('errorValue')

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
	<div v-bind="$attrs" :class="['label-wrapper', { error: errorValue }, { disabled: disabled }]">
		<label class="label">
			<input
				v-model="value"
				:id="id"
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
			<span class="error-message marker">{{ errorValue }}</span>
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
.label-wrapper {
	position: relative;
	margin-bottom: 18px;
	height: 44px;

	@media (min-width: $mobile-big) {
		height: 56px;
	}

	&.disabled {
		opacity: 0.6;

		.label__input-title {
			color: $color-gray-light;
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
		border: 1px solid $color-gray-light;
		background-color: $color-white;
		color: $color-black;
		outline: transparent;
		border-radius: 16px;
		transition: border-color 0.4s ease-in-out;

		&:hover {
			border-color: $color-black;
			transition: border-color 0.4s ease-in-out;
		}

		&:active,
		&:focus {
			border-color: $color-black;
			transition: border-color 0.4s ease-in-out;
		}

		&:disabled {
			opacity: 0.3;
			border-color: $color-gray-light;
			background-color: $color-white;
			cursor: default;
			transition:
				border-color 0.3s ease,
				background-color 0.3s ease;
		}

		&.error {
			border-color: $color-error;
			background-color: $color-error-light;
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
		color: $color-gray-light;
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

		@media (min-width: $mobile-big) {
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
	color: $color-error;
	transition: color 0.3s ease;

	@media (min-width: $mobile) {
		padding-left: 8px;
	}

	@media (min-width: $desktop) {
		padding-left: 12px;
	}
}
</style>
