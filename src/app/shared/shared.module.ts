import { CoreModule } from '@abp/ng.core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgModule } from '@angular/core';
import { CommercialUiModule } from '@volo/abp.commercial.ng.ui';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { MssvStepperModule } from './custom-components';

@NgModule({
  declarations: [],
  imports: [
    CoreModule,
    ThemeSharedModule,
    CommercialUiModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    MssvStepperModule
  ],
  exports: [
    CoreModule,
    ThemeSharedModule,
    CommercialUiModule,
    NgbDropdownModule,
    NgxValidateCoreModule,
    MssvStepperModule
  ],
  providers: []
})
export class SharedModule {
}
