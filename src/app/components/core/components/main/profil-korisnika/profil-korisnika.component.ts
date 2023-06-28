import { Component, OnInit, inject } from '@angular/core';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../../../services/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Subscription, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SnackbarNotifyService } from 'src/app/services/snackbar-notify.service';
import { environment } from 'src/environments/environment';
import { IPOSTChangeData } from 'src/app/models/response.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-profil-korisnika',
  templateUrl: './profil-korisnika.component.html',
  styleUrls: ['./profil-korisnika.component.scss'],
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
    MatButtonModule,
    MatIconModule,
    MatSnackBarModule,
  ],
})
export class ProfilKorisnikaComponent implements OnInit {
  private userSub: Subscription;
  isAuthenticated = false;

  auth = inject(AuthService);
  snackbar_notify = inject(SnackbarNotifyService);
  http = inject(HttpClient);
  snackBar = inject(MatSnackBar);

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

  toggleEditMode(): void {
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
        this.auth.getUserDataAsync(uData.token);
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

  async changePassword(): Promise<void> {
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

  async generateResetPasswordToken(): Promise<void> {
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
