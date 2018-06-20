import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { errorHandler } from '@angular/platform-browser/src/browser';
import { PartRequest } from '../../models/partRequest';

@Injectable()
export class RequisitionProvider {

  req: any;
  requisitions: Object;
  errorMessage: string;

  constructor(public http: HttpClient) { }

  loadRequisitions() {
    this.http.get('http://localhost:64778/api/requisition/all').subscribe(response => {
      this.requisitions = response;
      //console.log("Requisitions: " + JSON.stringify(this.requisitions));
    });
  }

  saveRequisition(requisition) {
    return this.http.post('http://localhost:64778/api/requisition/save', requisition);
  }

  createShortage(itemReqId, processedBy, quantity, loc, lot) {
    this.http.post('http://localhost:64778/api/requisition/shortage', {itemReqId: itemReqId, processedBy: processedBy, quantity: quantity, location: loc, lot: lot}).subscribe(response => {
    console.log("Created Shortage");
    });
  }

  issueParts(partRequest: PartRequest) {
    return this.http.post('http://localhost:64778/api/requisition/issue', partRequest);
  }

  deleteReq(itemReqId) {
    this.http.post('http://localhost:64778/api/requisition/DeleteReq', {itemReqId: itemReqId}).subscribe(response => {
      console.log("Deleted Req " + itemReqId);
    })
  }
  getRequisition(itemReqId) : Observable<any> {
    let params = new HttpParams().set("itemReqId", itemReqId);
    return this.http.get('http://localhost:64778/api/requisition/GetReq',{params: params});
    
  }
 

}
