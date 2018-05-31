import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ItemLocViewModel } from '../../models/locations';

/*
  Generated class for the ItemLocationsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ItemLocationsProvider {

  locations: any;

  constructor(public http: HttpClient) {
    console.log('Hello ItemLocationsProvider Provider');
  }
  loadLocations(itemReqId) {
    this.http.get('http://localhost:64778/api/requisition/location?itemReqId='+itemReqId).subscribe(response => {
    this.locations = response;    
  })
  }
}
