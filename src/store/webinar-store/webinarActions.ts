import WebinarAPI from "../api/WebinarAPI";
import WebinarActionTypes from "./webinarActionTypes";

export const createWebinar = (data: any) => {
	return {
		type: WebinarActionTypes.CREATE_WEBINAR,
		payload: WebinarAPI.createWebinar(data),
	};
};

export const getWebinar = (webinarId: string) => {
	return {
		type: WebinarActionTypes.GET_WEBINAR,
		payload: WebinarAPI.getWebinar(webinarId),
	};
};

export const getWebinars = () => {
	return {
		type: WebinarActionTypes.GET_ALL_WEBINARS,
		payload: WebinarAPI.getWebinars(),
	};
};

export const getDeletedWebinars = () => {
	return {
		type: WebinarActionTypes.GET_DELETED_WEBINARS,
		payload: WebinarAPI.getDeletedWebinars(),
	};
};

export const updatedWebinar = (webinarId: string, data: FormData) => {
	return {
		type: WebinarActionTypes.UPDATE_WEBINAR,
		payload: WebinarAPI.updateWebinar(webinarId, data),
	};
};

export const deleteWebinar = (webinarId: string) => {
	return {
		type: WebinarActionTypes.DELETE_WEBINAR,
		payload: WebinarAPI.deleteWebinar(webinarId),
	};
};

export const deleteWebinarPermanently = (webinarId: string) => {
	return {
		type: WebinarActionTypes.DELETE_WEBINAR,
		payload: WebinarAPI.deleteWebinarPermanently(webinarId),
	};
};

export const setWebinarId = (webinarId: string) => {
	return {
		type: WebinarActionTypes.SET_WEBINAR_ID,
		payload: webinarId,
	};
};
