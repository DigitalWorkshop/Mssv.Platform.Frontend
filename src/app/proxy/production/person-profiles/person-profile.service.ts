import type { GetPersonProfilesInput, PersonProfileCreateDto, PersonProfileDto, PersonProfileUpdateDto } from './models';
import { RestService } from '@abp/ng.core';
import type { PagedResultDto } from '@abp/ng.core';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PersonProfileService {
  apiName = 'Default';

  create = (input: PersonProfileCreateDto) =>
    this.restService.request<any, PersonProfileDto>({
      method: 'POST',
      url: '/api/app/person-profiles',
      body: input,
    },
    { apiName: this.apiName });

  delete = (id: string) =>
    this.restService.request<any, void>({
      method: 'DELETE',
      url: `/api/app/person-profiles/${id}`,
    },
    { apiName: this.apiName });

  get = (id: string) =>
    this.restService.request<any, PersonProfileDto>({
      method: 'GET',
      url: `/api/app/person-profiles/${id}`,
    },
    { apiName: this.apiName });

  getList = (input: GetPersonProfilesInput) =>
    this.restService.request<any, PagedResultDto<PersonProfileDto>>({
      method: 'GET',
      url: '/api/app/person-profiles',
      params: { filterText: input.filterText, firstName: input.firstName, lastName: input.lastName, avatar: input.avatar, birthdayMin: input.birthdayMin, birthdayMax: input.birthdayMax, email: input.email, mobilePhone: input.mobilePhone, officePhone: input.officePhone, fax: input.fax, jobTitle: input.jobTitle, nickname: input.nickname, notes: input.notes, sorting: input.sorting, skipCount: input.skipCount, maxResultCount: input.maxResultCount },
    },
    { apiName: this.apiName });

  update = (id: string, input: PersonProfileUpdateDto) =>
    this.restService.request<any, PersonProfileDto>({
      method: 'PUT',
      url: `/api/app/person-profiles/${id}`,
      body: input,
    },
    { apiName: this.apiName });

  constructor(private restService: RestService) {}
}
