import { Component, Input, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams, DateTime } from 'ionic-angular';
import { EmployeeProvider } from '../../providers/employee/employee';
import { ReasonCodesProvider } from '../../providers/reason-codes/reason-codes';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ItemFormControlComponent } from '../../components/item-form-control/item-form-control';
import { RequisitionProvider } from '../../providers/requisition/requisition';
import { ArrayType } from '@angular/compiler/src/output/output_ast';
import { Requisition } from '../../models/requisition';
import { RequisitionItem } from '../../models/requisitionItem';

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
export class NewRequisitionPage implements OnInit {
  
  @Input() itemsArray: ArrayType[];
  //matricPN: any;
  //quantity: any;
  //lotNum: any;
  //reasonCode: any;
  //operation: any;

  newReqForm: FormGroup;
 
  requisition: Requisition; 

  constructor(public navCtrl: NavController, public navParams: NavParams, private employeeService: EmployeeProvider, private reasonCodesService: ReasonCodesProvider, private fb: FormBuilder, private reqService: RequisitionProvider) {
    this.itemsArray = [];
    this.requisition = new Requisition;
    this.requisition.requisitionItem = new Array<RequisitionItem>();


   
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
     
let newForm = this.fb.group({
      employee: ['', Validators.required],
      job: '',
      department: '',
      requisitionItems: this.fb.array([
        this.initItems(),
      ])      
    });
    const arrayControl = <FormArray>newForm.controls['requisitionItems'];
    this.itemsArray.forEach(item => {
      let newItem = this.fb.group({
        item: ['', Validators.required],
        quantity: ['', Validators.required],
        lotNum: [''],
        reasonCode: ['', Validators.required],
        operation: [''],
      })
      arrayControl.push(newItem);
    }); 
    this.newReqForm = newForm;
    
    
  }

  ionViewWillLoad() {
    this.employeeService.loadEmployees();
    this.reasonCodesService.loadReasonCodes(); 
    

    //console.log(JSON.stringify(this.employeeService.employees));
  }
  initItems() {
    return  this.fb.group({
        item: ['', Validators.required],
        quantity: ['', Validators.required],
        lotNum: [''],
        reasonCode: ['', Validators.required],
        operation: [''],
      })
  }

  addItem() {
    console.log("Adding an item!");
    const arrayControl = <FormArray>this.newReqForm.controls['requisitionItems'];
    arrayControl.push(this.initItems());
  }

  removeItem(index: number) {
    const arrayControl = <FormArray>this.newReqForm.controls['requisitionItems'];
    arrayControl.removeAt(index);
  }

  submit() { 
    this.requisition.employee = this.newReqForm.get('employee').value;
    this.requisition.department = this.newReqForm.controls.department.value;
    this.requisition.job = this.newReqForm.controls.job.value;

    let reqitem = <FormArray>this.newReqForm.controls['requisitionItems'];
    this.requisition.requisitionItem = reqitem.value;
    for (let i=0; i < reqitem.length; i++) {
      this.requisition.requisitionItem[i].item = reqitem.at(i).value.item;
      this.requisition.requisitionItem[i].quantity = reqitem.at(i).value.quantity;
      this.requisition.requisitionItem[i].lot = reqitem.at(i).value.lotNum;
      this.requisition.requisitionItem[i].reasonCode = reqitem.at(i).value.reasonCode;
      this.requisition.requisitionItem[i].operation = reqitem.at(i).value.operation;
    }
    
    //console.log(this.requisition);
    this.reqService.saveRequisition(this.requisition);
  }

}
