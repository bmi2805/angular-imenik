import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarNotifyComponent } from '../components/snackbar-notify/snackbar-notify.component';

export declare type SnackBarType = 'success' | 'info' | 'warning' | 'error';

@Injectable({
  providedIn: 'root',
})
export class SnackbarNotifyService {
  constructor(private snackBar: MatSnackBar) {}

  notify(
    title: string,
    message: string,
    duration: number,
    type: SnackBarType
  ): MatSnackBarRef<SnackbarNotifyComponent> {
    return this.snackBar.openFromComponent(SnackbarNotifyComponent, {
      duration,
      verticalPosition: 'top',
      data: {
        title,
        message,
        type,
      },
      panelClass: ['snackbar-notify'],
    });
  }

  dismiss(): void {
    this.snackBar.dismiss();
  }
}
