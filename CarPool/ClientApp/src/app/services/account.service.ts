import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { LoginRequest } from '../models/security/loginrequest';
import { ServerResponse } from '../common/models/response';
import { SignUpRequest } from '../models/security/signuprequest';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  login(loginRequest: LoginRequest,): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`api/auth/`, loginRequest);
  }
  
  signUpUser(signUpRequest: SignUpRequest): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(`user/signup`, signUpRequest);
  }

  getUserByEmail(email: string): Observable<ServerResponse> {
    return this.http.get<ServerResponse>(`user/${email}`);
  }
}
