<template>
	<div class="admin-container-main-camera">
		<!-- <ul v-if="list.length">
            <AdminCameraImage
                v-for="(item, index) in list"
                :key="index"
                :index="index"
                :name="item"
            />
        </ul> -->
	</div>
</template>

<script setup>
import { dbStore } from "~/stores";
import { storeToRefs } from "pinia";

const db = dbStore();
const { data } = storeToRefs(db);

// const list = computed(() => data.value?.list?.slice()?.reverse());
</script>

<style lang="scss">
.admin-container-main-camera {
	> ul {
		> li {
			padding: 8px;

			&:not(:first-child) {
				border-top: 1px solid #eee;
			}

			h2 {
				font-size: 24px;
				font-weight: 700;
				margin-bottom: 8px;
			}

			img {
				cursor: pointer;
			}
		}
	}
}
</style>
