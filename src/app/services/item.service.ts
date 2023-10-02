import {Injectable} from '@angular/core';
import {Observable, from} from "rxjs";
import {Item} from "../models/item";
import {addDoc, collection, collectionData, doc, docData, Firestore, getDocs, query} from "@angular/fire/firestore";
import {catchError, map} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly itemsUrl = 'assets/data/items.json';

  constructor(private http: HttpClient,
              private firestore: Firestore) {
  }

  getItemsFormJson(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl);
  }

  addItems(items: Item[]): void {
    items.forEach((item) => {
      this.addItem(item);
    });
  }


  addItem(item: Item): void {
    item.itemId = doc(collection(this.firestore, 'itemId')).id;
    addDoc(collection(this.firestore, 'Items'), item).then(
      () => console.log('Successfuly added')
    ).catch(err => console.log(err));
  }

  getAllItem(): Observable<Item[]> {
    return collectionData(collection(this.firestore, 'Items'), {idField: 'itemId'}) as Observable<Item[]>;
  }

  getItems(): Observable<Item[]> {
    // Use the 'from' operator to convert the Promise into an Observable
    return from(getDocs(collection(this.firestore, 'Items'))).pipe(
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
