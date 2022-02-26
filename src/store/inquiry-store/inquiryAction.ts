import InquiryActionTypes from "./inquiryActionTypes";
import InquiryAPI from "../api/InquiryAPI";

export const getInquiries = () => {
	return {
		type: InquiryActionTypes.GET_ALL_INQUIRIES,
		payload: InquiryAPI.getInquiries,
	};
};

export const deleteInquiry = (contactUsId: string) => {
	return {
		type: InquiryActionTypes.DELETE_INQUIRY,
		payload: InquiryAPI.deleteInquiry(contactUsId),
	};
};

export const setInquiryId = (inquiryId: string) => {
	return {
		type: InquiryActionTypes.SET_INQUIRY_ID,
		payload: inquiryId,
	};
};

export const getDeletedInquiries = () => {
	return {
		type: InquiryActionTypes.GET_DELETED_INQUIRIES,
		payload: InquiryAPI.getDeletedInquiries,
	};
};

export const recoverDeletedInquiry = (contactUsId: string) => {
	return {
		type: InquiryActionTypes.UPDATE_INQUIRY,
		payload: InquiryAPI.recoverDeletedInquiry(contactUsId),
	};
};
export const deleteInquiryPermanently = (inquiryId: string) => {
	return {
		type: InquiryActionTypes.DELETE_INQUIRY,
		payload: InquiryAPI.permanantDeletedInquiry(inquiryId),
	};
};
