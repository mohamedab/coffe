import {Component, ViewEncapsulation} from '@angular/core';
import {Item} from "../shared/models/item";
import {OrderService} from "../shared/services/order.service";
import {Router} from "@angular/router";
import {Order} from "../shared/models/order";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {CartService} from "../shared/services/cart.service";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class OrderDetailComponent {

  selectedItems: Item[] = [];
  order: Order = new Order();
  isOrderConfirmed: boolean = false;
  clientName = '';
  selectedServer = '';
  servers: string[] = ['Server 1', 'Server 2', 'Server 3']; // Replace with your list of servers

  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  confirmFormActive = false;
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
          this.isOrderConfirmed = true;
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


  confirmOrder(form?: any) {
    if ((form && form.valid) || !this.confirmFormActive) {
      this.order.status = 'Pending';
      this.order.orderDate = new Date();
      this.order.clientName = this.clientName;
      this.order.serverId = this.selectedServer;
      this.showSpinner = true;
      this.orderService.addOrder(this.order).then(() => {
          this.isOrderConfirmed = true;
          // Save the updated cart in local storage
          this.orderService.saveOrderToLocalStorage(this.order);
          // Add order to cart
          this.cartService.addOrderToCart(this.order);
          // Remove order from local storage.
          this.orderService.clearOrderToLocalStorage();
          // Display a snackbar.
          this._snackBar.open('Commande confirmée', 'OK', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
          this.showSpinner = false;
        }
      ).catch(err => {
        console.log(err);
        this.order.orderId = '';
        this.showSpinner = false;
      });
    }
  }

  startNewOrder() {
    this.orderService.clearOrderToLocalStorage();
    this.router.navigate(['menu']);
  }
}
