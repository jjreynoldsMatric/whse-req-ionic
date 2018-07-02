import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
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

  createShortage(partRequest: PartRequest) {
    return this.http.post('http://localhost:64778/api/requisition/shortage', partRequest);
  }

  issueParts(partRequest: PartRequest) {
    return this.http.post('http://localhost:64778/api/requisition/issue', partRequest);
  }

  deleteReq(itemReqId) {
    let params = new HttpParams().set("itemReqId", itemReqId);
    console.log("PARAMs: " + params)
    return this.http.delete(`http://localhost:64778/api/requisition/DeleteReq/`, {params: params});
   
  }
  getRequisition(itemReqId) : Observable<any> {
    let params = new HttpParams().set("itemReqId", itemReqId);
    return this.http.get('http://localhost:64778/api/requisition/GetReq',{params: params});
    
  }
  updateRequisition(requisition) {
    return this.http.patch('http://localhost:64778/api/requisition/update', requisition);
  }

}
