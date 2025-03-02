import { Injectable } from '@angular/core';
import { iSnackbarManagerService } from './isnackbar-manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackbarManagerService implements iSnackbarManagerService {
  constructor(private readonly snackBar: MatSnackBar) {}
  show(message: string, action?: 'fechar', duration: number = 3000): void {
    this.snackBar.open(message, action, {
      duration,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
