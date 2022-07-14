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
        path: '/content-library/films',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:ContentLibrary:Films',
        layout: eLayoutType.application,
        // requiredPolicy: 'Platform.ContentLibrary.Projects'
      },
      {
        parentName: '::Menu:ContentLibrary',
        path: '/content-library/series',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:ContentLibrary:Series',
        layout: eLayoutType.application,
        // requiredPolicy: 'Platform.ContentLibrary.Projects'
      },
      {
        parentName: '::Menu:ContentLibrary',
        path: '/content-library/comedy-specials',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:ContentLibrary:ComedySpecials',
        layout: eLayoutType.application,
        // requiredPolicy: 'Platform.ContentLibrary.Projects'
      },
      {
        parentName: '::Menu:ContentLibrary',
        path: '/content-library/documentaries',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:ContentLibrary:Documentaries',
        layout: eLayoutType.application,
        // requiredPolicy: 'Platform.ContentLibrary.Projects'
      },
      {
        parentName: '::Menu:ContentLibrary',
        path: '/content-library/music-videos',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:ContentLibrary:MusicVideos',
        layout: eLayoutType.application,
        // requiredPolicy: 'Platform.ContentLibrary.Projects'
      },
      {
        parentName: '::Menu:ContentLibrary',
        path: '/content-library/commercials',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:ContentLibrary:Commercials',
        layout: eLayoutType.application,
        // requiredPolicy: 'Platform.ContentLibrary.Projects'
      },
      {
        parentName: '::Menu:ContentLibrary',
        path: '/content-library/corporate',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:ContentLibrary:Corporate',
        layout: eLayoutType.application,
        // requiredPolicy: 'Platform.ContentLibrary.Projects'
      },
      {
        parentName: '::Menu:ContentLibrary',
        path: '/content-library/training',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:ContentLibrary:Training',
        layout: eLayoutType.application,
        // requiredPolicy: 'Platform.ContentLibrary.Projects'
      },
      {
        parentName: '::Menu:ContentLibrary',
        path: '/content-library/other',
        iconClass: 'fas fa-file-alt',
        name: '::Menu:ContentLibrary:Other',
        layout: eLayoutType.application,
        // requiredPolicy: 'Platform.ContentLibrary.Projects'
      },
    ]);
  };
}
