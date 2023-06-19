import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import {  AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IAuthResponseData } from 'src/app/modules/core/models/auth.model';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  // standalone: true,
  // imports: [MatIconModule,MatFormFieldModule,MatInputModule,ReactiveFormsModule,CommonModule,MatButtonModule, MatCardModule, MatToolbarModule,MatProgressSpinnerModule,FormsModule,RouterModule,]
  })
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false; 
  error: string = null;
  form;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  authObs: Observable<IAuthResponseData>;

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

    this.authObs.subscribe(
      (resData) => {
        this.isLoading = false;
        this.router.navigate(['autentifikacija/imenik']);
      },
      (errorMessage) => {
        this.error = errorMessage;
        this.isLoading = false;
      }
    );
    form.resetForm(); // Dodano resetiranje forme    }
  }
}
