import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable()
export class EmployeeProvider {
  employees: any;
  whseEmployees: any;

  constructor(public http: HttpClient) { }

  loadEmployees() {
    this.http.get('http://localhost:64778/api/requisition/employees').subscribe(response => {

      this.employees = response;
      console.log(this.employees)
    });
  }

  loadWhseEmployees() {
    this.http.get('http://localhost:64778/api/requisition/WhseEmployees').subscribe(response => {

      this.whseEmployees = response;

    });
  }
}
