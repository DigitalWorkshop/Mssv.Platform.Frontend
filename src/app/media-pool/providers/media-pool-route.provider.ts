import { eLayoutType, RoutesService } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const MEDIA_POOL_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true }
];

function configureRoutes(routes: RoutesService) {
  return () => {
    routes.add([
      {
        path: '/media-pool',
        iconClass: 'fas fa-database',
        name: '::Menu:MediaPools',
        layout: eLayoutType.application,
        order: 7
      },
      {
        parentName: '::Menu:MediaPools',
        path: '/media-pool/on-premises',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:MediaPool:OnPremises',
        layout: eLayoutType.application,
        // requiredPolicy: 'Platform.MediaPool.Projects'
      },
      {
        parentName: '::Menu:MediaPools',
        path: '/media-pool/cloud',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:MediaPool:Cloud',
        layout: eLayoutType.application,
        // requiredPolicy: 'Platform.MediaPool.Projects'
      },
      {
        parentName: '::Menu:MediaPools',
        path: '/media-pool/tape',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:MediaPool:Tape',
        layout: eLayoutType.application,
        // requiredPolicy: 'Platform.MediaPool.Projects'
      }
    ]);
  };
}
