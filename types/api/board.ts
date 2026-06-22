import type { Database } from "~/types/database.types";
import type { ApiResponse, Pagination } from "~/types/api/common";

/**
 * 방명록 항목 타입
 */
export type BoardRow = Database["public"]["Tables"]["board"]["Row"];

/**
 * 방명록 불러오기 요청
 */
export interface BoardGetRequest {
	page: number;
	size: number;
}

/**
 * 방명록 불러오기 응답
 */
export interface BoardGetResponse extends ApiResponse<
	{
		list: BoardRow[];
	} & Pagination
> {}
