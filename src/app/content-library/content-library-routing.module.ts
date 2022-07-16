import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard, PermissionGuard } from '@abp/ng.core';
import { TitleListComponent } from './titles/list/list.component';


const routes: Routes = [
  {
    path: '',
    component: TitleListComponent,
    canActivate: [AuthGuard, PermissionGuard],
  },
  {
    path: 'titles',
    component: TitleListComponent,
    canActivate: [AuthGuard, PermissionGuard]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContentLibraryRoutingModule {
}
