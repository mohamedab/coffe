import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {OrderStatus} from "../models/order-status";

export const ManagerGuard: CanActivateFn = (route, state) => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);
  if (authService.isManager !== true) {
    router.navigate(['account/orders/' + OrderStatus.Pending]);
  }
  return true;
};
