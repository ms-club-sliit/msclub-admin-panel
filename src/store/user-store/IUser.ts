interface IUser {
  _id: string;
  firstName: string;
  lastName: string;
}

interface IUserState {
  userState: IUser;
  loading: boolean;
  error: string | null;
}

export default IUserState;