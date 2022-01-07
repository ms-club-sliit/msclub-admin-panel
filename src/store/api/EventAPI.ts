import axios from "axios";
import { IEvent } from "../../interfaces";
import requestConfig from "./config";

const BASE_URL = process.env.REACT_APP_API_ENDPOINT as string;

class EventAPI {
	static createEvent(eventData: IEvent): Promise<IEvent> {
		return axios.post(`${BASE_URL}/admin/event/`, eventData, requestConfig);
	}

	static getEvent(eventId: string): Promise<IEvent> {
		return axios.get(`${BASE_URL}/admin/event/${eventId}`);
	}

	static getEvents(): Promise<IEvent[]> {
		return axios.get(`${BASE_URL}/admin/event/`, requestConfig);
	}

	static getDeletedEvents(): Promise<IEvent[]> {
		return axios.get(`${BASE_URL}/admin/event/delete/`, requestConfig);
	}

	static updateEvent(eventId: string, data: FormData): Promise<IEvent> {
		return axios.put(`${BASE_URL}/admin/event/${eventId}`, data, requestConfig);
	}

	static deleteEvent(eventId: string): Promise<IEvent> {
		return axios.put(`${BASE_URL}/admin/event/delete/${eventId}`, null, requestConfig);
	}
}

export default EventAPI;
