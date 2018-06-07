import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component, Input } from '@angular/core';
import { Requisition } from '../../models/requisition';
import { Employee } from '../../models/employee';
import { Item } from '../../models/item';
import { ItemLocViewModel } from '../../models/itemLocViewModel';
import { ReasonCode } from '../../models/reason-code'; 

import { ManagePage } from '../manage/manage';
import { CompletedRequisitionPage } from '../completed-requisition/completed-requisition';
import { NewRequisitionPage } from '../new-requisition/new-requisition';
import { RequisitionProvider } from '../../providers/requisition/requisition';
import { ReasonCodesProvider } from '../../providers/reason-codes/reason-codes';

/**
 * Generated class for the OpenRequisitionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-open-requisition',
  templateUrl: 'open-requisition.html',
})
export class OpenRequisitionPage {

  requisitions: Requisition[] = [];
  employee: Employee;
  items: Item[];
  locations: ItemLocViewModel;
  today: number; 
  reasonCode: ReasonCode;
  requisition: Requisition;


  constructor(public navCtrl: NavController, public navParams: NavParams, private reqService: RequisitionProvider, private reasonCodes: ReasonCodesProvider) {
    
   }
  ionViewDidLoad() {
    this.reqService.loadRequisitions();
    //this.reasonCodes.loadReasonCodes();
    
  }

  manage(req: Requisition){
    this.navCtrl.push(ManagePage, req);
    //console.log("MANAGE REQ: " + JSON.stringify(req)); 
  }

  goToCompletedReqs() {
    this.navCtrl.push(CompletedRequisitionPage);
  }
  newReq() {
    this.navCtrl.push(NewRequisitionPage);
  }


}
