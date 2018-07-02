import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ItemLocationsProvider {

  locations: any;
  lots: any;
  shortageLocations

  constructor(public http: HttpClient) { }

  loadLocations(itemReqId) {
    this.http.get('http://localhost:64778/api/requisition/location?itemReqId='+itemReqId).subscribe(response => {
    this.locations = response;    
  })
  }
  loadLocationsWithLot(itemReqId) {
   this.http.get('http://localhost:64778/api/requisition/ItemLot?itemReqId='+itemReqId).subscribe((response) => {
     this.lots = response;
   })
  }

  loadShortageLocations(itemReqId) {
    return this.http.get('http://localhost:64778/api/requisition/shortagelocation?itemReqId='+itemReqId);
  }
}
