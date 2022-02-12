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

export const getDeletedApplications = () => {
	return {
		type: ApplicationActionTypes.GET_ARCHIVE_APPLICATIONS,
		payload: ApplicationAPI.getDeletedApplications(),
	};
};

export const updatedApplication = (studentId: string, data: FormData) => {
	return {
		type: ApplicationActionTypes.UPDATE_APPLICATION,
		payload: ApplicationAPI.updateApplication(studentId, data),
	};
};

export const deletedApplication = (studentId: string) => {
	return {
		type: ApplicationActionTypes.DELETED_APPLICATION,
		payload: ApplicationAPI.deletedApplication(studentId),
	};
};

export const setApplicationId = (studentId: string) => {
	return {
		type: ApplicationActionTypes.SELECTED_APPLICATION_ID,
		payload: studentId,
	};
};

export const changeApplicationStatusIntoInterview = (studentId: string, data: any) => {
	return {
		type: ApplicationActionTypes.UPDATE_APPLICATION,
		payload: ApplicationAPI.changeApplicationStatusIntoInterview(studentId, data),
	};
};

export const changeApplicationStatusIntoSelected = (studentId: string) => {
	return {
		type: ApplicationActionTypes.UPDATE_APPLICATION,
		payload: ApplicationAPI.changeApplicationStatusIntoSelected(studentId),
	};
};

export const changeApplicationStatusIntoRejected = (studentId: string) => {
	return {
		type: ApplicationActionTypes.UPDATE_APPLICATION,
		payload: ApplicationAPI.changeApplicationStatusIntoRejected(studentId),
	};
};

export const deleteApplicationPermanently = (studentId: string) => {
	return {
		type: ApplicationActionTypes.DELETED_APPLICATION,
		payload: ApplicationAPI.deleteApplicationPermanently(studentId),
	};
};
