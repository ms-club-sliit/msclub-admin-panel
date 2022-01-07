import { IWebinarStore } from "../../interfaces";
import WebinarActionTypes from "./webinarActionTypes";

const initialState: IWebinarStore = {
	webinar: null,
	webinars: [],
	deletedWebinars: [],
	selectedWebinarId: null,
	addWebinar: null,
	updatedWebinar: null,
	deletedWebinar: null,
	loading: false,
	error: null,
};

const webinarReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case `${WebinarActionTypes.CREATE_WEBINAR}_PENDING`:
		case `${WebinarActionTypes.GET_WEBINAR}_PENDING`:
		case `${WebinarActionTypes.GET_ALL_WEBINARS}_PENDING`:
		case `${WebinarActionTypes.SET_WEBINAR_ID}_PENDING`:
		case `${WebinarActionTypes.GET_DELETED_WEBINARS}_PENDING`:
		case `${WebinarActionTypes.SET_WEBINAR_ERROR}_PENDING`:
		case `${WebinarActionTypes.UPDATE_WEBINAR}_PENDING`:
		case `${WebinarActionTypes.DELETE_WEBINAR}_PENDING`:
			return { ...state, loading: true };

		case `${WebinarActionTypes.CREATE_WEBINAR}_FULFILLED`:
			let createWebinar = action.payload.data;
			return { ...state, loading: false, createWebinar };
		case `${WebinarActionTypes.GET_WEBINAR}_FULFILLED`:
			let getWebinar = action.payload.data;
			return { ...state, loading: false, getWebinar };
		case `${WebinarActionTypes.GET_ALL_WEBINARS}_FULFILLED`:
			let getAllWebinars = action.payload.data;
			return { ...state, loading: false, getAllWebinars };
		case `${WebinarActionTypes.SET_WEBINAR_ID}_FULFILLED`:
			let getWebinarId = action.payload.data;
			return { ...state, loading: false, getWebinarId };
		case `${WebinarActionTypes.GET_DELETED_WEBINARS}`:
			let getDeletedWebinars = action.payload;
			return { ...state, loading: false, getDeletedWebinars };
		case `${WebinarActionTypes.SET_WEBINAR_ERROR}_FULFILLED`:
			let setWebinarError = action.payload.data;
			return { ...state, loading: false, setWebinarError };
		case `${WebinarActionTypes.UPDATE_WEBINAR}_FULFILLED`:
			let updateWebinar = action.payload.data;
			return { ...state, loading: false, updateWebinar };
		case `${WebinarActionTypes.DELETE_WEBINAR}_FULFILLED`:
			let deleteWebinar = action.payload.data;
			return { ...state, loading: false, deleteWebinar };

		case `${WebinarActionTypes.CREATE_WEBINAR}_REJECTED`:
		case `${WebinarActionTypes.GET_WEBINAR}_REJECTED`:
		case `${WebinarActionTypes.GET_ALL_WEBINARS}_REJECTED`:
		case `${WebinarActionTypes.SET_WEBINAR_ID}_REJECTED`:
		case `${WebinarActionTypes.GET_DELETED_WEBINARS}_REJECTED`:
		case `${WebinarActionTypes.SET_WEBINAR_ERROR}_REJECTED`:
		case `${WebinarActionTypes.UPDATE_WEBINAR}_REJECTED`:
		case `${WebinarActionTypes.DELETE_WEBINAR}_REJECTED`:
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

export default webinarReducer;
