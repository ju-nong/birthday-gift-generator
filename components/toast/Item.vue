<template>
	<TransitionSlide duration="300">
		<div v-if="visible" :class="`toast-item toast-item--${type}`">
			<Icon :name="ICON_MAPPER[type]" size="1.5rem" />
			{{ message }}
		</div>
	</TransitionSlide>
</template>

<script setup lang="ts">
import type { ToastType } from "~~/types/components/toast";

defineProps<{
	type: ToastType;
	message: string;
}>();

/**
 * 토스트 아이콘 mapper
 */
const ICON_MAPPER: Record<ToastType, string> = {
	check: "material-symbols:check-circle-rounded",
	danger: "ph:warning-circle-fill",
	info: "material-symbols:info-rounded",
};

const visible = ref(false);

onMounted(() => {
	visible.value = true;

	setTimeout(() => {
		visible.value = false;
	}, 4000);
});
</script>

<style scoped lang="scss">
.toast-item {
	min-width: max-content;
	display: flex;
	position: fixed;
	align-items: center;
	color: #fff;
	border-radius: 0.5rem;
	padding: 0.75rem 1rem 0.75rem 0.75rem;
	column-gap: 0.75rem;
	top: 1rem;
	left: 50%;
	transform: translateX(-50%);
	white-space: pre-line;
	z-index: 10;
	--tw-shadow:
		0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
	--tw-shadow-colored:
		0 4px 6px -1px var(--tw-shadow-color),
		0 2px 4px -2px var(--tw-shadow-color);
	box-shadow:
		var(--tw-ring-offset-shadow, 0 0 #0000),
		var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);

	&--check {
		background-color: rgb(110 231 183);
	}

	&--danger {
		background-color: rgb(248 113 113);
	}

	&--info {
		background-color: rgb(59 130 246);
	}
}
</style>
