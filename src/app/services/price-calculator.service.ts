import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PriceCalculatorService {

  private _total: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  private total: number = 0;

  constructor() {
  }

  addToCart(price: any) {
    console.log(price);
    //this.selectedItems.push(item);
    //this.calculateTotal();
    this.total = this.total + price;
    this._total.next(this.total);
  }

  removeFromCart(price: number) {
    // this.calculateTotal();
    this.total = this.total - price;
    this._total.next(this.total);
  }

  getTotal() {
    return this._total.asObservable();
  }
}
