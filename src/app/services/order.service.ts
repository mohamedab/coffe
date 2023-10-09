import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Item} from "../models/item";
import {Order} from "../models/order";
import {addDoc, collection, doc, Firestore, setDoc} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private order: Order = new Order();
  private orderSubject = new BehaviorSubject<Order>(this.order);
  orderCollection: any;

  constructor(private firestore: Firestore) {
    this.orderCollection = collection(this.firestore, 'Orders');
    // Load the order from local storage when the service initializes
    this.loadOrderFromLocalStorage();
  }

  saveOrderToLocalStorage(order?: Order): void {
    if (order) {
      this.order = order;
    }
    localStorage.setItem('order', JSON.stringify(this.order));
  }

  clearOrderToLocalStorage(): void {
    localStorage.removeItem('order');
    this.order = new Order();
    this.saveOrderToLocalStorage();
    // Emit the updated order through the orderSubject
    this.orderSubject.next(this.order);
  }

  private loadOrderFromLocalStorage(): void {
    const storedOrder = localStorage.getItem('order');
    if (storedOrder) {
      this.order = JSON.parse(storedOrder);
      // Emit the updated order through the orderSubject
      this.orderSubject.next(this.order);
    }
  }

  updateOrderQuantity(item: Item, quantity: number): void {
    const existingItem = this.order.items.find((orderItem) => orderItem.itemId === item.itemId);
    if (existingItem) {
      // If the item already exists in the order, update the quantity
      existingItem.quantity = quantity;
      // Recalculate the total amount
      this.calculateTotalAmount();

      // Save the updated order in local storage
      this.saveOrderToLocalStorage();

      // Emit the updated order through the orderSubject
      this.orderSubject.next(this.order);
    }
  }

  addToOrder(item: Item, quantity: number): void {
    const existingItem = this.order.items.find((orderItem) => orderItem.itemId === item.itemId);

    if (existingItem) {
      // If the item already exists in the order, update the quantity
      existingItem.quantity += quantity;
    } else {
      // If it's a new item, add it to the order
      const newItem: Item = {...item, quantity};
      this.order.items.push(newItem);
    }

    // Recalculate the total amount
    this.calculateTotalAmount();

    // Save the updated order in local storage
    this.saveOrderToLocalStorage();

    // Emit the updated order through the orderSubject
    this.orderSubject.next(this.order);
  }

  removeFromOrder(item: Item): void {
    const itemIndex = this.order.items.findIndex((orderItem) => orderItem.itemId === item.itemId);

    if (itemIndex !== -1) {
      this.order.items.splice(itemIndex, 1);
      // Recalculate the total amount
      this.calculateTotalAmount();

      // Save the updated order in local storage
      this.saveOrderToLocalStorage();

      // Emit the updated order through the orderSubject
      this.orderSubject.next(this.order);
    }
  }

  getOrder(): Observable<Order> {
    return this.orderSubject.asObservable();
  }

  updateOrder(order: Order) {
    const orderDocRef = doc(this.firestore, order.orderId);
    return setDoc(orderDocRef, order).then(
      () => {
        console.log('Order Successfully updated');
        // Save the updated order in local storage
        this.saveOrderToLocalStorage();
      }
    ).catch(err => console.log(err));
  }

  addOrder(order: Order): Promise<any> {
    order.orderId = doc(collection(this.firestore, 'orderId')).id;
    return addDoc(this.orderCollection, Object.assign({}, order));
  }


  private calculateTotalAmount(): void {
    const totalAmount = this.order.items.reduce((total, item) => total + item.price * item.quantity, 0);
    const roundedNumberString = totalAmount.toFixed(2); // "29.48" as a string
    this.order.totalAmount = parseFloat(roundedNumberString);
  }

}
