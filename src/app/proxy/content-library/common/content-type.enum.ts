import { mapEnumToOptions } from '@abp/ng.core';

export enum ContentType {
  Movie,
  MusicVideo,
  PodcastEpisode,
  PodcastSeries,
  Short,
  TvEpisode,
  TvMiniSeries,
  TvMovie,
  TvSeries,
  TvShort,
  TvSpecial,
  Video,
  VideoGame,
  Other,
}

export const contentTypeOptions = mapEnumToOptions(ContentType);
