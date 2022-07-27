import type { PagedAndSortedResultRequestDto } from '@abp/ng.core';


export interface GetMovieLookupsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  title?: string;
}

export interface MovieLookupDto {
  title: string;

}
