import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-delete-dialog',
    templateUrl: './confirm-dialog.component.html',
    styleUrls: ['./confirm-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogModule, MatButtonModule]
})
export class NotifyDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string; title: string }
  ) {}
}
