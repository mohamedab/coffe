import {Component} from '@angular/core';
import {CartService} from "../services/cart.service";
import {Order} from "../models/order";
import {Router} from "@angular/router";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cart: Order[] = [];

  constructor(private cartService: CartService, private  router: Router) {
    this.cartService.getCart().subscribe((cart: Order[]) => {
      this.cart = cart;
    })
  }

  viderCart() {
    this.cartService.clearCartToLocalStorage();
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }
}
