import axios from "axios";
import { IOrganization } from "../../interfaces";
import requestConfig from "./config";

const BASE_URL = process.env.REACT_APP_API_ENDPOINT as string;

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

	static updateOrganization(updateInfo: IOrganization): Promise<IOrganization> {
		return axios.put(`${BASE_URL}/admin/organization/`, updateInfo, requestConfig);
	}
}

export default OrganizationAPI;
