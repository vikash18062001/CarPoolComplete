import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private router: Router, private authService: AuthService) { }

  canActivate(): boolean {
    let isAuthenticated = this.authService.isAuthenticated();
    if (isAuthenticated)
      this.router.navigate(["login"])

    return !isAuthenticated;
  }
}
