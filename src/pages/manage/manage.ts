import { IonicPage, NavController, NavParams, ModalController, ToastController } from 'ionic-angular';
import { Component, Input } from '@angular/core';

import { Requisition } from '../../models/models';
import { ItemLocViewModel } from '../../models/itemLocViewModel';
import { Item } from '../../models/item';
import { Employee } from '../../models/employee';
import { ReasonCode } from '../../models/reason-code';

import { IssuePartsComponent } from '../../components/issue-parts/issue-parts';
import { CompletedRequisitionPage } from '../completed-requisition/completed-requisition';
import { NewRequisitionPage } from '../new-requisition/new-requisition';

import { RequisitionProvider } from '../../providers/requisition/requisition';
import { CreateShortageComponent } from '../../components/create-shortage/create-shortage';
import { EditPage } from '../edit/edit';
import { ConfirmComponent } from '../../components/confirm/confirm';
import { ngxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';

@IonicPage()
@Component({
  selector: 'page-manage',
  templateUrl: 'manage.html'
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

  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController, public reqService: RequisitionProvider, public toastCtrl: ToastController,private _ngxZendeskWebwidgetService: ngxZendeskWebwidgetService) {

    this.itemReqId = this.navParams.data;
    console.log(this.itemReqId);
    
    _ngxZendeskWebwidgetService.show();
  }
  
  openFeedback(){
    this._ngxZendeskWebwidgetService.activate();
  }
  /*
    ngOnInit() {
      
      this.reqService.getRequisition(this.itemReqId).subscribe(data => {
        this.req = data;
      });
    }*/


  ionViewDidLoad() {

    // console.log(JSON.stringify(this.req)); 
  }

  ionViewWillEnter() {
    console.log("PAGE IS ENTERING");
    this.reqService.getRequisition(this.itemReqId).subscribe(data => {
      this.req = data;
      console.log("***************************")
      console.log(this.req)
      console.log("***************************")
    });
  }

  issueParts(item) {

    let issuePartsModal = this.modalCtrl.create(IssuePartsComponent, item);

    issuePartsModal.present();
    this.reqService.loadRequisitions();
    issuePartsModal.onDidDismiss(data => {
      console.log(data);
      if (!Number.isNaN(data) && data !== null) {
        item.QuantityFilled += data;
      }

    });
  }

  createShortage(item) {

    let createShortageModal = this.modalCtrl.create(CreateShortageComponent, item);

    createShortageModal.present();
    this.reqService.loadRequisitions();
    createShortageModal.onDidDismiss(data => {
      console.log(data);
      if (!Number.isNaN(data) && data !== null) {
        item.quantityFilled += data;
      }

    });
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
  
  edit(req) {
    this.navCtrl.push(EditPage, this.req);
  }
  delete() {

    let confirmModal = this.modalCtrl.create(ConfirmComponent, {itemReqId: this.itemReqId} );
    let toast = this.toastCtrl.create({
      message: 'You have deleted requitsition number ' + this.itemReqId,
      duration: 3000,
      position: 'top'
    });
    confirmModal.present();
    confirmModal.onDidDismiss(data => {
      toast.present();
    });
  }

}
