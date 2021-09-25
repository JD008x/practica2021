import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Category } from "../models/category";
import { Item } from "../models/item";
import { CategoryService } from "./categoryService";


@Injectable()
export class ItemServices {

  public itemList: Item[] = [];

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

  getItemById(id: string): Observable<Item> {
    return this.httpClient.get<Item>(this.baseUrl + '/id/' + id, this.httpOptions)
  }

  // addItem(object: Item): Observable<Item> {
  //   return this.httpClient.post<Item>(this.baseUrl, {
  //     "id": "6139c71b0b74444448305984e0",
  //     "name": object.name,
  //     "description": object.description,
  //     "category": object.category,
  //     "modifiedAt": object.modifiedAt,
  //     "location": object.location,
  //     "inventoryNumber": object.inventoryNumber,
  //     "creationDate": object.creationDate
  //   }, this.httpOptions);
  // }
  addItem(id: string, name: string, description: string, user: string, location: string, category: Category, inventoryNumber: string,
    creationDate: Date, modifiedAt: Date, deletedAt: boolean) {
    let item = {
      id: id,
      name: name,
      description: description,
      category: category,
      modifiedAt: modifiedAt,
      location: null,
      inventoryNumber: inventoryNumber,
      creationDate: creationDate,

    }
    return this.httpClient.post(this.baseUrl, item, this.httpOptions).subscribe();
  }

  editItem(object: Item): Observable<Item> {
    return this.httpClient.put<Item>(this.baseUrl, object, this.httpOptions)
  }

  deleteItem(id: number) {
    return this.httpClient.delete<Item>(this.baseUrl + '/' + id, this.httpOptions)
  }
}
