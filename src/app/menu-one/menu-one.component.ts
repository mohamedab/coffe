import {Component} from '@angular/core';
import {PriceCalculatorService} from "../services/price-calculator.service";
import {Product} from "../models/product";

@Component({
  selector: 'app-menu-one',
  templateUrl: './menu-one.component.html',
  styleUrls: ['./menu-one.component.scss']
})
export class MenuOneComponent {

  coffeeMenuList: Product[] = [
    {
      name: 'Cappuccino',
      price: 3.5,
      image: 'assets/images/cup/cup1.png',
      ingredients: ['espresso', 'steamed milk', 'foam'],
      quantity: 0,
      total: 0,
    },
    {
      name: 'Latte',
      price: 4,
      image: 'assets/images/cup/cup2.png',
      ingredients: ['espresso', 'steamed milk'],
      quantity: 0,
      total: 0,
    },
    {
      name: 'Espresso',
      price: 2,
      image: 'assets/images/cup/cup3.png',
      ingredients: ['espresso'],
      quantity: 0,
      total: 0,
    },
    {
      name: 'Mocha',
      price: 4.5,
      image: 'assets/images/cup/cup4.png',
      ingredients: ['espresso', 'chocolate', 'steamed milk', 'whipped cream'],
      quantity: 0,
      total: 0,
    },
    {
      name: 'Macchiato',
      price: 3,
      image: 'assets/images/cup/cup5.png',
      ingredients: ['espresso', 'caramel', 'foam'],
      quantity: 0,
      total: 0,
    },
    {
      name: 'Americano',
      price: 3,
      image: 'assets/images/cup/cup6.png',
      ingredients: ['espresso', 'hot water'],
      quantity: 0,
      total: 0,
    },
    {
      name: 'Iced Coffee',
      price: 3.5,
      image: 'assets/images/cup/cup7.png',
      ingredients: ['brewed coffee', 'ice', 'milk', 'sugar'],
      quantity: 0,
      total: 0,
    },
    {
      name: 'Caramel Frappuccino',
      price: 5,
      image: 'assets/images/cup/cup8.png',
      ingredients: ['coffee', 'caramel syrup', 'ice', 'milk', 'whipped cream'],
      quantity: 0,
      total: 0,
    },
    {
      name: 'Irish Coffee',
      price: 5,
      image: 'assets/images/cup/cup9.png',
      ingredients: ['whiskey', 'brewed coffee', 'sugar', 'whipped cream'],
      quantity: 0,
      total: 0,
    },
  ];

  lunchMenuList: Product[] = [
    {
      name: 'Chicken Caesar Salad',
      price: 9.99,
      image: 'assets/images/cup/cup1.png',
      ingredients: ['romaine lettuce', 'grilled chicken', 'croutons', 'Caesar dressing'],
      quantity: 0,
      total: 0,
    },
    {
      name: 'Vegetable Wrap',
      price: 8.99,
      image: 'assets/images/cup/cup4.png',
      ingredients: ['grilled vegetables', 'hummus', 'feta cheese', 'tortilla'],
      quantity: 0,
      total: 0,
    },
    {
      name: 'Classic BLT Sandwich',
      price: 7.99,
      image: 'assets/images/cup/cup6.png',
      ingredients: ['bacon', 'lettuce', 'tomato', 'mayo', 'toasted bread'],
      quantity: 0,
      total: 0,
    },
    {
      name: 'Caprese Panini',
      price: 9.49,
      image: 'assets/images/cup/cup9.png',
      ingredients: ['tomato', 'fresh mozzarella', 'basil', 'balsamic glaze', 'ciabatta'],
      quantity: 0,
      total: 0,
    },
    // Add more lunch items here
  ];

  dinnerMenuList: Product[] = [
    {
      name: 'Grilled Salmon',
      price: 16.99,
      image: 'assets/images/cup/cup1.png',
      ingredients: ['salmon fillet', 'lemon herb butter', 'steamed asparagus'],
      quantity: 0,
      total: 0,
    },
    {
      name: 'Steakhouse Burger',
      price: 14.99,
      image: 'assets/images/cup/cup2.png',
      ingredients: ['beef patty', 'cheddar cheese', 'bacon', 'lettuce', 'tomato', 'special sauce'],
      quantity: 0,
      total: 0,
    },
    {
      name: 'Vegetable Stir-Fry',
      price: 13.49,
      image: 'assets/images/cup/cup3.png',
      ingredients: ['assorted vegetables', 'tofu', 'savory sauce'],
      quantity: 0,
      total: 0,
    },
    {
      name: 'Pasta Primavera',
      price: 12.99,
      image: 'assets/images/cup/cup4.png',
      ingredients: ['penne pasta', 'seasonal vegetables', 'creamy Alfredo sauce'],
      quantity: 0,
      total: 0,
    },
    // Add more dinner items here
  ];

  drinksMenuList: Product[] = [
    {
      name: 'Iced Tea',
      price: 2.49,
      image: 'assets/images/cup/cup5.png',
      ingredients: ['iced tea', 'lemon'],
      quantity: 0,
      total: 0,
    },
    {
      name: 'Soda (Coke, Pepsi, etc.)',
      price: 1.99,
      image: 'assets/images/cup/cup6.png',
      ingredients: ['soda'],
      quantity: 0,
      total: 0,
    },
    {
      name: 'Lemonade',
      price: 2.49,
      image: 'assets/images/cup/cup7.png',
      ingredients: ['lemonade'],
      quantity: 0,
      total: 0,
    },
    {
      name: 'Fruit Smoothie',
      price: 4.99,
      image: 'assets/images/cup/cup8.png',
      ingredients: ['assorted fruits', 'yogurt'],
      quantity: 0,
      total: 0,
    },
    // Add more drink items here
  ];


  total: number = 0;
  coffeeMenu: boolean = true;
  lunchMenu: boolean = false;
  dinnerMenu: boolean = false;
  drinkMenu: boolean = false;

  constructor(private priceCalculator: PriceCalculatorService) {}

  addToCart(item: Product) {
    this.priceCalculator.addToCart(item);
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
