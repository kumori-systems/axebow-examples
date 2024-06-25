import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ROUTER_DECLARATIONS } from 'src/app/shared/config/router-declarations';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { DepartmentService } from 'src/app/shared/http-services';
import { CustomSnackbarService } from 'src/app/shared/services/custom-snackbar.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-department-detail',
  templateUrl: './department-detail.component.html',
  styleUrls: ['./department-detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DepartmentDetailComponent implements OnInit {
  departmentForm: FormGroup;
  action;

  departments = [];
  departmentId: string;

  routerDeclarations = ROUTER_DECLARATIONS;

  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService,
    private customSnackbarService: CustomSnackbarService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.action = this.activatedRoute.snapshot.url[0].path;
    this.departmentId = this.activatedRoute.snapshot.params['id'];
    switch (this.action) {
      case 'new':
        //
        break;
      case 'edit':
        this.getDepartmentById(this.departmentId);
        break;
    }
  }


  buildForm() {
    this.departmentForm = this.formBuilder.group({
      name: [{ value: null, disabled: false }, [Validators.required]]
    });
  }

  getDepartmentById(id) {
    this.departmentService
      .findById(id)
      .subscribe(
        (response) => {
          this.departmentForm.patchValue(response);
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




  saveDepartment(values) {
    switch (this.action) {
      case 'new':
        this.createDepartment(values);
        break;

      case 'edit':
        this.updateDepartment(this.departmentId, values);
        break;
    }
  }


  updateDepartment(id, values) {
    this.departmentService
      .patch(id, values)
      .subscribe(
        (response) => {
          this.customSnackbarService.open('Departamento actualizado con exito');
          this.router.navigate([ROUTER_DECLARATIONS.departments]);
        }, error => {
          this.customSnackbarService.open('Ha ocurrido un error al actualizar el departamento');
        }
      );
  }

  createDepartment(values: any) {
    this.departmentService
      .create(values)
      .subscribe(
        (response) => {
          this.customSnackbarService.open('Departamento creado con exito');
          this.router.navigate([ROUTER_DECLARATIONS.departments]);
        },
        (error) => {
          this.customSnackbarService.open('Ha ocurrido un error al crear el departamento');
        });
  }




}
