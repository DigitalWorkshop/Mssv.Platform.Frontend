import { eLayoutType, RoutesService } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const ENGINE_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true }
];

function configureRoutes(routes: RoutesService) {
  return () => {
    routes.add([
      {
        path: '/engine',
        iconClass: 'fas fa-cog',
        name: '::Menu:Engine',
        layout: eLayoutType.application,
        order: 7
      },
      {
        parentName: '::Menu:Engine',
        path: '/engine/tasks',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:Engine:Tasks',
        layout: eLayoutType.application,
        // requiredPolicy: 'Platform.Engine.Projects'
      },
      {
        parentName: '::Menu:Engine',
        path: '/engine/hot-folders',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:Engine:HotFolders',
        layout: eLayoutType.application,
        // requiredPolicy: 'Platform.Engine.Projects'
      }
    ]);
  };
}
