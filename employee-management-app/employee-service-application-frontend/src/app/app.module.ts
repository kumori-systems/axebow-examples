import { BrowserModule } from '@angular/platform-browser';
import {APP_INITIALIZER, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { HttpServicesModule } from './shared/http-services/http-services.module';
import { AuthInterceptor } from './shared/interceptors/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { AuthService } from './shared/services/auth.service';
import { AuthGuard } from './shared/guards/auth.guard';
import { ConfigService } from './config.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    HttpServicesModule,
    AppRoutingModule,
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    AuthGuard,
    {
      provide: APP_INITIALIZER,
      useFactory: (configService: ConfigService) => async () => await configService.load(),
      deps: [ConfigService],
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
