<script setup lang="ts">
import UIModal from '@/components/UI/UIModal.vue'
import type { IModalSettings } from '@/interfaces'

const modalSettings: IModalSettings = {
	name: 'ModalError',
	clickToClose: true, // Закрытие модального окна при нажатии на наложение модального окна
	escToClose: true, // Нажмите esc, чтобы закрыть модальное окно
	hideOverlay: false, // Скрытие отображения наложения
}
</script>

<template>
	<UIModal :modal-settings="modalSettings">
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
