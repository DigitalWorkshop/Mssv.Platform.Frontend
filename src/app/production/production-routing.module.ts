import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, PermissionGuard } from '@abp/ng.core';
import { PersonProfileComponent } from './person-profiles/person-profile/components/person-profile.component';
import { BusinessProfileListComponent } from './business-profiles/list/list.component';
import { BusinessProfileDetailComponent } from './business-profiles/detail/detail.component';

const routes: Routes = [
  {
    path: 'business-profiles',
    component: BusinessProfileListComponent,
    canActivate: [AuthGuard, PermissionGuard]
  },
  {
    path: 'business-profiles/:id',
    component: BusinessProfileDetailComponent,
    canActivate: [AuthGuard, PermissionGuard]
  },
  {
    path: 'person-profiles',
    component: PersonProfileComponent,
    canActivate: [AuthGuard, PermissionGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductionRoutingModule {
}
