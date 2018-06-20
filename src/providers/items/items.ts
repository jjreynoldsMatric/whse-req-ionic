import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ItemsProvider {

  constructor(public http: HttpClient) { }

  getItemDescription(item) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get(`http://localhost:64778/api/requisition/itemdesc?item=${item}`, { headers: headers });
  }

}
