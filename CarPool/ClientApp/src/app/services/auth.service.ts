import { Injectable, inject } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToasterService } from './toaster.service';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  jwtHelper: JwtHelperService = new JwtHelperService();
  constructor(private _toast : ToasterService) {
  }

  public isAuthenticated(): boolean {
    var token = localStorage.getItem("token");
    var isTokenExpired = this.jwtHelper.isTokenExpired(token);
    if(token == null)
      this._toast.show('Please login',{classname : "bg-danger text-light",delay : 2000});
    else if(isTokenExpired)
      this._toast.show('Session timeout please login again',{classname : "bg-danger text-light",delay:2000});

    return isTokenExpired;
  }
}
