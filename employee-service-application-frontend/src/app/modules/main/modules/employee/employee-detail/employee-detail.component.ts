import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService, DepartmentService } from 'src/app/shared/http-services';
import { Employee } from 'src/app/shared/models';
import { CustomSnackbarService } from 'src/app/shared/services/custom-snackbar.service';
import { ROUTER_DECLARATIONS } from 'src/app/shared/config/router-declarations';

@Component({
  selector: 'app-employee-detail',
  templateUrl: './employee-detail.component.html',
  styleUrls: ['./employee-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeDetailComponent implements OnInit {
  employeeForm: FormGroup;
  action;

  departments = [];
  employeeId: string;

  routerDeclarations = ROUTER_DECLARATIONS;

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private departmentService: DepartmentService,
    private customSnackbarService: CustomSnackbarService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.action = this.activatedRoute.snapshot.url[0].path;
    this.employeeId = this.activatedRoute.snapshot.params['id'];
    this.getDepartments();
    switch (this.action) {
      case 'new':
        //
        break;
      case 'edit':
        this.getEmployeeById(this.employeeId);
        break;
    }
  }


  buildForm() {
    this.employeeForm = this.formBuilder.group({
      name: [{ value: null, disabled: false }, [Validators.required]],
      lastname: [{ value: null, disabled: false }, [Validators.required]],
      birthdate: [{ value: null, disabled: false }, [Validators.required]],
      departmentId: [{ value: null, disabled: false }, [Validators.required]],
    });
  }

  getEmployeeById(id) {
    this.employeeService
      .findById(id)
      .subscribe(
        (response) => {
          this.employeeForm.patchValue(response);
        }
      );
  }

  getDepartments() {
    this.departmentService
      .find()
      .subscribe((departments) => {
        this.departments = departments;
      },
        error => {
          this.departments = [];
        });
  }




  saveEmployee(values) {
    switch (this.action) {
      case 'new':
        this.createEmployee(values);
        break;

      case 'edit':
        this.updateEmployee(this.employeeId, values)
        break;
    }
  }


  updateEmployee(id, values) {
    this.employeeService
    .patch(id, values)
    .subscribe(
      (response) => {
        this.customSnackbarService.open('Empleado actualizado con exito');
        this.router.navigate([ROUTER_DECLARATIONS.employees]);
      },error => {
        this.customSnackbarService.open('Ha ocurrido un error al actualizar el empleado');
      }
    );
  }

  createEmployee(values: any) {
    const employeeToCreate = Object.assign(values, { registerDate: new Date() });
    this.employeeService
      .create(employeeToCreate)
      .subscribe(
        (response) => {
          this.customSnackbarService.open('Empleado creado con exito');
          this.router.navigate([ROUTER_DECLARATIONS.employees]);
        },
        (error) => {
          this.customSnackbarService.open('Ha ocurrido un error al crear el empleado');
        });
  }




  //helper function to calculate age of employee
  ageFromDateOfBirthday(dateOfBirth: any): number {
    if (dateOfBirth && dateOfBirth !== null && dateOfBirth !== '') {
      const today = new Date();
      const birthDate = new Date(dateOfBirth);
      let age = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();

      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }

      return age;
    }
  }

}
