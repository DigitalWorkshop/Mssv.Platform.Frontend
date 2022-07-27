import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { ContentType } from '../common/content-type.enum';

export interface GetTitlesInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  name?: string;
  titleType?: ContentType;
  imdbId?: string;
  theMovieDbId?: string;
  keywords?: string;
  releaseDateMin?: string;
  releaseDateMax?: string;
  posterUrl?: string;
  genre?: string;
  description?: string;
  rating?: string;
  plot?: string;
  runtimeMin?: number;
  runtimeMax?: number;
  alternativeTitleNames?: string;
  countryOfOrigin?: string;
  originalLanguage?: string;
  directors?: string;
  writers?: string;
  actors?: string;
  productionCompany?: string;
  distributor?: string;
}

export interface TitleCreateDto {
  name: string;
  titleType?: ContentType;
  imdbId?: string;
  theMovieDbId?: string;
  keywords?: string;
  releaseDate?: string;
  posterUrl?: string;
  genre?: string;
  description?: string;
  rating?: string;
  plot?: string;
  runtime?: number;
  alternativeTitleNames?: string;
  countryOfOrigin?: string;
  originalLanguage?: string;
  directors?: string;
  writers?: string;
  actors?: string;
  productionCompany?: string;
  distributor?: string;
}

export interface TitleDto extends FullAuditedEntityDto<string> {
  name: string;
  titleType?: ContentType;
  imdbId?: string;
  theMovieDbId?: string;
  keywords?: string;
  releaseDate?: string;
  posterUrl?: string;
  genre?: string;
  description?: string;
  rating?: string;
  plot?: string;
  runtime?: number;
  alternativeTitleNames?: string;
  countryOfOrigin?: string;
  originalLanguage?: string;
  directors?: string;
  writers?: string;
  actors?: string;
  productionCompany?: string;
  distributor?: string;
}

export interface TitleUpdateDto {
  name: string;
  titleType?: ContentType;
  imdbId?: string;
  theMovieDbId?: string;
  keywords?: string;
  releaseDate?: string;
  posterUrl?: string;
  genre?: string;
  description?: string;
  rating?: string;
  plot?: string;
  runtime?: number;
  alternativeTitleNames?: string;
  countryOfOrigin?: string;
  originalLanguage?: string;
  directors?: string;
  writers?: string;
  actors?: string;
  productionCompany?: string;
  distributor?: string;
}
