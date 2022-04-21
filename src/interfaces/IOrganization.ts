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
interface IIOrganizationState {
	name: string | null;
	email: string | null;
	phoneNumber?: string | null;
	university: string | null;
	address: string | null;
	website: string | null;
	imagePath: string;
}
interface IOrganizationStore {
	createOrganization: IOrganization | null;
	organization: IOrganization | null;
	adminOrganization: IOrganization | null;
	updatedOrganization: IOrganization | null;
	loading: boolean;
	error: any | null;
}

export type { IOrganization, IOrganizationStore, IIOrganizationState };
