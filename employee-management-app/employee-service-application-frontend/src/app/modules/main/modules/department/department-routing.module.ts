import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DepartmentListComponent } from './department-list/department-list.component';
import { DepartmentDetailComponent } from './department-detail/department-detail.component';
import { DepartmentComponent } from './department.component';


const routes: Routes = [
  {
    path: '',
    component: DepartmentComponent,
    children: [
      {path: '', redirectTo: 'list', pathMatch: 'prefix'},
      {path: 'list', component: DepartmentListComponent},
      {path: 'new', component: DepartmentDetailComponent},
      {path: 'edit/:id', component: DepartmentDetailComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DepartmentRoutingModule { }
