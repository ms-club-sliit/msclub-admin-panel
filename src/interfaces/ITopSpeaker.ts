import { IModifiedBy } from ".";

interface ITopSpeaker {
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

interface ITopSpeakerStore {
  topSpeaker: ITopSpeaker | null;
  topSpeakers: ITopSpeaker[] | null;
  deletedTopSpeakers: ITopSpeaker[] | null;
  selectedTopSpeakerId: string | null;
  addTopSpeaker: ITopSpeaker | null;
  updatedTopSpeaker: ITopSpeaker | null;
  deletedTopSpeaker: ITopSpeaker | null;
  loading: boolean;
  error: string | null;
}

export type { ITopSpeaker, ITopSpeakerStore };
