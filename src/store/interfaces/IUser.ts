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

interface IUserState {
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

export type { IUserState, IUser, IAuthUser };
