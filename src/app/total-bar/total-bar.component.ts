import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {CartService} from "../services/cart.service";
import {Order} from "../models/order";

@Component({
  selector: 'app-total-bar',
  templateUrl: './total-bar.component.html',
  styleUrls: ['./total-bar.component.scss']
})
export class TotalBarComponent {

  totalPrice: number = 0;
  selecedItemsNbr: number = 0;
  @Input() showOrderDetailBouton: boolean = true;

  constructor(private router: Router,
              public priceCalculator: CartService) {
    this.priceCalculator.getCart().subscribe((cart: Order) => {
        if (cart.items.length > 0) {
          this.selecedItemsNbr = cart.items.reduce((acc, item) => acc + parseInt(String(item.quantity), 10), 0);
          this.totalPrice = cart.totalAmount;
          if (this.totalPrice === 0) {
            this.router.navigate(['menu']);
          }
        }
      });
  }

  orderDetail() {
    this.router.navigate(['/order']);
  }
}
