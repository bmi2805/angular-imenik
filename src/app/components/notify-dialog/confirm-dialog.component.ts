import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class NotifyDialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string; title: string }
  ) {}
}