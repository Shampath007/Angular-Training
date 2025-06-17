import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../components/dialog/dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(public dialog: MatDialog) { }
  openConfirmationDialog(message: string) {
    const ref = this.dialog.open(DialogComponent, {
      data: {
        header: 'confirmation',
        content: message,
      },
      autoFocus: false,
      panelClass: 'delete',
    });
    return ref;
  }
  showConfirmationDialog(message: string) {
    const ref = this.dialog.open(DialogComponent, {
      data: {
        header: 'success',
        content: message,
      },
      autoFocus: false,
      panelClass:'showing',
 

    });
    return ref;
  }
  error(message: string) {
    const ref = this.dialog.open(DialogComponent, {
      data: {
        header: 'Error',
        content: message,
      },
      autoFocus: false,
      panelClass:'error',

    });
    return ref;
  }
  warn(message: string) {
    const ref = this.dialog.open(DialogComponent, {
      data: {
        header: 'warning',
        content: message,
      },
      autoFocus: false,
      panelClass:'warn'
    });
    return ref;
  }
}
