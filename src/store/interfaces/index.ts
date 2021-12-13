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

export type { IModifiedBy };
