import { Component } from '@angular/core';
import { NavParams, NavController } from 'ionic-angular';
import { RequisitionProvider } from '../../providers/requisition/requisition';
import { Requisition } from '../../models/models';

/**
 * Generated class for the ConfirmComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'confirm',
  templateUrl: 'confirm.html'
})
export class ConfirmComponent {
  req: Requisition;
  itemReqId: any;
  errorMessage: any;

  constructor(public navParams: NavParams, public navCtrl: NavController, public reqService: RequisitionProvider) {

    this.itemReqId = this.navParams.get('itemReqId');
    console.log(this.itemReqId);
    //this.itemReqId = this.req.id
    console.log(this.req);
 
  }
  confirm() { 
    this.reqService.deleteReq(this.itemReqId).subscribe(response => {
      console.log("Deleted Req: " + this.itemReqId);
      this.navCtrl.pop();
    }, err => {
      this.errorMessage = err;
      console.error("Could not delete the req");
    });
    
  }
  cancel() {
    this.navCtrl.pop();
  }

}
