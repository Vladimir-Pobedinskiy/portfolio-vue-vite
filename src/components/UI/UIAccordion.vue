<script setup lang="ts">
import { ref, computed } from 'vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import IconCaret from '@/assets/icons/icon-caret.svg'

withDefaults(
	defineProps<{
		list: any
		/** Все открытые по умолчанию */
		defaultOpen?: boolean
		/** Индекс открытого элемента по умолчанию */
		defaultOpenIndex?: number | undefined
	}>(),
	{
		defaultOpen: false,
		defaultOpenIndex: undefined,
	}
)

const activeIndex = ref<number | null>(null)

const handleDisclosureClick = (index: number, close: () => void, refs: any) => {
	console.log('refs', refs)
	console.log(index)
	activeIndex.value = activeIndex.value === index ? null : index
}
</script>

<template>
	<div ref="disclosure" class="disclosure">
		<template v-for="(item, i) in list" :key="i">
			<Disclosure
				v-auto-animate="{ duration: 300 }"
				:default-open="defaultOpenIndex ? defaultOpen && i === defaultOpenIndex : defaultOpen"
				as="div"
				v-slot="{ open, close }"
				class="disclosure__item"
			>
				<DisclosureButton
					as="div"
					class="disclosure__item-trigger"
					@click="handleDisclosureClick(i, close, $refs.panel)"
				>
					<span class="disclosure__item-title h4">{{ item.title }}</span>
					<IconCaret :class="['disclosure__item-icon', { open: open }]" />
				</DisclosureButton>
				<DisclosurePanel as="div" ref="panel" class="disclosure__item-panel">
					<div v-dompurify-html="item.text" class="disclosure__item-panel-content user-content p4"></div>
				</DisclosurePanel>
			</Disclosure>
		</template>
	</div>
</template>

<style lang="scss">
.disclosure {
	&__item {
		padding: 24px 0;
		border-bottom: 1px solid $color-black;

		&:first-child {
			border-top: 1px solid $color-gray-medium;
		}
	}

	&__item-trigger {
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		text-transform: uppercase;

		@media (min-width: $desktop) {
			cursor: pointer;
		}
	}

	&__item-title {
	}

	&__item-icon {
		width: 24px;
		height: 24px;
		transform: rotate(0);
		transition: transform 0.4s ease;

		&.open {
			transform: rotate(180deg);
			transition: transform 0.4s ease;
		}
	}

	&__item-panel {
		padding-top: 12px;
	}

	&__item-panel-content {
	}
}
</style>
