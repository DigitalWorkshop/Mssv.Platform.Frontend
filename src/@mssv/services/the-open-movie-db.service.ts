import { Injectable } from '@angular/core';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MssvUtilsService } from './mssv-utils.service';
import { MovieResult, PartialMovieResult, SearchMovieResult } from './_models/the-open-movie-db.models';
import { Rest, RestService } from '@abp/ng.core';

const omdbInfo = {
  OMDB_ENDPOINT: '//www.omdbapi.com/',
  OMDB_API_KEY: '6693947b'
};

@Injectable({
  providedIn: 'root'
})
export class TheOpenMovieDbService {
  apiKey: string;
  contentType: string;
  returnType: string;

  constructor(private rest: RestService,
              private _mssvUtilsService: MssvUtilsService) {
    this.apiKey = omdbInfo.OMDB_API_KEY;
    this.contentType = 'movie';
    this.returnType = 'json';
  }

  public searchMovieNames(filter: string): Observable<PartialMovieResult[]> {

    if (typeof filter !== 'string' || !(filter) || filter.length < 2) {
      return new Observable<PartialMovieResult[]>();
    }

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),
      params: new HttpParams()
        .set('apiKey', this.apiKey)
        .set('type', this.contentType)
        .set('r', this.returnType)
        .set('s', filter)
    };

    const request: Rest.Request<null> = {
      method: 'GET',
      url: '/',
      headers: httpOptions.headers,
      params: httpOptions.params,
      withCredentials: false
    };

    return this.rest.request<null, SearchMovieResult>(request, {apiName: 'omdb'})
      .pipe(
        map(res => res.search)
      );

  }

  public searchForMovieByImdbId(imdbId: string): Observable<MovieResult> {

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      }),
      params: new HttpParams()
        .set('apiKey', this.apiKey)
        .set('type', this.contentType)
        .set('r', this.returnType)
        .set('i', imdbId)
        .set('plot', 'full')
    };

    const request: Rest.Request<null> = {
      method: 'GET',
      url: '/',
      headers: httpOptions.headers,
      params: httpOptions.params,
      withCredentials: false
    };

    return this.rest.request<null, MovieResult>(request, {apiName: 'omdb'})
      .pipe(
        // OMDB return Pascal Case objects, we need them to camel case
        map(res => this._mssvUtilsService.convertObjectPropsToCamelCase(res))
      );
  }
}
