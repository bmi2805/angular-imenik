import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Router,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { AuthComponent } from './components/auth/auth.component';
import { ZaboravljenPasswordComponent } from './components/auth/zaboravljen-password/zaboravljen-password.component';
import { AuthService } from './services/auth.service';
import { inject } from '@angular/core';
import { FormGuard } from './components/core/services/form.guard';

const canActivateAuth: CanActivateFn = () => {
  const authService = inject(AuthService);
  // const isAuth = authService.user != null;
  console.log(authService.user);

  if (authService.autoLogin()) {
    return true;
  } else {
    return inject(Router).createUrlTree(['/prijava']);
    //inject(Router).navigate(['/prijava']);
    //return false;
  }
};

export const ROUTES: Routes = [
  {
    path: 'zaboravljen-password',
    component: ZaboravljenPasswordComponent,
  },
  {
    path: 'prijava',
    component: AuthComponent,
  },
  {
    path: '',
    loadChildren: () => import('./components/core/core-routes'),
    canActivate: [canActivateAuth],
    providers: [FormGuard],
    //pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
