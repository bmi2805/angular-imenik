import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NotifyDialogComponent } from './components/notify-dialog/confirm-dialog.component';
import { AuthComponent } from './components/auth/auth.component';
import { ProfilKorisnikaComponent } from './modules/core/components/main/profil-korisnika/profil-korisnika.component';
import { SnackbarNotifyComponent } from './components/snackbar-notify/snackbar-notify.component';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { SharedModule } from './modules/shared/shared.module';
import { ZaboravljenPasswordComponent } from './components/auth/zaboravljen-password/zaboravljen-password.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NotifyDialogComponent,
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
