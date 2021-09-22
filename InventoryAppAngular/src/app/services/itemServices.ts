import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Item } from "../models/item";


@Injectable()
export class ItemServices {


  readonly baseUrl = "http://localhost:80/api/item";
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };


  constructor(private httpClient: HttpClient) { }

  getItems(): Observable<Item[]> {

    return this.httpClient.get<Item[]>(this.baseUrl, this.httpOptions)
  }

  getItemByInventoryNumber(inventoryNumber: string): Observable<Item> {
    return this.httpClient.get<Item>(this.baseUrl + '/' + inventoryNumber, this.httpOptions)

  }
  getItemById(id: number): Observable<Item> {
    return this.httpClient.get<Item>(this.baseUrl + '/id' + id, this.httpOptions)
  }

  addItem(object: Item): Observable<Item> {
    return this.httpClient.post<Item>(this.baseUrl, object, this.httpOptions)
  }

  editItem(object: Item): Observable<Item> {
    return this.httpClient.put<Item>(this.baseUrl, object, this.httpOptions)
  }

  deleteItem(id: number) {
    return this.httpClient.get<Item>(this.baseUrl + '/' + id, this.httpOptions)
  }
}
