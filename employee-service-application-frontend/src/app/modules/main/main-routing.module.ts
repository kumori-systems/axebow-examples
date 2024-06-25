import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';


const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'employees'
      },
      {
        path: 'employees',
        loadChildren: () => import('./modules/employee/employee.module').then(m => m.EmployeeModule)
      },
      {
        path: 'departments',
        loadChildren: () => import('./modules/department/department.module').then(m => m.DepartmentModule)
      },
    ],
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
