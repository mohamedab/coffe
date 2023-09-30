import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {PriceCalculatorService} from "../services/price-calculator.service";
import {Product} from "../models/product";

@Component({
  selector: 'app-total-bar',
  templateUrl: './total-bar.component.html',
  styleUrls: ['./total-bar.component.scss']
})
export class TotalBarComponent {

  totalPrice: number = 0;
  selecedItemsNbr: number = 0;
  @Input() showOrderDetailBouton: boolean = true;

  constructor(private router: Router,
              public priceCalculator: PriceCalculatorService) {
    this.priceCalculator.getSelectedItems()
      .subscribe((selectedItems) => {
        if (selectedItems) {
          this.selecedItemsNbr = Array.from(selectedItems.entries())
            .map((items) => items[1])
            .reduce((acc, item) => acc + item.quantity, 0);
        }
      });
    this.priceCalculator.getTotal()
      .subscribe((total: number) => {
        this.totalPrice = total;
        if (total === 0) {
          this.router.navigate(['menu']);
        }
      });
  }

  orderDetail() {
    this.router.navigate(['/order']);
  }
}
