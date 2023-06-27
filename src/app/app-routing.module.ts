import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ZaboravljenPasswordComponent } from './components/auth/zaboravljen-password/zaboravljen-password.component';

export const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/core/core.module').then((m) => m.CoreModule),
  },

  {
    path: 'prijava',
    component: AuthComponent,
  },
  { path: 'zaboravljen-password', component: ZaboravljenPasswordComponent },

  {
    path: '**',
    redirectTo: '',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
