import { Injectable } from '@angular/core';
import { Korisnik } from './shared/post.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  Observable,
  Subject,
  catchError,
  exhaustMap,
  map,
  take,
  tap,
  throwError,
} from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Injectable({ providedIn: 'root' })
export class KontaktiService {
  error = new Subject<string>();

  constructor(
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {}

  createAndStoreContact(Korisnik: Korisnik) {
    const postData: Korisnik = {
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
    console.log(postData);

    this.http
      .post<{ name: string }>(
        `https://imenik-42567-default-rtdb.europe-west1.firebasedatabase.app/users/${this.authService.user.userId}/imenik.json`,
        postData
      )
      .subscribe(
        (responseData) => {
          console.log(responseData);
        },
        (error) => {
          this.error.next(error.message);
        }
      );
  }

  dohvatiKorisnike(): Observable<Korisnik[]> {
   
        return this.http.get<{ [key: string]: Korisnik }>(
          `https://imenik-42567-default-rtdb.europe-west1.firebasedatabase.app/users/${this.authService.user.userId}/imenik.json`,
         
        ).pipe(
            map((responseData) => {
             const contactArray: Korisnik[] = [];
            for (const key in responseData) {
             if (responseData.hasOwnProperty(key)) {
            contactArray.push({ ...responseData[key], id: key });
              }
               }
              return contactArray;
              }),
            
            catchError((errorRes) => {
              return throwError(errorRes);
            })
            
          );
    
  }

  izbrisiKorisnika(id: string) {
    const deleteUrl = `https://imenik-42567-default-rtdb.europe-west1.firebasedatabase.app/users/${this.authService.user.userId}/imenik/${id}.json`;

    return this.http.delete(deleteUrl);
  }

  // urediKontakt(element:Korisnik){
  //   this.router.navigateByUrl(`/unos/${element.id}`);
  //   console.log(element.name)

  // }

  getUserId(id: string): Observable<Korisnik> {
    console.log(id);
    return this.http.get<Korisnik>(
      `https://imenik-42567-default-rtdb.europe-west1.firebasedatabase.app/users/${this.authService.user.userId}/imenik/${id}.json`
    );
  }

  dohvatiKorisnika(id: string): Observable<Korisnik> {
    const url = `https://imenik-42567-default-rtdb.europe-west1.firebasedatabase.app/users/${this.authService.user.userId}/imenik/${id}.json`;
    return this.http.get<Korisnik>(url).pipe(
      map((responseData) => {
        return { ...responseData, id };
      }),
      catchError((errorRes) => {
        return throwError(errorRes);
      })
    );
  }

  updateContact(id: string, korisnik: Korisnik) {
    const updateUrl = `https://imenik-42567-default-rtdb.europe-west1.firebasedatabase.app/users/${this.authService.user.userId}/imenik/${id}.json`;

    return this.http.put(updateUrl, korisnik);
  }

  pregledKorisnika(): boolean {
    return true;
  }
}
