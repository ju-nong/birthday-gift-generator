<template>
    <h1 class="title">와 축하해!</h1>
    <div class="pick-container text-center">
        <div class="p-4">
            <img
                v-show="load"
                :src="url"
                alt="기프티콘"
                class="cursor-pointer"
                @load="handleLoad"
                @click="handleDownload"
            />
            <span v-if="!load" class="loader"></span>
        </div>
        <!-- <p class="text-xs">위에 이미지를 클릭해서 다운로드 받을 수 있어</p> -->
		 <p class="text-xs">메시지 전송 안 하면 선물 못 받아</p>
        <h2 class="pb-2 pt-4 font-semibold">와 생일 축하해!</h2>
        <p class="py-2 font-light text-sm">
            할 말 있으면 밑에다가 적도록 <br />
            어 1년 뒤에 보자
        </p>
        <textarea
            v-model="message"
            name=""
            id=""
            rows="3"
            placeholder="준용아 고마워!"
            class="w-full p-2 my-4"
        ></textarea>
        <button class="primary-button" @click="handleSend">전송</button>
    </div>
</template>

<script setup>
import confetti from "canvas-confetti";
import { storeToRefs } from "pinia";
import { dbStore, userStore, toastStore, boardStore } from "~/stores";
import { ref as storageRef } from "firebase/storage";
import { useFirebaseStorage, useStorageFileUrl } from "vuefire";

const router = useRouter();

const db = dbStore();
const { data } = storeToRefs(db);

const user = userStore();
const { pick } = storeToRefs(user);

const board = boardStore();

// const storage = useFirebaseStorage();
// const image = storageRef(storage, `${data.value?.list[pick.value]}`);
// const { url, promise } = useStorageFileUrl(image);

/**
 * 임시 이미지 목록
 */
const TEMP_IMAGE_LIST = ["https://jaguar-somerset-washer-abstracts.trycloudflare.com/whe89fhqf3287yu2198u.png",  "https://jaguar-somerset-washer-abstracts.trycloudflare.com/u84wuhq23jiwegu9.webp","https://jaguar-somerset-washer-abstracts.trycloudflare.com/uq324gyu3t4.webp"]
const url = TEMP_IMAGE_LIST[pick.value];

const load = ref(false);
const message = ref();

const toast = toastStore();

function handleSend() {
    const { birthday, list, name, score } = data.value;

    board.updateBoard({
        birthday: birthday,
        content: message.value,
        name: name,
        score: score,
		// url: url.value,
		url,
        pick: pick.value,
    });

    toast.addToast({
        type: "check",
        message: "메시지 전송 완료 안녕~",
    });

    router.replace("/");
}

function handleLoad() {
    load.value = true;
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
    });
}

async function handleDownload() {
	return;
    const response = await fetch(url);
    const blob = await response.blob();

    const url2 = window.URL.createObjectURL(blob);
    const a = document.createElement("a");

    a.style.display = "none";
    a.href = url2;
    a.download = url.split("/").at(-1);

    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url2);
}

onMounted(() => {
    user.setLogin(false);
    db.updateDB("pick", pick.value);
});
</script>

<style lang="scss">
textarea {
    border: 1px solid #000;
    border-radius: 4px;
}
</style>
