import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavigacijaComponent } from './navigacija/navigacija.component';
import { ImenikComponent } from './imenik/imenik.component';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { AuthComponent } from './auth/auth.component';
import { ProfilKorisnikaComponent } from './profil-korisnika/profil-korisnika.component';
import { SnackbarNotifyComponent } from './snackbar-notify/snackbar-notify.component';

import { AuthInterceptorService } from './auth/auth-interceptor.service';

import { SharedModule } from './shared/shared.module';
import { ZaboravljenPasswordComponent } from './zaboravljen-password/zaboravljen-password.component';
import { UnosKontaktaComponent } from './imenik/unos-kontakta/unos-kontakta.component';

@NgModule({
  declarations: [
    AppComponent,
    
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    SharedModule,
    AppRoutingModule,
    AuthComponent,


    DeleteDialogComponent,
    NavigacijaComponent,
    ProfilKorisnikaComponent,
    SnackbarNotifyComponent,
    ZaboravljenPasswordComponent,

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
