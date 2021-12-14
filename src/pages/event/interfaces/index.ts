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

export type { IEventFormData, IEventState };
