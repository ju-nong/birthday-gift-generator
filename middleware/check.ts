import { userStore, pageStore } from "~/stores";

export default defineNuxtRouteMiddleware((to) => {
	// const page = pageStore();
	// page.toggleLoad();
	// if (to.name !== "index" && to.name !== "board") {
	//     const user = userStore();
	//     // 메인 페이지나 방명록 페이지가 아니면서 로그인을 하지 않은 상태일 경우
	//     if (!user.getLogin) {
	//         page.setBlock(true); // 잘못된 접근 Flag 변수를 True로 변경
	//         // return navigateTo("/"); // 메인으로 이동
	//     }
	// }
});
