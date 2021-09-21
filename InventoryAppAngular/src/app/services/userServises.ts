import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";


@Injectable()
export class UserServices {

  constructor(private httpClient: HttpClient,
  ) { }
  baseUrl = `http://localhost:80/api/user`;
  getUsers(): Observable<User[]> {
    const url = this.baseUrl;
    return this.httpClient.get(url) as Observable<User[]>;
  }

  getUserByName(name: string): Observable<User> {
    const url = this.baseUrl + `/${name}`;
    return this.httpClient.get(url) as Observable<User>;
  }

  addUser(object: User): Observable<User> {
    const url = this.baseUrl;
    return this.httpClient.post(url, object) as Observable<User>;
  }

  editUser(object: User): Observable<User> {
    const url = this.baseUrl;
    return this.httpClient.put(url, object) as Observable<User>;
  }

  deleteUser(id: number): Observable<null> {
    const url = this.baseUrl + `/${id}`;
    return this.httpClient.delete(url) as unknown as Observable<null>;
  }
}
