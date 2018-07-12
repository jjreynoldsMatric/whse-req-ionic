import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Component } from '@angular/core';

import { ngxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';
import { Requisition } from '../../models/requisition';

import { ManagePage } from '../manage/manage';
import { CompletedRequisitionPage } from '../completed-requisition/completed-requisition';
import { NewRequisitionPage } from '../new-requisition/new-requisition';

import { RequisitionProvider } from '../../providers/requisition/requisition';

@IonicPage()
@Component({
  selector: 'page-open-requisition',
  templateUrl: 'open-requisition.html'
})
export class OpenRequisitionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private reqService: RequisitionProvider) { }
  requisitions: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private reqService: RequisitionProvider,private _ngxZendeskWebwidgetService: ngxZendeskWebwidgetService) { 
  _ngxZendeskWebwidgetService.show();
  }

  openFeedback(){
    this._ngxZendeskWebwidgetService.activate();
  }
  ionViewDidLoad() {
    this.reqService.loadRequisitions();
    this.reqService.loadRequisitions().subscribe(response => {
      this.requisitions = response;
    });
    console.log("Loading Reqs") 
  }

  ionViewWillEnter() {
    console.log("PAGE IS ENTERING");
    this.reqService.loadRequisitions();
    this.reqService.loadRequisitions().subscribe(response => {
      this.requisitions = response;
      console.log(this.requisitions);
    });
  }

  manage(req: Requisition) {
    this.navCtrl.push(ManagePage, req.id);
  }

  goToCompletedReqs() {
    this.navCtrl.push(CompletedRequisitionPage);
  }

  newReq() {
    this.navCtrl.push(NewRequisitionPage);
  }


}
