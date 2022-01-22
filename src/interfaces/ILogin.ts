interface ILoginFormData {
	userName: string | null;
	password: string | null;
}

interface ILoginState {
	userName: string | null;
	password: string | null;
	isLoading: boolean;
	isFormNotValid: boolean;
}

export type { ILoginFormData, ILoginState };
