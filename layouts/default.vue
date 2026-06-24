<template>
    <Head>
        <!-- Google tag (gtag.js) -->
        <script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-QKFLJJ18PF"
        ></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag() {
                dataLayer.push(arguments);
            }
            gtag("js", new Date());

            gtag("config", "G-QKFLJJ18PF");
        </script>
        <Title>생일선물 뽑기</Title>
        <Meta name="theme-color" content="rgb(26 136 233)" />
        <Meta name="description" content="이준용이 주는 생일선물!" />
        <Meta name="author" content="이준용" />
        <Meta
            name="keywords"
            content="이준용, 오아리, 생일선물, birthday, gift, birthday gift, generator"
        />
        <Meta property="og:type" content="website" />
        <Meta property="og:title" content="생일선물 뽑기" />
        <Meta property="og:description" content="이준용이 주는 생일선물!" />
        <Meta property="og:locale" content="ko_KR" />
        <Meta
            property="og:url"
            content="https://birthday-gift-generator.vercel.app/"
        />
        <Meta property="og:image" content="/ari.png" />
        <Meta property="og:site_name" content="생일선물 뽑기" />

        <Meta name="twitter:card" content="summary_large_image" />
        <Meta name="twitter:title" content="생일선물 뽑기" />
        <Meta name="twitter:description" content="이준용이 주는 생일선물!" />
        <Meta name="twitter:image" content="/ari.png" />

        <Link rel="shortcut icon" href="/favicon.png" type="image/x-icon" />
    </Head>
    <ToastContainer />
    <Modal />
    <main
        class="w-full h-full flex justify-center items-center p-[10rem] flex-col"
    >
        <div
            class="card-container w-full min-w-[300px] max-w-[500px] h-auto p-6"
        >
            <div
                v-if="load"
                class="flex justify-center items-center min-h-[400px]"
            >
                <span class="loader"></span>
            </div>
            <slot v-else />
        </div>
        <NuxtLink
            v-if="route.name === 'index'"
            to="/board"
            class="text-sm mt-4 relative"
            >다녀갔던 사람들
            <span class="absolute click-btn">👈</span>
        </NuxtLink>
    </main>

    <Copyright />
</template>

<script setup>
import { pageStore } from "~/stores";
import { storeToRefs } from "pinia";

const page = pageStore();
const { load } = storeToRefs(page);

const router = useRouter();
const route = useRoute();

watch(load, (to, from) => {
    if (!from && to) {
        setTimeout(() => {
            page.toggleLoad();
        }, 500);
    }
});

onBeforeMount(() => {
    if (load.value) {
        page.toggleLoad();
    }
});
</script>

<style lang="scss">
@media screen and (max-width: 767px) {
    main {
        padding: 6rem !important;
    }
}

@keyframes ClickMe {
    0% {
        transform: translateX(15px);
    }
    50% {
        transform: translateX(5px);
    }
    100% {
        transform: translateX(15px);
    }
}

.click-btn {
    animation: ClickMe;
    animation-duration: 2.5s;
    animation-iteration-count: infinite;
}
</style>
