import { NgModule } from '@angular/core';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AuditLoggingModule } from '@volo/abp.ng.audit-logging';
import { PageModule } from '@abp/ng.components/page';
import { SaasModule } from '@volo/abp.ng.saas';
import { SharedModule } from '../shared/shared.module';
import { ProductionRoutingModule } from './production-routing.module';
//
import { BusinessProfileModule } from './business-profiles/business-profile.module';
import { PersonProfileModule } from './person-profiles/person-profile/person-profile.module';


@NgModule({
  declarations: [ ],
  imports: [
    SharedModule,
    ProductionRoutingModule,
    NgbDatepickerModule,
    AuditLoggingModule,
    SaasModule,
    PageModule,
    //
    BusinessProfileModule,
    PersonProfileModule
  ],
})
export class ProductionModule {
}
