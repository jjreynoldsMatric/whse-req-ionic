import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

import { Component, Input } from '@angular/core';
import { Requisition } from '../../models/requisition';
import { ItemLocViewModel } from '../../models/itemLocViewModel';
import { Item } from '../../models/item';
import { Employee } from '../../models/employee';
import { ReasonCode } from '../../models/reason-code';
import { IssuePartsComponent } from '../../components/issue-parts/issue-parts';
import { ItemLocationsProvider } from '../../providers/item-locations/item-locations';
import { CompletedRequisitionPage } from '../completed-requisition/completed-requisition';
import { NewRequisitionPage } from '../new-requisition/new-requisition';



/**
 * Generated class for the ManagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html',
})
export class ManagePage {

  @Input() requesition: Requisition;
 
  req: Requisition;
  employee: Employee;
  items: Item[];
  locations: ItemLocViewModel;
  today: number;
  reasonCode: ReasonCode;
  itemReqId: any;
  


  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, private itemLoc: ItemLocationsProvider) {
    this.req = this.navParams.data;
    //this.locations = this.navParams.data.requisitionItem.itemLocViewModel;
   
  }

  ionViewDidLoad() {
    this.loadLocationTables();
    //console.log(JSON.stringify(this.req)); 
  }
  loadLocationTables() {
    this.itemReqId = this.navParams.data.id;
    //this.itemLoc.loadLocations(this.itemReqId);
  }

  issueParts(item){
    
    let issuePartsModal = this.modalCtrl.create(IssuePartsComponent, item);
    //console.log("ITEMS: " + JSON.stringify(item));
    issuePartsModal.present();
  }
  //THIS MAY NEED CHANGED TO IMPROVE FLOW OF APP. THERE ARE 2 ANIMATIONS GOING ON WHICH MAY SEEM CLUNKY
  goToNewReq() {
    this.navCtrl.pop();
    this.navCtrl.push(NewRequisitionPage);
  }
  goToOpenReqs() {
    this.navCtrl.popToRoot();
  }
  goToCompletedReqs() {
    this.navCtrl.pop();
    this.navCtrl.push(CompletedRequisitionPage);
  }

}
