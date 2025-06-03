import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    const isAuth = localStorage.getItem('auth') === 'true';
    const role = localStorage.getItem('role');

    //console.log('AuthGuard check → isAuth:', isAuth, 'role:', role);

    if (isAuth && role === 'admin') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
