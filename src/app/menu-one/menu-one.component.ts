import {Component} from '@angular/core';
import {Item} from "../models/item";
import {CartService} from "../services/cart.service";
import {ItemService} from "../services/item.service";

@Component({
  selector: 'app-menu-one',
  templateUrl: './menu-one.component.html',
  styleUrls: ['./menu-one.component.scss']
})
export class MenuOneComponent {

  coffeeMenuList: Item[] = [];

  lunchMenuList: Item[] = [];

  dinnerMenuList: Item[] = [];

  drinksMenuList: Item[] = [];


  allMenuItems: Item[] = [];

  itemId: number = 0;
  coffeeMenu: boolean = true;
  lunchMenu: boolean = false;
  dinnerMenu: boolean = false;
  drinkMenu: boolean = false;

  constructor(private cartService: CartService,
              private itemService: ItemService) {
    this.itemService.getItems().subscribe((items: Item[]) => {
      console.log(items);
      this.coffeeMenuList = items.filter(item => item.category === 'Coffee');
      this.lunchMenuList = items.filter(item => item.category === 'Lunch');
      this.dinnerMenuList = items.filter(item => item.category === 'Diner');
      this.drinksMenuList = items.filter(item => item.category === 'Drink');
    });
  }

  addToCart(item: Item) {
    this.cartService.addToCart(item, 1);
  }

  showCoffeeMenu() {
    this.coffeeMenu = true;
    this.lunchMenu = false;
    this.dinnerMenu = false;
    this.drinkMenu = false;
  }

  showLunchMenu() {
    this.coffeeMenu = false;
    this.lunchMenu = true;
    this.dinnerMenu = false;
    this.drinkMenu = false;
  }

  showDinnerMenu() {
    this.coffeeMenu = false;
    this.lunchMenu = false;
    this.dinnerMenu = true;
    this.drinkMenu = false;
  }

  showDrinkMenu() {
    this.coffeeMenu = false;
    this.lunchMenu = false;
    this.dinnerMenu = false;
    this.drinkMenu = true;
  }

// Generate a unique itemId for each item
  generateUniqueId(): string {
    // Generate a random 8-character alphanumeric string
    return Math.random().toString(36).substring(2, 10);
  }

}
