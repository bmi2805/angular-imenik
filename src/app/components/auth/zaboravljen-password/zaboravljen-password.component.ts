import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarNotifyService } from 'src/app/services/snackbar-notify.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-zaboravljen-password',
  templateUrl: './zaboravljen-password.component.html',
  styleUrls: ['./zaboravljen-password.component.scss'],
  // standalone:true,
  // imports:[CommonModule,RouterModule,MatToolbarModule,MatCardModule,MatButtonModule, MatFormFieldModule,MatInputModule, FormsModule]
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
