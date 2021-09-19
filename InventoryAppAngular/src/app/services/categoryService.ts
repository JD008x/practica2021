import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../models/category";

let category: Category[] = [{
  "id": 1,
  "name": "Alabama"
}, {
  "id": 2,
  "name": "Alaska"
}, {
  "id": 3,
  "name": "Arizona"
}, {
  "id": 4,
  "name": "Arkansas"
}, {
  "id": 5,
  "name": "California",

}];

@Injectable()
export class CategoryService {

  public categoryList!: Category[];

  getCategorys() {
    return category;
  };
  constructor(
  ) { }

  getItemById(Id: number) {

    return this.categoryList.filter((x) => x.id == Id)[0];

  }

  getLastId(): number {
    return Math.max.apply(Math, this.categoryList.map(function (o) {
      return o.id;
    }));
  }

  addItem(category: Category) {
    this.categoryList.push(category);
  }
  // constructor(private httpClient: HttpClient,
  // ) { }

  // getCategory(): Observable<Category[]> {
  //   const url = `http://localhost:4200`;
  //   return this.httpClient.get(url) as Observable<Category[]>;
  // }

  // addCategory(object: Category): Observable<Category> {
  //   const url = `http://localhost:4200`;
  //   return this.httpClient.post(url, object) as Observable<Category>;
  // }

  // editCategory(object: Category): Observable<Category> {
  //   const url = `http://localhost:4200`;
  //   return this.httpClient.put(url, object) as Observable<Category>;
  // }

  // deleteCategory(id: number): Observable<null> {
  //   const url = `http://localhost:4200/${id}`;
  //   return this.httpClient.delete(url) as unknown as Observable<null>;
  // }
}
