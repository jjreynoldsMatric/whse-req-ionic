import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewRequisitionPage } from './new-requisition';

@NgModule({
  declarations: [
    NewRequisitionPage,
  ],
  imports: [
    IonicPageModule.forChild(NewRequisitionPage),
  ],
})
export class NewRequisitionPageModule {}
