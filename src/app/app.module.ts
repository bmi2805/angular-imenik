import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavigacijaComponent } from './modules/core/components/main/main.component';
import { ImenikComponent } from './modules/core/components/main/imenik/imenik.component';
import { NotifyDialogComponent } from './components/notify-dialog/notify-dialog.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProfilKorisnikaComponent } from './modules/core/components/main/profil-korisnika/profil-korisnika.component';
import { SnackbarNotifyComponent } from './components/snackbar-notify/snackbar-notify.component';

import { AuthInterceptorService } from './services/auth-interceptor.service';
import { MatIconModule } from '@angular/material/icon';

import { SharedModule } from './modules/shared/shared.module';
import { ZaboravljenPasswordComponent } from './components/auth/zaboravljen-password/zaboravljen-password.component';
import { UnosKontaktaComponent } from './modules/core/components/main/unos-kontakta/unos-kontakta.component';

@NgModule({
  declarations: [
    AppComponent,
    
    
    AuthComponent,


    NotifyDialogComponent,
    NavigacijaComponent,
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
    SharedModule,
   

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
