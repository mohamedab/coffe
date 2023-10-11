import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Item} from "../../models/item";
import {OrderService} from "../../services/order.service";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  animations: [
    trigger('imageExpansion', [
      state('collapsed', style({transform: 'scale(O)'})),
      state('expanded', style({transform: 'scale(6)', position: 'relative', top: '50%', left: '80%', 'z-index': '1'})),
      transition('collapsed => expanded', animate('300ms ease-in')),
      transition('expanded => collapsed', animate('300ms ease-out')),
    ]),
  ],
})
export class ItemComponent {

  @Input() items: Item[] = [];
  @Input() editOrder: boolean = false;
  @Input() isOrderValidateStep: boolean = false;
  @Input() isOrderConfirmStep: boolean = false;
  @Output() updateOrder: EventEmitter<Item[]> = new EventEmitter<Item[]>();

  constructor(private cartService: OrderService) {
  }

  addToCart(item: Item) {
    let itemToAdd = new Item();
    itemToAdd = item;
    this.cartService.addToOrder(itemToAdd, 1);
  }

  removeFromCart(item: Item) {
    this.cartService.removeFromOrder(item)
  }

  toggleImageExpansion(index: number) {
    // Toggle the animation state for the clicked item
    this.items[index].imageState = this.items[index].imageState === 'collapsed' ? 'expanded' : 'collapsed';

    // Reset the state for other items
    this.items.forEach((item, i) => {
      if (i !== index) {
        item.imageState = 'collapsed';
      }
    });
  }

  removeFromList(index: number) {
    this.items.splice(index, 1);
    this.updateOrder.emit(this.items);
  }
}
