import { IModifiedBy } from ".";

interface IApplication {
	_id: string;
	name: string;
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
	createdBy: IModifiedBy;
	updatedBy: IModifiedBy[];
	deletedBy?: IModifiedBy;
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

export type { IApplicationStore, IApplication };
