import { IApplicationStore } from "../../interfaces";
import ApplicationActionTypes from "../application-store/applicationActionTypes";

const initialState: IApplicationStore = {
  application: null,
  applications: [],
  archiveApplications: null,
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
    case `${ApplicationActionTypes.SELECTED_APPLICATION_ID}_PENDING`:
    case `${ApplicationActionTypes.DELETED_APPLICATION}_PENDING`:
    case `${ApplicationActionTypes.SET_APPLICATION_ERROR}_PENDING`:
      return { ...state, loading: true };

    case `${ApplicationActionTypes.GET_APPLICATION}_FULFILLED`:
      let application = action.payload.data;
      return { ...state, loading: false, application };
    case `${ApplicationActionTypes.GET_ALL_APPLICATION}_FULFILLED`:
      let applications = action.payload.data;
      return { ...state, loading: false, applications };
    case `${ApplicationActionTypes.GET_ARCHIVE_APPLICATIONS}_FULFILLED`:
      let archiveApplications = action.payload.data;
      return { ...state, loading: false, archiveApplications };
    case `${ApplicationActionTypes.UPDATE_APPLICATION}_FULFILLED`:
      let updatedApplication = action.payload.data;
      return { ...state, loading: false, updatedApplication };
    case `${ApplicationActionTypes.SELECTED_APPLICATION_ID}_FULFILLED`:
      let selectedApplicationId = action.payload.data;
      return { ...state, loading: false, selectedApplicationId };
    case `${ApplicationActionTypes.DELETED_APPLICATION}_FULFILLED`:
      let deletedApplication = action.payload.data;
      return { ...state, loading: false, deletedApplication };
    case `${ApplicationActionTypes.SET_APPLICATION_ERROR}_FULFILLED`:
      let errorApplication = action.payload.data;
      return { ...state, loading: false, errorApplication };

    case `${ApplicationActionTypes.GET_APPLICATION}_REJECTED`:
    case `${ApplicationActionTypes.GET_ALL_APPLICATION}_REJECTED`:
    case `${ApplicationActionTypes.GET_ARCHIVE_APPLICATIONS}_REJECTED`:
    case `${ApplicationActionTypes.UPDATE_APPLICATION}_REJECTED`:
    case `${ApplicationActionTypes.SELECTED_APPLICATION_ID}_REJECTED`:
    case `${ApplicationActionTypes.DELETED_APPLICATION}_REJECTED`:
    case `${ApplicationActionTypes.SET_APPLICATION_ERROR}_REJECTED`:
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
