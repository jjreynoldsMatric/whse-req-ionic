import { Component, Input } from '@angular/core';
import { Employee } from '../../models/employee';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { EmployeeProvider } from '../../providers/employee/employee';
import { ItemLocationsProvider } from '../../providers/item-locations/item-locations';
import { RequisitionProvider } from '../../providers/requisition/requisition';
import { FormsModule } from '@angular/forms';
import { RequisitionItem } from '../../models/requisitionItem';
import { DecimalPipe } from '@angular/common';
/**
 * Generated class for the IssuePartsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'issue-parts',
  templateUrl: 'issue-parts.html'
})
export class IssuePartsComponent {
  @Input() employees: Employee[];
  itemReqId: any;
  quantity: number;
  @Input() reqItem: RequisitionItem;
  chosenLocation:any;
  employee: any;
  loc: any;

  constructor(private navCtrl: NavController, private employeeService: EmployeeProvider, private navParams: NavParams, private locationsService: ItemLocationsProvider, private reqService: RequisitionProvider, private toastCtrl: ToastController) {
    //console.log('Hello IssuePartsComponent Component');
    this.quantity = 0;
    this.itemReqId = this.navParams.data.id;
    this.reqItem = this.navParams.data;
  }
  presentToast() {
    
  }
  

  ionViewDidLoad() {
    //console.log("Item: " + JSON.stringify(this.navParams.data)); 
    this.locationsService.loadLocations(this.itemReqId);
    this.employeeService.loadEmployees();
  }
  cancel(){
    this.navCtrl.pop();
  }
  issueParts(issuePartsForm) {
    //console.log("ISSUE PARTS FORM: " + this.itemReqId + ', ' + this.emp + ', ' + this.quantity + ', ' + JSON.stringify(this.loc));
    let toast = this.toastCtrl.create({
      message: 'You have issued ' + this.quantity + " of " + this.reqItem.item + ' from ' + this.loc,
      duration: 3000,
      position: 'top'
    });
    //console.log("issue parts params: \n ITEMREQID: "+ this.itemReqId + " EMPLOYEE: " + this.employee + " QUANTITY " + this.quantity + " LOCATION " + this.loc )
    var splitEmp = this.employee.split(':');
    var empNum = splitEmp[0];
    //console.log("EmpNum: " + empNum);
    this.reqService.issueParts(this.itemReqId, empNum,  this.quantity, this.loc);
    toast.present();
    this.navCtrl.pop();
  }

}
