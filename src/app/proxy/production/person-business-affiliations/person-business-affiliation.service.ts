import type { GetPersonBusinessAffiliationsInput, PersonBusinessAffiliationCreateDto, PersonBusinessAffiliationDto, PersonBusinessAffiliationUpdateDto, PersonBusinessAffiliationWithNavigationPropertiesDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';
import type { LookupDto, LookupRequestDto } from '../../shared/models';

@Injectable({
  providedIn: 'root',
})
export class PersonBusinessAffiliationService {
  apiName = 'Default';

  create = (input: PersonBusinessAffiliationCreateDto) =>
    this.restService.request<any, PersonBusinessAffiliationDto>({
      method: 'POST',
      url: '/api/app/person-business-affiliations',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: number) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/person-business-affiliations/${id}`,
    },
    { apiName: this.apiName });

  get = (id: number) =>
    this.restService.request<any, PersonBusinessAffiliationDto>({
      method: 'GET',
      url: `/api/app/person-business-affiliations/${id}`,
    },
    { apiName: this.apiName });

  getBusinessProfileLookup = (input: LookupRequestDto) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>({
      method: 'GET',
      url: '/api/app/person-business-affiliations/business-profile-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getList = (input: GetPersonBusinessAffiliationsInput) =>
    this.restService.request<any, PagedResultDto<PersonBusinessAffiliationWithNavigationPropertiesDto>>({
      method: 'GET',
      url: '/api/app/person-business-affiliations',
      params: { filterText: input.filterText, designation: input.designation, startDateMin: input.startDateMin, startDateMax: input.startDateMax, endDateMin: input.endDateMin, endDateMax: input.endDateMax, businessProfileId: input.businessProfileId, personProfileId: input.personProfileId, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getPersonProfileLookup = (input: LookupRequestDto) =>
    this.restService.request<any, PagedResultDto<LookupDto<string>>>({
      method: 'GET',
      url: '/api/app/person-business-affiliations/person-profile-lookup',
      params: { filter: input.filter, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  getWithNavigationProperties = (id: number) =>
    this.restService.request<any, PersonBusinessAffiliationWithNavigationPropertiesDto>({
      method: 'GET',
      url: `/api/app/person-business-affiliations/with-navigation-properties/${id}`,
    },
    { apiName: this.apiName });

  update = (id: number, input: PersonBusinessAffiliationUpdateDto) =>
    this.restService.request<any, PersonBusinessAffiliationDto>({
      method: 'PUT',
      url: `/api/app/person-business-affiliations/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
