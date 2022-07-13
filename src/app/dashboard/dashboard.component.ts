import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <app-host-dashboard *abpPermission="'Platform.Dashboard.Host'"></app-host-dashboard>
    <app-tenant-dashboard *abpPermission="'Platform.Dashboard.Tenant'"></app-tenant-dashboard>
  `,
})
export class DashboardComponent {}
