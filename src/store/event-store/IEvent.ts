interface IEvent {
  _id?: string;
  title: string;
  description: string;
  dateTime: Date;
  tags: string[];
  link: string;
  eventType: string;
  imageUrl: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}

// State Interface
interface IEventState {
  event: IEvent | null;
  events: IEvent[] | null;
  addEvent: IEvent | null;
  updatedEvent: IEvent | null;
  deletedEvent: IEvent | null;
  loading: boolean;
  error: string | null;
}

export type { IEventState, IEvent };
