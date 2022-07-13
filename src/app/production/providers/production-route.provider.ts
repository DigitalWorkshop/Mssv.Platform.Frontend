import { eLayoutType, RoutesService } from '@abp/ng.core';
import { APP_INITIALIZER } from '@angular/core';

export const PRODUCTION_ROUTE_PROVIDER = [
  { provide: APP_INITIALIZER, useFactory: configureRoutes, deps: [RoutesService], multi: true }
];

function configureRoutes(routes: RoutesService) {
  return () => {
    routes.add([
      {
        path: '/production',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:Production',
        layout: eLayoutType.application,
        order: 3
      },
      {
        parentName: '::Menu:Production',
        path: '/production/business-profiles',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:Production:BusinessProfiles',
        layout: eLayoutType.application,
        requiredPolicy: 'Platform.BusinessProfiles'
      },
      {
        parentName: '::Menu:Production',
        path: '/production/person-profiles',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:Production:PersonProfiles',
        layout: eLayoutType.application,
        requiredPolicy: 'Platform.PersonProfiles'
      }
    ]);
  };
}
