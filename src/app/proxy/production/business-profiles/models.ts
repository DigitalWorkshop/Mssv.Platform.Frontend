import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface BusinessProfileCreateDto {
  enterpriseName: string;
  acronym: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  fax?: string;
  website?: string;
  registrationNumber?: string;
  taxNumber?: string;
  companyLogo?: string;
  description?: string;
  notes?: string;
}

export interface BusinessProfileDto extends FullAuditedEntityDto<string> {
  enterpriseName?: string;
  acronym?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  fax?: string;
  website?: string;
  registrationNumber?: string;
  taxNumber?: string;
  companyLogo?: string;
  description?: string;
  notes?: string;
}

export interface BusinessProfileUpdateDto {
  enterpriseName: string;
  acronym: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  fax?: string;
  website?: string;
  registrationNumber?: string;
  taxNumber?: string;
  companyLogo?: string;
  description?: string;
  notes?: string;
}

export interface GetBusinessProfilesInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  enterpriseName?: string;
  acronym?: string;
  primaryPhone?: string;
  secondaryPhone?: string;
  fax?: string;
  website?: string;
  registrationNumber?: string;
  taxNumber?: string;
  companyLogo?: string;
  description?: string;
  notes?: string;
}
