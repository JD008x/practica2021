import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";


@Injectable()
export class UserServices {

  constructor(private httpClient: HttpClient,
  ) { }

  readonly baseUrl= "http://localhost:80/api/user";
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    })
  };

  getUsers(): Observable<User[]> {
    return this.httpClient.get<User[]>(this.baseUrl, this.httpOptions)
  }

  getUserByName(name: string): Observable<User> {
    return this.httpClient.get<User>(this.baseUrl + '/' + name, this.httpOptions)
  }

  addUser(object: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl, object, this.httpOptions)
  }

  editUser(object: User): Observable<User> {
    return this.httpClient.put<User>(this.baseUrl, object, this.httpOptions)
  }

  deleteUser(id: number){
    return this.httpClient.get<Location>(this.baseUrl + '/' + id , this.httpOptions)
  }
}
