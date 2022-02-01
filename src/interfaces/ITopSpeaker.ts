import { IModifiedBy } from ".";

interface ITopSpeaker {
	_id: string;
	name: string;
	title: string;
	company: string;
	imageUrl: string;
	createdBy: IModifiedBy;
	createdAt: Date;
	updatedBy: IModifiedBy[];
	updatedAt: Date;
	topSpeakerType: string;
	description: string;
}

interface ITopSpeakerStore {
	topSpeaker: ITopSpeaker | null;
	topSpeakers: ITopSpeaker[] | null;
	deletedTopSpeakers: ITopSpeaker[] | null;
	selectedTopSpeakerId: string | null;
	addTopSpeaker: ITopSpeaker | null;
	updatedTopSpeaker: ITopSpeaker | null;
	deletedTopSpeaker: ITopSpeaker | null;
	loading: boolean;
	error: string | null;
}

// Top Speaker Form Interface
interface ITopSpeakerFormData {
	imageSrc?: any | null;
	topSpeakerName: string | null;
	description: string | null;
}
// Event State Interface
interface ITopSpeakerState {
	topSpeakerId: string | null;
	isFormNotValid: boolean;
	imageSrc?: any;
	topSpeakerName: string | null;
	description: string | null;
}
export type { ITopSpeaker, ITopSpeakerStore, ITopSpeakerFormData, ITopSpeakerState };
