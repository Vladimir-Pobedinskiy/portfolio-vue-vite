<script setup lang="ts">
import IconCheckbox from '@/assets/icons/icon-checkbox.svg'

withDefaults(
	defineProps<{
		checkboxKey?: string
		name: string
		errorValue?: string
		disabled?: boolean
	}>(),
	{
		errorValue: '',
		disabled: false,
	}
)

const modelValue = defineModel<boolean>('modelValue')
</script>

<template>
	<div :class="['label-checkbox-wrapper', { selected: modelValue }, { error: errorValue }, { disabled: disabled }]">
		<label class="label-checkbox">
			<input
				v-model="modelValue"
				:value="modelValue"
				:checkbox-key="checkboxKey"
				:name="name"
				class="label-checkbox__input visually-hidden"
				type="checkbox"
				:disabled="disabled"
			/>

			<span class="label-checkbox__checkbox-icon-wrapper">
				<IconCheckbox class="label-checkbox__checkbox-icon" />
			</span>

			<slot name="content" />
		</label>
		<span v-if="errorValue" class="label-checkbox__checkbox-error">{{ errorValue }}</span>
	</div>
</template>

<style lang="scss">
@use '@/assets/scss/general/variables';

.label-checkbox {
	position: relative;
	display: block;
	padding-left: 36px;
	width: fit-content;
	cursor: pointer;

	&__checkbox-icon-wrapper {
		top: 50%;
		transform: translateY(-50%);
		position: absolute;
		left: 0;
		width: 24px;
		min-width: 24px;
		height: 24px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: variables.$color-white;
		border: 1px solid variables.$color-vue;
		border-radius: 4px;
		color: variables.$color-vue;
		transition:
			background-color 0.3s ease,
			border-color 0.3s ease;
	}

	&__checkbox-icon {
		transform: scale(0);
		width: 18px;
		height: 18px;
		transition: transform 0.3s ease;
	}

	&__checkbox-error {
		position: absolute;
		left: 0;
		top: 100%;
		color: variables.$color-error;
		transition: color 0.3s ease;
	}

	a {
		color: variables.$color-vue;
		text-decoration: underline;
	}
}

.label-checkbox-wrapper {
	position: relative;
	margin-bottom: 24px;
	pointer-events: all;

	&.selected {
		.label-checkbox__checkbox-icon-wrapper {
			background-color: variables.$color-white;
			border-color: variables.$color-vue;
			transition:
				background-color 0.3s ease,
				border-color 0.3s ease;
		}

		.label-checkbox__checkbox-icon {
			transform: scale(1);
			transition: transform 0.3s ease;
		}
	}

	&.error {
		.label-checkbox__checkbox-icon-wrapper {
			border-color: variables.$color-error;
			transition: border-color 0.3s ease;
		}
	}

	&.disabled {
		pointer-events: none;
		opacity: 0.5;
	}
}
</style>
