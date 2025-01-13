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
	<TabGroup v-bind="$attrs" :selected-index="activeTab" as="div" class="tabs" @change="(index) => (activeTab = index)">
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
.tabs-panel {
	animation: fadeInFromBottom 0.5s linear;
	will-change: transform, opacity;
}
</style>
