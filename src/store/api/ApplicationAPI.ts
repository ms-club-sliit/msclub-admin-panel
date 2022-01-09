import axios from "axios";
import { IApplication } from "../../interfaces";
import requestConfig from "./config";
import requestConfigJson from "./configJson";

const BASE_URL = process.env.REACT_APP_API_ENDPOINT as string;

class ApplicationAPI {
	static createApplication(applicationData: IApplication): Promise<IApplication> {
		return axios.post(`${BASE_URL}/admin/application`, applicationData, requestConfig);
	}

	static getApplication(studentId: string): Promise<IApplication> {
		return axios.get(`${BASE_URL}/admin/application/${studentId}`, requestConfig);
	}

	static getApplications(): Promise<IApplication[]> {
		return axios.get(`${BASE_URL}/admin/application/`, requestConfig);
	}

	static getArchiveApplications(): Promise<IApplication> {
		return axios.get(`${BASE_URL}/admin/application/archive/`, requestConfig);
	}

	static updateApplication(studentId: string, data: FormData): Promise<IApplication> {
		return axios.put(`${BASE_URL}/admin/application/${studentId}`, data, requestConfig);
	}

	static deletedApplication(studentId: string): Promise<IApplication> {
		return axios.put(`${BASE_URL}/admin/application/delete/${studentId}`, null, requestConfig);
	}

	static changeApplicationStatusIntoInterview(studentId: string, data: any): Promise<IApplication> {
		return axios.put(`${BASE_URL}/admin/application/interview/${studentId}`, data, requestConfigJson);
	}

	static changeApplicationStatusIntoSelected(studentId: string): Promise<IApplication> {
		return axios.put(`${BASE_URL}/admin/application/selected/${studentId}`, null, requestConfig);
	}

	static changeApplicationStatusIntoRejected(studentId: string): Promise<IApplication> {
		return axios.put(`${BASE_URL}/admin/application/rejected/${studentId}`, null, requestConfig);
	}
}

export default ApplicationAPI;
