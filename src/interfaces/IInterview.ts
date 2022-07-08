import { IModifiedBy } from ".";


interface IInterview {
	_id: string;
	name: string;
	studentId: string;
	email: string;
	contactNumber: string;
	currentAcademicYear: string;
	selfIntroduction: string;
	reasonForJoin: string;
	linkedIn: string;
	gitHub: string;
	blog?: string;
	experiences?: string;
	challenges?: string;
	goal: string;
	skillsAndTalents: string[];
	pastWork?: string;
	deletedAt?: Date;
	status: string;
	createdAt: Date;
	createdBy: IModifiedBy;
	updatedBy: IModifiedBy[];
	deletedBy?: IModifiedBy;
	meeting?: IMeeting;
}

interface IMeeting {
	meetingId: string;
	meetingName: string;
	startDateTime: string;
	endDateTime: string;
	emailList: [];
	scheduledLink: string;
}










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

export type { IInterviewState, IInterviewFormData, IInterview };
