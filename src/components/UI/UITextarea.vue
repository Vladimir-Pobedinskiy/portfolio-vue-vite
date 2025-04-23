<script setup lang="ts">
withDefaults(
	defineProps<{
		id?: string
		textareaKey?: string
		placeholder: string
		disabled?: boolean
	}>(),
	{
		disabled: false,
	}
)

const value = defineModel<string | number>('value')
const errorValue = defineModel<string>('errorValue')
</script>

<template>
	<label v-bind="$attrs" :class="['label', { error: errorValue }, { disabled: disabled }]">
		<textarea
			v-model="value"
			:id="id"
			:textarea-key="textareaKey"
			:class="['label__textarea', { error: errorValue }]"
			:placeholder="placeholder"
			:disabled="disabled"
		/>
		<span class="error-message">{{ errorValue }}</span>
	</label>
</template>

<style lang="scss">
.label {
	width: 100%;
	max-width: 1000px;
	height: 150px;

	&.error {
		margin-bottom: 32px;
	}

	&__textarea {
		padding: 16px;
		width: 100%;
		height: 100%;
		border: 1px solid rgb(227, 221, 221);
		border-radius: 12px;
		outline: $color-vue-bg;

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
