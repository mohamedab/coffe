import {Injectable} from '@angular/core';
import {Observable, from} from "rxjs";
import {Item} from "../models/item";
import {addDoc, collection, collectionData, docData, Firestore, getDocs, query} from "@angular/fire/firestore";
import {catchError, map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  private itemCollection: any;

  constructor(private firestore: Firestore) {
    this.itemCollection = collection(this.firestore, 'Items');
  }



  addItems(items: Item[]): void {
    items.forEach((item) => {
      this.addItem(item);
    });
  }


  addItem(item: Item): void {
    addDoc(this.itemCollection, item);
  }

  getItems(): Observable<Item[]> {
    // Use the 'from' operator to convert the Promise into an Observable
    return from(getDocs(this.itemCollection)).pipe(
      map((querySnapshot) => {
        const items: Item[] = [];
        querySnapshot.forEach((doc) => {
          // Assuming your Item class matches the Firestore data structure
          const item: Item = doc.data() as Item;
          items.push(item);
        });
        return items;
      }), catchError((error) => {
        console.error('Error fetching data: ', error);
        // You can throw an error here or return an empty array as needed
        throw error;
      })
    );
  }
}
