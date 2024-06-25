import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { EmployeeFiltersComponent } from './components/employee-filters/employee-filters.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [EmployeeComponent, EmployeeListComponent, EmployeeDetailComponent, EmployeeFiltersComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    EmployeeRoutingModule
  ]
})
export class EmployeeModule { }
