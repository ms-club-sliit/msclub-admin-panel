import OrganizationAPI from "../api/OrganizationAPI";
import OrganizationActionTypes from "./organizationActionTypes";

export const createOrganization = (data: any) => {
	return {
		type: OrganizationActionTypes.CREATE_ORGANIZATION,
		payload: OrganizationAPI.createOrganization(data),
	};
};

export const getOrganizationInfo = () => {
	return {
		type: OrganizationActionTypes.GET_ORGANIZATION_INFO,
		payload: OrganizationAPI.getOrganizationInfo(),
	};
};

export const getOrganizationForAdmin = () => {
	return {
		type: OrganizationActionTypes.GET_ORGANIZATION_FOR_ADMIN,
		payload: OrganizationAPI.getOrganizationForAdmin(),
	};
};

export const updateOrganization = (data: any) => {
	return {
		type: OrganizationActionTypes.UPDATE_ORGANIZATION_INFO,
		payload: OrganizationAPI.updateOrganization(data),
	};
};
