<script setup lang="ts">
import { useRoute } from 'vue-router'
const route = useRoute()
</script>

<template>
	<template v-if="route.name === 'home-view'">
		<span class="logo h4">Portfolio</span>
	</template>
	<template v-else>
		<RouterLink class="logo h4" :to="{ name: 'home-view' }">Portfolio</RouterLink>
	</template>
</template>

<style lang="scss">
.logo {
	text-transform: uppercase;
	z-index: 999;
}
</style>
