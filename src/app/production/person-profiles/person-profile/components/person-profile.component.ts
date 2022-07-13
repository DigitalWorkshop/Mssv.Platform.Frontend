import { ABP, ListService, PagedResultDto, TrackByService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { DateAdapter } from '@abp/ng.theme.shared/extensions';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import type {
  GetPersonProfilesInput,
  PersonProfileDto
} from '@proxy/production/person-profiles/models';
import { PersonProfileService } from '@proxy/production/person-profiles/person-profile.service';

import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';

@Component({
  selector: 'app-person-profile',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [ListService, { provide: NgbDateAdapter, useClass: DateAdapter }],
  templateUrl: './person-profile.component.html',
  styles: []
})
export class PersonProfileComponent implements OnInit {
  data: PagedResultDto<PersonProfileDto> = {
    items: [],
    totalCount: 0
  };

  filters = {} as GetPersonProfilesInput;

  form: FormGroup;

  isFiltersHidden = true;

  isModalBusy = false;

  isModalOpen = false;

  selected?: PersonProfileDto;

  active: number = 1;

  // Telephone Inputs
  separateDialCode = true;
  SearchCountryField = SearchCountryField;
  CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  preferredCountries: CountryISO[] = [CountryISO.SouthAfrica, CountryISO.UnitedKingdom];

  constructor(
    public readonly list: ListService,
    public readonly track: TrackByService,
    public readonly service: PersonProfileService,
    private confirmation: ConfirmationService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    const getData = (query: ABP.PageQueryParams) =>
      this.service.getList({
        ...query,
        ...this.filters,
        filterText: query.filter
      });

    const setData = (list: PagedResultDto<PersonProfileDto>) => (this.data = list);

    this.list.hookToQuery(getData).subscribe(setData);
  }

  clearFilters() {
    this.filters = {} as GetPersonProfilesInput;
  }

  buildForm() {
    const {
      avatar,
      birthday,
      email,
      fax,
      firstName,
      jobTitle,
      lastName,
      mobilePhone,
      nickname,
      notes,
      officePhone
    } = this.selected || {};

    this.form = this.fb.group({
      avatar: [avatar ?? null, []],
      birthday: [birthday ? new Date(birthday) : null, []],
      email: [email ?? null, []],
      fax: [fax ?? null, []],
      firstName: [firstName ?? null, [Validators.required]],
      jobTitle: [jobTitle ?? null, []],
      lastName: [lastName ?? null, [Validators.required]],
      mobilePhone: [mobilePhone ?? null, []],
      nickname: [nickname ?? null, []],
      notes: [notes ?? null, []],
      officePhone: [officePhone ?? null, []]
    });
  }

  hideForm() {
    this.isModalOpen = false;
    this.form.reset();
  }

  showForm() {
    this.buildForm();
    this.isModalOpen = true;
  }

  submitForm() {
    if (this.form.invalid) return;

    const mobilePhone = this.form.value['mobilePhone']?.internationalNumber ?? null;
    const officePhone = this.form.value['officePhone']?.internationalNumber ?? null;
    const fax = this.form.value['fax']?.internationalNumber ?? null;

    const formResult = {
      ...this.form.value,
      ...{
        mobilePhone,
        officePhone,
        fax
      }
    };

    const request = this.selected
      ? this.service.update(this.selected.id, formResult)
      : this.service.create(formResult);

    this.isModalBusy = true;

    request
      .pipe(
        finalize(() => (this.isModalBusy = false)),
        tap(() => this.hideForm())
      )
      .subscribe(this.list.get);
  }

  create() {
    this.selected = undefined;
    this.showForm();
  }

  update(record: PersonProfileDto) {
    this.selected = record;
    this.showForm();
  }

  delete(record: PersonProfileDto) {
    this.confirmation
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter(status => status === Confirmation.Status.confirm),
        switchMap(() => this.service.delete(record.id))
      )
      .subscribe(this.list.get);
  }
}
