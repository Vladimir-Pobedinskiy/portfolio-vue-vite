<script setup lang="ts">
import type { IDescription } from '@/interfaces/app'

defineProps<{
	description: IDescription | undefined
}>()
</script>

<template>
	<h1 class="ui-view__title title h1">{{ description?.title }}</h1>
	<ul class="description-list">
		<li class="description-item p1" v-for="(item, i) in description?.descriptionList" :key="i">
			{{ item }}
		</li>
	</ul>
</template>

<style lang="scss">
.description-list {
	padding-left: 22px;
}

.description-item {
	margin-bottom: 8px;
	list-style: disc;

	&:last-child {
		margin-bottom: 0;
	}
}
</style>
