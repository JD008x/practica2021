import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
@Injectable()
export class CommonService {
  constructor(private router: Router,
    private snackBar: MatSnackBar) { }

  showSnackBarMessage(message: string): void {
    this.snackBar.open(message, 'close', { duration: 3000 });
  }

}
