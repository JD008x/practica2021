import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Email } from "../models/email";

@Injectable()
export class EmailService {

  readonly baseUrl = "http://localhost:80/api/email";
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  constructor(private httpClient: HttpClient) { }

  sendEmail(object: Email) {
    return this.httpClient.post<Email>(this.baseUrl, object, this.httpOptions).subscribe();
  }

 
}
