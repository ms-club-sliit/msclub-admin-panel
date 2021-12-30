import { IModifiedBy } from "../interfaces";

interface ITopSpeaker {
    _id?: string;
    name: string;
    title: string;
    company: string;
    imageUrl: string;
    createdBy: IModifiedBy;
    createdAt: Date;
    updatedBy: IModifiedBy[];
    updatedAt: Date;
}

export type { ITopSpeaker };