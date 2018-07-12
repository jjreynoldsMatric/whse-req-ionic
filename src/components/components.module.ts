import { NgModule } from '@angular/core';
import { IssuePartsComponent } from './issue-parts/issue-parts';

import { ItemFormControlComponent } from './item-form-control/item-form-control';
import { CreateShortageComponent } from './create-shortage/create-shortage';
import { ConfirmComponent } from './confirm/confirm';
import { ConfirmRemoveItemComponent } from './confirm-remove-item/confirm-remove-item';
import { EditItemsComponent } from './edit-items/edit-items';


@NgModule({
	declarations: [IssuePartsComponent,

    ItemFormControlComponent,
    CreateShortageComponent,
    ConfirmComponent,
    ConfirmRemoveItemComponent,
    EditItemsComponent,
    ], 
	imports: [],
	exports: [IssuePartsComponent,

    ItemFormControlComponent,
    CreateShortageComponent,
    ConfirmComponent,
    ConfirmRemoveItemComponent,
    EditItemsComponent,
    ]
})
export class ComponentsModule {}
