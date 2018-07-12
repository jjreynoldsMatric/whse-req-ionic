import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
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
    return this.http.get('http://localhost:50007/api/requisitions');
  }

  saveRequisition(requisition) {
    return this.http.post('http://localhost:50007/api/requisitions/save', requisition);
  }

  createShortage(partRequest: PartRequest) {
    return this.http.post('http://localhost:50007/api/requisitions/shortage', partRequest);
  }

  issueParts(partRequest: PartRequest) {
    return this.http.post('http://localhost:50007/api/requisitions/issue', partRequest);
  }

  deleteReq(itemReqId) {
    let params = new HttpParams().set("itemReqId", itemReqId);
    console.log("PARAMs: " + params)
    return this.http.delete(`http://localhost:50007/api/requisitions/Delete/`, {params: params});
   
  }
  getRequisition(itemReqId) : Observable<any> {
    //let params = new HttpParams().set("itemReqId", itemReqId);
    return this.http.get('http://localhost:50007/api/requisitions/'+ itemReqId);
    
  }
  updateRequisition(requisition) {
    let headers : HttpHeaders= new HttpHeaders();
      //headers.append('Content-Type','application/json');
     
      headers.append('Access-Control-Allow-Methods','GET,POST,DELETE,PATCH');
      headers.append('Access-Control-Allow-Headers','Content-Type');
      let options =({ headers: headers });
    return this.http.put('http://localhost:50007/api/requisitions/Update', requisition, options);
  }

  removeReqItem(reqId, reqItemId) {
    let params = new HttpParams().set("reqId", reqId)
                                 .set("reqItemId", reqItemId);
    return this.http.delete('http://localhost:50007/api/requisitions/removeReqItem', {params: params} );
  }

}
