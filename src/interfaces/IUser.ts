interface IUser {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber01: string;
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
	profileImage: string | null;
	permissionLevel: string | null;
}

interface IUserFormData {
	firstName: null;
	lastName: null;
	email: null;
	phoneNumber01: null;
	phoneNumber02: null;
	userName: null;
	password: null;
	profileImage: null;
	permissionLevel: null;
}

interface IAuthUser {
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
	deletedUser: IUser | null;
	loggedUser: IUser | null;
	authUser: IAuthUser | null;
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
