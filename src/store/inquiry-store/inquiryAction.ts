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

export const setInquiryId = (contactUsId: string) => {
	return {
		type: InquiryActionTypes.SET_INQUIRY_ID,
		payload: contactUsId,
	};
};

export const getDeletedInquiries = () => {
	return {
		type: InquiryActionTypes.GET_DELETED_INQUIRIES,
		payload: InquiryAPI.getDeletedInquiries,
	};
};
