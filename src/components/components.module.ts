import { NgModule } from '@angular/core';
import { IssuePartsComponent } from './issue-parts/issue-parts';
import { ItemTableComponent } from './item-table/item-table';
import { ItemFormControlComponent } from './item-form-control/item-form-control';
import { ItemFormArrayComponent } from './item-form-array/item-form-array';

@NgModule({
	declarations: [IssuePartsComponent,
    ItemTableComponent,
    ItemFormControlComponent,
    ItemFormArrayComponent],
	imports: [],
	exports: [IssuePartsComponent,
    ItemTableComponent,
    ItemFormControlComponent,
    ItemFormArrayComponent]
})
export class ComponentsModule {}
