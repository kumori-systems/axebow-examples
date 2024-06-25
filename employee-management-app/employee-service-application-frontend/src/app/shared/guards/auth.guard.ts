import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { ROUTER_DECLARATIONS } from '../config/router-declarations';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {

  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      return new Promise((resolve) => {
        if (this.authService.isAuthenticated()) {
          resolve(this.authService.isAuthenticated());
        } else {
          this.router.navigate(['/login']);
          resolve(false);
        }
      });
      // return this.authService.isAuthenticated();
    }


}
