// Event Form Interface
interface IInterviewFormData {
	applicationDate: string | null;
	applicationTime: string | null;
	applicationDuration: string | null;
	applicationFormat: string | null;
}

// Event State Interface
interface IInterviewState {
	applicationId: string | null;
	isFormNotValid: boolean;
	applicationDate: string | null;
	applicationTime: string | null;
	applicationDuration: string | null;
	applicationFormat: string | null;
}

export type { IInterviewState, IInterviewFormData };
