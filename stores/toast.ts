import type { ToastType } from "~/types/components/toast";

export const toastStore = defineStore("toast", () => {
	const toast = reactive<
		{
			type: ToastType;
			message: string;
		}[]
	>([]);

	function addToast(config: { type: ToastType; message: string }) {
		toast.push(config);
	}

	return { toast, addToast };
});
