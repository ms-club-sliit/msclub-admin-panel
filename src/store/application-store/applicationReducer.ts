import { IApplicationState } from "../interfaces/IApplication";
import ApplicationActionTypes from "../application-store/applicationActionTypes";

const initialState: IApplicationState = {
  viewApplication: null,
  viewApplications: [],
  archiveApplication: null,
  updatedApplicationStatus: null,
  loading: false,
  error: null
};

const applicationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case `${ApplicationActionTypes.GET_APPLICATION}_PENDING`:
    case `${ApplicationActionTypes.GET_ALL_APPLICATION}_PENDING`:
    case `${ApplicationActionTypes.GET_ARCHIVE_APPLICATION}_PENDING`:
    case `${ApplicationActionTypes.UPDATE_APPLICATION}_PENDING`:
      return { ...state, loading: true };

    case `${ApplicationActionTypes.GET_APPLICATION}_FULFILLED`:
      let viewApplication = action.payload.data;
      return { ...state, loading: false, viewApplication };
    case `${ApplicationActionTypes.GET_ALL_APPLICATION}_FULFILLED`:
      let viewApplications = action.payload.data;
      return { ...state, loading: false, viewApplications };
    case `${ApplicationActionTypes.GET_ARCHIVE_APPLICATION}_FULFILLED`:
      let archiveApplication = action.payload.data;
      return { ...state, loading: false, archiveApplication };
    case `${ApplicationActionTypes.UPDATE_APPLICATION}_FULFILLED`:
      let updatedApplication = action.payload.data;
      return { ...state, loading: false, updatedApplication };

    case `${ApplicationActionTypes.GET_APPLICATION}_REJECTED`:
    case `${ApplicationActionTypes.GET_ALL_APPLICATION}_REJECTED`:
    case `${ApplicationActionTypes.GET_ARCHIVE_APPLICATION}_REJECTED`:
    case `${ApplicationActionTypes.UPDATE_APPLICATION}_REJECTED`:
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
