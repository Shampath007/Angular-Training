import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PasswordcheckService {

  constructor() { }
  validateAreEqual(form:any){
    if(form.value.newPassword&&form.value.confirmPassword){
      return form.value.newPassword===form.value.confirmPassword?
      form.get('confirmPassword').setErrors(null):form.get('confirmPassword').setErrors({mismatch:true})
    }
    return null;
  }
}
