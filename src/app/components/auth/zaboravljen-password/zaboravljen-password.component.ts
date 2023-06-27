import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { SnackbarNotifyService } from 'src/app/services/snackbar-notify.service';
import { Router } from '@angular/router';

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
  ) {}

  ngOnInit(): void {}

  sendLink() {
    if (this.email) {
      this.auth.zaboravljenaLozinkaAsync({ email: this.email });
    } else {
      this.snackbar_notify.notify('Greška', 'Nedostaje email', 5000, 'error');
    }
  }
}
