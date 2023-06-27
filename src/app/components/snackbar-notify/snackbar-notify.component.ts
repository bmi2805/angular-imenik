import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MAT_SNACK_BAR_DATA, MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-notify',
  templateUrl: './snackbar-notify.component.html',
  styleUrls: ['./snackbar-notify.component.scss'],
  // standalone:true,
  // imports: [CommonModule, MatIconModule]
})
export class SnackbarNotifyComponent {
  colorStyle = { color: 'black' };
  matIcon = 'check';

  constructor(
    @Inject(MAT_SNACK_BAR_DATA) public data: any,
    private snackbar: MatSnackBar
  ) {
    this.initNotifyStyle();
  }

  private initNotifyStyle(): void {
    if (this.data.type === 'success') {
      this.colorStyle.color = 'rgb(53, 173, 101)';
      this.matIcon = 'check_circle';
    } else if (this.data.type === 'info') {
      this.colorStyle.color = 'rgb(34, 89, 120)';
      this.matIcon = 'announcement';
    } else if (this.data.type === 'warning') {
      this.colorStyle.color = 'rgb(199, 122, 70)';
      this.matIcon = 'warning';
    } else if (this.data.type === 'error') {
      this.colorStyle.color = 'rgb(222, 59, 18)';
      this.matIcon = 'cancel';
    }
  }

  dismissSnackbar(): void {
    this.snackbar.dismiss();
  }
}
