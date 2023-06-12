export class User {
    next(loadedUser: User) {
      throw new Error('Method not implemented.');
    }
    constructor(
      public email: string,
      public userId: string,
      private _token: string,
      private _tokenExpirationDate: Date,
      public ime?:string,
      private prezime?:string
    ) {}
  
    get token() {
      if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
        return null;
      }
      return this._token;
    }

   
  }
  