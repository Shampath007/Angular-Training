import { CanDeactivateFn } from '@angular/router';
import { DialogService } from '../services/dialog.service';
import { inject } from '@angular/core';
import { Observable, of } from 'rxjs';
export interface FormCanDeactivate{
  canDeactivate():boolean;
}
export const canDeactivateGuard: CanDeactivateFn<FormCanDeactivate> =(component)=> {
console.log("CanDeactivate Works");
const dialogservice = inject(DialogService);
if (!component.canDeactivate()) {
  console.log("CanDeactivate Works");
  const ref = dialogservice.openConfirmationDialog("Are u want to navigate away from page");
  return ref.afterClosed();
}
return true;
 
};

