import OrganizationActionTypes from "./organizationActionTypes";
import { IOrganizationState } from "../interfaces";

const initialState: IOrganizationState = {
  createOrganization: null,
  organization: null,
  adminOrganization: null,
  updatedOrganization: null,
  loading: false,
  error: null,
};

const organizationReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case `${OrganizationActionTypes.CREATE_ORGANIZATION}_PENDING`:
    case `${OrganizationActionTypes.GET_ORGANIZATION_INFO}_PENDING`:
    case `${OrganizationActionTypes.GET_ORGANIZATION_FOR_ADMIN}_PENDING`:
    case `${OrganizationActionTypes.UPDATE_ORGANIZATION_INFO}_PENDING`:
      return { ...state, loading: true };

    case `${OrganizationActionTypes.CREATE_ORGANIZATION}_FULFILLED`:
      let createOrganization = action.payload.data;
      return { ...state, loading: false, createOrganization };
    case `${OrganizationActionTypes.GET_ORGANIZATION_INFO}_FULFILLED`:
      let organization = action.payload.data;
      return { ...state, loading: false, organization };
    case `${OrganizationActionTypes.GET_ORGANIZATION_FOR_ADMIN}_FULFILLED`:
      let adminOrganization = action.payload.data;
      return { ...state, loading: false, adminOrganization };
    case `${OrganizationActionTypes.UPDATE_ORGANIZATION_INFO}_FULFILLED`:
      let updatedOrganization = action.payload.data;
      return { ...state, loading: false, updatedOrganization };

    case `${OrganizationActionTypes.CREATE_ORGANIZATION}_REJECTED`:
    case `${OrganizationActionTypes.GET_ORGANIZATION_INFO}_REJECTED`:
    case `${OrganizationActionTypes.GET_ORGANIZATION_FOR_ADMIN}_REJECTED`:
    case `${OrganizationActionTypes.UPDATE_ORGANIZATION_INFO}_REJECTED`:
      return {
        ...state,
        loading: false,
        error: action.payload.response.data,
        state: initialState,
      };

    default:
      return state;
  }
};

export default organizationReducer;
