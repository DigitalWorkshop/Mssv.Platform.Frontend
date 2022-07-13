import { CoreModule } from '@abp/ng.core';
import { ThemeSharedModule } from '@abp/ng.theme.shared';
import { NgModule } from '@angular/core';
import {
  NgbCollapseModule,
  NgbDatepickerModule,
  NgbDropdownModule,
  NgbNavModule
} from '@ng-bootstrap/ng-bootstrap';
import { NgxValidateCoreModule } from '@ngx-validate/core';
import { CommercialUiModule } from '@volo/abp.commercial.ng.ui';
import { PageModule } from '@abp/ng.components/page';
import { BusinessProfileListComponent } from './list/list.component';
import { BusinessProfileDetailComponent } from './detail/detail.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { BusinessAddressesComponent } from './detail/business-addresses/business-addresses.component';
import { PersonBusinessAffiliationComponent } from './detail/person-business-affiliation/person-business-affiliation.component';

@NgModule({
  declarations: [
    BusinessProfileListComponent,
    BusinessProfileDetailComponent,
    BusinessAddressesComponent,
    PersonBusinessAffiliationComponent
  ],
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
    PageModule
  ],
})
export class BusinessProfileModule {}
