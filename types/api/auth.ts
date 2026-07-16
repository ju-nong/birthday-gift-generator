import type { User } from "@supabase/supabase-js";
import type { ApiResponse } from "~/types/api/common";

/**
 * 로그인 요청
 */
export interface AuthPostRequest {
	email: string;
	password: string;
}

/**
 * 로그인 응답
 */
export interface AuthPostResponse extends ApiResponse<{ user: User }> {}
