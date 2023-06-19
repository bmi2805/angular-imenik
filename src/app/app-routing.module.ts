import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImenikComponent } from './modules/core/components/main/imenik/imenik.component';
import { UnosKontaktaComponent } from './modules/core/components/main/unos-kontakta/unos-kontakta.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuard } from './services/auth.guard';
import { ProfilKorisnikaComponent } from './modules/core/components/main/profil-korisnika/profil-korisnika.component';
import { NavigacijaComponent } from './modules/core/components/main/main.component';
import { ZaboravljenPasswordComponent } from './components/auth/zaboravljen-password/zaboravljen-password.component';
import { FormGuard } from './modules/core/services/form.guard';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren:() => import('./modules/core/core.module').then((m) => m.CoreModule)
  },

  {
    path: 'prijava',
    component: AuthComponent,
    // loadComponent: () => import('../components/auth/auth.component').then(mod=>mod.AuthComponent)
  },
  { path: 'zaboravljen-password', component: ZaboravljenPasswordComponent },
 
  {
    path:'**', redirectTo: ""
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
