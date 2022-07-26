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

  constructor(private http: HttpClient) {
    this.apiKey = tmdbInfo.TMDB_API_KEY;
    this.imgBasePath = tmdbInfo.TMDB_IMG_BASE_URL;
    this.defaultPosterSize = tmdbInfo.TMDB_DEFAULT_POSTER_SIZE;
    this.configuration = this.getConfig();
  }

  getConfig(): Observable<ConfigResult> {
    const params = new HttpParams()
      .set('api_key', this.apiKey);
    return this.http.get<ConfigResult>(tmdbInfo.TMDB_ENDPOINT + 'configuration', { params });
  }

  public searchMovieNames(filter: string): Observable<SearchMovieResult> {

    if (typeof filter !== 'string' || !(filter) || filter.length < 2) {
      return new Observable<SearchMovieResult>();
    }

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('query', filter);
    return this.http.get<SearchMovieResult>(tmdbInfo.TMDB_ENDPOINT + 'search/movie', { params });

  }

  public searchForMovieByImdbId(imdbId: string): Observable<PartialMovieResult[]> {
    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('external_source', 'imdb_id'); //
    return this.http.get<FindResult>(tmdbInfo.TMDB_ENDPOINT + 'find/' + imdbId, { params })
      .pipe(
        map(res => res.movie_results)
      );
  }

  public getFullMovie(movieDbId: number): Observable<MovieResult> {
    const params = new HttpParams()
      .set('api_key', this.apiKey);
    return this.http.get<MovieResult>(tmdbInfo.TMDB_ENDPOINT + 'movie/' + movieDbId, { params });
  }

  public getMoviePosterUrl(posterPath: string): string {
    let posterUrl = tmdbInfo.FILM_POSTER_PLACEHOLDER;
    if (posterPath) {
      posterUrl = this.imgBasePath + this.defaultPosterSize + posterPath;
    }
    return posterUrl;
  }
}
