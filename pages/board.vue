<template>
	<h1 class="title flex justify-between">
		방명록

		<NuxtLink to="/">
			<Icon
				name="ic:round-home"
				size="1.5rem"
				color="rgb(26, 136, 233)"
			/>
		</NuxtLink>
	</h1>

	<div
		v-if="board.length > 0"
		class="board-container flex gap-6 pt-6 flex-col"
	>
		<div
			v-for="(
				{ id, name, score, birthday, filename, content, grade },
				boardItemIndex
			) in board"
			:key="id"
		>
			<h2>{{ boardItemIndex + 1 }}. {{ name }} | {{ birthday }}</h2>
			<h2>
				{{ score === null ? "랜덤" : `시험 ${score}점` }}
				<span>등급 : {{ grade }}</span>
			</h2>
			<SupabaseImg :filename="filename" />

			<p>{{ content }}</p>
		</div>
	</div>

	<ScrollTrigger
		v-if="!done"
		:is-loading="loading"
		@on-trigger="handleTrigger"
	/>
</template>

<script setup lang="ts">
import type { BoardRow, BoardGetResponse } from "~/types/api/board";

/**
 * 방명록 목록
 */
const board = ref<BoardRow[]>([]);

/**
 * 페이지 크기
 */
const PAGE_SIZE = 20;
/**
 * 현재 페이지
 */
let page = 1;
/**
 * 총 페이지 수
 */
let total = 1;
/**
 * 페이징 로딩 여부
 */
const loading = ref(false);
/**
 * 페이지 종료 여부
 */
const done = ref(false);

// 초기 진입
const { data: initialData } = await useFetch<BoardGetResponse>("/api/board", {
	query: {
		page,
		size: PAGE_SIZE,
	},
});

if (initialData.value !== null) {
	const { list, totalPage } = initialData.value.data;

	total = totalPage;
	board.value = list;

	if (total <= 1 || list.length < 1) {
		done.value = true;
	}
}

/**
 * 방명록 불러오기
 */
async function getBoard() {
	try {
		const response = await $fetch<BoardGetResponse>("/api/board", {
			query: {
				page,
				size: PAGE_SIZE,
			},
		});

		if (response !== null) {
			const {
				list,
				totalPage,
				// totalCount
			} = response.data;

			total = totalPage;

			if (list.length < 1) {
				done.value = true;
			} else {
				board.value = [...board.value, ...list];
			}
		}
	} catch (error) {
		console.error(error);
	} finally {
		loading.value = false;

		if (total === page) {
			done.value = true;
		}
	}
}

/**
 * 페이징 트리거
 */
function handleTrigger() {
	page = page + 1;

	loading.value = true;

	getBoard();
}
</script>

<style lang="scss">
.board-container {
	> div {
		position: relative;
		width: 100%;
		padding: 1rem;
		border-radius: 4px;
		transition: transform 0.5s;
		box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);

		&:hover {
			transform: translateY(-5px);
		}

		> h2 {
			display: flex;
			justify-content: space-between;
			align-items: center;

			> span {
				color: #3e7def;
				font-size: 1.05rem;
				font-weight: bold;
			}
		}

		> img {
			margin: 1rem 0;
		}
	}
}
</style>
