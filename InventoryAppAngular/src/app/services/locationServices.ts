import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Location } from "shared";


@Injectable()
export class LocationServices {

  constructor(private httpClient: HttpClient,
  ) { }

  getLocations(): Observable<Location[]> {
    const url = `http://localhost:4200`;
    return this.httpClient.get(url) as Observable<Location[]>;
  }

  getLocationById(id: number): Observable<Location> {
    const url = `http://localhost:4200/id/${id}`;
    return this.httpClient.get(url) as Observable<Location>;
  }

  addLocation(object: Location): Observable<Location> {
    const url = `http://localhost:4200`;
    return this.httpClient.post(url, object) as Observable<Location>;
  }

  editLocation(object: Location): Observable<Location> {
    const url = `http://localhost:4200`;
    return this.httpClient.put(url, object) as Observable<Location>;
  }

  deleteLocation(id: number): Observable<null> {
    const url = `http://localhost:4200/${id}`;
    return this.httpClient.delete(url) as unknown as Observable<null>;
  }
}
