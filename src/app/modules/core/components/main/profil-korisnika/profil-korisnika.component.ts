import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { IChangeResponseData } from '../../../models/auth.model';
import { SnackbarNotifyService } from 'src/app/services/snackbar-notify.service';

@Component({
  selector: 'app-profil-korisnika',
  templateUrl: './profil-korisnika.component.html',
  styleUrls: ['./profil-korisnika.component.scss'],
})
export class ProfilKorisnikaComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private snackbar_notify: SnackbarNotifyService
  ) {}

  token = JSON.parse(localStorage.getItem('userData'))._token;

  ngOnInit(): void {}
  loadedUser: User;

  user = {
    firstName: ``,
    lastName: '',
    email: `${this.auth.user.email}`,
  };

  isEditMode = false;

  toggleEditMode() {
    if (this.isEditMode) {
      this.spremiAsync();
    } else {
      this.isEditMode = true;
    }
  }

  async spremiAsync(): Promise<any> {
    console.log('PRIJE await spremi ');

    await this.spremiAsync2();
    console.log('POSLJE await spremi ');
  }
  async spremiAsync2(): Promise<any> {
    const uData = {
      token: this.token,
      name: `${this.user.firstName} ${this.user.lastName}`, // Include the name property
      ...this.user,
    };

    try {
      console.log('PRIJE await HTTP');

      const rezultatRequesta = await lastValueFrom(
        this.http.post<any>(
          'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC-8gtlSwNIzpBdXhDb31FIFUU3BER9W0E',
          {
            idToken: uData.token,
            displayName: uData.name,
            // photoUrl: uData.url,
            returnSecureToken: true,
          }
        )
      );
      console.log('POSLJE await HTTP');

      if (rezultatRequesta != null) {
        this.auth.getUserData(uData.token);
      }
    } catch (error) {
      this.snackbar_notify.notify(
        'Greška',
        'Došlo je do neočekivane greške',
        5000,
        'error'
      );
    }

    this.isEditMode = false;
  }

  async changePassword() {
    const data = { idToken: this.auth.user.token };

    try {
      // await znaci cekaj da se ovaj request izvrsi, i onda tek se izvrsava ono ispod
      const rezultatRequesta = await lastValueFrom(
        this.http.post<IChangeResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyC-8gtlSwNIzpBdXhDb31FIFUU3BER9W0E',
          {
            idToken: data.idToken,
            // password: data.password,
            returnSecureToken: true,
          }
        )
      ); // ovdje ces u rezultat requesta dobiti gotov respon

      if (rezultatRequesta != null) {
      }
    } catch (error) {
      this.snackbar_notify.notify(
        'Greška',
        'Došlo je do neočekivane greške',
        5000,
        'error'
      );
    }
  }

  async generateResetPasswordToken() {
    const email = this.auth.user.email;

    try {
      // await znaci cekaj da se ovaj request izvrsi, i onda tek se izvrsava ono ispod
      const rezultatRequesta = await lastValueFrom(
        this.http.post<any>(
          'https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyC-8gtlSwNIzpBdXhDb31FIFUU3BER9W0E',
          { requestType: 'PASSWORD_RESET', email }
        )
      );

      if (rezultatRequesta != null) {
        this.snackBar.open(
          `Poslali smo upute za resetiranje lozinke na ${email}.`,
          'Zatvori',
          {
            duration: 5000,
            panelClass: 'success-snackbar',
          }
        );
      }
    } catch (error) {
      this.snackbar_notify.notify(
        'Greška',
        'Došlo je do pogreške prilikom generiranja tokena za resetiranje lozinke.',
        5000,
        'error'
      );
    }
  }
}
