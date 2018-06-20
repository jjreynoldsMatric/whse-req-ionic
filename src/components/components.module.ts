import { NgModule } from '@angular/core';
import { IssuePartsComponent } from './issue-parts/issue-parts';

import { ItemFormControlComponent } from './item-form-control/item-form-control';


@NgModule({
	declarations: [IssuePartsComponent,

    ItemFormControlComponent,
    ], 
	imports: [],
	exports: [IssuePartsComponent,

    ItemFormControlComponent,
    ]
})
export class ComponentsModule {}
