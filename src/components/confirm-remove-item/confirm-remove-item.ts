import { Component } from '@angular/core';
import { NavParams, NavController, ToastController, ViewController } from 'ionic-angular';
import { RequisitionProvider } from '../../providers/requisition/requisition';
import { Observable } from 'rxjs/Observable';
import { ManagePage } from '../../pages/manage/manage';
/**
 * Generated class for the ConfirmRemoveItemComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'confirm-remove-item',
  templateUrl: 'confirm-remove-item.html'
})
export class ConfirmRemoveItemComponent {

  reqId: number;
  reqItemId: number;
  errorMessage: any;
  

  constructor(public navParams: NavParams, public navCtrl: NavController, public reqService: RequisitionProvider, public toastCtrl: ToastController, public viewCtrl: ViewController) {

    this.reqId = this.navParams.get('reqId');
    this.reqItemId = this.navParams.get('reqItemId');
    console.log(this.reqId);
    console.log(this.reqItemId);
    
    //this.itemReqId = this.req.id
    
 
  }
  confirm() { 
    let toast = this.toastCtrl.create({
      message: 'You have Deleted Req Item: ' + this.reqItemId + ' from Requisition ' + this.reqId,
      duration: 3000,
      position: 'top'
    });
    this.reqService.removeReqItem(this.reqId, this.reqItemId).subscribe(response => {
      console.log("Deleted Req Item: " + this.reqItemId + " from Requisition " + this.reqId);
      toast.present();
      console.log(response);
      
      this.viewCtrl.dismiss(response);
      return response;
      
    }, err => {
      this.errorMessage = err;
      console.error("Could not delete the req");
      return this.errorMessage;
    });
    
  }
  cancel() {
    this.navCtrl.pop();
  }

}