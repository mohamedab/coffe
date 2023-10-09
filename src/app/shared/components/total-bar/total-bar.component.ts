import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {Order} from "../../models/order";
import {OrderService} from "../../services/order.service";

@Component({
  selector: 'app-total-bar',
  templateUrl: './total-bar.component.html',
  styleUrls: ['./total-bar.component.scss']
})
export class TotalBarComponent {

  totalPrice: number = 0;
  selecedItemsNbr: number = 0;
  @Input() orderState: string = 'Voir panier';
  cart: Order = new Order();

  constructor(private router: Router,
              public cartService: OrderService) {
    this.cartService.getOrder().subscribe((order: Order) => {
      if (order.items.length >= 0) {
        this.selecedItemsNbr = order.items.reduce((acc, item) => acc + parseInt(String(item.quantity), 10), 0);
        this.totalPrice = order.totalAmount;
        if (this.totalPrice === 0) {
          this.router.navigate(['menu']);
        }
        this.cart = order;
      }
    });
  }

  goToOrderDetail() {
    this.router.navigate(['/order']);
  }
}
