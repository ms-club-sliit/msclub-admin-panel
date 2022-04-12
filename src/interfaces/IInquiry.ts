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
	replyInquiry: IInquiry | null;
	loading: boolean;
	error: string | null;
}

// Inquiry Reply Form Interface
interface IInquiryReplyFormData {
	reply: string| null;
}

// Inquiry Reply State Interface
interface IInquiryReplyState {
	inquiryId: string | null;
	reply: string | null;
	isFormNotValid: boolean;
}

export type { IInquiry, IInquiryStore, IInquiryReplyFormData, IInquiryReplyState };
