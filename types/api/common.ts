/**
 * API 공통 응답
 */
export interface ApiResponse<T> {
	success: boolean;
	message: string;
	data: T;
}

/**
 * 페이지네이션
 */
export interface Pagination {
	totalPage: number;
	totalCount: number;
}
