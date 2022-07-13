import type { BusinessProfileCreateDto, BusinessProfileDto, BusinessProfileUpdateDto, GetBusinessProfilesInput } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BusinessProfileService {
  apiName = 'Default';

  create = (input: BusinessProfileCreateDto) =>
    this.restService.request<any, BusinessProfileDto>({
      method: 'POST',
      url: '/api/app/business-profiles',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/business-profiles/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, BusinessProfileDto>({
      method: 'GET',
      url: `/api/app/business-profiles/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetBusinessProfilesInput) =>
    this.restService.request<any, PagedResultDto<BusinessProfileDto>>({
      method: 'GET',
      url: '/api/app/business-profiles',
      params: { filterText: input.filterText, enterpriseName: input.enterpriseName, acronym: input.acronym, primaryPhone: input.primaryPhone, secondaryPhone: input.secondaryPhone, fax: input.fax, website: input.website, registrationNumber: input.registrationNumber, taxNumber: input.taxNumber, companyLogo: input.companyLogo, description: input.description, notes: input.notes, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: BusinessProfileUpdateDto) =>
    this.restService.request<any, BusinessProfileDto>({
      method: 'PUT',
      url: `/api/app/business-profiles/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
