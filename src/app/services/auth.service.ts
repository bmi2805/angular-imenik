import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap, throwError } from 'rxjs';
import { User } from '../modules/core/models/user.model';
import { Router } from '@angular/router';
import { SnackbarNotifyService } from './snackbar-notify.service';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAuthResponseData } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  // korisnik: User;
  profileInfo = new BehaviorSubject({
    displayName: '',
    email: '',
  });

  constructor(
    private http: HttpClient,
    private router: Router,
    private snackbar_notify: SnackbarNotifyService
  ) {}

  get user(): User {
    return this.user$.value;
  }

  registrirajSe(email: string, password: string) {
    return this.http
      .post<IAuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC-8gtlSwNIzpBdXhDb31FIFUU3BER9W0E',
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
            +resData.expiresIn,
            resData.displayName
          );
        })
      );
  }

  prijaviSe(email: string, password: string) {
    return this.http
      .post<IAuthResponseData>(
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
            +resData.expiresIn,
            resData.displayName
          );
        })
      );
  }

  autoLogin(): void {
    const userData: {
      email: string;
      userId: string;
      password: string;
      _token: string;
      displayName: string;

      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      // console.log('Nemaa');
      // this.router.navigate(['/prijava']);
      this.odjaviSe();
      return;
    }

    // console.log('ima');

    const loadedUser = new User(
      userData.email,
      userData.userId,
      userData._token,
      userData._tokenExpirationDate
        ? new Date(userData._tokenExpirationDate)
        : null,
      userData.displayName
    );
    // this.korisnik = loadedUser;

    if (userData._token) {
      this.user$.next(loadedUser);
      if (userData._tokenExpirationDate) {
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.autoLogout(expirationDuration);
      }
    }
  }

  odjaviSe() {
    this.user$.next(null);
    this.router.navigate(['/prijava']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoLogout(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.odjaviSe();
    }, expirationDuration);
  }
  private handleAuthentication(
    email: string,
    userId: string,
    token: string,
    expiresIn: number,
    displayName: string
  ) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email, userId, token, expirationDate, displayName);
    this.user$.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    // console.log(user)
    // this.getUserData(token);
  }

  private handleError(errorRes: HttpErrorResponse) {
    let errorMessage = 'Dogodila se neočekivana greška';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => errorMessage);
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
    return throwError(() => errorMessage);
  }

  // changePassword(data) {
  //   return this.http
  //     .post<IChangeResponseData>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC-8gtlSwNIzpBdXhDb31FIFUU3BER9W0E',
  //       {
  //         idToken: data.idToken,
  //         password: data.password,
  //         returnSecureToken: true,
  //       }
  //     )
  //     .pipe(
  //       catchError((errorRes) => {
  //         this.snackbar_notify.notify(
  //           'Greška',
  //           'Došlo je do neočekivane greške',
  //           5000,
  //           'error'
  //         );

  //         return throwError(() => errorRes);
  //       })
  //     );
  // }

  // generatePasswordResetToken(email: string) {
  //   return this.http
  //     .post<any>(
  //       'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC-8gtlSwNIzpBdXhDb31FIFUU3BER9W0E',
  //       { requestType: 'PASSWORD_RESET', email }
  //     )
  //     .pipe(map((response) => response.email));
  // }

  zaboravljenaLozinka(data) {
    return this.http
      .post<any>(
        `${environment.rezUrl}/v1/accounts:sendOobCode?key=AIzaSyC-8gtlSwNIzpBdXhDb31FIFUU3BER9W0E`,
        {
          requestType: 'PASSWORD_RESET',
          email: data.email,
        }
      )
      .pipe(
        map((response) => response.email),
        catchError((error) => {
          this.snackbar_notify.notify(
            'Greška',
            'Došlo je do neočekivane greške',
            5000,
            'error'
          );
          return throwError(() => error);
        })
      );
  }

  getUserData(idToken: string) {
    return this.http
      .post<any>(
        `${environment.rezUrl}/v1/accounts:lookup?key=AIzaSyC-8gtlSwNIzpBdXhDb31FIFUU3BER9W0E`,
        {
          idToken: idToken,
        }
      )
      .subscribe((res) => {
        new Date().getTime();
        const expiresOut =
          ((this.user.tokenExpirationDate as Date).getTime() -
            new Date().getTime()) /
          1000;
        this.handleAuthentication(
          res.users[0].email,
          res.users[0].localId,
          idToken,
          expiresOut,
          res.users[0].displayName
        );
      });
  }
}
