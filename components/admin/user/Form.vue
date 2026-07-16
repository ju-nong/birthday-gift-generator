<template>
	<div class="user-form">
		<h2>사용자 등록</h2>

		<form @submit.prevent="handleSubmit">
			<label for="name">이름</label>
			<input
				v-model.trim="$name"
				type="text"
				placeholder="이름"
				id="name"
			/>

			<label for="birthday">생일</label>
			<input v-model.trim="$birthday" type="date" id="birthday" />

			<button>생성하기</button>
		</form>
	</div>
</template>

<script setup lang="ts">
import { toastStore } from "~/stores";

const { addToast } = toastStore();

/**
 * 이름
 */
const $name = ref("");

/**
 * 생일
 */
const $birthday = ref("");

/**
 * 사용자 생성 전 입력값 검사
 */
function handleSubmit() {
	if ($name.value.length < 1 || $birthday.value.length < 1) {
		return addToast({
			type: "danger",
			message: "이름과 생일을 입력해주세요.",
		});
	}
}
</script>

<style scoped lang="scss">
.user-form {
	padding: 0.5rem;

	> h2 {
		font-size: 1.25rem;
		font-weight: 700;
		margin-bottom: 0.25rem;
	}

	> form {
		display: flex;
		flex-direction: column;
		row-gap: 0.25rem;

		> label {
			font-size: 1rem;
			font-weight: 600;
			color: #9a9a9a;
		}

		> input {
			margin-bottom: 0.25rem;
		}
	}
}
</style>
