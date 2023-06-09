import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient, private router:Router) {}

  get user(): User {
    return this.user$.value;
  }

  registrirajSe(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-8gtlSwNIzpBdXhDb31FIFUU3BER9W0E',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe
      (
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  prijaviSe(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC-8gtlSwNIzpBdXhDb31FIFUU3BER9W0E',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  odjaviSe(){
    this.user$.next(null);
    this.router.navigate(["./autentifikacija"])
  }

  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expresIn: number
  ) {
    const expirationDate = new Date(new Date().getTime() + expresIn * 1000);
    const user = new User(email, userId, token, expirationDate);
    this.user$.next(user);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Dogodila se neočekivana greška';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errorMessage);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Vaš email se već koristi';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Vaš email se ne koristi';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Vaša lozinka nije ispravna';
        break;
    }
    return throwError(errorMessage);
  }
}
