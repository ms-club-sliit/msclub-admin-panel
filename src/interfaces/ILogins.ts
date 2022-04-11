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
}

export type { IRecentLogin, ILoginsStore };
