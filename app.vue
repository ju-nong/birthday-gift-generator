<template>
	<NuxtLayout>
		<NuxtPage />
	</NuxtLayout>
</template>
<script setup lang="ts">
import { pageStore, toastStore } from "~/stores";
import { storeToRefs } from "pinia";

const router = useRouter();

const page = pageStore();
const { block } = storeToRefs(page);

const toast = toastStore();

function addDangerToast() {
	toast.addToast({
		type: "danger",
		message: "응 못 뚫어",
	});

	page.setBlock(false);

	router.replace("/");
}

// 접근이 막혔을 때
watch(block, (to, from) => {
	if (!from && to) {
		addDangerToast();
	}
});

onMounted(() => {
	if (block.value) {
		addDangerToast();
	}
});
</script>
