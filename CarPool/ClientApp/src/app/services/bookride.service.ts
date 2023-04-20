import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ServerResponse } from '../common/models/response';
import { Ride } from '../models/ride/ride';

@Injectable({
  providedIn: 'root'
})
export class BookrideService {

  api: string = 'ride';
  constructor(private http: HttpClient) { }

  getMatchesForRide(rideDetails: Ride): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.api}/matches`, rideDetails);
  }

  bookRide(rideDetail: Ride): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`${this.api}/book`, rideDetail);
  }

  getBookedRides(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`${this.api}/booked`);
  }
}
