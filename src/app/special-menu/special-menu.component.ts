import {Component} from '@angular/core';
import {Item} from "../models/item";
import {CartService} from "../services/cart.service";
import {ItemService} from "../services/item.service";

@Component({
  selector: 'app-special-menu',
  templateUrl: './special-menu.component.html',
  styleUrls: ['./special-menu.component.scss']
})
export class SpecialMenuComponent {

  specialMenuList: Item[] = [];

  constructor(private itemService: ItemService) {
    this.itemService.getItems().subscribe((items: Item[]) => {
      this.specialMenuList = items.filter(item => item.category === 'Coffee');
    })
  }

}
