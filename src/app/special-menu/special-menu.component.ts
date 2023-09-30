import {Component} from '@angular/core';
import {Product} from "../models/product";
import {PriceCalculatorService} from "../services/price-calculator.service";

@Component({
  selector: 'app-special-menu',
  templateUrl: './special-menu.component.html',
  styleUrls: ['./special-menu.component.scss']
})
export class SpecialMenuComponent {

  specialMenuList: Product[] = [
  {
    name: 'Cappuccino',
    price: 3.5,
    image: 'assets/images/cup/cup1.png',
    ingredients: ['espresso', 'steamed milk', 'foam'],
    quantity: 0, // Default quantity
    total: 0,    // Default total
  },
  {
    name: 'Latte',
    price: 4,
    image: 'assets/images/cup/cup2.png',
    ingredients: ['espresso', 'steamed milk'],
    quantity: 0, // Default quantity
    total: 0,    // Default total
  },
  {
    name: 'Espresso',
    price: 2,
    image: 'assets/images/cup/cup3.png',
    ingredients: ['espresso'],
    quantity: 0, // Default quantity
    total: 0,    // Default total
  },
  {
    name: 'Mocha',
    price: 4.5,
    image: 'assets/images/cup/cup4.png',
    ingredients: ['espresso', 'chocolate', 'steamed milk', 'whipped cream'],
    quantity: 0, // Default quantity
    total: 0,    // Default total
  },
  {
    name: 'Macchiato',
    price: 3,
    image: 'assets/images/cup/cup5.png',
    ingredients: ['espresso', 'caramel', 'foam'],
    quantity: 0, // Default quantity
    total: 0,    // Default total
  },
  {
    name: 'Americano',
    price: 3,
    image: 'assets/images/cup/cup6.png',
    ingredients: ['espresso', 'hot water'],
    quantity: 0, // Default quantity
    total: 0,    // Default total
  },
  {
    name: 'Iced Coffee',
    price: 3.5,
    image: 'assets/images/cup/cup7.png',
    ingredients: ['brewed coffee', 'ice', 'milk', 'sugar'],
    quantity: 0, // Default quantity
    total: 0,    // Default total
  },
  {
    name: 'Caramel Frappuccino',
    price: 5,
    image: 'assets/images/cup/cup8.png',
    ingredients: ['coffee', 'caramel syrup', 'ice', 'milk', 'whipped cream'],
    quantity: 0, // Default quantity
    total: 0,    // Default total
  },
  {
    name: 'Irish Coffee',
    price: 5,
    image: 'assets/images/cup/cup9.png',
    ingredients: ['whiskey', 'brewed coffee', 'sugar', 'whipped cream'],
    quantity: 0, // Default quantity
    total: 0,    // Default total
  },
];

  constructor(private priceCalculator: PriceCalculatorService) {}

  addToCart(item: Product) {
    this.priceCalculator.addToCart(item);
  }

}
