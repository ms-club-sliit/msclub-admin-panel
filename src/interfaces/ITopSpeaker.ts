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
	socialMediaURLs: ITopSpeakerMedia;
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
	socialMediaURLs: ITopSpeakerMedia;
}

//Top Speaker social media URLs interface
interface ITopSpeakerMedia {
	facebook: string | null;
	instagram: string | null;
	twitter: string | null;
	linkedIn: string | null;
	web: string | null;
}

// Event State Interface
interface ITopSpeakerState {
	topSpeakerId: string | null;
	isFormNotValid: boolean;
	imageSrc?: any;
	topSpeakerName: string | null;
	description: string | null;
	facebook: string | null;
	instagram: string | null;
	twitter: string | null;
	linkedIn: string | null;
	web: string | null;
}

export type { ITopSpeaker, ITopSpeakerStore, ITopSpeakerFormData, ITopSpeakerState };
