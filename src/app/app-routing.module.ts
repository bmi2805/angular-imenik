import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImenikComponent } from './imenik/imenik.component';
import { UnosKontaktaComponent } from './imenik/unos-kontakta/unos-kontakta.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';
import { ProfilKorisnikaComponent } from './profil-korisnika/profil-korisnika.component';
import { NavigacijaComponent } from './navigacija/navigacija.component';
import { ZaboravljenPasswordComponent } from './zaboravljen-password/zaboravljen-password.component';
import { FormGuard } from './auth/form.guard';

export const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'autentifikacija/imenik',
    pathMatch: 'full',
  },
  { path: 'prijava', 
  // component: AuthComponent
  loadComponent: () => import('../app/auth/auth.component').then(mod=>mod.AuthComponent)


},
  { path: 'zaboravljen-password', component: ZaboravljenPasswordComponent },
  {
    path: 'autentifikacija',
    component: NavigacijaComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'imenik',
        // component: ImenikComponent,
        loadComponent: () => import('../app/imenik/imenik.component').then(mod=>mod.ImenikComponent)
      },
      {
        path: 'unos',
        canDeactivate:[FormGuard],
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
