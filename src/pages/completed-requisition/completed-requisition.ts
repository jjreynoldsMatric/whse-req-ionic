import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RequisitionProvider } from '../../providers/requisition/requisition';
import { Requisition } from '../../models/requisition';
import { ManagePage } from '../manage/manage';

/**
 * Generated class for the CompletedRequisitionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-completed-requisition',
  templateUrl: 'completed-requisition.html',
})
export class CompletedRequisitionPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private reqService: RequisitionProvider) {
  }

  ionViewDidLoad() {
    this.reqService.loadRequisitions();
    console.log('ionViewDidLoad CompletedRequisitionPage');
  }

  goToOpenReqs(){
    this.navCtrl.popToRoot();
  }
  manage(req: Requisition){
    this.navCtrl.push(ManagePage, req);
  }

}
