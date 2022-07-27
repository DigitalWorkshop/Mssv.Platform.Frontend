import type { GetTitlesInput, TitleCreateDto, TitleDto, TitleUpdateDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TitleService {
  apiName = 'Default';

  create = (input: TitleCreateDto) =>
    this.restService.request<any, TitleDto>({
      method: 'POST',
      url: '/api/app/titles',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/titles/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, TitleDto>({
      method: 'GET',
      url: `/api/app/titles/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetTitlesInput) =>
    this.restService.request<any, PagedResultDto<TitleDto>>({
      method: 'GET',
      url: '/api/app/titles',
      params: { filterText: input.filterText, name: input.name, titleType: input.titleType, imdbId: input.imdbId, theMovieDbId: input.theMovieDbId, keywords: input.keywords, releaseDateMin: input.releaseDateMin, releaseDateMax: input.releaseDateMax, posterUrl: input.posterUrl, genre: input.genre, description: input.description, rating: input.rating, plot: input.plot, runtimeMin: input.runtimeMin, runtimeMax: input.runtimeMax, alternativeTitleNames: input.alternativeTitleNames, countryOfOrigin: input.countryOfOrigin, originalLanguage: input.originalLanguage, directors: input.directors, writers: input.writers, actors: input.actors, productionCompany: input.productionCompany, distributor: input.distributor, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: TitleUpdateDto) =>
    this.restService.request<any, TitleDto>({
      method: 'PUT',
      url: `/api/app/titles/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
