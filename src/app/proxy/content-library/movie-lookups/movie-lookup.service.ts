import type { GetMovieLookupsInput, MovieLookupDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { LookupDto, LookupRequestDto } from '@proxy/shared';

@Injectable({
  providedIn: 'root'
})
export class MovieLookupService {
  apiName = 'Default';

  get = (id: string) =>
    this.restService.request<any, MovieLookupDto>({
        method: 'GET',
        url: `/api/app/movie-lookups/${id}`
      },
      { apiName: this.apiName });

  getMovieLookup = (input: LookupRequestDto) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>({
        method: 'GET',
        url: '/api/app/movie-lookups/movie-lookup',
        params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
      },
      { apiName: this.apiName });


  constructor(private restService: RestService) {
  }
}
