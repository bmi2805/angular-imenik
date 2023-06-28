
export class User {
  next(loadedUser: User) {
    throw new Error('Method not implemented.');
  }
  constructor(
    public email: string,
    public userId: string,
    private _token: string,
    private _tokenExpirationDate: Date | string,
    public displayName: string
  ) {}

  get token(): string {
    if (
      !this._tokenExpirationDate ||
      new Date() > new Date(this._tokenExpirationDate)
    ) {
      return null;
    }
    return this._token;
  }

  get tokenExpirationDate(): Date | string {
    return this._tokenExpirationDate;
  }
}
