<script setup lang="ts">
import type { Component } from 'vue'

const props = withDefaults(
	defineProps<{
		as: 'button' | 'RouterLink' | 'a' | Component
		id?: string
		btnKey?: string
		/** для <RouterLink> */
		to?: string
		/** для <a> */
		href?: string
		/** для <button> */
		type?: 'button' | 'submit'
		/** размер */
		size?: 'small'
		/** вариант отображения */
		variant?: 'primary' | 'secondary'
		/** для отображения на всю ширину */
		full?: boolean
		/** строковый контент */
		label: string
		disabled?: boolean
	}>(),
	{
		as: 'button',
		type: 'button',
		variant: 'primary',
		full: false,
		label: '',
		disabled: false,
	}
)
const emits = defineEmits<{
	(e: 'click', event: MouseEvent): void
}>()

const onClick = (event: MouseEvent) => {
	if (props.as !== 'button') return

	if (props.disabled) {
		event.preventDefault()
	} else {
		emits('click', event)
	}
}
</script>

<template>
	<Component
		:is="as"
		v-bind="$attrs"
		:id="id"
		:btn-key="btnKey"
		:class="[`btn-${variant}`, `${size}`, { full: full }, { disabled: disabled }]"
		:to="as === 'RouterLink' ? to : undefined"
		:href="as === 'a' ? href : undefined"
		:type="as === 'button' ? type : undefined"
		:disabled="disabled"
		@click="onClick"
	>
		{{ label }}
		<template v-if="$slots.content">
			<slot name="content" />
		</template>
	</Component>
</template>

<style lang="scss">
.btn-primary,
.btn-secondary {
	padding: 10px 14px;
	width: 100%;
	outline: transparent;
	border-radius: 16px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-family: $font;
	font-size: 14px;
	font-weight: 450;
	line-height: 1.4;

	@media (min-width: $mobile-big) {
		padding: 12px 24px;
		width: fit-content;
		font-weight: 450;
		font-size: 18px;
		line-height: 1.35;
	}

	&.full {
		width: 100%;
	}
}

.btn-primary {
	background-color: $color-gray-dark;
	color: $color-white;
	transition:
		background-color 0.4s ease,
		color 0.4s ease;

	@media (min-width: $desktop-small) {
		&:hover {
			background-color: $color-black;
			transition: background-color 0.4s ease;
		}
	}

	&:active {
		background-color: $color-black;
		transition: background-color 0.4s ease;
	}

	&:disabled {
		background-color: $color-gray-disabled;
		color: $color-gray-light;
		cursor: default;
		transition:
			background-color 0.4s ease,
			color 0.4s ease;
	}

	&.disabled {
		background-color: $color-gray-disabled;
		color: $color-gray-light;
		cursor: default;
		transition:
			background-color 0.4s ease,
			color 0.4s ease;
	}

	// small
	&.small {
		min-height: 42px;
		padding: 8px 16px;
		font-size: 16px;
		line-height: 1.4;

		@media (min-width: $mobile-big) {
			line-height: 1.35;
		}
	}
}

// btn-secondary

.btn-secondary {
	background-color: $color-white;
	color: $color-gray-dark;
	border: 1px solid $color-gray-dark;
	transition:
		background-color 0.4s ease,
		color 0.4s ease,
		border-color 0.4s ease;

	@media (min-width: $desktop-small) {
		&:hover {
			background-color: $color-gray-dark;
			color: $color-white;
			transition:
				background-color 0.4s ease,
				color 0.4s ease;
		}
	}

	&:active {
		background-color: $color-gray-dark;
		color: $color-white;
		transition:
			background-color 0.4s ease,
			color 0.4s ease;
	}

	&:disabled {
		background-color: $color-white;
		color: $color-gray-light;
		border-color: $color-gray-light;
		cursor: default;
		transition:
			background-color 0.4s ease,
			color 0.4s ease,
			border-color 0.4s ease;
	}

	&.disabled {
		background-color: $color-white;
		color: $color-gray-light;
		border-color: $color-gray-light;
		cursor: default;
		transition:
			background-color 0.4s ease,
			color 0.4s ease,
			border-color 0.4s ease;
	}

	&.active {
		background-color: $color-gray-dark;
		color: $color-white;
		transition:
			background-color 0.4s ease,
			color 0.4s ease;
	}

	// small
	&.small {
		min-height: 42px;
		padding: 8px 16px;
		font-size: 16px;
		line-height: 1.4;
	}
}
</style>
