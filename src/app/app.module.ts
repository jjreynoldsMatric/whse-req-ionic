import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule }   from '@angular/forms';

import { MyApp } from './app.component';

import { OpenRequisitionPage } from '../pages/open-requisition/open-requisition';
import { ManagePage } from '../pages/manage/manage';
import { CompletedRequisitionPage } from '../pages/completed-requisition/completed-requisition';
import { NewRequisitionPage } from '../pages/new-requisition/new-requisition';
import { EditPage } from '../pages/edit/edit';


import { IssuePartsComponent } from '../components/issue-parts/issue-parts';
import { CreateShortageComponent } from '../components/create-shortage/create-shortage';
import { ItemFormControlComponent } from '../components/item-form-control/item-form-control';
import { ConfirmComponent } from '../components/confirm/confirm'; 


import { EmployeeProvider } from '../providers/employee/employee';
import { ItemLocationsProvider } from '../providers/item-locations/item-locations';
import { RequisitionProvider } from '../providers/requisition/requisition';
import { ReasonCodesProvider } from '../providers/reason-codes/reason-codes';
import { ItemsProvider } from '../providers/items/items'; 

@NgModule({
  declarations: [
    MyApp,
    OpenRequisitionPage,
    ManagePage,
    CompletedRequisitionPage,
    NewRequisitionPage,
    EditPage,
    IssuePartsComponent,
    ItemFormControlComponent,
    CreateShortageComponent,
    ConfirmComponent
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    OpenRequisitionPage,
    ManagePage,
    CompletedRequisitionPage,    
    NewRequisitionPage,
    EditPage, 
    IssuePartsComponent,
    ItemFormControlComponent,
    CreateShortageComponent,
    ConfirmComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EmployeeProvider,
    HttpClient,
    ItemLocationsProvider,
    RequisitionProvider,
    ReasonCodesProvider,
    ItemsProvider
  ]
})
export class AppModule {}
