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
	createdAt?: Date;
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
	imageSrc?: any | null;
	webinarName: string | null;
	webinarType: string | null;
	dateTime: string | null;
	registrationLink: string | null;
	webinarLink: string | null;
	filteredTags: string[] | null;
	description: string | null;
}

//webinar State Interface
interface IWebinarState {
	webinarId: string | null;
	isFormNotValid: boolean;
	imageSrc?: any;
	webinarName: string | null;
	webinarType: string | null;
	dateTime: string | null;
	registrationLink: string | null;
	webinarLink: string | null;
	filteredTags: string[] | null;
	description: string | null;
}

export type { IWebinarStore, IWebinar, IwebinarFormData, IWebinarState };
