import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ReasonCodesProvider {
  reasonCodes: any;
  constructor(public http: HttpClient) { }

  loadReasonCodes() {
    this.http.get('http://localhost:50007/api/requisitions/reasoncodes').subscribe(response => {
      this.reasonCodes = response;
      console.log(this.reasonCodes);
      
    })
  }

}
