//Inquiry Interface
interface IInquiry {
	_id?: string;
	name: string;
	email: string;
	message: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt?: Date | null;
	replies: string[];
}

//Inquiry Store interface
interface IInquiryStore {
	inquiry: IInquiry | null;
	inquiries: IInquiry[] | null;
	selectedInquiryId: string | null;
	deleteInquiry: IInquiry | null;
	updatedInquiry: IInquiry | null;
	deleteInquiries: IInquiry[] | null;
	loading: boolean;
	error: string | null;
}

export type { IInquiry, IInquiryStore };
