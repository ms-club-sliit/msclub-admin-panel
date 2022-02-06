import { IApplicationStore } from "../../interfaces";
import ApplicationActionTypes from "../application-store/applicationActionTypes";

const initialState: IApplicationStore = {
	application: null,
	applications: [],
	deletedApplications: [],
	updatedApplication: null,
	selectedApplicationId: null,
	deletedApplication: null,
	errorApplication: null,
	loading: false,
	error: null,
};

const applicationReducer = (state = initialState, action: any) => {
	switch (action.type) {
		case `${ApplicationActionTypes.GET_APPLICATION}_PENDING`:
		case `${ApplicationActionTypes.GET_ALL_APPLICATION}_PENDING`:
		case `${ApplicationActionTypes.GET_ARCHIVE_APPLICATIONS}_PENDING`:
		case `${ApplicationActionTypes.UPDATE_APPLICATION}_PENDING`:
		case `${ApplicationActionTypes.DELETED_APPLICATION}_PENDING`:
			return { ...state, loading: true };

		case `${ApplicationActionTypes.GET_APPLICATION}_FULFILLED`:
			let application = action.payload.data;
			return { ...state, loading: false, application };
		case `${ApplicationActionTypes.GET_ALL_APPLICATION}_FULFILLED`:
			let applications = action.payload.data;
			return { ...state, loading: false, applications };
		case `${ApplicationActionTypes.GET_ARCHIVE_APPLICATIONS}_FULFILLED`:
			let deletedApplications = action.payload.data;
			return { ...state, loading: false, deletedApplications };
		case `${ApplicationActionTypes.UPDATE_APPLICATION}_FULFILLED`:
			let updatedApplication = action.payload.data;
			return { ...state, loading: false, updatedApplication };
		case `${ApplicationActionTypes.SELECTED_APPLICATION_ID}`:
			let selectedApplicationId = action.payload;
			return { ...state, loading: false, selectedApplicationId };
		case `${ApplicationActionTypes.DELETED_APPLICATION}_FULFILLED`:
			let deletedApplication = action.payload.data;
			return { ...state, loading: false, deletedApplication };

		case `${ApplicationActionTypes.GET_APPLICATION}_REJECTED`:
		case `${ApplicationActionTypes.GET_ALL_APPLICATION}_REJECTED`:
		case `${ApplicationActionTypes.GET_ARCHIVE_APPLICATIONS}_REJECTED`:
		case `${ApplicationActionTypes.UPDATE_APPLICATION}_REJECTED`:
		case `${ApplicationActionTypes.DELETED_APPLICATION}_REJECTED`:
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

export default applicationReducer;
