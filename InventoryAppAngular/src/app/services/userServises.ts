import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { User } from "../models/user";


@Injectable()
export class LocationServices {

  constructor(private httpClient: HttpClient,
  ) { }

  getUsers(): Observable<User[]> {
    const url = `http://localhost:4200`;
    return this.httpClient.get(url) as Observable<User[]>;
  }

  getUserByName(name: string): Observable<User> {
    const url = `http://localhost:4200/${name}`;
    return this.httpClient.get(url) as Observable<User>;
  }

  addUser(object: User): Observable<User> {
    const url = `http://localhost:4200`;
    return this.httpClient.post(url, object) as Observable<User>;
  }

  editUser(object: User): Observable<User> {
    const url = `http://localhost:4200`;
    return this.httpClient.put(url, object) as Observable<User>;
  }

  deleteUser(id: number): Observable<null> {
    const url = `http://localhost:4200/${id}`;
    return this.httpClient.delete(url) as unknown as Observable<null>;
  }
}
