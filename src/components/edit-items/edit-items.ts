import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { ReasonCodesProvider } from '../../providers/reason-codes/reason-codes';

import { ItemsProvider } from '../../providers/items/items';
import { Requisition } from '../../models/models';


/**
 * Generated class for the EditItemsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'edit-items',
  templateUrl: 'edit-items.html'
})
export class EditItemsComponent {

  @Input() newReqForm: FormGroup;
  @Output() remove: EventEmitter<number> = new EventEmitter<number>();
  @Input() index: number;
  itemDesc: any;
  opRequired: boolean;
  reqItems: any;

  constructor(private reasonCodesService: ReasonCodesProvider, private itemServ: ItemsProvider) {
    this.reasonCodesService.loadReasonCodes();
    
  }

  enterItem(item: string) {
    if (item) {
      this.itemServ.getItemDescription(item).subscribe(res => {
        this.itemDesc = res.toString();
      }, err => {
        this.itemDesc = "Could not find this item";
      }
      );
    }
  }

  getFormInfo() {
    let formInfo = this.newReqForm.parent.parent.get('job').value;
    console.log("FORM INFO: " + JSON.stringify(formInfo))
  }

  removeItem(index) {
   
    //let reqItems = this.newReqForm.parent.parent.value;
    //console.log(reqItems);
    this.remove.emit(this.index);
    
  }


}
