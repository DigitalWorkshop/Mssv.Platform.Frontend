import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';


export interface GetMovieInfoInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  title?: string;
}

export interface MovieInfoDto {
  id: string;
  title: string;
  backdropPath: string;
  genres: Genre[];
  isAdultThemed: boolean;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  releaseDate: Date;
  video: boolean;
  voteAverage: number;
  voteCount: number;
}

export interface MovieDto {
  id: number;
  title: string;
  backdropPath: string;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdbId: string;
  isAdultThemed: boolean;
  isVideo: boolean;
  keywords: Keyword[];
  movieCollectionInfo?: any;
  originalLanguage: string;
  originalTitle: string;
  overview: string;
  popularity: number;
  posterPath: string;
  productionCompanies: ProductionCompany[];
  productionCountries: ProductionCountry[];
  releaseDate: Date;
  revenue: number;
  runtime: number;
  spokenLanguages: SpokenLanguage[];
  status: string;
  tagline: string;
  voteAverage: number;
  voteCount: number;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Keyword {
  id: number;
  name: string;
}

export interface ProductionCompany {
  id: number;
  name: string;
}

export interface ProductionCountry {
  name: string;
  iso3166Code: string;
}

export interface SpokenLanguage {
  name: string;
  iso639Code: string;
}





