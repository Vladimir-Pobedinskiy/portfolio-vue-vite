<script setup lang="ts">
import type { IHeroPreview } from '@/interfaces/heroes'

defineProps<{
	hero: IHeroPreview
}>()
</script>

<template>
	<div class="hero-card">
		<RouterLink class="hero-card__link" :to="hero.url">
			<div class="hero-card__img-wrapper">
				<img class="hero-card__img" :src="hero.img.url" :alt="hero.img.alt" />
			</div>
			<span class="hero-card__title h3">{{ hero.title }}</span>
			<div class="hero-card__body">
				<span class="hero-card__descr s5">{{ hero.descr }}</span>
				<ul class="hero-card__statistic-list">
					<li v-for="(item, i) in hero.info" :key="i" class="hero-card__statistic-item">
						<span class="hero-card__statistic-value h3">{{ item.value }}</span>
						<span class="hero-card__statistic-name p5">{{ item.title }}</span>
					</li>
				</ul>
			</div>

			<UIButton
				as="span"
				class="hero-card__fake-link s4"
				variant="third"
				size="small"
				:full="true"
				label="See more info"
			/>
		</RouterLink>
	</div>
</template>

<style lang="scss">
.hero-card {
	&__link {
		padding: 16px;
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		border-radius: 16px;
		text-align: center;
		border: 1px solid rgb(227, 221, 221);
	}

	&__img-wrapper {
		width: 100%;
		max-width: 442px;
		height: 250px;
		border-top-left-radius: 16px;
		border-top-right-radius: 16px;
		overflow: hidden;

		@media (min-width: $mobile-big) {
			height: 320px;
		}
	}

	&__img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}

	&__title {
		margin: 24px 0 8px;
		display: block;
	}

	&__body {
		margin-bottom: 16px;
	}

	&__statistic-list {
		margin: 20px 0 12px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: $color-white;
		background-color: $color-orange;
		font-weight: 700;
		border-radius: 16px;
	}

	&__statistic-item {
		flex: 1 1 33.3%;
		border-right: 1px solid rgba(255, 255, 255, 20%);
		padding: 20px 15px;

		&:last-child {
			border-right: none;
		}
	}

	&__statistic-value {
		display: block;
		margin-bottom: 10px;
	}

	&__statistic-name {
		text-transform: uppercase;
	}

	&__descr {
		display: block;
		margin-bottom: 20px;

		@include line-clamp(4);

		@media (min-width: $desktop) {
			@include line-clamp(3);
		}
	}

	&__fake-link {
		margin-top: auto;
	}
}
</style>
