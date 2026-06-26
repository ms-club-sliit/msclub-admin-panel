import axios from "axios";
import { IOrganization } from "../../interfaces";
import requestConfig from "./config";
import configs from "../../configs";

const BASE_URL = configs.api.baseUrl as string;

class OrganizationAPI {
	static createOrganization(organizationInfo: IOrganization): Promise<IOrganization> {
		return axios.post(`${BASE_URL}/admin/organization/`, organizationInfo, requestConfig);
	}

	static getOrganizationInfo(): Promise<IOrganization> {
		return axios.get(`${BASE_URL}/admin/organization/info`, requestConfig);
	}

	static getOrganizationForAdmin(): Promise<IOrganization> {
		return axios.get(`${BASE_URL}/admin/organization/`, requestConfig);
	}

	static updateOrganization(data: FormData): Promise<IOrganization> {
		return axios.put(`${BASE_URL}/admin/organization/`, data, requestConfig);
	}
}

export default OrganizationAPI;
