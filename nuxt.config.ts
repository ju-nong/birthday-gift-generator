// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	runtimeConfig: {
		public: {
			supabaseUrl: "",
			supabaseKey: "",
			supabaseStorageBucketIdPresent: "",
		},
	},
	modules: [
		"@nuxtjs/tailwindcss",
		"@pinia/nuxt",
		"@nuxtjs/google-fonts",
		"nuxt-icon",
		"@nuxtjs/supabase",
	],
	css: ["~/assets/css/main.scss"],
	build: {
		transpile: ["@morev/vue-transitions"],
	},
	app: {
		head: {
			htmlAttrs: {
				lang: "ko",
			},
		},
	},
	pinia: {
		autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
	},
	supabase: {
		redirect: false,
		types: "./types/database.types.ts",
		cookieOptions: {
			maxAge: 60 * 60 * 24 * 7,
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
		},
	},
});
