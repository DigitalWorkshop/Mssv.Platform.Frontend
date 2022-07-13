import { mapEnumToOptions } from '@abp/ng.core';

export enum AddressType {
  Physical = 0,
  Postal = 1,
  Residential = 2,
  Other = 3,
}

export const addressTypeOptions = mapEnumToOptions(AddressType);
