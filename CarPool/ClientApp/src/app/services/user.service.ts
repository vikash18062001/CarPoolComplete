import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ServerResponse } from '../common/models/response';
import { User } from '../common/models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getUser(): Observable<ServerResponse> {
    return this.http.get<ServerResponse>("user/currentuser");
  }

  uploadImage(user: User): Observable<ServerResponse> {
    return this.http.post<ServerResponse>("user/update", user);
  }

}
