import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ItemsProvider {

  constructor(public http: HttpClient) { }

  getItemDescription(item) {
    let headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    return this.http.get(`/api/items/${item}`, { headers: headers });
  }

}
