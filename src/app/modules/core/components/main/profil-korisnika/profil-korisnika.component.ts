import { Component, OnInit } from '@angular/core';
import { User } from '../../../models/user.model';
import { AuthService } from '../../../../../services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { async, lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profil-korisnika',
  templateUrl: './profil-korisnika.component.html',
  styleUrls: ['./profil-korisnika.component.scss'],
})
export class ProfilKorisnikaComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private snackBar: MatSnackBar,
    private http: HttpClient
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
      this.spremi();
    } else {
      this.isEditMode = true;
    }
  }

  async spremi() {
    const uData = {
      token: this.token,
      name: `${this.user.firstName} ${this.user.lastName}`, // Include the name property
      ...this.user,
    };

    try {
      // await znaci cekaj da se ovaj request izvrsi, i onda tek se izvrsava ono ispod
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
      if (rezultatRequesta != null) {
        this.auth.getUserData(uData.token);
      }
    } catch (error) {
      console.log(error);
    }

    this.isEditMode = false;
  }

  changePassword() {
    const data = { idToken: this.auth.user.token };
    this.auth.changePassword(data).subscribe(
      (res) => {},
      (error) => {
        console.log(error);
      }
    );
  }

  generateResetPasswordToken() {
    const email = this.auth.user.email;
    this.auth.generatePasswordResetToken(email).subscribe(
      (email) => {
        this.snackBar.open(
          `Poslali smo upute za resetiranje lozinke na ${email}.`,
          'Zatvori',
          {
            duration: 5000,
            panelClass: 'success-snackbar',
          }
        );
      },
      (error) => {
        this.snackBar.open(
          'Došlo je do pogreške prilikom generiranja tokena za resetiranje lozinke.',
          'Zatvori',
          {
            duration: 5000,
            panelClass: 'error-snackbar',
          }
        );
      }
    );
  }
}
