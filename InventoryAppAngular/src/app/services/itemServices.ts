import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Category } from "../models/category";
import { Item } from "../models/item";
import { Location } from "../models/location";
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
  async getItemsAsync(){

    return await this.httpClient.get<Item[]>(this.baseUrl, this.httpOptions).toPromise();
  }

  getItems(orderByProp: string = "", orderByDirection: string = ""): Observable<Item[]> {

    return this.httpClient.get<Item[]>(this.baseUrl, {
      ...this.httpOptions,
      params: {
        orderByProp,
        orderByDirection,
      }
    })
  }

  getItemByInventoryNumber(inventoryNumber: string): Observable<Item> {
    return this.httpClient.get<Item>(this.baseUrl + '/' + inventoryNumber, this.httpOptions)

  }

  async getItemByIdAsync(id: string) {
    return await this.httpClient.get<Item>(this.baseUrl + '/id/' + id, this.httpOptions).toPromise();
  }

  getItemById(id: string): Observable<Item> {
    return this.httpClient.get<Item>(this.baseUrl + '/id/' + id, this.httpOptions)
  }

  addItem(id: string, name: string, description: string , location: Location, category: Category, inventoryNumber: string,
    creationDate: Date, modifiedAt: Date) {
    let item  = {
      id: id,
      name: name,
      description: description,
      category: category,
      modifiedAt: modifiedAt,
      location: location,
      inventoryNumber: inventoryNumber,
      creationDate: creationDate,
    }
      return  this.httpClient.post(this.baseUrl, item, this.httpOptions).subscribe();

  }

    editItem(object: Item): Observable<Item> {
      return this.httpClient.put<Item>(this.baseUrl, object, this.httpOptions)
    }


  deleteItem(id: number) {
    return this.httpClient.delete<Item>(this.baseUrl + '/' + id, this.httpOptions)
  }
}

