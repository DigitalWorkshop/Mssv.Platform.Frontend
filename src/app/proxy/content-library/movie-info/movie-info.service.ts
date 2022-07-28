import type { GetMovieInfoInput, MovieDto, MovieInfoDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import { LookupDto, LookupRequestDto } from '@proxy/shared';

@Injectable({
  providedIn: 'root'
})
export class MovieInfoService {
  apiName = 'Default';

  get = (id: string) =>
    this.restService.request<any, MovieDto>({
        method: 'GET',
        url: `/api/app/movie-info/${id}`
      },
      { apiName: this.apiName });

  getMovieInfo = (input: LookupRequestDto) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>({
        method: 'GET',
        url: '/api/app/movie-info/movie-info',
        params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount }
      },
      { apiName: this.apiName });


  constructor(private restService: RestService) {
  }
}
