import { Component } from '@angular/core';
import { ReasonCodesProvider } from '../../providers/reason-codes/reason-codes';
import { FormsModule }   from '@angular/forms';

/**
 * Generated class for the ItemTableComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'item-table',
  templateUrl: 'item-table.html'
})
export class ItemTableComponent {

  items: any[] = [];
  matricPN: any;
  quantity: any;
  lotNum: any;
  reasonCode: any;
  operation: any;

  constructor(private reasonCodesService: ReasonCodesProvider) {
    this.reasonCodesService.loadReasonCodes();
    
  }

  addItem(item) {
    this.items.push({
      listItem: {matricPN: this.matricPN, quantityRequested: this.quantity, lotNum: this.lotNum, reasonCode: this.reasonCode, operation: this.operation}
    });
    console.log(JSON.stringify(this.items));
  }
}
