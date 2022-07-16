import { NgModule } from '@angular/core';
import { NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { AuditLoggingModule } from '@volo/abp.ng.audit-logging';
import { PageModule } from '@abp/ng.components/page';
import { SaasModule } from '@volo/abp.ng.saas';
import { SharedModule } from '../shared/shared.module';
import { TitleModule } from './titles/title.module';
import { ContentLibraryRoutingModule } from './content-library-routing.module';

//


@NgModule({
  declarations: [],
  imports: [
    SharedModule,
    ContentLibraryRoutingModule,
    NgbDatepickerModule,
    AuditLoggingModule,
    SaasModule,
    PageModule,
    //
    TitleModule
  ]
})
export class ContentLibraryModule {
}
