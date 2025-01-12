<script setup lang="ts">
import { computed } from 'vue'
import { TabGroup, TabList, TabPanels } from '@headlessui/vue'

const props = withDefaults(
	defineProps<{
		activeTab?: number
	}>(),
	{
		activeTab: 0,
	}
)

const emits = defineEmits<{
	(e: 'update:activeTab', value: number): void
}>()

const activeTab = computed({
	get: () => props.activeTab,
	set: (value) => emits('update:activeTab', value),
})
</script>

<template>
	<TabGroup :selected-index="activeTab" as="div" class="tabs" @change="(index) => (activeTab = index)">
		<TabList class="tabs-nav">
			<template v-if="$slots['tab-nav']">
				<slot name="tab-nav" />
			</template>
		</TabList>
		<TabPanels class="tabs-panels">
			<template v-if="$slots['tab-panels']">
				<slot name="tab-panels" />
			</template>
		</TabPanels>
	</TabGroup>
</template>

<style lang="scss">
.p-tablist-tab-list {
	border: none;
}

.tabs-nav {
	margin-bottom: 24px;
	display: flex;
	align-items: center;

	@media (min-width: $desktop) {
		margin-bottom: 32px;
	}
}

.tabs-nav-btn {
	margin-right: 12px;
	padding: 8px 16px;
	width: 100%;
	max-width: 100px;
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
	background-color: $color-white;
	color: $color-gray-dark;
	border: 1px solid $color-gray-dark;
	transition:
		background-color 0.4s ease,
		color 0.4s ease,
		border-color 0.4s ease;

	@media (min-width: $mobile-big) {
		padding: 12px 24px;
		font-weight: 450;
		font-size: 18px;
		line-height: 1.35;
		width: fit-content;
	}

	@media (min-width: $desktop-small) {
		&:hover {
			background-color: $color-gray-dark;
			color: $color-white;
			transition:
				background-color 0.4s ease,
				color 0.4s ease;
		}
	}

	&.selected {
		background-color: $color-gray-dark;
		color: $color-white;
		transition:
			background-color 0.4s ease,
			color 0.4s ease,
			fill 0.4s ease;
	}

	&:last-child {
		margin-right: 0;
	}
}
</style>
