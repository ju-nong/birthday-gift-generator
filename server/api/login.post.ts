import type { AuthPostRequest, AuthPostResponse } from "~/types/api/auth";

import { serverSupabaseClient } from "#supabase/server";

export default defineEventHandler(async (event): Promise<AuthPostResponse> => {
	const { email, password } = await readBody<AuthPostRequest>(event);

	if (!email || !password) {
		throw createError({
			statusCode: 400,
			statusMessage: "이메일과 비밀번호를 모두 입력해주세요.",
		});
	}

	const client = await serverSupabaseClient(event);
	const { data, error } = await client.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		throw createError({
			statusCode: 500,
			statusMessage: error.message,
		});
	}

	return {
		success: true,
		message: "",
		data: {
			user: data.user,
		},
	};
});
