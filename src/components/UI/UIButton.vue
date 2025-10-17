<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		as: 'button' | 'RouterLink' | 'a' | 'span'
		btnKey?: string
		/** для <RouterLink> */
		to?: { name: string } | string
		/** для <a> */
		href?: string
		target?: string
		/** для <button> */
		type?: 'button' | 'submit'
		/** вариант отображения */
		variant?: 'primary' | 'secondary' | 'third'
		/** размер */
		size?: 'small' | 'big'
		/** для отображения на всю ширину */
		full?: boolean
		/** aria-label */
		ariaLabel?: string
		/** строковый контент */
		label: string
		disabled?: boolean
	}>(),
	{
		as: 'button',
		type: 'button',
		variant: 'primary',
		size: 'big',
		full: false,
		ariaLabel: '',
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
		:class="[`btn-${variant}`, `${size}`, { full: full }, { disabled: disabled }]"
		:to="as === 'RouterLink' ? to : undefined"
		:href="as === 'a' ? href : undefined"
		:target="as === 'a' || as === 'RouterLink' ? target : undefined"
		:type="as === 'button' ? type : undefined"
		:aria-label="ariaLabel ? ariaLabel : undefined"
		:disabled="as !== 'span' ? disabled : undefined"
		@click="onClick">
		{{ label }}
		<template v-if="$slots.content">
			<slot name="content" />
		</template>
	</Component>
</template>

<style lang="scss">
@use '@/assets/scss/general/variables';

.btn-primary,
.btn-secondary {
	width: 100%;
	outline: transparent;
	border-radius: 16px;
	display: flex;
	justify-content: center;
	align-items: center;
	text-align: center;
	font-family: variables.$font;
	font-size: 14px;
	font-weight: 450;
	line-height: 1.4;

	@media (min-width: variables.$mobile-big) {
		width: fit-content;
		line-height: 1.35;
	}

	&.small {
		min-height: 42px;
		padding: 8px 16px;
		font-size: 16px;
	}

	&.big {
		padding: 10px 14px;

		@media (min-width: variables.$mobile-big) {
			padding: 12px 24px;
			width: fit-content;
			font-size: 18px;
		}
	}

	&.full {
		width: 100%;
	}
}

.btn-primary {
	background-color: variables.$color-gray-dark;
	color: variables.$color-white;
	transition:
		background-color 0.4s ease,
		color 0.4s ease;

	@media (min-width: variables.$desktop-small) {
		&:hover {
			background-color: variables.$color-black;
			transition: background-color 0.4s ease;
		}
	}

	&:active {
		background-color: variables.$color-black;
		transition: background-color 0.4s ease;
	}

	&:disabled {
		background-color: variables.$color-gray-disabled;
		color: variables.$color-gray-light;
		cursor: default;
		transition:
			background-color 0.4s ease,
			color 0.4s ease;
	}

	&.disabled {
		background-color: variables.$color-gray-disabled;
		color: variables.$color-gray-light;
		cursor: default;
		transition:
			background-color 0.4s ease,
			color 0.4s ease;
	}
}

// btn-secondary
.btn-secondary {
	background-color: variables.$color-white;
	color: variables.$color-gray-dark;
	border: 1px solid variables.$color-gray-dark;
	transition:
		background-color 0.4s ease,
		color 0.4s ease,
		border-color 0.4s ease;

	@media (min-width: variables.$desktop-small) {
		&:hover {
			background-color: variables.$color-gray-dark;
			color: variables.$color-white;
			transition:
				background-color 0.4s ease,
				color 0.4s ease;
		}
	}

	&:active {
		background-color: variables.$color-gray-dark;
		color: variables.$color-white;
		transition:
			background-color 0.4s ease,
			color 0.4s ease;
	}

	&:disabled {
		background-color: variables.$color-white;
		color: variables.$color-gray-light;
		border-color: variables.$color-gray-light;
		cursor: default;
		transition:
			background-color 0.4s ease,
			color 0.4s ease,
			border-color 0.4s ease;
	}

	&.disabled {
		background-color: variables.$color-white;
		color: variables.$color-gray-light;
		border-color: variables.$color-gray-light;
		cursor: default;
		transition:
			background-color 0.4s ease,
			color 0.4s ease,
			border-color 0.4s ease;
	}

	&.active {
		background-color: variables.$color-gray-dark;
		color: variables.$color-white;
		transition:
			background-color 0.4s ease,
			color 0.4s ease;
	}
}

// btn-third
.btn-third {
	display: block;
	width: 100%;
	border: 1px solid variables.$color-orange;
	border-radius: 12px;
	background-color: variables.$color-orange;
	color: variables.$color-white;
	transition:
		background-color 0.3s ease,
		border-color 0.3s ease;

	@media (min-width: variables.$desktop) {
		&:hover {
			border-color: variables.$color-orange-hover;
			background-color: variables.$color-orange-hover;
			transition:
				background-color 0.3s ease,
				border-color 0.3s ease;
		}
	}

	&.small {
		padding: 8px 16px;
	}

	&.big {
		padding: 10px 16px;
	}
}
</style>
