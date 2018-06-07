import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReasonCode } from '../../models/reason-code';
import { ReasonCodesProvider } from '../../providers/reason-codes/reason-codes';
import { ItemLocViewModel } from '../../models/itemLocViewModel';
import { ArrayType } from '@angular/compiler/src/output/output_ast';

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

constructor(private reasonCodesService: ReasonCodesProvider) {
    this.reasonCodesService.loadReasonCodes();
  }
/*
  @Input()
  public index: number; 

  @Input()
  public item: FormGroup;

  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();

  

  static buildItem(matricPN: string, quantity: number, lotNum: number, reasonCode: ReasonCode, operation: number) {
    return new FormGroup({
      itemLocViewModel: new FormControl(ItemLocViewModel),
      matricPN: new FormControl(matricPN, Validators.required),
      quantity: new FormControl(quantity, Validators.required),
      lotNum: new FormControl(lotNum),
      reasonCode: new FormControl('', Validators.required),
      operation: new FormControl(operation),
      
    })
  }
*/
}
