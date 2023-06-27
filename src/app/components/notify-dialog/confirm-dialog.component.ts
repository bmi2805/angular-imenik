import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  // standalone: true,
  // imports: [MatDialogModule, MatButtonModule],
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class NotifyDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string; title: string }
  ) {}
}
