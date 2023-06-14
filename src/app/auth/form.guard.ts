import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UnosKontaktaComponent } from '../imenik/unos-kontakta/unos-kontakta.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../imenik/delete-dialog/delete-dialog.component';
import { SafeData } from './save-data.interface';

@Injectable({
  providedIn: 'root', 
})
export class FormGuard implements CanDeactivate<SafeData> {
  constructor(private dialog: MatDialog) {}
  canDeactivate(
    component: SafeData,
    
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (component.isDataSaved()) {
      const dialogRef = this.dialog.open(DeleteDialogComponent, {
              width: '400px',
              data: {
                message:
                  'Jeste li sigurni da se želite vratiti natrag? Vaše promjene ce biti izgubljene?',
                title: 'Provjera',
              },
            });
            return dialogRef.afterClosed();
          }
          return (true);
        }
      }

