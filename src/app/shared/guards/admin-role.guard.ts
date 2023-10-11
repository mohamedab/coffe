import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";

export const AdminGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  if (authService.isAdmin !== true) {
    console.log('heere');
    router.navigate(['account/orders']);
  }
  return true;
};
