import { Component, OnInit } from '@angular/core';
import { NgForm, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable, catchError, tap } from 'rxjs';
import { Router, RouterLink } from '@angular/router';
import { IPOSTAuth } from 'src/app/models/response.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    standalone: true,
    imports: [MatToolbarModule, NgIf, MatCardModule, MatProgressSpinnerModule, ReactiveFormsModule, FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, RouterLink]
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  email: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode(): void {
    this.isLoginMode = !this.isLoginMode;
  }

  authObs: Observable<IPOSTAuth>;

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      return;
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      this.authObs = this.authService.prijaviSe(email, password);
    } else {
      this.authObs = this.authService.registrirajSe(email, password);
    }

    this.authObs
      .pipe(
        tap(() => {
          this.isLoading = false;
          this.router.navigate(['autentifikacija/imenik']);
        }),
        catchError((errorMessage) => {
          this.error = errorMessage;
          this.isLoading = false;
          throw errorMessage;
        })
      )
      .subscribe();
    form.resetForm();
  }
}
