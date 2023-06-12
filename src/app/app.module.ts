import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavigacijaComponent } from './navigacija/navigacija.component';
import { ImenikComponent } from './imenik/imenik.component';
import { UnosKontaktaComponent } from './imenik/unos-kontakta/unos-kontakta.component';
import { DeleteDialogComponent } from './imenik/delete-dialog/delete-dialog.component';
import { AuthComponent } from './auth/auth.component';
import { ProfilKorisnikaComponent } from './profil-korisnika/profil-korisnika.component';
import { SnackbarNotifyComponent } from './snackbar-notify/snackbar-notify.component';

import { AuthInterceptorService } from './auth/auth-interceptor.service';

import { SharedModule } from './shared/shared.module';
import { ZaboravljenPasswordComponent } from './profil-korisnika/zaboravljen-password/zaboravljen-password.component';

@NgModule({
  declarations: [
    AppComponent,
    NavigacijaComponent,
    ImenikComponent,
    UnosKontaktaComponent,
    DeleteDialogComponent,
    AuthComponent,
    ProfilKorisnikaComponent,
    SnackbarNotifyComponent,
    ZaboravljenPasswordComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
