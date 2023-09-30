import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Product} from "../models/product";

@Injectable({
  providedIn: 'root'
})
export class PriceCalculatorService {

  private items: BehaviorSubject<Map<string, Product>> = new BehaviorSubject<Map<string, Product>>(new Map<string, Product>());
  private total: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  selectedItems: Map<string, Product> = new Map<string, Product>();

  constructor() {
    const savedSelectedItemsJSON = localStorage.getItem('selectedItems');
    if (savedSelectedItemsJSON) {
      const savedSelectedItems = JSON.parse(savedSelectedItemsJSON);
      const productMap = new Map<string, Product>(savedSelectedItems);
      this.broadcastNewList(productMap);
      this.broadcastTotalPrice(productMap);
    }
  }

  getSelectedItems(): Observable<Map<string, Product>> {
    return this.items.asObservable();
  }

  getTotal(): Observable<number> {
    return this.total.asObservable();
  }

  addToCart(product: Product): void {
    // Loop through the input list and group items by name
    if (this.selectedItems.has(product.name)) {
      // If an item with the same name is already in the map, update its quantity and total
      const existingItem = this.selectedItems.get(product.name)!;
      existingItem.quantity += 1;
      existingItem.total += product.price;
    } else {
      // If it's the first occurrence of the item, add it to the map
      this.selectedItems.set(product.name, {...product, quantity: 1, total: product.price});
    }

    this.broadcastNewList(this.selectedItems);
    this.broadcastTotalPrice(this.selectedItems);
  }


  broadcastNewList(selectedItems: Map<string, Product>) {
    // Convert the Map to an array of key-value pairs (arrays)
    const serializedProductMap = Array.from(selectedItems.entries());
    // Convert the drinksMenuList to a JSON string
    const selectedItemsJSON = JSON.stringify(serializedProductMap);
    localStorage.setItem('selectedItems', selectedItemsJSON);
    this.items.next(selectedItems);
  }

  broadcastTotalPrice(selectedItems: Map<string, Product>) {
    const totalPrice = Array.from(selectedItems.entries()).map((item) => item[1]).reduce(
      (acc, item) => acc + item.total, 0);
    this.total.next(totalPrice);
  }

}
