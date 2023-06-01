import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ImenikComponent } from './imenik/imenik.component';
import { UnosKontaktaComponent } from './imenik/unos-kontakta/unos-kontakta.component';
import { AuthComponent } from './auth/auth.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: 'imenik',
    pathMatch: 'full',
  },
  {
    path: 'imenik',
    component: ImenikComponent,
  },

  {
    path: 'autentifikacija',
    component: AuthComponent,
  },
  // {
  //   path: 'registracija',
  //   component: RegistracijaComponent,
  // },
  {
    path: 'unos',
    component: UnosKontaktaComponent,
  },
  { path: 'uredi/:id', component: UnosKontaktaComponent },
  { path: 'pregled/:id', component: UnosKontaktaComponent },
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