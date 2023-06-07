import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImenikComponent } from './imenik/imenik.component';
import { UnosKontaktaComponent } from './imenik/unos-kontakta/unos-kontakta.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfilKorisnikaComponent } from './profil-korisnika/profil-korisnika.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'imenik',
    pathMatch: 'full',
  },
  {
    canActivate: [AuthGuard],
    path: 'imenik',
    component: ImenikComponent,
  },

  {
    path: 'autentifikacija',
    component: AuthComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'unos',
    component: UnosKontaktaComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'uredi/:id',
    component: UnosKontaktaComponent,
  },
  {
    canActivate: [AuthGuard],
    path: 'profil-korisnika',
    component: ProfilKorisnikaComponent,
  },

  {
    canActivate: [AuthGuard],
    path: 'pregled/:id',
    component: UnosKontaktaComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

// baza
// {
//   "rules": {
//     ".read": "now < 1687298400000",  // 2023-6-21
//     ".write": "now < 1687298400000",  // 2023-6-21
//   }
// }

// Ako ima observable mora biti i subscribe
