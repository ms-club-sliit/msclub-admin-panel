import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { IEvent } from '../store/event-store/IEvent';
import requestConfig from "./config";

const BASE_URL = process.env.REACT_APP_API_ENDPOINT as string;

class EventAPI {
  static createEvent(eventData: IEvent): Promise<IEvent> {
    return axios.post(`${BASE_URL}/event/`, eventData, requestConfig); 
  }

  static getEvent(eventId: string): Promise<IEvent> {
    return axios.get(`${BASE_URL}/event/${eventId}`);
  }

  static getEvents(): Promise<IEvent[]> {
    return axios.get(`${BASE_URL}/event/`);
  }

  static updateEvent(eventId: string, data: IEvent): Promise<IEvent> {
    return axios.put(`${BASE_URL}/event/${eventId}`, data, requestConfig);
  }

  static deleteEvent(eventId: string): Promise<IEvent> {
    return axios.put(`${BASE_URL}/event/delete/${eventId}`, requestConfig);
  }
}

export default EventAPI;