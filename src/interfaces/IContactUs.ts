//Contact Us Interface
interface IContactUs {
  _id?: string;
  name: string;
  email: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

//Contact Us State interface
interface IContactUsStore {
  contact: IContactUs | null;
  contacts: IContactUs[] | null;
  ArchiveContact: IContactUs | null;
  ArchiveContacts: IContactUs[] | null;
  loading: boolean;
  error: string | null;
}

export type { IContactUs, IContactUsStore };
