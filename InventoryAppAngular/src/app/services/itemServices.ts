import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Item } from "../models/item";


@Injectable()
export class ItemServices {

  constructor(private httpClient: HttpClient,
  ) { }

  getItems(): Observable<Item[]> {
    const url = `http://localhost:4200`;
    return this.httpClient.get(url) as Observable<Item[]>;
  }

  getItemByInventoryNumber(inventoryNumber: string): Observable<Item> {
    const url = `http://localhost:4200/${inventoryNumber}`;
    return this.httpClient.get(url) as Observable<Item>;
  }


  getItemById(id: number): Observable<Item> {
    const url = `http://localhost:4200//id/${id}`;
    return this.httpClient.get(url) as Observable<Item>;
  }

  addItem(object: Item): Observable<Item> {
    const url = `http://localhost:4200`;
    return this.httpClient.post(url, object) as Observable<Item>;
  }

  editItem(object: Item): Observable<Item> {
    const url = `http://localhost:4200`;
    return this.httpClient.put(url, object) as Observable<Item>;
  }

  deleteItem(id: number): Observable<null> {
    const url = `http://localhost:4200/${id}`;
    return this.httpClient.delete(url) as unknown as Observable<null>;
  }
}
