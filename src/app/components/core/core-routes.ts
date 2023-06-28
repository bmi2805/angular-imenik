import { Route } from '@angular/router';
import { AuthComponent } from 'src/app/components/auth/auth.component';
import { ZaboravljenPasswordComponent } from 'src/app/components/auth/zaboravljen-password/zaboravljen-password.component';
import { MainComponent } from './components/main/main.component';
import { ImenikComponent } from './components/main/imenik/imenik.component';
import { UnosKontaktaComponent } from './components/main/unos-kontakta/unos-kontakta.component';
import { ProfilKorisnikaComponent } from './components/main/profil-korisnika/profil-korisnika.component';
import { FormGuard } from './services/form.guard';

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
        path: 'profil-korisnika',
        component: ProfilKorisnikaComponent,
      },
      {
        path: 'uredi/:id',
        component: UnosKontaktaComponent,
      },
      {
        path: 'pregled/:id',
        component: UnosKontaktaComponent,
      },
    ],
  },
  { path: '**', redirectTo: 'autentifikacija/imenik' },
] as Route[];
