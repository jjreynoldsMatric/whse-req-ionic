import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ReasonCode } from '../../models/reason-code';
import { ReasonCodesProvider } from '../../providers/reason-codes/reason-codes';

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

  @Input()
  public index: number; 

  @Input()
  public item: FormGroup;

  @Output()
  public removed: EventEmitter<number> = new EventEmitter<number>();

  constructor(private reasonCodesService: ReasonCodesProvider) {
    this.reasonCodesService.loadReasonCodes();
  }

  static buildItem(matricPN: string, quantity: number, lotNum: number, reasonCode: ReasonCode, operation: number) {
    return new FormGroup({
      matricPN: new FormControl(matricPN, Validators.required),
      quantity: new FormControl(quantity, Validators.required),
      lotNum: new FormControl(lotNum),
      reasonCode: new FormControl(reasonCode, Validators.required),
      operation: new FormControl(operation)
    })
  }

}
