<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getFirestore, query, collection, getDocs } from 'firebase/firestore'
import { useVfm } from 'vue-final-modal'
import AppLoading from '@/components/App/AppLoading.vue'
import { useBaguetteBox } from '@/composables/useBaguetteBox'
import type { IBreadcrumb } from '@/interfaces/app'
import type { IHero } from '@/interfaces/heroes'

interface IState {
	isLoaded: boolean
	breadcrumbs: IBreadcrumb[] | undefined
	hero: IHero | undefined
}
const state = reactive<IState>({
	isLoaded: false,
	breadcrumbs: undefined,
	hero: undefined,
})

const route = useRoute()
const router = useRouter()
const vfm = useVfm()
const db = getFirestore()
const isLoading = ref<boolean>(false)
const errorMessage = ref<any>(null)
const getHero = async (): Promise<void> => {
	try {
		isLoading.value = true
		const getData = query(collection(db, `${route.params.slug}`))
		const listDocs = await getDocs(getData)

		if (!listDocs.docs || !listDocs.docs.length) {
			router.replace({ name: 'not-found-view' })
		} else {
			const res = listDocs.docs.map((doc) => doc.data())
			state.breadcrumbs = [...res[0].breadcrumbs]
			state.hero = { ...res[0].description }
			state.isLoaded = true
		}
	} catch (error: any) {
		vfm.open('modal-error')
		errorMessage.value = error
		console.error('heroes error', error)
		throw error
	} finally {
		isLoading.value = false
	}
}
getHero()

useBaguetteBox('.hero-gallery-baguettebox-js')
</script>

<template>
	<div class="hero-view offset-page">
		<template v-if="isLoading && !state.isLoaded">
			<AppLoading :is-loading-local="isLoading" />
		</template>
		<template v-else-if="state.hero && state.isLoaded && !errorMessage">
			<div class="container">
				<UIBreadcrumbs :breadcrumbs="state.breadcrumbs" />
				<div class="hero-view__inner hero-gallery-baguettebox-js">
					<a class="hero-view__link hero-gallery-baguettebox-js" :href="state.hero.img.url">
						<div class="hero-view__img-wrapper">
							<img :src="state.hero.img.url" :alt="state.hero.img.alt" />
						</div>
					</a>
					<div class="hero-view__info">
						<h1 class="hero-view__title h1">{{ state.hero.title }}</h1>
						<p class="hero-view__descr s4">{{ state.hero.descr }}</p>
						<ul class="hero-view__statistic-list">
							<li v-for="(item, i) in state.hero.info" :key="i" class="hero-view__statistic-item">
								<span class="hero-view__statistic-value h3">{{ item.value }}</span>
								<span class="hero-view__statistic-name p5">{{ item.title }}</span>
							</li>
						</ul>

						<UIButton
							as="RouterLink"
							:to="{ name: 'heroes-view' }"
							class="hero-view__back-link"
							variant="third"
							size="big"
							:disabled="isLoading"
							label="Back to heroes"
						/>
					</div>
				</div>
			</div>
		</template>
		<template v-else-if="errorMessage">
			<div class="empty-template offset-page">
				<div class="container">
					<div class="empty-template__inner">
						<p class="empty-template__title h2">Ошибка!</p>
						<p class="empty-template__error s2">{{ errorMessage }}</p>
						<p class="empty-template__text p1">
							Сервер недоступен! Попробуйте зайти позже. Извините за временные неудобства!
						</p>
					</div>
				</div>
			</div>
		</template>
	</div>
</template>

<style lang="scss">
@use '@/assets/scss/general/variables';

.hero-view {
	position: relative;
	height: 100%;
	width: 100%;

	&__inner {
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	&__img-wrapper {
		margin-bottom: 24px;
		width: 100%;
		max-width: 450px;
	}

	&__info {
		width: 100%;
		max-width: 900px;
	}

	&__title {
		margin-bottom: 20px;
	}

	&__statistic-list {
		margin: 20px 0 40px;
		display: flex;
		justify-content: center;
		align-items: center;
		color: variables.$color-white;
		background-color: variables.$color-orange;
		font-weight: 700;
		border-radius: 12px;
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

	&__back-link {
		margin: 0 auto;
		max-width: 350px;
	}
}
</style>
