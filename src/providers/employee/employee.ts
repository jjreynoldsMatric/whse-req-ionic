import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Employee } from '../../models/employee';
import { map } from 'rxjs/operators';

/*
  Generated class for the EmployeeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EmployeeProvider {
  employees: any;
  employee: any;
  i

  constructor(public http: HttpClient) {
  }

  loadEmployees() {
    this.http.get('http://localhost:64778/api/requisition/employees').subscribe(response =>{
      
    
      this.employees = response;
      //console.log(JSON.stringify(this.employees));
    });
  }

  mapEmployees(object) {
    object.
    object.forEach(element => {
       return element.empNum + ': ' + element.fname + ' ' + element.lname;
    });
   return object;
  }

}
