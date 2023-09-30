import {Component} from '@angular/core';
import {PriceCalculatorService} from "../services/price-calculator.service";

@Component({
  selector: 'app-menu-one',
  templateUrl: './menu-one.component.html',
  styleUrls: ['./menu-one.component.scss']
})
export class MenuOneComponent {

  selectedItems: any[] = [];
  total: number = 0;
  coffeeMenu: boolean = true;
  lunchMenu: boolean = false;
  dinnerMenu: boolean = false;
  drinkMenu: boolean = false;

  constructor(private priceCalculator: PriceCalculatorService) {
  }

  addToCart(price: any) {
    this.priceCalculator.addToCart(price);
  }

  removeFromCart(price: number) {
    this.priceCalculator.removeFromCart(price);
  }

  calculateTotal() {
    this.total = this.selectedItems.reduce(
      (acc, item) => acc + item.price,
      0
    );
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

}
