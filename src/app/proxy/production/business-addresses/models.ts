import type { AddressType } from '../common/address-type.enum';
import type { AuditedEntityDto, PagedAndSortedResultRequestDto } from '@abp/ng.core';

export interface BusinessAddressCreateDto {
  businessProfileId?: string;
  type: AddressType;
  line1: string;
  line2?: string;
  line3?: string;
  city?: string;
  stateProvince: string;
  country: string;
  postalCode?: string;
}

export interface BusinessAddressDto extends AuditedEntityDto<string> {
  businessProfileId?: string;
  type: AddressType;
  line1?: string;
  line2?: string;
  line3?: string;
  city?: string;
  stateProvince?: string;
  country?: string;
  postalCode?: string;
}

export interface BusinessAddressUpdateDto {
  businessProfileId?: string;
  type: AddressType;
  line1: string;
  line2?: string;
  line3?: string;
  city?: string;
  stateProvince: string;
  country: string;
  postalCode?: string;
}

export interface GetBusinessAddressesInput extends PagedAndSortedResultRequestDto {
  filterText?: string;
  businessProfileId?: string;
  type?: AddressType;
  line1?: string;
  line2?: string;
  line3?: string;
  city?: string;
  stateProvince?: string;
  country?: string;
  postalCode?: string;
}
