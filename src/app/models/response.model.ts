export interface IPOSTChangeData {
  localId: string;
  email: string;
  passwordHash: string;
  providerUserInfo: string;
  idToken: string;
  refreshToken: string;
  expiresIn: string;
}

export interface IPOSTAuth {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
  displayName: string;
  password?: string;
}

export interface IPOSTPasswordReset {
  email: string;
}

export interface IPOSTGetUserData {
  localId: string;
  email: string;
  emailVerified: boolean;
  displayName: string;
  providerUserInfo: any[];
  photoUrl: string;
  passwordHash: string;
  passwordUpdatedAt: number;
  validSince: string;
  disabled: boolean;
  lastLoginAt: string;
  createdAt: string;
  customAuth: boolean;
  users: any;
}
