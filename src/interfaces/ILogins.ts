import { IUser } from "./IUser";

interface ILoginsStore {
	recentLogins: IRecentLogin[] | null;
}

interface IRecentLogin {
	_id: string;
	loggedAt: Date;
	user: IUser;
	createdAt: Date;
	updatedAt: Date;
	__v: number;
}

export type { IRecentLogin, ILoginsStore };
