import { Component, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DepartmentService } from 'src/app/shared/http-services/department-service';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-employee-filters',
  templateUrl: './employee-filters.component.html',
  styleUrls: ['./employee-filters.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EmployeeFiltersComponent implements OnInit {
  filterForm: FormGroup;
  departments = [];

  @Output() filterChanges = new EventEmitter<any>();

  constructor(
    private formBuilder: FormBuilder,
    private departmentService: DepartmentService) {
      this.buildFilterForm();
    }

  ngOnInit(): void {

    this.getDepartments();

    this.filterForm.valueChanges
    .pipe(distinctUntilChanged())
    .pipe(debounceTime(500))
    .subscribe(value => {
      this.filterChanges.next(value);
    });
  }

  buildFilterForm() {
    this.filterForm = this.formBuilder.group({
      name: [{value: null, disabled: false}],
      departmentId: [{value: null, disabled: false}],
      registerDate: [{value: null, disabled: false}],

    });
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

}
