import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SnackbarNotifyService } from 'src/app/services/snackbar-notify.service';
import { environment } from 'src/environments/environment';
import { IPOSTChangeData } from 'src/app/models/response.model';

@Component({
  selector: 'app-profil-korisnika',
  templateUrl: './profil-korisnika.component.html',
  styleUrls: ['./profil-korisnika.component.scss'],
})
export class ProfilKorisnikaComponent implements OnInit {
  private userSub: Subscription;
  isAuthenticated = false;

  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private http: HttpClient,
    private snackbar_notify: SnackbarNotifyService
  ) {}

  token = JSON.parse(localStorage.getItem('userData'))._token;

  ngOnInit(): void {
    this.userSub = this.auth.user$.subscribe((user) => {
      this.isAuthenticated = !!user;
      this.user.firstName = user.displayName;
    });
  }
  loadedUser: User;

  user = {
    firstName: ``,
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
    const uData = {
      token: this.token,
      name: `${this.user.firstName}`,
      ...this.user,
    };

    try {
      const rezultatRequesta = await lastValueFrom(
        this.http.post<any>(
          `${environment.rezUrl}/v1/accounts:update?key=AIzaSyC-8gtlSwNIzpBdXhDb31FIFUU3BER9W0E`,
          {
            idToken: uData.token,
            displayName: uData.name,
            returnSecureToken: true,
          }
        )
      );

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
      const rezultatRequesta = await lastValueFrom(
        this.http.post<IPOSTChangeData>(
          `${environment.rezUrl}/v1/accounts:update?key=AIzaSyC-8gtlSwNIzpBdXhDb31FIFUU3BER9W0E`,
          {
            idToken: data.idToken,
            returnSecureToken: true,
          }
        )
      );

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
      const rezultatRequesta = await lastValueFrom(
        this.http.post<any>(
          `${environment.rezUrl}/v1/accounts:sendOobCode?key=AIzaSyC-8gtlSwNIzpBdXhDb31FIFUU3BER9W0E`,
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
