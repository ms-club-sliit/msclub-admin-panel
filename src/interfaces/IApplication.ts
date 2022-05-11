import { IModifiedBy } from ".";

interface IApplication {
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

// Application Store Interface
interface IApplicationStore {
	application: IApplication | null;
	applications: IApplication[] | null;
	deletedApplications: IApplication[] | null;
	updatedApplication: IApplication | null;
	selectedApplicationId: IApplication | null;
	deletedApplication: IApplication | null;
	errorApplication: IApplication | null;
	loading: boolean;
	error: string | null;
}

//Meeting interface
interface IMeeting {
	meetingId: string;
	meetingName: string;
	startDateTime: string;
	endDateTime: string;
	emailList: [];
	scheduledLink: string;
}

export type { IApplicationStore, IApplication };
