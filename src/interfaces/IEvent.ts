import { IModifiedBy } from "../store/interfaces";

interface IEventView {
  _id: string;
  title: string;
  description: string;
  eventType: string;
  link: string;
  registrationLink: string;
  tags: string[];
  dateTime: Date;
  imageUrl: string;
  createdBy: IModifiedBy;
  createdAt: Date;
  updatedBy: IModifiedBy[];
  updatedAt: Date;
}

export type { IEventView };
