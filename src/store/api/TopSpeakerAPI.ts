import axios from "axios";
import requestConfig from "./config";
import { ITopSpeaker } from "../../interfaces";

const BASE_URL = process.env.REACT_APP_API_ENDPOINT as string;

class TopSpeakerAPI {
	static createTopSpeaker(topSpeakerData: ITopSpeaker): Promise<ITopSpeaker> {
		return axios.post(`${BASE_URL}/admin/topspeaker/`, topSpeakerData, requestConfig);
	}

	static updateTopSpeaker(topSpeakerId: string, data: FormData): Promise<ITopSpeaker> {
		return axios.put(`${BASE_URL}/admin/topspeaker/${topSpeakerId}`, data, requestConfig);
	}

	static deleteTopSpeaker(topSpeakerId: string): Promise<ITopSpeaker> {
		return axios.put(`${BASE_URL}/admin/topspeaker/delete/${topSpeakerId}`, null, requestConfig);
	}

	static getTopSpeakers(): Promise<ITopSpeaker> {
		return axios.get(`${BASE_URL}/admin/topspeaker/`, requestConfig);
	}

	static getDeletedTopSpeakers(): Promise<ITopSpeaker> {
		return axios.get(`${BASE_URL}/admin/topspeaker/deleted/`, requestConfig);
	}

	static recoverDeletedTopSpeaker(topSpeakerId: string): Promise<ITopSpeaker> {
		return axios.put(`${BASE_URL}/admin/topspeaker/recover/${topSpeakerId}`, null, requestConfig);
	}

	static permanentDeleteTopSpeaker(topSpeakerId: string): Promise<ITopSpeaker> {
		return axios.delete(`${BASE_URL}/admin/topspeaker/permanentdelete/${topSpeakerId}`, requestConfig);
	}
}

export default TopSpeakerAPI;
