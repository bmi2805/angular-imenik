import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Observable, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';
import { IPOSTAuth } from 'src/app/models/response.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  email: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  authObs: Observable<IPOSTAuth>;

  onSubmit(form: NgForm) {
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
        tap((resData) => {
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
