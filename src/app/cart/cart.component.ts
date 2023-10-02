import {Component} from '@angular/core';
import {CartService} from "../services/cart.service";
import {Order} from "../models/order";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cart: Order[] = [];
  panelOpenState = false;

  constructor(private cartService: CartService) {
    this.cartService.getCart().subscribe((cart: Order[]) => {
      this.cart = cart;
    })
  }

}
