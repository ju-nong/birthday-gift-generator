<template>
	<ToastItem
		v-for="({ type, message }, toastItemIndex) in toast"
		:key="toastItemIndex"
		:type="type"
		:message="message"
	/>
</template>

<script setup>
import { toastStore } from "~/stores";
import { storeToRefs } from "pinia";

const toasts = toastStore();
const { toast } = storeToRefs(toasts);
</script>

<style lang="scss"></style>
