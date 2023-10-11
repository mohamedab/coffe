import {inject} from '@angular/core';
import {ActivatedRouteSnapshot, ResolveFn, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, from, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Order} from "../../shared/models/order";
import {OrderService} from "../../shared/services/order.service";

export const OrderDetailResolver: ResolveFn<Order> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<any> => {
  const router: Router = inject(Router);
  const orderService: OrderService = inject(OrderService);
  const id = route.paramMap.get('id')!;
  return from(orderService.getOrderDocById(id)).pipe(map(doc => {
    if (doc.exists()) {
      return doc.data() as Order;
    } else {  // id not found
      router.navigate(['account/orders']);
      return EMPTY;
    }
  }));
};
