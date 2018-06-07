import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the RequisitionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class RequisitionProvider {

  requisitions: Object;

  constructor(public http: HttpClient) {
  }

  loadRequisitions() {
    this.http.get('http://localhost:64778/api/requisition/all').subscribe(response => {
      this.requisitions = response;
      //console.log("Requisitions: " + JSON.stringify(this.requisitions));
    });
  }

  saveRequisition(requisition) {
    this.http.post('http://localhost:64778/api/requisition/save', requisition).subscribe(response => {
      console.log("Should have posted the req");
    });
  }

  createShortage(itemReqId, processedBy, quantity) {
    this.http.post('http://localhost:64778/api/requisition/shortage', {itemReqId: itemReqId, processedBy: processedBy, quantity: quantity}).subscribe(response => {
    console.log("Created Shortage");
    });
  }

  issueParts(itemReqId, emp, quantity, loc) {
    this.http.post('http://localhost:64778/api/requisition/issue', {itemReqId: itemReqId, processedBy: emp, quantity: quantity, location: loc}).subscribe(response => {
      console.log("Issued Parts");
    });
  }

}
