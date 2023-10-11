import {Component, ViewEncapsulation} from '@angular/core';
import {Item} from "../shared/models/item";
import {OrderService} from "../shared/services/order.service";
import {Router} from "@angular/router";
import {Order} from "../shared/models/order";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {CartService} from "../shared/services/cart.service";
import {OrderStatus} from "../shared/models/order-status";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderDetailComponent {

  selectedItems: Item[] = [];
  order: Order = new Order();
  isOrderValidated: boolean = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  showSpinner: boolean = false;

  constructor(private orderService: OrderService,
              private cartService: CartService,
              private router: Router,
              private _snackBar: MatSnackBar) {
    this.orderService.getOrder().subscribe((order: Order) => {
      if (order) {
        this.selectedItems = order.items;
        this.order = order;
        if (this.order.status) {
          this.isOrderValidated = true;
        }
      }
    });
  }


  goBack() {
    if (this.order.status) {
      this.orderService.clearOrderToLocalStorage();
    }
    this.router.navigate(['menu']);
  }


  validateOrder() {
    this.order.status = OrderStatus.Pending;
    this.order.orderDate = new Date();
    this.showSpinner = true;
    this.orderService.addOrderDoc(this.order).then(() => {
        this.showSpinner = false;
        this.isOrderValidated = true;
        // Save the updated cart in local storage
        this.orderService.saveOrderToLocalStorage(this.order);
        // Add order to cart
        this.cartService.addOrderToCart(this.order);
        // Remove order from local storage.
        this.orderService.clearOrderToLocalStorage();
        // Display a snackbar.
        this._snackBar.open('Commande validée', 'OK', {
          horizontalPosition: this.horizontalPosition,
          verticalPosition: this.verticalPosition,
        });
      }
    ).catch(err => {
      console.log(err);
      this.order.orderId = '';
      this.showSpinner = false;
    });
  }

  startNewOrder() {
    this.orderService.clearOrderToLocalStorage();
    this.router.navigate(['menu']);
  }
}
