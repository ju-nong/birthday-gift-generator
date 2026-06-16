<template>
	<div class="scroll-trigger" ref="$trigger">
		<div></div>
	</div>
</template>

<script setup lang="ts">
const props = withDefaults(
	defineProps<{
		isLoading?: boolean;
	}>(),
	{
		isLoading: false,
	},
);
const { isLoading } = toRefs(props);

const emits = defineEmits<{
	onTrigger: [];
}>();

const $trigger = ref<HTMLElement | null>(null);
let observer: IntersectionObserver | null = null;

watch(isLoading, (to, from) => {
	if (from && !to) {
		setObserver();
	}
});

// 옵저버 등록
function setObserver() {
	if (!$trigger.value) {
		return;
	}

	if (observer) {
		observer.disconnect(); // 기존 거 제거
	}

	observer = new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting && !isLoading.value) {
					emits("onTrigger");
				}
			});
		},
		{
			root: null,
			rootMargin: "0px",
			threshold: 0,
		},
	);

	observer.observe($trigger.value);
}

onMounted(() => {
	setObserver();
});

onBeforeUnmount(() => {
	if (observer && $trigger.value) {
		observer.unobserve($trigger.value);
		observer.disconnect();
	}
});
</script>

<style scoped lang="scss">
.scroll-trigger {
	display: flex;
	justify-content: center;
	pointer-events: none;

	> div {
		width: 48px;
		height: 48px;
		border: 5px solid #444;
		border-bottom-color: transparent;
		border-radius: 50%;
		display: block;
		animation: rotation 1s linear infinite;
	}
}
</style>
