import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { SnackbarNotifyService } from 'src/app/snackbar-notify/snackbar-notify.service';
import { Router } from '@angular/router';

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

    if (this.email) {
      this.auth.zaboravljenaLozinka({ email: this.email }).subscribe(
        (response) => {
          this.snackbar_notify.notify(
            'Super',
            'Uspješno ste poslali zahtjev',
            5000,
            'success'
          );
          this.router.navigate(['./prijava']);
        },
        (error) => {
          this.snackbar_notify.notify(
            'Greška',
            'Došlo je do greške',
            5000,
            'error'
          );
        }
      );
    } else {
      this.snackbar_notify.notify('Greška', 'Nedostaje email', 5000, 'error');
    }
  }
}
