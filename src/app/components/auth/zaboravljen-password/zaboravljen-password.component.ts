import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarNotifyService } from 'src/app/services/snackbar-notify.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-zaboravljen-password',
    templateUrl: './zaboravljen-password.component.html',
    styleUrls: ['./zaboravljen-password.component.scss'],
    standalone: true,
    imports: [MatToolbarModule, MatCardModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink]
})
export class ZaboravljenPasswordComponent {
  email: string;

  constructor(
    private auth: AuthService,
    private snackbar_notify: SnackbarNotifyService,
    private router: Router
  ) {}

  sendLink(): void {
    if (this.email) {
      this.auth.zaboravljenaLozinkaAsync({ email: this.email });
    } else {
      this.snackbar_notify.notify('Greška', 'Nedostaje email', 5000, 'error');
    }
  }
}
