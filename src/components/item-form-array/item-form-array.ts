import { Component, Input, Output } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ItemFormControlComponent } from '../item-form-control/item-form-control';

/**
 * Generated class for the ItemFormArrayComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'items-array',
  templateUrl: 'item-form-array.html'
})
export class ItemFormArrayComponent {

  @Input()
  public itemsFormArray: FormArray; 

  constructor() {
    console.log('Hello ItemFormArrayComponent Component');
    
  }

  addItem() {
    this.itemsFormArray.push(ItemFormControlComponent.buildItem('', null, null, null, null))
  }

  static buildItems() {
    return new FormArray([
      ItemFormControlComponent.buildItem('', null, null, null, null)
    ])
  }
}
