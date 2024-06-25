import { Injectable } from '@angular/core';
import { UserService } from '../http-services/user-service';
import { Router } from '@angular/router';
import { ROUTER_DECLARATIONS } from '../config/router-declarations';
import { CustomSnackbarService } from './custom-snackbar.service';



@Injectable({ providedIn: 'root' })
export class AuthService {
    constructor(
        private userService: UserService,
        private customSnackbarService: CustomSnackbarService,
        private router: Router) { }

    getToken() {
        return localStorage.getItem('token');
    }

    setToken(token) {
        localStorage.setItem('token', token);
    }

    removeToken() {
        localStorage.removeItem('token');
    }

    isAuthenticated() {
        if (localStorage.getItem('token') && localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) {
            return true;
        }
        return false;
    }

    logout() {
        this.userService.logout()
        .subscribe((response) => {
            this.removeToken();
            this.router.navigate([ROUTER_DECLARATIONS.login]);
            this.customSnackbarService.open('¡Se ha cerrado sesión correctamente!');
        },
        error => {
            this.removeToken();
            this.customSnackbarService.open('¡Se ha cerrado sesión correctamente!');
            this.router.navigate([ROUTER_DECLARATIONS.login]);
        });

    }

}
