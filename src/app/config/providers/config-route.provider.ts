import { eLayoutType, RoutesService } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const CONFIG_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true }
];

function configureRoutes(routes: RoutesService) {
  return () => {
    routes.add([
      {
        path: '/config',
        iconClass: 'fas fa-pen',
        name: '::Menu:Config',
        layout: eLayoutType.application,
        order: 10
      },
      {
        parentName: '::Menu:Config',
        path: '/config/file-specifications',
        iconClass: 'fas fa-page',
        name: '::Menu:Config:FileSpecifications',
        layout: eLayoutType.application,
        // requiredPolicy: 'Platform.Config.Projects'
      }
    ]);
  };
}
