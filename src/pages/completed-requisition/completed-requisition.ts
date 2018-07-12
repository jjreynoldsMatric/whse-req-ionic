import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Requisition } from '../../models/requisition';

import { ManagePage } from '../manage/manage';
import { NewRequisitionPage } from '../new-requisition/new-requisition';

import { RequisitionProvider } from '../../providers/requisition/requisition';
import { ngxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';

@IonicPage()
@Component({
  selector: 'page-completed-requisition',
  templateUrl: 'completed-requisition.html',
})
export class CompletedRequisitionPage {
  requisitions: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, private reqService: RequisitionProvider,private _ngxZendeskWebwidgetService: ngxZendeskWebwidgetService) {
    _ngxZendeskWebwidgetService.show();
  }
  
  openFeedback(){
    this._ngxZendeskWebwidgetService.activate();
  }

  ionViewDidLoad() {
    this.reqService.loadRequisitions().subscribe(response => {
      this.requisitions = response;

    });
  }

  goToOpenReqs(){
    this.navCtrl.popToRoot();
  }
  manage(req: Requisition){
    this.navCtrl.push(ManagePage, req.id);
  }
  newReq() {
    this.navCtrl.push(NewRequisitionPage);
  }

}
