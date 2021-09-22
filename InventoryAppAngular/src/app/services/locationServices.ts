import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Location } from "../models/location";



@Injectable()
export class LocationServices {

  constructor(private httpClient: HttpClient,
  ) { }

  public locationList: Location[] = [];

  readonly baseUrl = "http://localhost:80/api/location";
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    })
  };

  getLocations(): Observable<Location[]> {
    return this.httpClient.get<Location[]>(this.baseUrl, this.httpOptions)
  }

  getLocationById(id: number): Observable<Location> {
    return this.httpClient.get<Location>(this.baseUrl + '/id/' + id, this.httpOptions)
  }

  addLocation(object: Location): Observable<Location> {
    return this.httpClient.post<Location>(this.baseUrl, object, this.httpOptions)
  }

  editLocation(object: Location): Observable<Location> {
    return this.httpClient.put<Location>(this.baseUrl, object, this.httpOptions)
  }

  deleteLocation(id: number) {
    return this.httpClient.delete<Location>(this.baseUrl + '/' + id, this.httpOptions)

  }
}
