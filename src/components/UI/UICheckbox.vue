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
	<div :class="['label-checkbox-wrapper', { error: errorValue }, { disabled: disabled }]">
		<label :class="['label-checkbox', { error: errorValue }, { disabled: disabled }]">
			<input
				v-model="modelValue"
				:value="modelValue"
				:checkbox-key="checkboxKey"
				:name="name"
				:class="['label-checkbox__input visually-hidden', { selected: modelValue }, { error: errorValue }]"
				type="checkbox"
				:disabled="disabled"
			/>

			<span :class="['label-checkbox__checkbox-icon-wrapper', { selected: modelValue }, { error: errorValue }]">
				<IconCheckbox :class="['label-checkbox__checkbox-icon', { selected: modelValue }]" />
			</span>

			<slot name="content" />
		</label>
		<span v-if="errorValue" class="label-checkbox__checkbox-error">{{ errorValue }}</span>
	</div>
</template>

<style lang="scss">
.label-checkbox-wrapper {
	position: relative;
	margin-bottom: 24px;

	&.disabled {
		cursor: default;
		opacity: 0.5;
	}
}

.label-checkbox {
	position: relative;
	display: block;
	padding-left: 32px;
	width: fit-content;
	cursor: pointer;

	&__input {
		&:disabled + .label__checkbox-icon-wrapper {
			opacity: 0.8;
			background-color: $color-white;
			border-color: $color-vue;
			color: $color-vue;
			transition:
				background-color 0.3s ease,
				border-color 0.3s ease;
			cursor: default;
		}
	}

	&__checkbox-icon-wrapper {
		top: 50%;
		transform: translateY(-50%);
		position: absolute;
		left: 0;
		width: 20px;
		height: 20px;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: $color-white;
		border: 1px solid $color-vue;
		border-radius: 4px;
		color: $color-vue;
		transition:
			background-color 0.3s ease,
			border-color 0.3s ease;

		&.selected {
			background-color: $color-white;
			border-color: $color-vue;
			transition:
				background-color 0.3s ease,
				border-color 0.3s ease;
		}

		&.error {
			border-color: $color-error;
			transition: border-color 0.3s ease;
		}
	}

	&__checkbox-icon {
		transform: scale(0);
		width: 14px;
		height: 14px;
		transition: transform 0.3s ease;

		&.selected {
			transform: scale(1);
			transition: transform 0.3s ease;
		}
	}

	&__checkbox-error {
		position: absolute;
		left: 0;
		top: 100%;
		color: $color-error;
		transition: color 0.3s ease;
	}

	a {
		color: $color-vue;
		text-decoration: underline;
	}
}
</style>
