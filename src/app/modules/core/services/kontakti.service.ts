import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable,
  Subject,
  catchError,
  lastValueFrom,
  map,
  throwError,
} from 'rxjs';
import { AuthService } from '../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarNotifyService } from '../../../services/snackbar-notify.service';
import { IGETKorisnik } from '../models/post.model';

@Injectable({ providedIn: 'root' })
export class KontaktiService {
  error = new Subject<string>();

  constructor(
    private http: HttpClient,
    private authService: AuthService,
    private _snackBar: MatSnackBar,
    private snackbar_notify: SnackbarNotifyService
  ) {}

  createAndStoreContact(Korisnik: IGETKorisnik): Promise<void> {
    const postData: IGETKorisnik = {
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

  // dohvatiKorisnike(): Observable<IKorisnik[]> {
  //   return this.http
  //     .get<{ [key: string]: IKorisnik }>(
  //       `https://imenik-42567-default-rtdb.europe-west1.firebasedatabase.app/users/${this.authService.user.userId}/imenik.json`
  //     )
  //     .pipe(
  //       map((responseData) => {
  //         const contactArray: IKorisnik[] = [];
  //         for (const key in responseData) {
  //           if (responseData.hasOwnProperty(key)) {
  //             contactArray.push({ ...responseData[key], id: key });
  //           }
  //         }
  //         return contactArray;
  //       }),

  //       catchError((errorRes) => {
  //         this.snackbar_notify.notify(
  //           'Greška',
  //           'Dogodila se neočekivana greška',
  //           10000,
  //           'error'
  //         );

  //         return throwError(errorRes);
  //       })
  //     );
  // }

  async dohvatiKorisnike(): Promise<IGETKorisnik[]> {
    try {
      const responseData = await lastValueFrom(
        this.http
          .get<{ [key: string]: IGETKorisnik }>(
            `https://imenik-42567-default-rtdb.europe-west1.firebasedatabase.app/users/${this.authService.user.userId}/imenik.json`
          )
          .pipe(
            map((responseData) => {
              const contactArray: IGETKorisnik[] = [];
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
              return throwError(() => errorRes);
            })
          )
      );

      return responseData;
    } catch (errorRes) {
      this.snackbar_notify.notify(
        'Greška',
        'Dogodila se neočekivana greška',
        10000,
        'error'
      );
      throw errorRes;
    }
  }

  izbrisiKorisnika(id: string) {
    const deleteUrl = `https://imenik-42567-default-rtdb.europe-west1.firebasedatabase.app/users/${this.authService.user.userId}/imenik/${id}.json`;

    return this.http.delete(deleteUrl);
  }

  getUserId(id: string): Observable<IGETKorisnik> {
    return this.http.get<IGETKorisnik>(
      `https://imenik-42567-default-rtdb.europe-west1.firebasedatabase.app/users/${this.authService.user.userId}/imenik/${id}.json`
    );
  }

  dohvatiKorisnika(id: string): Observable<IGETKorisnik> {
    const url = `https://imenik-42567-default-rtdb.europe-west1.firebasedatabase.app/users/${this.authService.user.userId}/imenik/${id}.json`;
    return this.http.get<IGETKorisnik>(url).pipe(
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

        return throwError(() => errorRes);
      })
    );
  }

  updateContact(id: string, korisnik: IGETKorisnik) {
    const updateUrl = `https://imenik-42567-default-rtdb.europe-west1.firebasedatabase.app/users/${this.authService.user.userId}/imenik/${id}.json`;

    return this.http.put(updateUrl, korisnik);
  }

  durationInSeconds = 5000;

  openSnackBar(message: string, action: string, panelClass: string) {
    this._snackBar.open(message, action, {
      duration: this.durationInSeconds * 1000,
      panelClass: [panelClass],
    });
  }
}
