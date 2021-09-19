import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../models/category";


@Injectable()
export class CategoryService {

  constructor(private httpClient: HttpClient,
  ) { }

  getCategory(): Observable<Category[]> {
    const url = `http://localhost:4200`;
    return this.httpClient.get(url) as Observable<Category[]>;
  }

  getCategoryByName(name: string): Observable<Category> {
    const url = `http://localhost:4200/${name}`;
    return this.httpClient.get(url) as Observable<Category>;
  }

  addCategory(object: Category): Observable<Category> {
    const url = `http://localhost:4200`;
    return this.httpClient.post(url, object) as Observable<Category>;
  }

  editCategory(object: Category): Observable<Category> {
    const url = `http://localhost:4200`;
    return this.httpClient.put(url, object) as Observable<Category>;
  }

  deleteCategory(id: number): Observable<null> {
    const url = `http://localhost:4200/${id}`;
    return this.httpClient.delete(url) as unknown as Observable<null>;
  }
}
