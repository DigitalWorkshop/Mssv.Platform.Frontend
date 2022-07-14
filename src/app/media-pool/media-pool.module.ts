import { NgModule } from '@angular/core';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AuditLoggingModule } from '@volo/abp.ng.audit-logging';
import { PageModule } from '@abp/ng.components/page';
import { SaasModule } from '@volo/abp.ng.saas';
import { SharedModule } from '../shared/shared.module';

//



@NgModule({
  declarations: [ ],
  imports: [
    SharedModule,
    NgbDatepickerModule,
    AuditLoggingModule,
    SaasModule,
    PageModule,
    //

  ],
})
export class MediaPoolModule {
}
