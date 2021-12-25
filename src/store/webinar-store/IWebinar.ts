import { type } from "os";
import { IModifiedBy } from "../interfaces";

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

interface IWebinarState {
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

export type { IWebinar, IWebinarState }