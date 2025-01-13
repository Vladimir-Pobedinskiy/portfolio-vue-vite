<script setup lang="ts">
import UIAccordion from '@/components/UI/UIAccordion.vue'

defineProps<{
	accordion: any
}>()
</script>

<template>
	<section class="accordion-unit offset">
		<div class="container">
			<h2 class="accordion-unit__title h2">Компонент "Accordion"</h2>
			<UIAccordion :list="accordion.accordionList" :default-open="true" :default-open-index="1" />
		</div>
	</section>
</template>

<style lang="scss">
.accordion-unit {
	&__title {
		margin-bottom: 32px;

		@media (min-width: $desktop) {
			margin-bottom: 40px;
		}
	}
}
</style>
