import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ItemLocationsProvider {

  locations: any;
  lots: any;
  shortageLocations

  constructor(public http: HttpClient) { }

  loadLocations(itemReqId) {
    this.http.get('http://localhost:50007/api/items/location?itemReqId='+itemReqId).subscribe(response => {
    this.locations = response;    
  })
  }
  loadLocationsWithLot(itemReqId) {
   return this.http.get('http://localhost:50007/api/items/ItemLot?itemReqId='+itemReqId);
  }

  loadShortageLocations(itemReqId) {
    return this.http.get('http://localhost:50007/api/items/shortagelocation?itemReqId='+itemReqId);
  }
}
