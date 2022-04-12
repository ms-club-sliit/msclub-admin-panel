import { IInquiryStore } from "../../interfaces";
import InquiryActionTypes from "./inquiryActionTypes";

const initialState: IInquiryStore = {
	inquiry: null,
	inquiries: [],
	selectedInquiryId: null,
	deleteInquiry: null,
	updatedInquiry: null,
	deleteInquiries: [],
	replyInquiry: null,
	loading: false,
	error: null,
};

const inquiryReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case `${InquiryActionTypes.GET_INQUIRY}_PENDING`:
		case `${InquiryActionTypes.REPLY_INQUIRY}_PENDING`:
		case `${InquiryActionTypes.GET_ALL_INQUIRIES}_PENDING`:
		case `${InquiryActionTypes.SET_INQUIRY_ERROR}_PENDING`:
		case `${InquiryActionTypes.GET_DELETED_INQUIRIES}_PENDING`:
		case `${InquiryActionTypes.UPDATE_INQUIRY}_PENDING`:
		case `${InquiryActionTypes.DELETE_INQUIRY}_PENDING`:
			return { ...state, loading: true };
		
		case `${InquiryActionTypes.GET_INQUIRY}_FULFILLED`:
			let inquiry = action.payload.data;
			return { ...state, loading: false, inquiry };
		case `${InquiryActionTypes.REPLY_INQUIRY}_FULFILLED`:
			let replyInquiry = action.payload.data;
			return { ...state, loading: false, replyInquiry };
		case `${InquiryActionTypes.GET_ALL_INQUIRIES}_FULFILLED`:
			let inquiries = action.payload.data;
			return { ...state, loading: false, inquiries };
		case `${InquiryActionTypes.SET_INQUIRY_ID}`:
			let selectedInquiryId = action.payload;
			return { ...state, loading: false, selectedInquiryId };
		case `${InquiryActionTypes.UPDATE_INQUIRY}_FULFILLED`:
			let updatedInquiry = action.payload.data;
			return { ...state, loading: false, updatedInquiry };
		case `${InquiryActionTypes.SET_INQUIRY_ERROR}_FULFILLED`:
			let getInquiryError = action.payload.data;
			return { ...state, loading: false, getInquiryError };
		case `${InquiryActionTypes.GET_DELETED_INQUIRIES}_FULFILLED`:
			let deleteInquiries = action.payload.data;
			return { ...state, loading: false, deleteInquiries };
		case `${InquiryActionTypes.DELETE_INQUIRY}_FULFILLED`:
			let deleteInquiry = action.payload.data;
			return { ...state, loading: false, deleteInquiry };

		case `${InquiryActionTypes.GET_INQUIRY}_REJECTED`:
		case `${InquiryActionTypes.REPLY_INQUIRY}_REJECTED`:
		case `${InquiryActionTypes.GET_ALL_INQUIRIES}_REJECTED`:
		case `${InquiryActionTypes.SET_INQUIRY_ID}_REJECTED`:
		case `${InquiryActionTypes.SET_INQUIRY_ERROR}_REJECTED`:
		case `${InquiryActionTypes.GET_DELETED_INQUIRIES}_REJECTED`:
		case `${InquiryActionTypes.UPDATE_INQUIRY}_REJECTED`:
		case `${InquiryActionTypes.DELETE_INQUIRY}_REJECTED`:
			return {
				...state,
				loading: false,
				error: action.payload.response.data,
				state: initialState,
			};

		default:
			return state;
	}
};

export default inquiryReducer;
