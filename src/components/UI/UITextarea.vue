<script setup lang="ts">
withDefaults(
	defineProps<{
		textareaKey?: string
		placeholder: string
		errorValue?: string
		disabled?: boolean
	}>(),
	{
		errorValue: '',
		disabled: false,
	}
)

const value = defineModel<string | number>('value')
</script>

<template>
	<label :class="['label', { error: errorValue }, { disabled: disabled }]">
		<textarea
			v-model="value"
			:textarea-key="textareaKey"
			:class="['label__textarea', { error: errorValue }]"
			:placeholder="placeholder"
			:disabled="disabled"
		/>
		<span v-if="errorValue" class="error-message">{{ errorValue }}</span>
	</label>
</template>

<style lang="scss">
@use '@/assets/scss/general/variables';

.label {
	width: 100%;
	max-width: 1000px;
	height: 150px;
	pointer-events: all;

	&.disabled {
		opacity: 0.6;
		pointer-events: none;
	}

	&.error {
		margin-bottom: 32px;
	}

	&__textarea {
		padding: 16px;
		width: 100%;
		height: 100%;
		border: 1px solid rgb(227, 221, 221);
		border-radius: 12px;
		outline: variables.$color-vue-bg;
		pointer-events: all;

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
