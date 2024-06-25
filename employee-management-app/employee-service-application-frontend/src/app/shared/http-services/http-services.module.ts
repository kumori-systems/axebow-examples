import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { EmployeeService } from './employee-service';
import { DepartmentService } from './department-service';
import { UserService } from './user-service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    EmployeeService,
    DepartmentService,
    UserService
  ]
})
export class HttpServicesModule { }
