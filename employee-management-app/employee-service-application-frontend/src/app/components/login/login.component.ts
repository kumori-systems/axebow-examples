import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserService } from 'src/app/shared/http-services/user-service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { ROUTER_DECLARATIONS } from 'src/app/shared/config/router-declarations';
import { CustomSnackbarService } from 'src/app/shared/services/custom-snackbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private customSnackbarService: CustomSnackbarService,
    private userService: UserService) {

    this.loginForm = this.formBuilder.group({
      email: [{ value: null, disabled: false }],
      password: [{ value: null, disabled: false }]
    });

  }

  ngOnInit(): void {

  }

  sendLogin(credentials) {

    this.userService
      .login(credentials)
      .subscribe(
        (token) => {
          this.authService.setToken(token.id);
          this.customSnackbarService.open('¡Bienvenido a la gestión de empleados!');
          this.router.navigate([ROUTER_DECLARATIONS.employees]);
        });
  }

}
