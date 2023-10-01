import {Component, Input} from '@angular/core';
import {Item} from "../models/item";
import {CartService} from "../services/cart.service";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent {

  @Input() items: Item[] = [];
  quantities: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  constructor(private priceCalculator: CartService) {
  }

  addToCart(item: Item) {
    let itemToAdd = new Item();
    itemToAdd = item;
    this.priceCalculator.addToCart(itemToAdd, itemToAdd.quantity);
    item.quantity = 0;
  }
}
