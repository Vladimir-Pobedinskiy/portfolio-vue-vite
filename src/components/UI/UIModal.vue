<script setup lang="ts">
import { computed } from 'vue'
import { VueFinalModal } from 'vue-final-modal'
import { useMenuStore } from '@/stores/storeMenu'
import { useScrollController } from '@/composables/useScrollController'
import IconClose from '@/assets/icons/icon-close.svg'

const props = withDefaults(
	defineProps<{
		modelValue: boolean
		modalId: number | string
		lockScroll?: boolean
		/** Закрытие модального окна при нажатии на наложение модального окна */
		clickToClose?: boolean
		/** Нажмите esc, чтобы закрыть модальное окно */
		escToClose?: boolean
		/** Скрытие отображения наложения */
		hideOverlay?: boolean
		swipeToClose?: 'none' | 'up' | 'right' | 'down' | 'left'
		isLoading?: boolean
	}>(),
	{
		lockScroll: false,
		clickToClose: true,
		escToClose: true,
		hideOverlay: false,
		swipeToClose: 'none',
		isLoading: false,
	}
)
const emits = defineEmits<{
	(e: 'update:modelValue', value: boolean): void
}>()

const modelValue = computed({
	get: () => props.modelValue,
	set: (value) => emits('update:modelValue', value),
})

const close = () => {
	emits('update:modelValue', false)
}

const storeMenu = useMenuStore()
const menuNameStore = computed(() => storeMenu.menuName)

const customOverlayTransition = {
	enterActiveClass: 'custom-overlay-fade-enter-active',
	leaveActiveClass: 'custom-overlay-fade-leave-active',
	enterFromClass: 'custom-overlay-fade-enter-from',
	leaveToClass: 'custom-overlay-fade-leave-to',
}
const customContentTransition = {
	enterActiveClass: 'custom-content-slide-enter-active',
	leaveActiveClass: 'custom-content-slide-leave-active',
	enterFromClass: 'custom-content-slide-enter-from',
	leaveToClass: 'custom-content-slide-leave-to',
}

const handleBeforeOpen = () => {
	if (props.modelValue || menuNameStore.value === 'navigation') {
		useScrollController.disableScroll()
	}
}

const handleClosed = () => {
	if (!props.modelValue || menuNameStore.value !== 'navigation') {
		useScrollController.enableScroll()
	}
}
</script>

<template>
	<VueFinalModal
		v-model="modelValue"
		v-bind="$attrs"
		:modal-id="modalId"
		:lock-scroll="lockScroll"
		:overlay-transition="customOverlayTransition"
		:content-transition="customContentTransition"
		:click-to-close="clickToClose"
		:esc-to-close="escToClose"
		:hide-overlay="hideOverlay"
		:swipe-to-close="swipeToClose"
		class="modal-container"
		content-class="modal-content"
		overlay-class="modal-overlay"
		@before-open="handleBeforeOpen"
		@closed="handleClosed"
	>
		<div class="modal-inner">
			<button
				class="modal-close-btn"
				type="button"
				aria-label="Закрыть модальное окно"
				:disabled="isLoading"
				@click="close"
			>
				<IconClose class="icon-close" />
			</button>
			<div v-if="$slots.header" class="modal-header">
				<slot name="header" />
			</div>
			<div v-if="$slots.body" class="modal-body">
				<slot name="body" />
			</div>
		</div>
	</VueFinalModal>
</template>

<style lang="scss">
.vfm.modal-container {
	position: fixed;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
	display: flex;
	justify-content: center;
	align-items: center;
}

.modal-overlay.vfm__overlay {
	background-color: rgba(44, 60, 74, 35%);
	backdrop-filter: blur(5.95px);
}

.modal-content {
	position: relative;
	padding: 40px 16px 32px;
	width: 100%;
	max-width: 530px;
	max-height: 70%;
	overflow-y: auto;
	background-color: $color-white;
	border-radius: 16px;
}

.modal-close-btn {
	position: absolute;
	top: 8px;
	right: 8px;
	display: flex;
	justify-content: center;
	align-items: center;
	width: 32px;
	height: 32px;
	margin: 8px 8px 0 0;
	cursor: pointer;
}

// content
.custom-content-slide-enter-active {
	transition:
		opacity 0.5s ease,
		transform 0.6s ease;
}

.custom-content-slide-leave-active {
	transition:
		opacity 0.3s ease,
		transform 0.3s ease;
}

.custom-content-slide-enter-from,
.custom-content-slide-leave-to {
	opacity: 0;
	transform: translateY(-20px);
}

// overlay
.custom-overlay-fade-enter-active {
	transition:
		opacity 0.5s ease,
		transform 0.5s ease;
}

.custom-overlay-fade-leave-active {
	transition:
		opacity 0.3s ease,
		transform 0.3s ease;
}

.custom-overlay-fade-enter-from,
.custom-overlay-fade-leave-to {
	opacity: 0;
}
</style>
