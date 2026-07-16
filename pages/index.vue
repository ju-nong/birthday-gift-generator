<template>
	<h1 class="title">와 생일 축하해~🎉</h1>
	<div class="form-container flex flex-col p-2 mt-2">
		<label>
			<p>이름</p>
			<input v-model.trim="$name" type="text" placeholder="너 이름" />
		</label>
		<label>
			<p>생년월일</p>
			<input
				v-model.trim="$birthday"
				type="tel"
				placeholder="YYMMDD"
				maxlength="6"
				@keyup.enter="handleLogin"
				@input="validateBirthday"
			/>
		</label>
		<button class="primary-button mt-2" @click="handleLogin">
			🎁 받기
		</button>
	</div>
</template>

<script setup lang="ts">
import { userStore, dbStore, toastStore, adminStore } from "~/stores";
import { storeToRefs } from "pinia";

const router = useRouter();

// const user = userStore();
// const { login } = storeToRefs(user);

// const db = dbStore();
// const { getData: data } = storeToRefs(db);

// const admin = adminStore();
// const { getData: adminData } = storeToRefs(admin);

const toast = toastStore();

const $name = ref("");
const $birthday = ref("");

function validateBirthday() {
	$birthday.value = $birthday.value.replaceAll(/[^\d]/g, "");
}

/**
 * 로그인
 */
async function login(name: string, birthday: string) {
	try {
		const { data } = await useFetch("/api/login", {
			method: "POST",
			body: {
				name,
				birthday,
			},
		});
	} catch (error) {
		console.error(error);
	}
}

// function checkData() {
// 	// const { name: adminName, birthday: adminBirthday } = adminData.value; // admin 이름이랑 생년월일 가져오기
// 	// // 입력한 정보가 admin 정보인지
// 	// if (inputName === adminName && inputBirthday === adminBirthday) {
// 	//     return {
// 	//         type: "info",
// 	//         message: "어 준용이 어서오고",
// 	//     };
// 	// }
// 	// // 생일인 사람 정보 가져오기
// 	// const { birthday, name, login } = data.value;
// 	//
// 	// if (inputName === name && inputBirthday === birthday) {
// 	//     if (!login) {
// 	//         return { type: "check", message: "🎉 와 생일 축하해! 🎉" };
// 	//     } else {
// 	//         return { type: "danger", message: "이미 받았잖아 ✋" };
// 	//     }
// 	// } else {
// 	//     return { type: "danger", message: "너 생일 아니잖아!" };
// 	// }
// }

async function handleLogin() {
	const [inputName, inputBirthday] = [$name.value, $birthday.value];

	// 이름이랑 생년월일을 입력했는지
	if (!inputName.length || !inputBirthday.length) {
		toast.addToast({
			type: "danger",
			message: "이름이랑 생년월일 다 적어",
		});
		return;
	}

	// 로그인 API
	login(inputName, inputBirthday);

	// checkData();

	// toast.addToast({
	// 	type,
	// 	message,
	// });
	// if (type !== "danger") {
	// 	user.setLogin(true);
	// }
	// if (type === "check") {
	// 	await db.updateDB("login", true);
	// 	router.replace("/intro");
	// } else if (type === "info") {
	// 	router.push("/admin");
	// }
}
</script>

<style scoped lang="scss">
.form-container {
	label {
		padding-bottom: 0.5rem;
		p {
			padding: 0.5rem 0px;
			font-weight: 600;
		}
		input {
			width: 100%;
			padding: 0.5rem;
			border-radius: 0.5rem;
			border: 1px solid #ccc;
		}
	}

	button {
		box-shadow:
			8px 8px 20px #d1e7f9,
			-8px -8px 20px #fff;
	}
}
</style>
