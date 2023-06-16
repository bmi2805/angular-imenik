export interface IAuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: boolean;
    displayName: string;
  }
  
  
  
  export interface IChangeResponseData {
    localId: string;
    email: string;
    passwordHash: string;
    providerUserInfo: string;
    idToken: string;
    refreshToken: string;
    expiresIn: string;
  }