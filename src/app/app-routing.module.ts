import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImenikComponent } from './modules/core/components/main/imenik/imenik.component';
import { UnosKontaktaComponent } from './modules/core/components/main/unos-kontakta/unos-kontakta.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './services/auth.guard';
import { ProfilKorisnikaComponent } from './modules/core/components/main/profil-korisnika/profil-korisnika.component';
import { NavigacijaComponent } from './modules/core/components/main/main.component';
import { ZaboravljenPasswordComponent } from './components/auth/zaboravljen-password/zaboravljen-password.component';
import { FormGuard } from './components/auth/form.guard';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'autentifikacija/imenik',
    pathMatch: 'full',
  },

  {
    path: 'prijava',
    component: AuthComponent,
    // loadComponent: () => import('../components/auth/auth.component').then(mod=>mod.AuthComponent)
  },
  { path: 'zaboravljen-password', component: ZaboravljenPasswordComponent },
  {
    path: 'autentifikacija',
    component: NavigacijaComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'imenik',
        component: ImenikComponent,
        // loadComponent: () => import('../components/imenik/imenik.component').then(mod=>mod.ImenikComponent)
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
