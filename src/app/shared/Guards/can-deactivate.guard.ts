import { CanDeactivateFn } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
export interface FormCanDeactivate{
  canDeactivate():boolean;
}
export const canDeactivateGuard: CanDeactivateFn<FormCanDeactivate> =(component)=> {
  console.log(component);
  const dialogService=inject(DialogService);
  if (component.canDeactivate()) {
    return of(true);
  }
  return new Observable((observer)=>{
  const dialogRef = dialogService.openConfirmationDialog('Are you sure you want to leave? Unsaved changes will be lost.');
  dialogRef.afterClosed().subscribe((res: boolean) => {
    observer.complete();
  }); 
  });
 
};
