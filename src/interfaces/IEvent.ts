import { IModifiedBy } from ".";

// Event Info Interface
interface IEvent {
	_id?: string;
	title: string;
	description: string;
	dateTime: Date;
	tags: string[];
	link: string;
	registrationLink: string;
	eventType: string;
	imageUrl: string;
	createdAt?: Date;
	updatedAt?: Date;
	deletedAt?: Date | null;
	createdBy: IModifiedBy;
	updatedBy: IModifiedBy[];
	deletedBy?: IModifiedBy;
}

// Event Store Interface
interface IEventStore {
	event: IEvent | null;
	events: IEvent[] | null;
	deletedEvents: IEvent[] | null;
	selectedEventId: string | null;
	addEvent: IEvent | null;
	updatedEvent: IEvent | null;
	deletedEvent: IEvent | null;
	loading: boolean;
	error: string | null;
}

// Event Form Interface
interface IEventFormData {
	imageSrc?: any | null;
	eventName: string | null;
	eventType: string | null;
	dateTime: string | null;
	registrationLink: string | null;
	eventLink: string | null;
	filteredTags: string[] | null;
	description: string | null;
}

// Event State Interface
interface IEventState {
	eventId: string | null;
	isFormNotValid: boolean;
	imageSrc?: any;
	eventName: string | null;
	eventType: string | null;
	dateTime: string | null;
	registrationLink: string | null;
	eventLink: string | null;
	filteredTags: string[] | null;
	description: string | null;
}

export type { IEvent, IEventStore, IEventState, IEventFormData };
