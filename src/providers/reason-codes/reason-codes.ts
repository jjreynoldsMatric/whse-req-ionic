import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ReasonCodesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ReasonCodesProvider {
  reasonCodes: any;
  constructor(public http: HttpClient) {
    console.log('Hello ReasonCodesProvider Provider');
  }


  loadReasonCodes() {
    this.http.get('http://localhost:64778/api/requisition/reasoncodes').subscribe(response => {
      this.reasonCodes = response;
      console.log("Reason Codes: " + JSON.stringify(this.reasonCodes));
    })
  }

}
