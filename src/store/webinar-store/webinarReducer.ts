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
		case `${WebinarActionTypes.GET_DELETED_WEBINARS}_PENDING`:
		case `${WebinarActionTypes.UPDATE_WEBINAR}_PENDING`:
		case `${WebinarActionTypes.DELETE_WEBINAR}_PENDING`:
			return { ...state, loading: true };

		case `${WebinarActionTypes.CREATE_WEBINAR}_FULFILLED`:
			let createWebinar = action.payload.data;
			return { ...state, loading: false, createWebinar };
		case `${WebinarActionTypes.GET_WEBINAR}_FULFILLED`:
			let webinar = action.payload.data;
			return { ...state, loading: false, webinar };
		case `${WebinarActionTypes.GET_ALL_WEBINARS}_FULFILLED`:
			let webinars = action.payload.data;
			return { ...state, loading: false, webinars };
		case `${WebinarActionTypes.GET_DELETED_WEBINARS}_FULFILLED`:
			let deletedWebinars = action.payload.data;
			return { ...state, loading: false, deletedWebinars };
		case `${WebinarActionTypes.SET_WEBINAR_ID}`:
			let selectedWebinarId = action.payload;
			return { ...state, loading: false, selectedWebinarId };

		case `${WebinarActionTypes.UPDATE_WEBINAR}_FULFILLED`:
			let updateWebinar = action.payload.data;
			return { ...state, loading: false, updateWebinar };
		case `${WebinarActionTypes.DELETE_WEBINAR}_FULFILLED`:
			let deleteWebinar = action.payload.data;
			return { ...state, loading: false, deleteWebinar };

		case `${WebinarActionTypes.CREATE_WEBINAR}_REJECTED`:
		case `${WebinarActionTypes.GET_WEBINAR}_REJECTED`:
		case `${WebinarActionTypes.GET_ALL_WEBINARS}_REJECTED`:
		case `${WebinarActionTypes.GET_DELETED_WEBINARS}_REJECTED`:
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
