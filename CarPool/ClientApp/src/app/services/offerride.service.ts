import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponse } from '../common/models/response';
import { Ride } from '../models/ride/ride';

@Injectable({
  providedIn: 'root'
})
export class OfferrideService {

  api: string = 'ride';
  constructor(private http: HttpClient) { }

  offerRide(offerRide: Ride): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.api}/offerride`, offerRide);
  }

  getOfferedRides(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.api}/offered`);
  }
}
