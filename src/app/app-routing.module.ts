import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImenikComponent } from './imenik/imenik.component';
import { UnosKontaktaComponent } from './imenik/unos-kontakta/unos-kontakta.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfilKorisnikaComponent } from './profil-korisnika/profil-korisnika.component';
import { NavigacijaComponent } from './navigacija/navigacija.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'autentifikacija/imenik',
    pathMatch: 'full',
  },
  { path: 'prijava', component: AuthComponent },
  {
    path: 'autentifikacija',
    component: NavigacijaComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'imenik',
        component: ImenikComponent,
      },
      {
        path: 'unos',
        component: UnosKontaktaComponent,
      },
      {
        path: 'profil-korisnika',
        component: ProfilKorisnikaComponent,
      },
      {
        canActivate: [AuthGuard],
        path: 'uredi/:id',
        component: UnosKontaktaComponent,
      },
      {
        canActivate: [AuthGuard],
        path: 'pregled/:id',
        component: UnosKontaktaComponent,
      },
    ],
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
