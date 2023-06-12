import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { SharedDataService } from '../profil-korisnika/shared-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarNotifyService } from 'src/app/snackbar-notify/snackbar-notify.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-zaboravljen-password',
  templateUrl: './zaboravljen-password.component.html',
  styleUrls: ['./zaboravljen-password.component.scss'],
})
export class ZaboravljenPasswordComponent {
  email: string;

  constructor(
    private auth: AuthService,
    private snackbar_notify: SnackbarNotifyService,
    private router: Router
  ) {

  
  }

  ngOnInit(): void {}

  sendLink() {
    console.log(this.email);

    if (this.email) {
      // Check if the email is provided
      this.auth.zaboravljenaLozinka({ email: this.email }).subscribe(
        (response) => {
          console.log(response);
          this.snackbar_notify.notify(
            'Super',
            'Uspješno ste poslali zahtjev',
            5000,
            'success'
          );
          this.router.navigate(['./prijava']);
        },
        (error) => {
          console.log(error);
          this.snackbar_notify.notify(
            'Greška',
            'Došlo je do greške',
            5000,
            'error'
          );
        }
      );
    } else {
      console.log('Email is missing');
      this.snackbar_notify.notify('Greška', 'Nedostaje email', 5000, 'error');
    }
  }
}
