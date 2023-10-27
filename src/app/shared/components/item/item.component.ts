import {Component, EventEmitter, Input, Output, ViewEncapsulation} from '@angular/core';
import {Item} from "../../models/item";
import {OrderService} from "../../services/order.service";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss'],
  animations: [
    trigger('imageExpansion', [
      state('collapsed', style({transform: 'scale(O)'})),
      state('expanded', style({transform: 'scale(6)', position: 'relative', top: '50%', left: '45%', 'z-index': '1'})),
      transition('collapsed => expanded', animate('300ms ease-in')),
      transition('expanded => collapsed', animate('300ms ease-out')),
    ]),
  ],
  encapsulation: ViewEncapsulation.None
})
export class ItemComponent {

  @Input() items: Item[] = [];
  @Input() addOrder: boolean = false;
  @Input() editOrder: boolean = false;
  @Input() isOrderValidateStep: boolean = false;
  @Input() isOrderConfirmStep: boolean = false;
  @Output() updateOrder: EventEmitter<Item[]> = new EventEmitter<Item[]>();
  @Output() addItemToOrder: EventEmitter<Item[]> = new EventEmitter<Item[]>();

  constructor(private cartService: OrderService, private _snackBar: MatSnackBar) {
  }

  addToCart(item: Item) {
    let itemToAdd = new Item();
    itemToAdd = item;
    this.cartService.addToOrder(itemToAdd, 1);
    this._snackBar.open('Article ajoutée', '×', {
            panelClass: 'success',
            verticalPosition: 'top',
            duration: 2000
          });
  }

  removeFromCart(item: Item) {
    this.cartService.removeFromOrder(item);
     this._snackBar.open('Article retirée', '×', {
            panelClass: 'warn',
            verticalPosition: 'top',
            horizontalPosition: 'center',
            duration: 2000,
          });
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

  addToList(item: any) {
    const existingItem = this.items.find((orderItem) => orderItem.itemId === item.itemId);
    if (existingItem) {
      // If the item already exists in the order, update the quantity
      existingItem.quantity += 1;
    } else {
      // If it's a new item, add it to the order
      const newItem: Item = {...item, quantity:1};
      this.items.push(newItem);
    }
    this.addItemToOrder.emit(this.items);
  }
}
