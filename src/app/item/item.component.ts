import {Component, Input} from '@angular/core';
import {Item} from "../models/item";
import {OrderService} from "../services/order.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input() items: Item[] = [];
  @Input() editOrder: boolean = false;
  @Input() isOrderConfirmed: boolean = false;

  constructor(private cartService: OrderService) {}

  addToCart(item: Item) {
    let itemToAdd = new Item();
    itemToAdd = item;
    this.cartService.addToOrder(itemToAdd, 1);
  }

  removeFromCart(item: Item) {
    this.cartService.removeFromOrder(item)
  }
}
