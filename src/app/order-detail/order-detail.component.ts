import {Component} from '@angular/core';
import {Product} from "../models/product";
import {PriceCalculatorService} from "../services/price-calculator.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent {

  selectedItemsMap: Map<string, Product> = new Map<string, Product>();
  selectedItems: any;

  constructor(private priceCalculator: PriceCalculatorService,
              private router: Router) {
    this.priceCalculator.getSelectedItems().subscribe((selectedItems) => {
      if (selectedItems) {
        this.selectedItemsMap = selectedItems;
        this.selectedItems = Array.from(selectedItems.entries());
      }
    });
  }

  removeFromCart(product: Product) {
    this.selectedItemsMap.delete(product.name);
    this.priceCalculator.broadcastNewList(this.selectedItemsMap);
    this.priceCalculator.broadcastTotalPrice(this.selectedItemsMap);
  }


  goBack() {
    this.router.navigate(['menu']);
  }


}
