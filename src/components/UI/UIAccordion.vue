<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import type { IAccordionItem } from '@/interfaces/ui'
import IconClose from '@/assets/icons/icon-close.svg'
import IconCaret from '@/assets/icons/icon-caret.svg'

withDefaults(
	defineProps<{
		list: IAccordionItem[] | undefined
		/** Все открытые по умолчанию */
		defaultOpen?: boolean
		/** Индекс открытого элемента по умолчанию */
		defaultOpenIndex?: number | undefined
		typeIcon?: 'caret-icon' | 'close-icon'
	}>(),
	{
		defaultOpen: false,
		defaultOpenIndex: 0,
		typeIcon: 'close-icon',
	}
)
</script>

<template>
	<div class="disclosure">
		<template v-for="(item, i) in list" :key="i">
			<Disclosure
				v-auto-animate="{ duration: 300 }"
				:default-open="!defaultOpen ? i === defaultOpenIndex : defaultOpen"
				as="div"
				v-slot="{ open, close }"
				class="disclosure__item"
			>
				<DisclosureButton as="div" class="disclosure__item-trigger">
					<span class="disclosure__item-title h4">{{ item.title }}</span>
					<template v-if="typeIcon === 'close-icon'">
						<IconClose :class="['disclosure__item-icon', { open: open }]" />
					</template>
					<template v-else>
						<IconCaret :class="['disclosure__item-icon disclosure__item-icon_caret', { open: open }]" />
					</template>
				</DisclosureButton>
				<DisclosurePanel as="div" class="disclosure__item-panel">
					<div v-dompurify-html="item.text" class="disclosure__item-panel-content user-content p4"></div>
				</DisclosurePanel>
			</Disclosure>
		</template>
	</div>
</template>

<style lang="scss">
@use '@/assets/scss/general/variables';

.disclosure {
	&__item {
		border-bottom: 1px solid variables.$color-black;

		&:first-child {
			border-top: 1px solid variables.$color-gray-medium;
		}
	}

	&__item-trigger {
		padding: 24px 0;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-transform: uppercase;

		@media (min-width: variables.$desktop) {
			cursor: pointer;
		}
	}

	&__item-icon {
		width: 24px;
		height: 24px;
		transform: rotate(-45deg);
		transition: transform 0.4s ease;

		&.open {
			transform: rotate(0);
			transition: transform 0.4s ease;
		}

		&_caret {
			width: 30px;
			height: 30px;
			transform: rotate(0);

			&.open {
				transform: rotate(180deg);
				transition: transform 0.4s ease;
			}
		}
	}

	&__item-panel {
		margin-top: -12px;
	}

	&__item-panel-content {
		padding-bottom: 24px;
	}
}
</style>
