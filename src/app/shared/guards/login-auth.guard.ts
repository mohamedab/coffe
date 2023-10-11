import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const AuthGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  if (authService.isLoggedIn !== true) {
    console.log('heere');
    router.navigate(['login']);
  }
  return true;
};
