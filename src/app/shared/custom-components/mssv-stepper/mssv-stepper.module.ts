import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MssvStepperComponent } from './mssv-stepper.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CommercialUiModule } from '@volo/abp.commercial.ng.ui';

@NgModule({
  declarations: [
    MssvStepperComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CommercialUiModule,
    TabsModule,
    TypeaheadModule
  ],
  exports: [
    MssvStepperComponent
  ],
  entryComponents: [
    MssvStepperComponent
  ]
})
export class MssvStepperModule {

}
