import EventActionTypes from "./eventActionTypes";
import EventAPI from "../api/EventAPI";

export const createEvent = (data: any) => {
	return {
		type: EventActionTypes.CREATE_EVENT,
		payload: EventAPI.createEvent(data),
	};
};

export const getEvent = (eventId: string) => {
	return {
		type: EventActionTypes.GET_EVENT,
		payload: EventAPI.getEvent(eventId),
	};
};

export const getEvents = () => {
	return {
		type: EventActionTypes.GET_ALL_EVENTS,
		payload: EventAPI.getEvents(),
	};
};

export const getDeletedEvents = () => {
	return {
		type: EventActionTypes.GET_DELETED_EVENTS,
		payload: EventAPI.getDeletedEvents(),
	};
};

export const updateEvent = (eventId: string, data: FormData) => {
	return {
		type: EventActionTypes.UPDATE_EVENT,
		payload: EventAPI.updateEvent(eventId, data),
	};
};

export const deleteEvent = (eventId: string) => {
	return {
		type: EventActionTypes.DELETE_EVENT,
		payload: EventAPI.deleteEvent(eventId),
	};
};

export const setEventId = (eventId: string) => {
	return {
		type: EventActionTypes.SET_EVENT_ID,
		payload: eventId,
	};
};
