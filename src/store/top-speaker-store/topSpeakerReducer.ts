import { ITopSpeakerStore } from "../../interfaces";
import TopSpeakerActionTypes from "./topSpeakerActionTypes";

const initialState: ITopSpeakerStore = {
	topSpeaker: null,
	topSpeakers: [],
	deletedTopSpeakers: [],
	selectedTopSpeakerId: null,
	addTopSpeaker: null,
	updatedTopSpeaker: null,
	deletedTopSpeaker: null,
	loading: false,
	error: null,
};

const topSpeakerReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case `${TopSpeakerActionTypes.CREATE_TOP_SPEAKER}_PENDING`:
		case `${TopSpeakerActionTypes.GET_TOP_SPEAKER}_PENDING`:
		case `${TopSpeakerActionTypes.GET_ALL_TOP_SPEAKERS}_PENDING`:
		case `${TopSpeakerActionTypes.DELETE_TOP_SPEAKER}_PENDING`:
		case `${TopSpeakerActionTypes.UPDATE_TOP_SPEAKER}_PENDING`:
			return { ...state, loading: true };

		case `${TopSpeakerActionTypes.CREATE_TOP_SPEAKER}_FULFILLED`:
			let addTopSpeaker = action.payload.data;
			return { ...state, loading: false, addTopSpeaker };
		case `${TopSpeakerActionTypes.GET_TOP_SPEAKER}_FULFILLED`:
			let topSpeaker = action.payload.data;
			return { ...state, loading: false, topSpeaker };
		case `${TopSpeakerActionTypes.GET_ALL_TOP_SPEAKERS}_FULFILLED`:
			let topSpeakers = action.payload.data;
			return { ...state, loading: false, topSpeakers };
		case `${TopSpeakerActionTypes.GET_DELETED_TOP_SPEAKERS}_FULFILLED`:
			let deletedTopSpeakers = action.payload.data;
			return { ...state, loading: false, deletedTopSpeakers };
		case `${TopSpeakerActionTypes.SET_TOP_SPEAKER_ID}`:
			let selectedTopSpeakerId = action.payload;
			return { ...state, loading: false, selectedTopSpeakerId };
		case `${TopSpeakerActionTypes.UPDATE_TOP_SPEAKER}_FULFILLED`:
			let updatedTopSpeaker = action.payload.data;
			return { ...state, loading: false, updatedTopSpeaker };
		case `${TopSpeakerActionTypes.DELETE_TOP_SPEAKER}_FULFILLED`:
			let deletedTopSpeaker = action.payload.data;
			return { ...state, loading: false, deletedTopSpeaker };

		case `${TopSpeakerActionTypes.CREATE_TOP_SPEAKER}_REJECTED`:
		case `${TopSpeakerActionTypes.GET_TOP_SPEAKER}_REJECTED`:
		case `${TopSpeakerActionTypes.GET_ALL_TOP_SPEAKERS}_REJECTED`:
		case `${TopSpeakerActionTypes.GET_DELETED_TOP_SPEAKERS}_REJECTED`:
		case `${TopSpeakerActionTypes.UPDATE_TOP_SPEAKER}_REJECTED`:
		case `${TopSpeakerActionTypes.DELETE_TOP_SPEAKER}_REJECTED`:
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

export default topSpeakerReducer;
