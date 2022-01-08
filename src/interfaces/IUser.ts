interface IUser {
	_id: string;
	firstName: string;
	lastName: string;
	email: string;
	phoneNumber: string;
	userName: string;
	profileImage: string | null;
	authToken: string | null;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date | null;
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

export type { IModifiedBy, IUserStore, IAuthUser, IUser };
