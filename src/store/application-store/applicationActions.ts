import ApplicationActionTypes from "./applicationActionTypes";
import ApplicationAPI from "../api/ApplicationAPI";

export const getApplication = (studentId: string) => {
  return {
    type: ApplicationActionTypes.GET_APPLICATION,
    payload: ApplicationAPI.getApplication(studentId),
  };
};

export const getApplications = () => {
  return {
    type: ApplicationActionTypes.GET_ALL_APPLICATION,
    payload: ApplicationAPI.getApplications(),
  };
};

export const getArchiveApplication = () => {
  return {
    type: ApplicationActionTypes.GET_ARCHIVE_APPLICATION,
    payload: ApplicationAPI.getArchiveApplications(),
  };
};

export const updateApplication = (studentId: string, data: FormData) => {
  return {
    type: ApplicationActionTypes.UPDATE_APPLICATION,
    payload: ApplicationAPI.updateApplication(studentId, data),
  };
};


