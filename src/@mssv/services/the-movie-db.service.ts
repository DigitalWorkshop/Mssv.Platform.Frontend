import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  ConfigResult,
  FindResult,
  MovieResult,
  PartialMovieResult,
  SearchMovieResult
} from './_models/the-movie-db.models';
import { PagedResultDto, Rest, RestService } from '@abp/ng.core';
import { LookupDto, LookupRequestDto } from '@proxy/shared';

const tmdbInfo = {
  TMDB_ENDPOINT: '//api.themoviedb.org/3/',
  TMDB_API_KEY: 'c0062b402177a6197dc22c0627b379c9',
  TMDB_DEFAULT_POSTER_SIZE: 'w342',
  TMDB_IMG_BASE_URL: '//image.tmdb.org/t/p/',
  FILM_POSTER_PLACEHOLDER: '//previews.digitalworkshop.tv/Posters/film-poster_w342.png'
};

@Injectable({
  providedIn: 'root'
})

export class TheMovieDbService {
  apiKey: string;
  configuration: Observable<ConfigResult>;
  imgBasePath: string;
  defaultPosterSize: string;

  constructor(private restService: RestService) {
    this.apiKey = tmdbInfo.TMDB_API_KEY;
    this.imgBasePath = tmdbInfo.TMDB_IMG_BASE_URL;
    this.defaultPosterSize = tmdbInfo.TMDB_DEFAULT_POSTER_SIZE;
    this.configuration = this.getConfig();
  }

  private getConfig(): Observable<ConfigResult> {

    const request: Rest.Request<null> = {
      method: 'GET',
      url: '/configuration',
      params: {
        'api_key': this.apiKey
      },
      withCredentials: false
    };

    return this.restService.request<null, ConfigResult>(request, { apiName: 'tmdb' });

  }

  public searchMovieNames(filter: string): Observable<SearchMovieResult> {

    if (typeof filter !== 'string' || !(filter) || filter.length < 2) {
      return new Observable<SearchMovieResult>();
    }

    const request: Rest.Request<null> = {
      method: 'GET',
      url: '/search/movie',
      params: {
        'api_key': this.apiKey,
        'query': filter
      },
      withCredentials: false
    };

    return this.restService.request<null, SearchMovieResult>(request, { apiName: 'tmdb', skipHandleError: true });

  }

  public searchForMovieByImdbId(imdbId: string): Observable<PartialMovieResult[]> {

    const request: Rest.Request<null> = {
      method: 'GET',
      url: '/search/movie',
      params: {
        'api_key': this.apiKey,
        'external_source': imdbId
      },
      withCredentials: false
    };

    return this.restService.request<null, FindResult>(request, { apiName: 'tmdb' })
      .pipe(
        map(res => res.movie_results)
      );
  }

  public getFullMovie(movieDbId: number): Observable<MovieResult> {

    const request: Rest.Request<null> = {
      method: 'GET',
      url: '/movie/' + movieDbId,
      params: {
        'api_key': this.apiKey
      },
      withCredentials: false
    };

    return this.restService.request<null, MovieResult>(request, { apiName: 'tmdb' });

  }

  public getMoviePosterUrl(posterPath: string): string {
    let posterUrl = tmdbInfo.FILM_POSTER_PLACEHOLDER;
    if (posterPath) {
      posterUrl = this.imgBasePath + this.defaultPosterSize + posterPath;
    }
    return posterUrl;
  }

  getMovieLookup = (input: LookupRequestDto) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>({
        method: 'GET',
        url: '/api/app/movie-lookup',
        params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
      });

}
