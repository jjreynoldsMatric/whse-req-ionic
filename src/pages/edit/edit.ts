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
    console.log(this.editReq);
    
    this.editRI = this.editReq.RequisitionItem
    this.itemsArray = [];
    this.requisition = new Requisition;
    this.requisition.RequisitionItem = new Array<RequisitionItem>();
    _ngxZendeskWebwidgetService.show();
  }
  
  openFeedback(){
    this._ngxZendeskWebwidgetService.activate();
  }
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    
    this.newForm = this.fb.group({
      Employee: [this.editReq.Employee, Validators.required],
      Job: [this.editReq.Job, Validators.compose([Validators.pattern("^[0-9]+$")])],
      RequisitionItems: this.fb.array([
       
      ])
    });
    this.arrayControl = <FormArray>this.newForm.controls['RequisitionItems'];
    this.editRI.forEach(item => {
      let newItem = this.fb.group({
        Item: [item.Item ,Validators.required],
        Quantity: [item.Quantity, Validators.compose([Validators.required, Validators.pattern("^[0-9]+$")])],
        ReasonCode: [item.ReasonCode],
        Operation: [item.Operation],
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
    if(this.newForm.controls['Job'].value === "" || this.newForm.controls['Job'].value === null )
    {
      for(let i=0; i<this.arrayControl.length; i++){
        this.arrayControl.controls[i].get('Operation').disable();
        this.arrayControl.controls[i].get('ReasonCode').enable();
        this.arrayControl.controls[i].get('ReasonCode').setValidators(Validators.required);
        }
    }
    else{
      for(let i=0; i<this.arrayControl.length; i++){
        this.arrayControl.controls[i].get('Operation').enable();
        this.arrayControl.controls[i].get('Operation').setValidators(Validators.compose([Validators.pattern("^[0-9]+$"),Validators.required]));
        this.arrayControl.controls[i].get('ReasonCode').disable();
      }
    }
    this.newForm.controls['Job'].valueChanges.subscribe(() => {
      if(this.newForm.controls['Job']){

        for(let i=0; i<this.arrayControl.length; i++){
          this.arrayControl.controls[i].get('Operation').enable();
          this.arrayControl.controls[i].get('Operation').setValidators(Validators.compose([Validators.pattern("^[0-9]+$"),Validators.required]));
          this.arrayControl.controls[i].get('ReasonCode').disable();
        }
      }
     
      if(this.newForm.controls['Job'].value == ""){
        console.log("NO JOB");
        for(let i=0; i<this.arrayControl.length; i++){
          this.arrayControl.controls[i].get('Operation').disable();
          this.arrayControl.controls[i].get('ReasonCode').enable();
          this.arrayControl.controls[i].get('ReasonCode').setValidators(Validators.required);
          }
      }
    });
  }

  initItems() {
    
    return this.fb.group({
      Item: [ '', Validators.required],
      Quantity: ['', Validators.required],
      Lot: [''],
      ReasonCode: ['', Validators.required],
      Operation: [{value: '', disabled: true}],
    });
    
  }

  initJobItems() {
    
    return this.fb.group({
      Item: ['', Validators.required],
      Quantity: ['', Validators.required],
      Lot: [''],
      ReasonCode: [{value: '', disabled: true}],
      Operation: ['', Validators.required],
    });
    
  }

  addItem() {
    console.log("Adding an item!");
    if(this.newForm.controls['Job'].value !== ""){
      console.log("JOB ITEM");
      this.arrayControl.push(this.initJobItems());
    }
    else{
      console.log("NORMAL ITEM");
      this.arrayControl.push(this.initItems());
    }
    
  }

  getFormData () {
    this.requisition.Id = this.editReq.Id;
    this.requisition.Employee = this.editReq.Employee;
    this.requisition.Department = this.editReq.Department;
    this.requisition.Job = this.newReqForm.controls.Job.value;
    this.requisition.Filled = this.editReq.Filled;
    let reqitems = <FormArray>this.newReqForm.controls['RequisitionItems'];
    
    for (let i = 0; i < reqitems.length; i++) {
      
      var reqitem = new RequisitionItem;

      reqitem.Item = '';
      reqitem.ItemDescription = '';
      reqitem.Quantity = null;
      reqitem.Lot = null;
      reqitem.ReasonCode = '';
      reqitem.Operation = null;
      reqitem.QuantityFilled = null;
      reqitem.Filled = false;
      reqitem.Id = null;

      reqitem.Item = reqitems.at(i).value.Item;
      reqitem.Quantity = reqitems.at(i).value.Quantity;
      reqitem.QuantityFilled = reqitems.at(i).value.QuantityFilled;
      reqitem.Id = this.editReq.RequisitionItem[i].Id;

      if (reqitems.at(i).value.Filled === undefined){
        reqitem.Filled = false;
      }else{
          reqitem.Filled = reqitems.at(i).value.Filled;
      }
      if(reqitems.at(i).value.ItemDescription === undefined){
        reqitem.ItemDescription = null;
      }
      else{
        reqitem.ItemDescription = reqitems.at(i).value.ItemDescription;
  
      }  
      if(reqitems.at(i).value.ReasonCode === undefined){
        reqitem.ReasonCode = null;
      }else{
        reqitem.ReasonCode = reqitems.at(i).value.ReasonCode;
      }
      
      if (reqitems.at(i).value.Operation === null) {
        reqitem.Operation = 0;
      }
      else{
        reqitem.Operation = reqitems.at(i).value.Operation;
      }
      this.requisition.RequisitionItem[i] = reqitem
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
    let reqItemId = this.editReq.RequisitionItem[index].Id;
    let reqId = this.editReq.Id
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
