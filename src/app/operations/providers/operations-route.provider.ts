import { eLayoutType, RoutesService } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const OPERATIONS_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true }
];

function configureRoutes(routes: RoutesService) {
  return () => {
    routes.add([
      {
        path: '/operations',
        iconClass: 'fas fa-cogs',
        name: '::Menu:Operations',
        layout: eLayoutType.application,
        order: 3
      },
      {
        parentName: '::Menu:Operations',
        path: '/operations/ingest',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:Operations:Ingest',
        layout: eLayoutType.application,
        // requiredPolicy: 'Platform.ContentLibrary.Projects'
      },
      {
        parentName: '::Menu:Operations',
        path: '/operations/transcode',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:Operations:Transcode',
        layout: eLayoutType.application,
        // requiredPolicy: 'Platform.ContentLibrary.Projects'
      },
      {
        parentName: '::Menu:Operations',
        path: '/operations/quality-control',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:Operations:QualityControl',
        layout: eLayoutType.application,
        // requiredPolicy: 'Platform.ContentLibrary.Projects'
      },
      {
        parentName: '::Menu:Operations',
        path: '/operations/transfers',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:Operations:Transfers',
        layout: eLayoutType.application,
        // requiredPolicy: 'Platform.ContentLibrary.Projects'
      },
      {
        parentName: '::Menu:Operations',
        path: '/operations/archival',
        iconClass: 'fas fa-zip',
        name: '::Menu:Operations:Archival',
        layout: eLayoutType.application,
        // requiredPolicy: 'Platform.ContentLibrary.Projects'
      },
    ]);
  };
}
