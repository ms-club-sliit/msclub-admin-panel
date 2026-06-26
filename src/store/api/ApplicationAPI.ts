import axios from "axios";
import { IApplication } from "../../interfaces";
import requestConfig from "./config";
import requestConfigJson from "./configJson";
import configs from "../../configs";

const BASE_URL = configs.api.baseUrl as string;

class ApplicationAPI {
	static createApplication(applicationData: IApplication): Promise<IApplication> {
		return axios.post(`${BASE_URL}/admin/application`, applicationData, requestConfig);
	}

	static getApplication(studentId: string): Promise<IApplication> {
		return axios.get(`${BASE_URL}/admin/application/${studentId}`, requestConfig);
	}

	static getApplications(page = 1, limit = 10, status = ""): Promise<any> {
		return axios.get(`${BASE_URL}/admin/application/`, {
			...requestConfig,
			params: { page, limit, ...(status ? { status } : {}) },
		});
	}

	static getDeletedApplications(): Promise<IApplication[]> {
		return axios.get(`${BASE_URL}/admin/applications/deleted/`, requestConfig);
	}

	static updateApplication(studentId: string, data: FormData): Promise<IApplication> {
		return axios.put(`${BASE_URL}/admin/application/${studentId}`, data, requestConfig);
	}

	static deletedApplication(studentId: string): Promise<IApplication> {
		return axios.put(`${BASE_URL}/admin/application/delete/${studentId}`, null, requestConfig);
	}

	static recoverDeletedApplication(applicationId: string): Promise<IApplication> {
		return axios.put(`${BASE_URL}/admin/application/recover/${applicationId}`, null, requestConfig);
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

	static deleteApplicationPermanently(studentId: string): Promise<IApplication> {
		return axios.delete(`${BASE_URL}/admin/application/permanentdelete/${studentId}`, requestConfig);
	}
}

export default ApplicationAPI;
