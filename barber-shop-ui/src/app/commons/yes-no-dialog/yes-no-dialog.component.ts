import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogTitle } from '@angular/material/dialog';
import { MatDialogContent } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButton } from '@angular/material/button';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-yes-no-dialog',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogModule,
    MatButton,
    MatButtonModule,
  ],
  templateUrl: './yes-no-dialog.component.html',
  styleUrl: './yes-no-dialog.component.scss',
})
export class YesNoDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public readonly data: any) {}
}
