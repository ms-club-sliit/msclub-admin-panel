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

//Contact Us Store interface
interface IContactUsStore {
  contactUs: IContactUs | null;
  contactsUs: IContactUs[] | null;
  selectedContactUsId: string | null;
  deleteContactUs: IContactUs | null;
  deleteContactsUs: IContactUs[] | null;
  loading: boolean;
  error: string | null;
}

export type { IContactUs, IContactUsStore };
