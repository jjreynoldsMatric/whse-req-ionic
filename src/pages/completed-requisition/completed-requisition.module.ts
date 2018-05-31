import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompletedRequisitionPage } from './completed-requisition';

@NgModule({
  declarations: [
    CompletedRequisitionPage,
  ],
  imports: [
    IonicPageModule.forChild(CompletedRequisitionPage),
  ],
})
export class CompletedRequisitionPageModule {}
