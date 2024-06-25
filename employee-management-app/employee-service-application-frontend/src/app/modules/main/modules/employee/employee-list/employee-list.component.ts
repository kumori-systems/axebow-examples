import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EmployeeService } from 'src/app/shared/http-services';
import { Employee } from 'src/app/shared/models';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { CustomSnackbarService } from 'src/app/shared/services/custom-snackbar.service';
import { ROUTER_DECLARATIONS } from 'src/app/shared/config/router-declarations';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeListComponent implements OnInit {
  // Table and paginator variables
  displayedColumns: string[] = ['name', 'lastname', 'department', 'registerDate', 'actions'];
  paginator = { length: 0, limit: 10, pageIndex: 0, skip: 0, pageSizeOptions: [5, 10, 25] };

  employees: Employee[] = [];

  // Headers & Filter
  headers: any;
  filter = `{}`;

  routerDeclarations = ROUTER_DECLARATIONS;

  constructor(
    private employeeService: EmployeeService,
    private matDialog: MatDialog,
    private customSnackbarService: CustomSnackbarService
  ) { }

  ngOnInit(): void {
    this.headers = { filter: `{"where": ${this.filter},"include": "department","skip":${this.paginator.skip},"limit":${this.paginator.limit}}` };

    this.getEmployees();
    this.countEmployees();
  }



  getEmployees() {
    this.headers = { filter: `{"where": ${this.filter},"include": "department","skip":${this.paginator.skip},"limit":${this.paginator.limit}}` };
    this.employeeService
      .find(this.headers)
      .subscribe((response: Employee[]) => {
        this.employees = response;
      });
  }


  countEmployees() {
    this.employeeService
      .count({ where: this.filter })
      .subscribe((countEmployeesResult: any) => {
        this.paginator.length = countEmployeesResult.count;
      });

  }

  paginate(event) {
    this.paginator.limit = event.pageSize;
    this.paginator.skip = event.pageSize * event.pageIndex;
    this.paginator.pageIndex = event.pageIndex;
    this.getEmployees();
  }

  resetPaginate() {
    this.paginator.skip = 0;
    this.paginator.pageIndex = 0;
    this.getEmployees();
  }


  filterFormChanges(value) {
    this.filter = `{`;

    if (value.name && value.name !== '' && value.name !== null) {
      this.filter = this.filter.concat(`"name": "${value.name}"`);
    }
    if (value.departmentId && value.departmentId !== '' && value.departmentId !== null) {
      if (value.name && value.name !== null) {
        this.filter = this.filter.concat(', ');
      }
      this.filter = this.filter.concat(`"departmentId": "${value.departmentId}"`);
    }
    if (value.registerDate && value.registerDate !== null) {
      if ((value.name && value.name !== null) || (value.departmentId && value.departmentId !== null)) {
        this.filter = this.filter.concat(', ');
      }
      this.filter = this.filter.concat(`"registerDate":{ "gt": "${value.registerDate}" }`);

    }
    this.filter = this.filter.concat('}');


    this.getEmployees();
    this.countEmployees();
    this.resetPaginate();
  }


  confirmDeleteEmployee(employee: Employee) {
    const dialogRef = this.matDialog.open(ConfirmationModalComponent, {
      data: {
        message: '¿Está seguro de que desea borrar el empleado?'
      }
    });
    dialogRef.afterClosed()
      .subscribe((response) => {
        if (response) {
          this.deleteEmployee(employee);
        }
      });
  }

  deleteEmployee(employee: Employee) {
    this.employeeService
      .deleteById(employee.id)
      .subscribe(
        (response) => {
          this.customSnackbarService.open('Empleado borrado con exito');
          this.getEmployees();
          this.countEmployees();
        },
        error => {
          this.customSnackbarService.open('Ha ocurrido un error al borrar el empleado');
        }
      );
  }



}
