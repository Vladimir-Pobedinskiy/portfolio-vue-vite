<script setup lang="ts">
import type { IBreadcrumb } from '@/interfaces/app'

defineProps<{
	breadcrumbs: IBreadcrumb[]
}>()
</script>

<template>
	<div class="breadcrumbs-wrapper">
		<ul class="breadcrumbs" itemscope itemtype="https://schema.org/BreadcrumbList" aria-label="Хлебные крошки">
			<li
				v-for="(item, index) in breadcrumbs"
				:key="index"
				class="breadcrumbs__item"
				itemprop="itemListElement"
				itemscope
				itemtype="https://schema.org/ListItem"
			>
				<RouterLink
					v-if="index !== breadcrumbs.length - 1"
					class="breadcrumbs__link p4"
					:to="`${item.url}`"
					:title="item.title"
					itemprop="item"
				>
					<meta itemprop="position" :content="String(index)" />
					<span itemprop="name">{{ item.title }}</span>
				</RouterLink>
				<span v-else class="breadcrumbs__link p4" :title="item.title" itemprop="item" aria-current="page">
					<meta itemprop="position" :content="String(index)" />
					<span itemprop="name">{{ item.title }}</span>
				</span>
			</li>
		</ul>
	</div>
</template>

<style lang="scss">
@use '@/assets/scss/general/variables';

.breadcrumbs-wrapper {
	margin-bottom: 20px;
	overflow: hidden;

	@media (min-width: variables.$desktop) {
		margin-bottom: 32px;
	}
}

.breadcrumbs {
	display: flex;
	align-items: center;
	flex-wrap: wrap;

	&__item:not(:last-of-type) {
		position: relative;
		margin-right: 18px;
		color: variables.$color-gray-medium;
	}

	li:not(:last-of-type) {
		&::after {
			content: '>';
			position: absolute;
			margin-left: 4px;
			top: 50%;
			transform: translateY(-50%);
			width: 10px;
			height: 21px;
		}
	}
}

.blog-post {
	.breadcrumbs {
		&__item:not(:last-of-type) {
			&:first-child {
				color: variables.$color-white;
			}
		}

		li:not(:last-of-type) {
			&::after {
				content: '>';
				position: absolute;
				margin-left: 4px;
				top: 50%;
				transform: translateY(-50%);
				width: 10px;
				height: 21px;
			}
		}
	}
}
</style>
