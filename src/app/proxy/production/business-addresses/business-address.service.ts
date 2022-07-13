import type { BusinessAddressCreateDto, BusinessAddressDto, BusinessAddressUpdateDto, GetBusinessAddressesInput } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BusinessAddressService {
  apiName = 'Default';

  create = (input: BusinessAddressCreateDto) =>
    this.restService.request<any, BusinessAddressDto>({
      method: 'POST',
      url: '/api/app/business-addresses',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/business-addresses/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, BusinessAddressDto>({
      method: 'GET',
      url: `/api/app/business-addresses/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetBusinessAddressesInput) =>
    this.restService.request<any, PagedResultDto<BusinessAddressDto>>({
      method: 'GET',
      url: '/api/app/business-addresses',
      params: { filterText: input.filterText, businessProfileId: input.businessProfileId, type: input.type, line1: input.line1, line2: input.line2, line3: input.line3, city: input.city, stateProvince: input.stateProvince, country: input.country, postalCode: input.postalCode, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: BusinessAddressUpdateDto) =>
    this.restService.request<any, BusinessAddressDto>({
      method: 'PUT',
      url: `/api/app/business-addresses/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
