import { Route, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from 'src/app/components/auth/auth.component';
import { ZaboravljenPasswordComponent } from 'src/app/components/auth/zaboravljen-password/zaboravljen-password.component';
import { MainComponent } from './components/main/main.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { ImenikComponent } from './components/main/imenik/imenik.component';
import { FormGuard } from 'src/app/components/core/services/form.guard';
import { UnosKontaktaComponent } from './components/main/unos-kontakta/unos-kontakta.component';
import { ProfilKorisnikaComponent } from './components/main/profil-korisnika/profil-korisnika.component';

export default [
  {
    path: '',
    redirectTo: 'autentifikacija/imenik',
    pathMatch: 'full',
  },
  {
    path: 'prijava',
    component: AuthComponent,
  },
  { path: 'zaboravljen-password', component: ZaboravljenPasswordComponent },
  {
    path: 'autentifikacija',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'imenik',
        component: ImenikComponent,
      },
      {
        path: 'unos',
        canDeactivate: [FormGuard],

        component: UnosKontaktaComponent,
      },
      {
        canActivate: [AuthGuard],
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
  { path: '**', redirectTo: 'autentifikacija/imenik' },
] as Route[];