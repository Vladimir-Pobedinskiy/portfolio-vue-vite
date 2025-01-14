<script setup lang="ts">
import { ref, reactive } from 'vue'
import { getFirestore, query, collection, getDocs } from 'firebase/firestore'
/* eslint-disable-next-line */
// @ts-ignore
import { marquee, heroesTabs, accordion } from '~/moke/ui.js'
import { useVfm } from 'vue-final-modal'
import type { IBreadcrumb, IDescription } from '@/interfaces/app'
import AppLoading from '@/components/App/AppLoading.vue'
import DescriptionUnit from '@/components/DescriptionUnit.vue'
import UIViewTabsUnit from '@/components/UIView/UIViewTabsUnit.vue'
import UIViewAccordionUnit from '@/components/UIView/UIViewAccordionUnit.vue'
import UIViewMarqueeUnit from '@/components/UIView/UIViewMarqueeUnit.vue'
import type { IMarquee, ITabs, IAccordion } from '@/interfaces/ui'

interface IState {
	isLoaded: boolean
	breadcrumbs: IBreadcrumb[] | undefined
	description: IDescription | undefined
	marquee: IMarquee | undefined
	tabs: ITabs | undefined
	accordion: IAccordion | undefined
}
const state = reactive<IState>({
	isLoaded: false,
	breadcrumbs: undefined,
	description: undefined,
	marquee: marquee ? marquee : undefined,
	tabs: heroesTabs ? heroesTabs : undefined,
	accordion: accordion ? accordion : undefined,
})

const vfm = useVfm()
const db = getFirestore()
const isLoading = ref<boolean>(false)
const errorMessage = ref<any>(null)
const getData = async (): Promise<void> => {
	try {
		isLoading.value = true
		const getData = query(collection(db, 'ui'))
		const listDocs = await getDocs(getData)
		const res = listDocs.docs.map((doc) => doc.data())
		state.breadcrumbs = [...res[0].breadcrumbs]
		state.description = { ...res[0].description }
		state.isLoaded = true
	} catch (error: any) {
		vfm.open('modal-error')
		errorMessage.value = error
		console.error('ui error', error)
		throw error
	} finally {
		isLoading.value = false
	}
}
getData()
</script>

<template>
	<div class="ui-view offset-page">
		<template v-if="isLoading && !state.isLoaded">
			<AppLoading :is-loading-local="isLoading" />
		</template>
		<template v-else-if="state.isLoaded && !errorMessage">
			<div class="container">
				<UIBreadcrumbs :breadcrumbs="state.breadcrumbs" />
				<DescriptionUnit :description="state.description" />
			</div>

			<UIViewTabsUnit :tabs="state.tabs" :is-loading="isLoading" />
			<UIViewAccordionUnit :accordion="state.accordion" />
			<UIViewMarqueeUnit :marquee="state.marquee" />
		</template>
		<template v-else>
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
.ui-view {
	position: relative;
	height: 100%;
	width: 100%;
}
</style>
