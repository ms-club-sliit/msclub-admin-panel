import { IModifiedBy } from ".";
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

// State Interface
interface IEventState {
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

export type { IEventState, IEvent };
