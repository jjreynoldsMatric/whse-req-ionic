import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EmployeeProvider } from '../../providers/employee/employee';
import { ReasonCodesProvider } from '../../providers/reason-codes/reason-codes';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ItemFormControlComponent } from '../../components/item-form-control/item-form-control';
import { ItemFormArrayComponent } from '../../components/item-form-array/item-form-array';

/**
 * Generated class for the NewRequisitionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-requisition',
  templateUrl: 'new-requisition.html',
})
export class NewRequisitionPage {
  
  items: any[] = [];
  matricPN: any;
  quantity: any;
  lotNum: any;
  reasonCode: any;
  operation: any;

  newReqForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private employeeService: EmployeeProvider, private reasonCodesService: ReasonCodesProvider, private fb: FormBuilder) {
    this.newReqForm = this.fb.group({
      items: ItemFormArrayComponent.buildItems()
    })
  }

  ionViewDidLoad() {
    this.employeeService.loadEmployees();
    this.reasonCodesService.loadReasonCodes();
    

    //console.log(JSON.stringify(this.employeeService.employees));
  }

  addItem(item) {
    this.items.push({
      listItem: {matricPN: this.matricPN, quantityRequested: this.quantity, lotNum: this.lotNum, reasonCode: this.reasonCode, operation: this.operation}
    });
  }

}
