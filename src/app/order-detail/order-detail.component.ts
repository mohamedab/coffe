import {Component} from '@angular/core';
import {Item} from "../models/item";
import {CartService} from "../services/cart.service";
import {Router} from "@angular/router";
import {Order} from "../models/order";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {

  selectedItems: Item[]= [];

  constructor(private priceCalculator: CartService,
              private router: Router) {
    this.priceCalculator.getCart().subscribe((cart: Order) => {
      if (cart) {
        this.selectedItems = cart.items;
      }
    });
  }

  removeFromCart(item: Item) {
    this.priceCalculator.removeFromCart(item)
  }


  goBack() {
    this.router.navigate(['menu']);
  }


}
