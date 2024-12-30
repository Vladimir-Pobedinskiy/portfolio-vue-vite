<script setup lang="ts">
import { ref } from 'vue'
import UIModal from '@/components/UI/UIModal.vue'

const isOpenModalError = ref<boolean>(false)
const handleModalError = (flag: boolean) => {
	isOpenModalError.value = flag
}
</script>

<template>
	<UIModal
		v-model:model-value="isOpenModalError"
		modal-id="modal-error"
		:click-to-close="true"
		:esc-to-close="true"
		:hide-overlay="false"
		@update:model-value="handleModalError"
	>
		<template #header>
			<h2 class="modal-error-title s2">Ошибка!</h2>
		</template>
		<template #body>
			<p class="p1">
				Что то пошло не так, сервер недоступен! Попробуйте зайти позже. Извините за временные неудобства!
			</p>
		</template>
	</UIModal>
</template>

<style lang="scss">
.modal-error-title {
	margin-bottom: 16px;

	@media (min-width: $desktop) {
		margin-bottom: 16px;
	}
}
</style>
