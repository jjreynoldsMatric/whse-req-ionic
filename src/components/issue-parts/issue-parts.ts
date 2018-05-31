import { Component, Input } from '@angular/core';
import { Employee } from '../../models/employee';
import { NavController, NavParams } from 'ionic-angular';
import { EmployeeProvider } from '../../providers/employee/employee';
import { ItemLocationsProvider } from '../../providers/item-locations/item-locations';
import { RequisitionProvider } from '../../providers/requisition/requisition';

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
  reqItem: any;
  location:any;

  constructor(private navCtrl: NavController, private employeeService: EmployeeProvider, private navParams: NavParams, private locationsService: ItemLocationsProvider, private reqService: RequisitionProvider) {
    console.log('Hello IssuePartsComponent Component');
    this.quantity = 0;
    this.itemReqId = this.navParams.data.id;
  }
  ionViewDidLoad() {
    console.log("Item: " + JSON.stringify(this.locationsService.locations));
    this.locationsService.loadLocations(this.itemReqId);
    this.employeeService.loadEmployees();
  }
  cancel(){
    this.navCtrl.pop();
  }
  issueParts(issuePartsForm) {
    this.reqService.issueParts(this.itemReqId, issuePartsForm.employee, issuePartsForm.quantity, issuePartsForm.chosenLocation);
  }

}
