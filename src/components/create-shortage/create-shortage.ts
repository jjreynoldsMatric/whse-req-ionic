import { Component, Input, OnInit } from '@angular/core';
import { NavParams, ToastController, ViewController } from 'ionic-angular';

import { RequisitionItem } from '../../models/requisitionItem';
import { Employee } from '../../models/employee';

import { EmployeeProvider } from '../../providers/employee/employee';
import { ItemLocationsProvider } from '../../providers/item-locations/item-locations';
import { RequisitionProvider } from '../../providers/requisition/requisition';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PartRequest } from '../../models/partRequest';

/**
 * Generated class for the CreateShortageComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'create-shortage',
  templateUrl: 'create-shortage.html'
})
export class CreateShortageComponent implements OnInit {
  @Input() employees: Employee[];
  @Input() reqItem: RequisitionItem;
 
  itemReqId: any;

  chosenLocation:any;
  employee: any;
  error: any;
  partRequest: PartRequest;
  issuePartsForm: FormGroup;
  shortageLocs: any;
  
  constructor(private employeeService: EmployeeProvider, private navParams: NavParams, private locationsService: ItemLocationsProvider, private reqService: RequisitionProvider, private toastCtrl: ToastController, public viewCtrl: ViewController,private fb: FormBuilder) {
    this.itemReqId = this.navParams.data.id;
    this.reqItem = this.navParams.data;
  }

  ngOnInit(): void {
    this.locationsService.loadShortageLocations(this.itemReqId).subscribe(res => {
      this.shortageLocs = res;
    });
    this.partRequest = new PartRequest;
    this.issuePartsForm = this.fb.group({
      employee: ['', Validators.required],
      quantity: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]+$")])],
      location: ['', Validators.required]
    });
  }
  
  ionViewDidLoad() {
    this.employeeService.loadWhseEmployees();   
    //console.log(this.shortageLocs)
  }

  cancel(){
    this.viewCtrl.dismiss(0);
  }
  
  getFormData() {
    this.partRequest.itemReqId = this.itemReqId;
    var splitEmp = this.issuePartsForm.get('employee').value.split(':');
    var empNum = splitEmp[0];
    this.partRequest.processedBy = empNum.trim();
    this.partRequest.quantity = this.issuePartsForm.get('quantity').value;
    this.partRequest.location = this.issuePartsForm.get('location').value.location;
    this.partRequest.lot = this.issuePartsForm.get('location').value.lot;
  }

  createShortage() {
    
    let toast = this.toastCtrl.create({
      message: 'You have issued ' + this.issuePartsForm.get('quantity').value + " of " + this.reqItem.item + ' from ' + this.issuePartsForm.get('location').value.location,
      duration: 3000,
      position: 'top'
    });
    this.getFormData();
    
    console.log(this.partRequest);
    this.reqService.createShortage(this.partRequest).subscribe(() => {
      toast.present();
      this.viewCtrl.dismiss(this.issuePartsForm.get('quantity').value);
    }, err => {
      this.error = JSON.stringify(err.error);  
    });
  }

}
