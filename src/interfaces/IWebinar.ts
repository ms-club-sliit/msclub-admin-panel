import { IModifiedBy } from ".";

interface IWebinar {
	_id?: string;
	title: string;
	description: string;
	imageUrl: string;
	dateTime: Date;
	tags?: string[];
	link?: string;
	registrationLink?: string;
	webinarType: string;
	deletedAt?: Date | null;
	createdBy: IModifiedBy;
	updatedBy: IModifiedBy[];
	deletedBy?: IModifiedBy;
}

interface IWebinarStore {
	webinar: IWebinar | null;
	webinars: IWebinar[] | null;
	deletedWebinars: IWebinar[] | null;
	selectedWebinarId: string | null;
	addWebinar: IWebinar | null;
	updatedWebinar: IWebinar | null;
	deletedWebinar: IWebinar | null;
	loading: boolean;
	error: string | null;
}

//webinar form Interface
interface IwebinarFormData {
	title: string | null;
	description: string | null;
	imageUrl: string | null;
	dateTime: string | null;
	tags: string[] | null;
	link: string | null;
	registrationLink: string | null;
	webinarType: string | null;
	filteredTags: string[] | null;
}

//webinar State Interface
interface IWebinarState {
	webinarId: string | null;
	isFormNotValid: boolean | null;
	title: string | null;
	description: string | null;
	imageUrl?: any;
	dateTime: string | null;
	tags: string[] | null;
	link: string | null;
	registrationLink: string | null;
	webinarType: string | null;
	filteredTags: string[] | null;
}

export type { IWebinarStore, IWebinar, IwebinarFormData, IWebinarState };
