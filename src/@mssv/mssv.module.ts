import { NgModule, ModuleWithProviders, Optional, SkipSelf } from '@angular/core';

import { TheOpenMovieDbService } from './services/the-open-movie-db.service';
import { MssvUtilsService } from './services/mssv-utils.service';
import { TheMovieDbService } from './services/the-movie-db.service';
import { BulletinBoardService } from './services/bulletin-board.service';

@NgModule({
  imports: [],
  declarations: [],
  providers: [],
  exports: []
})
export class MssvModule {
  constructor(@Optional() @SkipSelf() parentModule: MssvModule) {
    if (parentModule) {
      throw new Error('DwModule is already loaded. Import it in the AppModule only!');
    }
  }

  static forRoot(): ModuleWithProviders<MssvModule> {
    return {
      ngModule: MssvModule,
      providers: [
        MssvUtilsService,
        BulletinBoardService,
        TheMovieDbService,
        TheOpenMovieDbService
      ]
    };
  }
}
