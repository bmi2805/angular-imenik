import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './modules/app-routing.module';

import { AppComponent } from './app.component';
import { NavigacijaComponent } from './components/navigacija/navigacija.component';
import { ImenikComponent } from './components/imenik/imenik.component';
import { NotifyDialogComponent } from './components/notify-dialog/notify-dialog.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProfilKorisnikaComponent } from './components/profil-korisnika/profil-korisnika.component';
import { SnackbarNotifyComponent } from './components/snackbar-notify/snackbar-notify.component';

import { AuthInterceptorService } from './services/auth-interceptor.service';

import { SharedModule } from './modules/shared/shared.module';
import { ZaboravljenPasswordComponent } from './components/auth/zaboravljen-password/zaboravljen-password.component';
import { UnosKontaktaComponent } from './components/imenik/unos-kontakta/unos-kontakta.component';

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


    NotifyDialogComponent,
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
