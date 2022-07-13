import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';
import type { BusinessProfileDto } from '../business-profiles/models';
import type { PersonProfileDto } from '../person-profiles/models';

export interface GetPersonBusinessAffiliationsInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  designation?: string;
  startDateMin?: string;
  startDateMax?: string;
  endDateMin?: string;
  endDateMax?: string;
  businessProfileId?: string;
  personProfileId?: string;
}

export interface PersonBusinessAffiliationCreateDto {
  designation: string;
  startDate?: string;
  endDate?: string;
  businessProfileId?: string;
  personProfileId?: string;
}

export interface PersonBusinessAffiliationDto extends FullAuditedEntityDto<number> {
  designation?: string;
  startDate?: string;
  endDate?: string;
  businessProfileId?: string;
  personProfileId?: string;
  concurrencyStamp?: string;
}

export interface PersonBusinessAffiliationUpdateDto {
  designation: string;
  startDate?: string;
  endDate?: string;
  businessProfileId?: string;
  personProfileId?: string;
  concurrencyStamp?: string;
}

export interface PersonBusinessAffiliationWithNavigationPropertiesDto {
  personBusinessAffiliation: PersonBusinessAffiliationDto;
  businessProfile: BusinessProfileDto;
  personProfile: PersonProfileDto;
}
