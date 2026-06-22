import type {
	BoardRow,
	BoardGetRequest,
	BoardGetResponse,
} from "~/types/api/board";

import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event): Promise<BoardGetResponse> => {
	// 1. GET 요청의 쿼리 스트링 파라미터 가져오기 (기본값 설정)
	const { page = 1, size = 20 } = getQuery<BoardGetRequest>(event);

	// 2. Supabase range 인덱스 계산
	// 예: page=1, size=10 이면 -> 0부터 9까지 (0-indexed)
	// 예: page=2, size=10 이면 -> 10부터 19까지
	const from = (page - 1) * size;
	const to = from + size - 1;

	// 3. Supabase 클라이언트 가져오기
	const client = await serverSupabaseClient(event);

	// 4. 데이터 조회 및 전체 카운트 동시 요청
	// { count: 'exact' } 옵션을 주면 exactCount에 전체 행(Row) 개수가 담깁니다.
	const {
		data: items,
		error,
		count: exactCount,
	} = await client
		.from("board")
		.select("*", { count: "exact" })
		.order("created_at") // 최신순 정렬 (필요에 따라 변경)
		.range(from, to);

	// 5. 에러 핸들링
	if (error) {
		throw createError({
			statusCode: 500,
			statusMessage: error.message,
		});
	}

	const totalCount = exactCount || 0;
	const totalPages = Math.ceil(totalCount / size);

	// 6. 페이징 결과 반환
	return {
		success: true,
		message: "",
		data: {
			list: items || [],
			totalPage: totalPages < 1 ? 1 : totalPages,
			totalCount,
		},
	};
});
