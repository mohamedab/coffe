import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Item} from "../models/item";
import {Order} from "../models/order";
import {addDoc, collection, doc, Firestore, setDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart: Order = new Order();
  private cartSubject = new BehaviorSubject<Order>(this.cart);
  cartCollection: any;

  constructor(private firestore: Firestore) {
    this.cartCollection = collection(this.firestore, 'Orders');
    // Load the cart from local storage when the service initializes
    this.loadCartFromLocalStorage();
  }

  private saveCartToLocalStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private loadCartFromLocalStorage(): void {
    const storedCart = localStorage.getItem('cart');
    if (storedCart) {
      this.cart = JSON.parse(storedCart);
      // Emit the updated cart through the cartSubject
      this.cartSubject.next(this.cart);
    }
  }

  updateCart(item: Item, quantity: number): void {
    const existingCartItem = this.cart.items.find((cartItem) => cartItem.itemId === item.itemId);
    if (existingCartItem) {
      // If the item already exists in the cart, update the quantity
      existingCartItem.quantity = quantity;
      // Recalculate the total amount
      this.calculateTotalAmount();

      // Save the updated cart in local storage
      this.saveCartToLocalStorage();

      // Emit the updated cart through the cartSubject
      console.log(this.cart);
      this.cartSubject.next(this.cart);
    }

  }

  addToCart(item: Item, quantity: number): void {
    const existingCartItem = this.cart.items.find((cartItem) => cartItem.itemId === item.itemId);

    if (existingCartItem) {
      // If the item already exists in the cart, update the quantity
      existingCartItem.quantity += quantity;
    } else {
      // If it's a new item, add it to the cart
      const newItem: Item = {...item, quantity};
      this.cart.items.push(newItem);
    }

    // Recalculate the total amount
    this.calculateTotalAmount();

    // Save the updated cart in local storage
    this.saveCartToLocalStorage();

    // Emit the updated cart through the cartSubject
    console.log(this.cart);
    this.cartSubject.next(this.cart);
  }

  removeFromCart(item: Item): void {
    const itemIndex = this.cart.items.findIndex((cartItem) => cartItem.itemId === item.itemId);

    if (itemIndex !== -1) {
      this.cart.items.splice(itemIndex, 1);
      // Recalculate the total amount
      this.calculateTotalAmount();

      // Save the updated cart in local storage
      this.saveCartToLocalStorage();

      // Emit the updated cart through the cartSubject
      this.cartSubject.next(this.cart);
    }
  }

  getCart(): Observable<Order> {
    return this.cartSubject.asObservable();
  }

  updateOrder(order: Order) {
    const orderDocRef = doc(this.firestore, `Orders/${order.orderId}`);
    return setDoc(orderDocRef, order);
  }

  addOrder(order: Order): void {
    addDoc(this.cartCollection, order);
  }


  private calculateTotalAmount(): void {
    this.cart.totalAmount = this.cart.items.reduce((total, item) => total + item.price * item.quantity, 0);
  }

}
