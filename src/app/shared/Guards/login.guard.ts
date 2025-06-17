import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authservice=inject(AuthService);
  if(authservice.isAuthenicated()){
    // return authservice.logout(); 
    return false;
  }
  return true;
};
