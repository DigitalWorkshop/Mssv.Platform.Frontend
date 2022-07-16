import { eLayoutType, RoutesService } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const CONTENT_LIBRARY_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true }
];

function configureRoutes(routes: RoutesService) {
  return () => {
    routes.add([
      {
        path: '/content-library',
        iconClass: 'fas fa-film',
        name: '::Menu:ContentLibrary',
        layout: eLayoutType.application,
        order: 2
      },
      {
        parentName: '::Menu:ContentLibrary',
        path: '/content-library/titles',
        name: '::Menu:ContentLibrary:Titles',
        layout: eLayoutType.application,
        // requiredPolicy: 'Platform.ContentLibrary.Projects'
      }
    ]);
  };
}
