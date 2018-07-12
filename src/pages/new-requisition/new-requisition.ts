import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ArrayType } from '@angular/compiler/src/output/output_ast';

import { EmployeeProvider } from '../../providers/employee/employee';
import { ReasonCodesProvider } from '../../providers/reason-codes/reason-codes';
import { RequisitionProvider } from '../../providers/requisition/requisition';

import { Requisition } from '../../models/models';
import { RequisitionItem } from '../../models/requisitionItem';
import { ngxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';


@IonicPage()
@Component({
  selector: 'page-new-requisition',
  templateUrl: 'new-requisition.html',
})
export class NewRequisitionPage implements OnInit {

  @Input() itemsArray: ArrayType[];

  newReqForm: FormGroup;
  index: number;
  requisition: Requisition;
  empIndex: number;
  empDept:any;
  employee:any;
  errorMessage: string;
  newForm: FormGroup;
  arrayControl: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private employeeService: EmployeeProvider, private reasonCodesService: ReasonCodesProvider, private fb: FormBuilder, private reqService: RequisitionProvider,private _ngxZendeskWebwidgetService: ngxZendeskWebwidgetService) {
    
    this.itemsArray = [];
    this.requisition = new Requisition;
    this.requisition.requisitionItem = new Array<RequisitionItem>();
    
_ngxZendeskWebwidgetService.show();
  }
  
  openFeedback(){
    this._ngxZendeskWebwidgetService.activate();
  }

  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.newForm = this.fb.group({
      employee: ['', Validators.required],
      job: ['', Validators.compose([Validators.pattern("^[0-9]+$")])],
      requisitionItems: this.fb.array([
        this.initItems(),
        
      ])
    });
    this.arrayControl = <FormArray>this.newForm.controls['requisitionItems'];
    this.itemsArray.forEach(item => {
      let newItem = this.fb.group({
        item: ['',Validators.required],
        quantity: ['', Validators.compose([Validators.required, Validators.pattern("^[0-9]+$")])],
        reasonCode: ['', Validators.required],
        operation: [{value: '', disabled: true}],
      })
      this.arrayControl.push(newItem);
      
    });
    this.setValidators();
    
    
    console.log(this.arrayControl);
  
    this.newReqForm = this.newForm;
  }
  ionViewWillLoad() {
    this.employeeService.loadEmployees();
    this.reasonCodesService.loadReasonCodes();
  }

  setValidators() {
    this.newForm.controls['job'].valueChanges.subscribe(() => {
      if(this.newForm.controls['job']){

        for(let i=0; i<this.arrayControl.length; i++){
          this.arrayControl.controls[i].get('operation').enable();
          this.arrayControl.controls[i].get('operation').setValidators(Validators.compose([Validators.pattern("^[0-9]+$"),Validators.required]));
          this.arrayControl.controls[i].get('reasonCode').disable();
        }
      }
     
      if(this.newForm.controls['job'].value == ""){
        console.log("NO JOB");
        for(let i=0; i<this.arrayControl.length; i++){
          this.arrayControl.controls[i].get('operation').disable();
          this.arrayControl.controls[i].get('reasonCode').enable();
          this.arrayControl.controls[i].get('reasonCode').setValidators(Validators.required);
          }
      }
    });
  }

  initItems() {
    
    return this.fb.group({
      item: ['', Validators.required],
      quantity: ['', Validators.required],
      lot: [''],
      reasonCode: ['', Validators.required],
      operation: [{value: '', disabled: true}],
    });
    
  }

  initJobItems() {
    
    return this.fb.group({
      item: ['', Validators.required],
      quantity: ['', Validators.required],
      lot: [''],
      reasonCode: [{value: '', disabled: true}],
      operation: ['', Validators.required],
    });
    
  }

  addItem() {
    console.log("Adding an item!");
    if(this.newForm.controls['job'].value !== ""){
      console.log("JOB ITEM");
      this.arrayControl.push(this.initJobItems());
    }
    else{
      
      console.log("NORMAL ITEM");
      this.arrayControl.push(this.initItems());
    }
    
  }

  removeItem(index: number) {

    this.arrayControl.removeAt(index);
  }

  getFormData () {
    this.requisition.employee = this.newReqForm.get('Employee').value.empFull;
    this.requisition.department = this.newReqForm.get('Employee').value.empDept;
    this.requisition.job = this.newReqForm.controls.job.value;

    let reqitem = <FormArray>this.newReqForm.controls['requisitionItems'];
    this.requisition.requisitionItem = reqitem.value;
    for (let i = 0; i < reqitem.length; i++) {
      this.requisition.requisitionItem[i].item = reqitem.at(i).value.item;
      this.requisition.requisitionItem[i].quantity = reqitem.at(i).value.quantity;
      if (reqitem.at(i).value.lot === null) {
        this.requisition.requisitionItem[i].lot = 0;
      }

      this.requisition.requisitionItem[i].reasonCode = reqitem.at(i).value.reasonCode;
      if (reqitem.at(i).value.operation === null) {
        this.requisition.requisitionItem[i].operation = 0;
      }
      
    }
  }

  submit() {
    this.getFormData();
    console.log(this.requisition)
    this.reqService.saveRequisition(this.requisition).subscribe(response => {
      console.log("Should have posted the req");
      this.navCtrl.pop();
    }, err => {
      this.errorMessage = err.error;
    });
    /*
, err => {
      this.errorMessage = JSON.stringify(err);
    }
    */
    this.reqService.loadRequisitions();
  }
  onSelectChange(employee) {
    let index = this.empIndex;
    console.log("ONSELECTCHANGE INDEX" + index) 
  }

  getFormInfo() {
    let formInfo = this.newReqForm.get('employee').value.empDept;
    let index = this.empIndex;
    console.log("EMP DEPT : " + this.empDept);
    console.log("EMP INDEX : " + index);
    console.log(formInfo)
  }

}
