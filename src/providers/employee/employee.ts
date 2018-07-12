import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class EmployeeProvider {
  employees: any;
  whseEmployees: any;

  constructor(public http: HttpClient) { }

  loadEmployees() {
    this.http.get('http://localhost:50007/api/employees').subscribe(response => {

      this.employees = response;
      //console.log(this.employees)
    });
  }

  loadWhseEmployees() {
    this.http.get('http://localhost:50007/api/employees/warehouse').subscribe(response => {

      this.whseEmployees = response;

    });
  }
}
