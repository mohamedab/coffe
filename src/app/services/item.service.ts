import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Item} from "../models/item";

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly itemsUrl = 'assets/data/items.json';

  constructor(private http: HttpClient) {
  }

  getItems(): Observable<Item[]> {
    return this.http.get<Item[]>(this.itemsUrl);
  }
}
