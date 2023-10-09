import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Item} from "../models/item";
import {Order} from "../models/order";
import {addDoc, collection, doc, Firestore, setDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Order[] = [];
  private cartSubject = new BehaviorSubject<Order[]>(this.cart);

  constructor() {
    // Load the order from local storage when the service initializes
    this.loadCartFromLocalStorage();
  }

  saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearCartToLocalStorage(): void {
    localStorage.removeItem('cart');
    this.cart = [];
    this.saveCartToLocalStorage();
    // Emit the updated order through the orderSubject
    this.cartSubject.next(this.cart);
  }

  private loadCartFromLocalStorage(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      // Emit the updated cart through the orderSubject
      this.cartSubject.next(this.cart);
    }
  }

  addOrderToCart(order: Order): void {
    const existingOrder = this.cart.find((orderItem) => orderItem.orderId === order.orderId);

    if (!existingOrder) {
      // If it's a new order, add it to the order
      this.cart.push(order);
      // Save the updated order in local storage
      this.saveCartToLocalStorage();

      // Emit the updated order through the orderSubject
      this.cartSubject.next(this.cart);
    }
  }

  removeOrderFromCart(order: Order): void {
    const orderIndex = this.cart.findIndex((orderItem) => orderItem.orderId === order.orderId);

    if (orderIndex !== -1) {
      this.cart.splice(orderIndex, 1);

      // Save the updated order in local storage
      this.saveCartToLocalStorage();

      // Emit the updated order through the orderSubject
      this.cartSubject.next(this.cart);
    }
  }

  getCart(): Observable<Order[]> {
    return this.cartSubject.asObservable();
  }

}
