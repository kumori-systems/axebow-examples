import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DepartmentService } from 'src/app/shared/http-services';
import { Department } from 'src/app/shared/models';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared/components/confirmation-modal/confirmation-modal.component';
import { CustomSnackbarService } from 'src/app/shared/services/custom-snackbar.service';
import { ROUTER_DECLARATIONS } from 'src/app/shared/config/router-declarations';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
// Table and paginator variables
displayedColumns: string[] = ['name','createdAt', 'actions'];
paginator = { length: 0, limit: 10, pageIndex: 0, skip: 0, pageSizeOptions: [5, 10, 25] };

departments: Department[] = [];

// Headers & Filter
headers: any;
filter = `{}`;

routerDeclarations = ROUTER_DECLARATIONS;

constructor(
  private departmentService: DepartmentService,
  private matDialog: MatDialog,
  private customSnackbarService: CustomSnackbarService
) { }

ngOnInit(): void {
  this.headers = { filter: `{"skip":${this.paginator.skip},"limit":${this.paginator.limit}}` };

  this.getDepartment();
  this.countDepartment();
}



getDepartment() {
  this.headers = { filter: `{"skip":${this.paginator.skip},"limit":${this.paginator.limit}}` };
  this.departmentService
    .find(this.headers)
    .subscribe((response: Department[]) => {
      this.departments = response;
    });
}


countDepartment() {
  this.departmentService
    .count({ where: this.filter })
    .subscribe((countDepartmentResult: any) => {
      this.paginator.length = countDepartmentResult.count;
    });

}

paginate(event) {
  this.paginator.limit = event.pageSize;
  this.paginator.skip = event.pageSize * event.pageIndex;
  this.paginator.pageIndex = event.pageIndex;
  this.getDepartment();
}

resetPaginate() {
  this.paginator.skip = 0;
  this.paginator.pageIndex = 0;
  this.getDepartment();
}



confirmDeleteDepartment(department: Department) {
  const dialogRef = this.matDialog.open(ConfirmationModalComponent, {
    data: {
      message: '¿Está seguro de que desea borrar el departamento?'
    }
  });
  dialogRef.afterClosed()
    .subscribe((response) => {
      if (response) {
        this.deleteDepartment(department);
      }
    });
}

deleteDepartment(department: Department) {
  this.departmentService
    .deleteById(department.id)
    .subscribe(
      (response) => {
        this.customSnackbarService.open('Departamento borrado con exito');
        this.getDepartment();
        this.countDepartment();
      },
      error => {
        this.customSnackbarService.open('Ha ocurrido un error al borrar el departamento');
      }
    );
}



}
