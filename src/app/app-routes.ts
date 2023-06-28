import { Routes } from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ZaboravljenPasswordComponent } from './components/auth/zaboravljen-password/zaboravljen-password.component';

export const ROUTES: Routes = [
  {
    path: '',
    loadChildren: () => import('./components/core/core-routes'),
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
