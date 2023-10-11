import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Item} from "../models/item";
import {Order} from "../models/order";
import {
  addDoc,
  collection,
  doc,
  Firestore, getDoc,
  getDocs,
  orderBy,
  query,
  setDoc, where
} from "@angular/fire/firestore";
import {catchError, map} from "rxjs/operators";
import {from} from "rxjs";
import {OrderStatus} from "../models/order-status";
import {UserProfile} from "../models/userProfile";

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

  getPendingOrders(): Observable<Order[]> {
    const q = query(this.orderCollection, where("status", "==", OrderStatus.Pending), orderBy("orderDate", "desc"));
    return from(getDocs(q)).pipe(
      map((querySnapshot) => {
        const orders: Order[] = [];
        querySnapshot.forEach((doc) => {
          // Assuming your Item class matches the Firestore data structure
          const order: Order = doc.data() as Order;
          orders.push(order);
        });
        return orders;
      }), catchError((error) => {
        console.error('Error fetching data: ', error);
        // You can throw an error here or return an empty array as needed
        throw error;
      })
    );
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
    const orderDocRef = doc(this.orderCollection, order.orderId);
    return setDoc(orderDocRef, order).then(
      () => {
        console.log('Order Successfully updated');
        // Save the updated order in local storage
        this.saveOrderToLocalStorage();
      }
    ).catch(err => console.log(err));
  }

  updateOrderStatusDoc(orderId: string, status: OrderStatus): Promise<any> {
    const orderDocRef = doc(this.orderCollection, orderId);
    return setDoc(orderDocRef, {status: status}, {merge: true})
  }

  updateOrderDoc(order: Order): Promise<any> {
    const orderDocRef = doc(this.orderCollection, order.orderId);
    return setDoc(orderDocRef, Object.assign({}, order))
  }

  addOrderDoc(order: Order): Promise<any> {
    order.orderId = doc(collection(this.firestore, 'orderId')).id;
    const orderRef = doc(this.orderCollection, order.orderId);
    return setDoc(orderRef, Object.assign({}, order));
  }

  getOrderDocById(orderId: string): Promise<any> {
    const orderDocRef = doc(this.orderCollection, orderId);
    return getDoc(orderDocRef);
  }

  private calculateTotalAmount(): void {
    const totalAmount = this.order.items.reduce((total, item) => total + item.price * item.quantity, 0);
    const roundedNumberString = totalAmount.toFixed(2); // "29.48" as a string
    this.order.totalAmount = parseFloat(roundedNumberString);
  }

}
