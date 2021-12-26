import ApplicationActionTypes from "./applicationActionTypes";
import ApplicationAPI from "../api/ApplicationAPI";

export const application = (studentId: string) => {
  return {
    type: ApplicationActionTypes.GET_APPLICATION,
    payload: ApplicationAPI.getApplication(studentId),
  };
};

export const applications = () => {
  return {
    type: ApplicationActionTypes.GET_ALL_APPLICATION,
    payload: ApplicationAPI.getApplications(),
  };
};

export const getArchiveApplication = () => {
  return {
    type: ApplicationActionTypes.GET_ARCHIVE_APPLICATIONS,
    payload: ApplicationAPI.getArchiveApplications(),
  };
};

export const updatedApplication = (studentId: string, data: FormData) => {
  return {
    type: ApplicationActionTypes.UPDATE_APPLICATION,
    payload: ApplicationAPI.updateApplication(studentId, data),
  };
};

export const selectedApplicationId = (studentId: string) => {
  return {
    type: ApplicationActionTypes.SELECTED_APPLICATION_ID,
    payload: ApplicationAPI.selectedApplicationId(studentId),
  };
};

export const deletedApplication = (studentId: string) => {
  return {
    type: ApplicationActionTypes.DELETED_APPLICATION,
    payload: ApplicationAPI.deletedApplication(studentId),
  };
};

export const errorApplication = (studentId: string) => {
  return {
    type: ApplicationActionTypes.SET_APPLICATION_ERROR,
    payload: ApplicationAPI.errorApplication(studentId),
  };
};


