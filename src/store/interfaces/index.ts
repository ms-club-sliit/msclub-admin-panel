interface IModifiedBy {
  user: IModifyUser;
  time: Date;
}

interface IModifyUser {
  firstName: string;
  lastName: string;
  email: string;
  permissionLevel: string;
  profileImage: string;
}

export type { IModifiedBy };
