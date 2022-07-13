import type { FullAuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface GetPersonProfilesInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  birthdayMin?: string;
  birthdayMax?: string;
  email?: string;
  mobilePhone?: string;
  officePhone?: string;
  fax?: string;
  jobTitle?: string;
  nickname?: string;
  notes?: string;
}

export interface PersonProfileCreateDto {
  firstName: string;
  lastName: string;
  avatar?: string;
  birthday?: string;
  email?: string;
  mobilePhone?: string;
  officePhone?: string;
  fax?: string;
  jobTitle?: string;
  nickname?: string;
  notes?: string;
}

export interface PersonProfileDto extends FullAuditedEntityDto<string> {
  firstName?: string;
  lastName?: string;
  avatar?: string;
  birthday?: string;
  email?: string;
  mobilePhone?: string;
  officePhone?: string;
  fax?: string;
  jobTitle?: string;
  nickname?: string;
  notes?: string;
  fullName?: string;
}

export interface PersonProfileUpdateDto {
  firstName: string;
  lastName: string;
  avatar?: string;
  birthday?: string;
  email?: string;
  mobilePhone?: string;
  officePhone?: string;
  fax?: string;
  jobTitle?: string;
  nickname?: string;
  notes?: string;
}
