import { Component, Input } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';

import { ReasonCodesProvider } from '../../providers/reason-codes/reason-codes';

import { ItemsProvider } from '../../providers/items/items';

/**
 * Generated class for the ItemFormControlComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'item-form-control',
  templateUrl: 'item-form-control.html'
})
export class ItemFormControlComponent {

  @Input() newReqForm: FormGroup;
  @Input() index: number;
  itemDesc: any;
  opRequired: boolean;

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
    const arrayControl = <FormArray>this.newReqForm.parent;
    arrayControl.removeAt(this.index)
  }


}
