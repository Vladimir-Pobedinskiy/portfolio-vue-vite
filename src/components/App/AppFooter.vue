<script setup lang="ts">
import { ref, computed } from 'vue'
import { getFirestore, getDoc, doc } from 'firebase/firestore'
import type { INav } from '@/interfaces'

// const navLinks = computed(() => store.getters.navLinks)
const nav = ref<INav[]>([])
const db = getFirestore()
const isLoading = ref<boolean>(false)
const getLinks = async (): Promise<void> => {
	try {
		isLoading.value = true
		const docRef = doc(db, 'general', '9azrkqLoosCRB7x11WmH')
		const docSnap = await getDoc(docRef)
		nav.value = docSnap.exists() ? [...docSnap.data().nav] : []
	} catch (error: any) {
		console.error('general header error', error)
		throw error
	} finally {
		isLoading.value = false
	}
}
getLinks()

const currentYear = computed(() => new Date().getFullYear())
</script>

<template>
	<footer class="footer">
		<div class="container">
			<div class="footer__inner">
				<div class="footer__top">
					<ul class="nav-list">
						<li v-for="(item, i) in nav" :key="i" class="nav-item">
							<RouterLink class="nav-link p1 hover-from-center" :to="`${item.url}`">{{ item.title }}</RouterLink>
						</li>
					</ul>
				</div>
				<div class="footer__bottom">
					<p class="footer__title">© {{ currentYear }} Все права защищены.</p>
				</div>
			</div>
		</div>
	</footer>
</template>

<style lang="scss">
.footer {
	padding: 30px 0;
	background-color: $color-vue;

	@media (min-width: $desktop) {
		padding: 40px 0;
	}

	&__inner {
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	&__top {
		margin-bottom: 16px;
	}

	&__title {
		font-size: 16px;
	}

	.nav-list {
		text-align: center;

		@media (min-width: $tablet) {
			flex-direction: row;
		}
	}

	.nav-item {
		@media (max-width: $tablet-for-maxWidth) {
			margin-bottom: 16px;
		}

		@media (min-width: $tablet) {
			margin-right: 20px;
			margin-bottom: 0;

			&:last-child {
				margin-right: 0;
			}
		}
	}
}
</style>
