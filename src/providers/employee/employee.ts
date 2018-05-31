import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee';

/*
  Generated class for the EmployeeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EmployeeProvider {
  employees: any;

  constructor(public http: HttpClient) {
    console.log('Hello EmployeeProvider Provider');
  }

  loadEmployees() {
    this.http.get('http://localhost:64778/api/requisition/employees').subscribe(response => {
      this.employees = response;
      //console.log("RESPONSE: " + JSON.stringify(this.employees));
    })
   
  }

}
