import { IContactUsStore } from "../../interfaces";
import ContactUsActionTypes from "./contactUsActionTypes";

const initialState: IContactUsStore = {
	contactUs: null,
	contactsUs: [],
	selectedContactUsId: null,
	deleteContactUs: null,
	deleteContactsUs: null,
	loading: false,
	error: null,
};

const contactUsReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case `${ContactUsActionTypes.GET_CONTACT}_PENDING`:
		case `${ContactUsActionTypes.GET_ALL_CONTACTS}_PENDING`:
		case `${ContactUsActionTypes.SET_CONTACT_ID}_PENDING`:
		case `${ContactUsActionTypes.SET_CONTACT_ERROR}_PENDING`:
		case `${ContactUsActionTypes.GET_DELETED_CONTACTS}_PENDING`:
		case `${ContactUsActionTypes.DELETE_CONTACT}_PENDING`:
			return { ...state, loading: true };

		case `${ContactUsActionTypes.GET_CONTACT}_FULFILLED`:
			let getContact = action.payload.data;
			return { ...state, loading: false, getContact };
		case `${ContactUsActionTypes.GET_ALL_CONTACTS}_FULFILLED`:
			let contactsUs = action.payload.data;
			return { ...state, loading: false, contactsUs };
		case `${ContactUsActionTypes.SET_CONTACT_ID}_FULFILLED`:
			let selectedContactUsId = action.payload.data;
			return { ...state, loading: false, selectedContactUsId };
		case `${ContactUsActionTypes.SET_CONTACT_ERROR}_FULFILLED`:
			let getContactError = action.payload.data;
			return { ...state, loading: false, getContactError };
		case `${ContactUsActionTypes.GET_DELETED_CONTACTS}_FULFILLED`:
			let getDeletedContacts = action.payload.data;
			return { ...state, loading: false, getDeletedContacts };
		case `${ContactUsActionTypes.DELETE_CONTACT}_FULFILLED`:
			let deleteContact = action.payload.data;
			return { ...state, loading: false, deleteContact };

		case `${ContactUsActionTypes.GET_CONTACT}_REJECTED`:
		case `${ContactUsActionTypes.GET_ALL_CONTACTS}_REJECTED`:
		case `${ContactUsActionTypes.SET_CONTACT_ID}_REJECTED`:
		case `${ContactUsActionTypes.SET_CONTACT_ERROR}_REJECTED`:
		case `${ContactUsActionTypes.GET_DELETED_CONTACTS}_REJECTED`:
		case `${ContactUsActionTypes.DELETE_CONTACT}_REJECTED`:
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

export default contactUsReducer;
