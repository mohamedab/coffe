import {Component, ViewEncapsulation} from '@angular/core';
import {Product} from "../models/product";
import {PriceCalculatorService} from "../services/price-calculator.service";

@Component({
  selector: 'app-coffee-menu',
  templateUrl: './coffee-menu.component.html',
  styleUrls: ['./coffee-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class CoffeeMenuComponent {

  constructor(private priceCalculator: PriceCalculatorService) {}
}
