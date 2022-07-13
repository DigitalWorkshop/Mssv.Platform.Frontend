import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgModule } from '@angular/core';
import {
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbDropdownModule, NgbNavModule
} from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { CommercialUiModule } from '@volo/abp.commercial.ng.ui';
import { PageModule } from '@abp/ng.components/page';
import { PersonProfileComponent } from './components/person-profile.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';

@NgModule({
  declarations: [PersonProfileComponent],
  imports: [
    CoreModule,
    ThemeSharedModule,
    CommercialUiModule,
    NgxValidateCoreModule,
    NgbCollapseModule,
    NgbDatepickerModule,
    NgbDropdownModule,
    NgbNavModule,
    NgxIntlTelInputModule,
    PageModule,
  ],
})
export class PersonProfileModule {}
