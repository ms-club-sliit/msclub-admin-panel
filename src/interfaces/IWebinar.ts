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
  title: String | null;
  description: String | null;
  imageUrl: String | null;
  dateTime: String | null;
  tags: String[] | null;
  link: String[] | null;
  registrationLink: String | null;
  webinarType: String | null;
}

//webinar State Interface
interface IWebinarState {
  webinarId: String | null;
  isFormNotValid: boolean | null;
  title: String |null;
  description: String | null;
  imageUrl: String | null;
  dateTime: String | null;
  tags: String[] | null;
  link: String[] | null;
  registrationLink: String | null;
  webinarType: String | null;
}

export type { IWebinarStore, IWebinar, IwebinarFormData, IWebinarState };
