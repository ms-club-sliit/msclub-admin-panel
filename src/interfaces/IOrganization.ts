import { IModifiedBy } from ".";
interface IOrganization {
	name: string;
	email: string;
	phoneNumber?: string | null;
	university: string | null;
	address: string | null;
	website: string | null;
	updatedBy: IModifiedBy[];
	imagePath: string;
}

interface IOrganizationFormData {
	organizationId: string | null;
	name: string | null;
	email: string | null;
	phoneNumber?: string | null;
	university: string | null;
	address: string | null;
	website: string | null;
	imagePath: any | null;
}
interface IIOrganizationState {
	organizationId: string | null;
	name: string | null;
	email: string | null;
	phoneNumber?: string | null;
	university: string | null;
	address: string | null;
	website: string | null;
	imagePath: any;
	isFormNotValid: boolean;
}
interface IOrganizationStore {
	createOrganization: IOrganization | null;
	organization: IOrganization | null;
	adminOrganization: IOrganization | null;
	updatedOrganization: IOrganization | null;
	loading: boolean;
	error: any | null;
}

export type { IOrganization, IOrganizationStore, IOrganizationFormData, IIOrganizationState };
