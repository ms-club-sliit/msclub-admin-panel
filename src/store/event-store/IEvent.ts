interface IEvent {
  _id?: string;
  title: string;
  description: string;
  dateTime: Date;
  tags: string[];
  link: string;
  eventType: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date | null;
}


// State Interface
interface IEventState {
  events: IEvent[] | null;
  addEvent: IEvent | null;
  updateEvent: IEvent | null;
  removeEvent: IEvent | null;
  loading: boolean;
  error: string | null;
}

export type { IEventState, IEvent };
