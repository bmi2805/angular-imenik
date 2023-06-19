import { RouterModule, Routes } from "@angular/router";
import { AuthComponent } from "src/app/components/auth/auth.component";
import { ZaboravljenPasswordComponent } from "src/app/components/auth/zaboravljen-password/zaboravljen-password.component";
import { NavigacijaComponent } from "./components/main/main.component";
import { AuthGuard } from "src/app/services/auth.guard";
import { ImenikComponent } from "./components/main/imenik/imenik.component";
import { FormGuard } from "src/app/modules/core/services/form.guard";
import { UnosKontaktaComponent } from "./components/main/unos-kontakta/unos-kontakta.component";
import { ProfilKorisnikaComponent } from "./components/main/profil-korisnika/profil-korisnika.component";
import { NgModule } from "@angular/core";


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
  {path:'**', redirectTo: "autentifikacija/"},

];

@NgModule({
  imports: [RouterModule.forChild(appRoutes)],
  exports: [RouterModule],
})
export class CoreRoutingModule {}
