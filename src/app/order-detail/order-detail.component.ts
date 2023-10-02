import {Component, ViewEncapsulation} from '@angular/core';
import {Item} from "../models/item";
import {OrderService} from "../services/order.service";
import {Router} from "@angular/router";
import {Order} from "../models/order";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {CartService} from "../services/cart.service";

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


  confirmOrder(form: any) {
    if (form.valid) {
      this.order.status = 'Pending';
      this.order.orderDate = new Date();
      this.order.clientName = this.clientName;
      this.order.serverId = this.selectedServer;
      this.orderService.addOrder(this.order).then(() => {
          console.log('Order Successfully added');
          this.isOrderConfirmed = true;
          // Save the updated cart in local storage
          this.orderService.saveOrderToLocalStorage(this.order);
          // Add order to cart
          this.cartService.addOrderToCart(this.order);
          // Display a snackbar.
          this._snackBar.open('Order Successfully confirmed', 'Done', {
            horizontalPosition: this.horizontalPosition,
            verticalPosition: this.verticalPosition,
          });
        }
      ).catch(err => {
        console.log(err);
        this.order.orderId = '';
      });
    }
  }

  startNewOrder() {
    this.orderService.clearOrderToLocalStorage();
    this.router.navigate(['menu']);
  }
}
