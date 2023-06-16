import { Injectable } from '@angular/core';
import { IKorisnik } from '../models/post.model';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, map, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarNotifyService } from '../components/snackbar-notify/snackbar-notify.service';

@Injectable({ providedIn: 'root' })
export class KontaktiService {
  error = new Subject<string>();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private snackbar_notify: SnackbarNotifyService
  ) {}

  createAndStoreContact(Korisnik: IKorisnik): Promise<void> {
    const postData: IKorisnik = {
      id: Korisnik.id,
      name: Korisnik.name,
      lastName: Korisnik.lastName,
      address: Korisnik.address,
      city: Korisnik.city,
      postalCode: Korisnik.postalCode,
      phone: Korisnik.phone,
      date: Korisnik.date,
      email: Korisnik.email,
    };
  
    return new Promise((resolve, reject) => {
      this.http
        .post<{ name: string }>(
          `https://imenik-42567-default-rtdb.europe-west1.firebasedatabase.app/users/${this.authService.user.userId}/imenik.json`,
          postData
        )
        .subscribe(
          () => {
            resolve(); // Spremanje kontakta je uspješno
          },
          (error) => {
            reject(error); // Pogreška prilikom spremanja kontakta
          }
        );
    });
  }

  dohvatiKorisnike(): Observable<IKorisnik[]> {
    return this.http
      .get<{ [key: string]: IKorisnik }>(
        `https://imenik-42567-default-rtdb.europe-west1.firebasedatabase.app/users/${this.authService.user.userId}/imenik.json`
      )
      .pipe(
        map((responseData) => {
          const contactArray: IKorisnik[] = [];
          for (const key in responseData) {
            if (responseData.hasOwnProperty(key)) {
              contactArray.push({ ...responseData[key], id: key });
            }
          }
          return contactArray;
        }),

        catchError((errorRes) => {
          this.snackbar_notify.notify(
            'Greška',
            'Dogodila se neočekivana greška',
            10000,
            'error'
          );

          return throwError(errorRes);
        })
      );
  }

  izbrisiKorisnika(id: string) {
    const deleteUrl = `https://imenik-42567-default-rtdb.europe-west1.firebasedatabase.app/users/${this.authService.user.userId}/imenik/${id}.json`;

    return this.http.delete(deleteUrl);
  }

  getUserId(id: string): Observable<IKorisnik> {
    return this.http.get<IKorisnik>(
      `https://imenik-42567-default-rtdb.europe-west1.firebasedatabase.app/users/${this.authService.user.userId}/imenik/${id}.json`
    );
  }

  dohvatiKorisnika(id: string): Observable<IKorisnik> {
    const url = `https://imenik-42567-default-rtdb.europe-west1.firebasedatabase.app/users/${this.authService.user.userId}/imenik/${id}.json`;
    return this.http.get<IKorisnik>(url).pipe(
      map((responseData) => {
        return { ...responseData, id };
      }),
      catchError((errorRes) => {
        // this.openSnackBar("Došlo je do greške","Uredu","snackbar-error")
        this.snackbar_notify.notify(
          'Greška',
          'Došlo je do neočekivane greške',
          5000,
          'error'
        );

        return throwError(errorRes);
      })
    );
  }

  updateContact(id: string, korisnik: IKorisnik) {
    const updateUrl = `https://imenik-42567-default-rtdb.europe-west1.firebasedatabase.app/users/${this.authService.user.userId}/imenik/${id}.json`;

    return this.http.put(updateUrl, korisnik);
  }

  pregledKorisnika(): boolean {
    return true;
  }

  durationInSeconds = 10000;

  openSnackBar(message: string, action: string, panelClass: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      panelClass: [panelClass],
    });
  }
}
