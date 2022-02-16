import axios from "axios";
import { IWebinar } from "../../interfaces";
import requestConfig from "./config";

const BASE_URL = process.env.REACT_APP_API_ENDPOINT as string;

class WebinarAPI {
	static createWebinar(webinarData: IWebinar): Promise<IWebinar> {
		return axios.post(`${BASE_URL}/admin/webinar/`, webinarData, requestConfig);
	}

	static getWebinar(webinarId: string): Promise<IWebinar> {
		return axios.get(`${BASE_URL}/admin/webinar/${webinarId}`);
	}

	static getWebinars(): Promise<IWebinar[]> {
		return axios.get(`${BASE_URL}/admin/webinar/`, requestConfig);
	}

	static getDeletedWebinars(): Promise<IWebinar[]> {
		return axios.get(`${BASE_URL}/admin/webinar/delete/`, requestConfig);
	}

	static updateWebinar(webinarId: string, data: FormData): Promise<IWebinar> {
		return axios.put(`${BASE_URL}/admin/webinar/${webinarId}`, data, requestConfig);
	}

	static deleteWebinar(webinarId: string): Promise<IWebinar> {
		return axios.put(`${BASE_URL}/admin/webinar/delete/${webinarId}`, null, requestConfig);
	}

	static deleteWebinarPermanently(webinarId: string): Promise<IWebinar> {
		return axios.delete(`${BASE_URL}/admin/webinar/permanentdelete/${webinarId}`, requestConfig);
	}
}

export default WebinarAPI;
