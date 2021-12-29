import { IModifiedBy } from "../store/interfaces";

interface ITopSpeakerView {
    _id: string;
    name: string;
    title: string;
    company: string;
    imageUrl: string;
    createdBy: IModifiedBy;
    createdAt: Date;
    updatedBy: IModifiedBy[];
    updatedAt: Date;
}

export type { ITopSpeakerView };