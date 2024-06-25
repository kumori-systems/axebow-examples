import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({providedIn: 'root'})
export class CustomSnackbarService {
    constructor(private _snackBar: MatSnackBar) { }


    open(message) {
        this._snackBar.open(message, '', {
          duration: 3000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
}