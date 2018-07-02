import { NgModule } from '@angular/core';
import { IssuePartsComponent } from './issue-parts/issue-parts';

import { ItemFormControlComponent } from './item-form-control/item-form-control';
import { CreateShortageComponent } from './create-shortage/create-shortage';
import { ConfirmComponent } from './confirm/confirm';
import { FeedbackComponent } from './feedback/feedback';


@NgModule({
	declarations: [IssuePartsComponent,

    ItemFormControlComponent,
    CreateShortageComponent,
    ConfirmComponent,
    FeedbackComponent,
    ], 
	imports: [],
	exports: [IssuePartsComponent,

    ItemFormControlComponent,
    CreateShortageComponent,
    ConfirmComponent,
    FeedbackComponent,
    ]
})
export class ComponentsModule {}
