import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { ArrayType } from '@angular/compiler/src/output/output_ast';

import { EmployeeProvider } from '../../providers/employee/employee';
import { ReasonCodesProvider } from '../../providers/reason-codes/reason-codes';
import { RequisitionProvider } from '../../providers/requisition/requisition';

import { Requisition } from '../../models/models';
import { RequisitionItem } from '../../models/requisitionItem';
import { ngxZendeskWebwidgetService } from 'ngx-zendesk-webwidget';

import { ConfirmRemoveItemComponent} from '../../components/confirm-remove-item/confirm-remove-item'
/**
 * Generated class for the EditPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html',
})
export class EditPage implements OnInit {
  
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
  editReq: Requisition;
  editRI: RequisitionItem[];

  
  constructor(public navCtrl: NavController, public navParams: NavParams, private employeeService: EmployeeProvider, private reasonCodesService: ReasonCodesProvider, private fb: FormBuilder, private reqService: RequisitionProvider,private _ngxZendeskWebwidgetService: ngxZendeskWebwidgetService, public modalCtrl: ModalController) {
    this.editReq = this.navParams.data;
    this.editRI = this.editReq.requisitionItem
    this.itemsArray = [];
    this.requisition = new Requisition;
    this.requisition.requisitionItem = new Array<RequisitionItem>();
    
  }
  openFeedback(){
    this._ngxZendeskWebwidgetService.activate();
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.newForm = this.fb.group({
      employee: [this.editReq.employee, Validators.required],
      job: [this.editReq.job, Validators.compose([Validators.pattern("^[0-9]+$")])],
      requisitionItems: this.fb.array([
       
      ])
    });
    this.arrayControl = <FormArray>this.newForm.controls['requisitionItems'];
    this.editRI.forEach(item => {
      let newItem = this.fb.group({
        item: [item.item ,Validators.required],
        quantity: [item.quantity, Validators.compose([Validators.required, Validators.pattern("^[0-9]+$")])],
        reasonCode: [item.reasonCode],
        operation: [item.operation],
      })
      this.arrayControl.push(newItem);
      this.setValidators()
    });
    this.setValidators();
    
    
    console.log(this.editReq);
  
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
      item: [ '', Validators.required],
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
    console.log(this.requisition);
    console.log(this.editReq);
    
    this.requisition.id = this.editReq.id;
    this.requisition.employee = this.editReq.employee;
    this.requisition.department = this.editReq.department;
    this.requisition.job = this.newReqForm.controls.job.value;
    this.requisition.filled = this.editReq.filled;
    let reqitem = <FormArray>this.newReqForm.controls['requisitionItems'];
    this.requisition.requisitionItem = reqitem.value;
    for (let i = 0; i < reqitem.length; i++) {
      /*
      if (this.editReq.requisitionItem[i].id !== null){
        this.requisition.requisitionItem[i].id = this.editReq.requisitionItem[i].id;
      }*/
      
      this.requisition.requisitionItem[i].item = reqitem.at(i).value.item;
      this.requisition.requisitionItem[i].quantity = reqitem.at(i).value.quantity;
      this.requisition.requisitionItem[i].quantityFilled = reqitem.at(i).value.quantityFilled;
      if (this.editReq.requisitionItem[i].filled === undefined){
        this.editReq.requisitionItem[i].filled = false;
      }
      this.requisition.requisitionItem[i].filled = this.editReq.requisitionItem[i].filled;
      this.requisition.requisitionItem[i].itemDescription = this.editReq.requisitionItem[i].itemDescription;
      this.requisition.requisitionItem[i].lot = this.editReq.requisitionItem[i].lot;
      

      this.requisition.requisitionItem[i].reasonCode = reqitem.at(i).value.reasonCode;
      if (reqitem.at(i).value.operation === null) {
        this.requisition.requisitionItem[i].operation = 0;
      }
      else{
        this.requisition.requisitionItem[i].operation = this.editReq.requisitionItem[i].operation;
      }
      
    }
  }

  submit() {
    this.getFormData();
    console.log(this.requisition)
    this.reqService.updateRequisition(this.requisition).subscribe(response => {
      console.log("Should have posted the req");
      this.navCtrl.pop();
    }, err => {
      this.errorMessage = err.error;
    });
    
    this.reqService.loadRequisitions();
  }
  onSelectChange(employee) {
    let index = this.empIndex;
    console.log("ONSELECTCHANGE INDEX" + index) 
  }


  onRemove(index){
    let reqItemId = this.editReq.requisitionItem[index].id;
    let reqId = this.editReq.id
    let data = {reqId, reqItemId}
    console.log(reqId);
    console.log(reqItemId);
    
    let confirmRemoveModal = this.modalCtrl.create(ConfirmRemoveItemComponent, data);
    const arrayControl = <FormArray>this.newReqForm.controls['RequisitionItems'];
    confirmRemoveModal.present();
    confirmRemoveModal.onDidDismiss(dis => {
      console.log(dis);
      if(dis === true){
        arrayControl.removeAt(this.index);
      }
      
    })
  }

}
