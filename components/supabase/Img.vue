<template>
	<img
		:src="`${supabaseUrl}/storage/v1/object/public/${supabaseStorageBucketIdPresent}/${filename}`"
	/>
</template>

<script setup lang="ts">
defineProps<{
	filename: string;
}>();

const config = useRuntimeConfig();

const { supabaseUrl, supabaseStorageBucketIdPresent } = config.public;
</script>

<style scoped></style>
