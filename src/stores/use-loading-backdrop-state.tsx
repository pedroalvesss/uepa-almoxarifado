import { create } from "zustand";

interface LoadingBackdropParams {
	message?: string;
	isLoading: boolean;
}

interface LoadingBackdropAction {
	showLoading: (params: Omit<LoadingBackdropParams, "isLoading">) => void;
	closeLoading: () => void;
}

export const useLoadingBackdropState = create<
	LoadingBackdropParams & LoadingBackdropAction
>((set) => ({
	isLoading: false,
	message: "",
	closeLoading: () => set(() => ({ isLoading: false })),
	showLoading: ({ message }) => set(() => ({ isLoading: true, message })),
}));
