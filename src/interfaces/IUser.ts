interface IUser {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber01: string;
	phoneNumber02: string;
	userName: string;
	profileImage: string | null;
	authToken: string | null;
	permissionLevel: string | null;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
}

interface IUserState {
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber01: string;
	phoneNumber02: string;
	userName: string;
	password: string;
	profileImage: any;
	permissionLevel: string | null;
	isFormNotValid: boolean;
}

interface IUserFormData {
	firstName: string | null;
	lastName: string | null;
	email: string | null;
	phoneNumber01: string | null;
	phoneNumber02: string | null;
	userName: string | null;
	password: string | null;
	profileImage: string | null;
	permissionLevel: string | null;
}

interface IAuthUser {
	_id: string;
	userName: string;
	permissionLevel: string;
	authToken: string;
	imagePath: string;
}

interface IUserStore {
	user: IUser | null;
	users: IUser[] | null;
	newUser: IUser | null;
	updatedUser: IUser | null;
	adminUpdatedUser: IUser | null;
	deletedUser: IUser | null;
	loggedUser: IUser | null;
	authUser: IAuthUser | null;
	selectedUserId: string | null;
	loading: boolean;
	error: string | null;
}

interface IModifiedBy {
	user: IModifyUser;
	updatedAt: Date;
}

interface IModifyUser {
	firstName: string;
	lastName: string;
	email: string;
	permissionLevel: string;
	profileImage: string;
}

export type { IModifiedBy, IUserStore, IAuthUser, IUser, IUserState, IUserFormData };
