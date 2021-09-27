import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Category } from "../models/category";


@Injectable()
export class CategoryService {

  public categoryList: Category[] = [];

  readonly baseUrl = "http://localhost:80/api/category";
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };
  constructor(private httpClient: HttpClient,
  ) { }

  getCategory(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(this.baseUrl, this.httpOptions)
  }

  addCategory(object: Category): Observable<Category> {
    return this.httpClient.post<Category>(this.baseUrl, object, this.httpOptions)
  }

  async getCategoryById(id: string) {
    return this.httpClient.get<Category>(this.baseUrl + `/id/${id}`, this.httpOptions).toPromise();
  }
   async getCategoryByName(name: string) {
   
    return await this.httpClient.get<Category>(this.baseUrl + `/name/` + name, this.httpOptions).toPromise();
  }

  editCategory(object: Category): Observable<Category> {
    return this.httpClient.put<Category>(this.baseUrl, object, this.httpOptions)
  }

  deleteCategory(id: number) {
    return this.httpClient.delete<Category>(this.baseUrl + '/' + id, this.httpOptions)
  }

}
