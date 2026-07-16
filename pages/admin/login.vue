<template>
	<h1 class="title">관리자 로그인</h1>

	<form @submit.prevent="handleLogin">
		<div class="form-container">
			<label>
				<p>이메일</p>
				<input
					v-model.trim="$email"
					required
					type="email"
					placeholder="이메일"
				/>
			</label>
			<label>
				<p>비밀번호</p>
				<input
					v-model.trim="$password"
					required
					type="password"
					placeholder="비밀번호"
				/>
			</label>
			<button class="primary-button">로그인</button>
		</div>
	</form>
</template>

<script setup lang="ts">
import type { AuthPostResponse } from "~/types/api/auth";

import { toastStore } from "~/stores";

const toast = toastStore();

const $email = ref("");
const $password = ref("");

/**
 * 로그인
 */
async function login() {
	try {
		const response = await $fetch<AuthPostResponse>("/api/login", {
			method: "POST",
			body: {
				email: $email.value,
				password: $password.value,
			},
		});

		if (response.success) {
		}
	} catch (error) {
		toast.addToast({
			type: "danger",
			message: "로그인에 실패했습니다.",
		});
		console.error(error);
	}
}

/**
 * 로그인 전 입력값 검사
 */
function handleLogin() {
	if ($email.value.length < 1 || $password.value.length < 1) {
		return;
	}

	login();
}
</script>

<style scoped lang="scss"></style>
