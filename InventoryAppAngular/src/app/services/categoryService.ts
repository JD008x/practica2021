import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../models/category";


// let category: Category[] = [{
//   "id": 1,
//   "name": "Alabama"
// }, {
//   "id": 2,
//   "name": "Alaska"
// }, {
//   "id": 3,
//   "name": "Arizona"
// }, {
//   "id": 4,
//   "name": "Arkansas"
// }, {
//   "id": 5,
//   "name": "California",

// }];


@Injectable()
export class CategoryService {

  public categoryList!: Category[];

  // getCategorys() {
  //   return category;
  // };
  // constructor(
  // ) { }

  // getItemById(Id: number) {

  //   return this.categoryList.filter((x) => x.id == Id)[0];

  // }

  // getLastId(): number {
  //   return Math.max.apply(Math, this.categoryList.map(function (o) {
  //     return o.id;
  //   }));
  // }

  readonly baseUrl= "http://localhost:80/api/category";
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  addItem(category: Category) {
    this.categoryList.push(category);
  }
  constructor(private httpClient: HttpClient,
  ) { }

  getCategory(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl, this.httpOptions)
  }

  addCategory(object: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.baseUrl, object, this.httpOptions)
  }

  editCategory(object: Category): Observable<Category> {
    return this.httpClient.put<Category>(this.baseUrl, object, this.httpOptions)
  }

  deleteCategory(id: number) {
    return this.httpClient.get<Category>(this.baseUrl + '/' + id , this.httpOptions)
  }

}
