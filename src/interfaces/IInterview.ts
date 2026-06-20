// Event Form Interface
interface IInterviewFormData {
	applicationFormat: string | null;
	applicationStartDateTime: string | null;
	applicationEndDateTime: string | null;
}

// Event State Interface
interface IInterviewState {
	applicationId: string | null;
	isFormNotValid: boolean;
	applicationFormat: string | null;
	applicationStartDateTime: string | null;
	applicationEndDateTime: string | null;
}

export type { IInterviewState, IInterviewFormData };
