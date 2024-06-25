import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeFiltersComponent } from './employee-filters.component';

describe('EmployeeFiltersComponent', () => {
  let component: EmployeeFiltersComponent;
  let fixture: ComponentFixture<EmployeeFiltersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeFiltersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
