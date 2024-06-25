import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';


const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'prefix'},
      {path: 'list', component: EmployeeListComponent},
      {path: 'new', component: EmployeeDetailComponent},
      {path: 'edit/:id', component: EmployeeDetailComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }
