import { ABP, ListService, PagedResultDto, TrackByService } from '@abp/ng.core';
import { Confirmation, ConfirmationService } from '@abp/ng.theme.shared';
import { DateAdapter } from '@abp/ng.theme.shared/extensions';
import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateAdapter } from '@ng-bootstrap/ng-bootstrap';
import { filter, finalize, switchMap, tap } from 'rxjs/operators';
import type {
  GetPersonBusinessAffiliationsInput,
  PersonBusinessAffiliationWithNavigationPropertiesDto
} from '../../../../proxy/production/person-business-affiliations/models';
import {
  PersonBusinessAffiliationService
} from '../../../../proxy/production/person-business-affiliations/person-business-affiliation.service';
import { BusinessProfileDto } from '@proxy/production/business-profiles';

@Component({
  selector: 'app-person-business-affiliation',
  changeDetection: ChangeDetectionStrategy.Default,
  providers: [ListService, { provide: NgbDateAdapter, useClass: DateAdapter }],
  templateUrl: './person-business-affiliation.component.html',
  styles: []
})
export class PersonBusinessAffiliationComponent implements OnInit {

  @Input() businessProfile: BusinessProfileDto = null;

  data: PagedResultDto<PersonBusinessAffiliationWithNavigationPropertiesDto> = {
    items: [],
    totalCount: 0
  };

  filters = {} as GetPersonBusinessAffiliationsInput;

  form: FormGroup;

  isFiltersHidden = true;

  isModalBusy = false;

  isModalOpen = false;

  selected?: PersonBusinessAffiliationWithNavigationPropertiesDto;

  constructor(
    public readonly list: ListService,
    public readonly track: TrackByService,
    public readonly service: PersonBusinessAffiliationService,
    private confirmation: ConfirmationService,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    const getData = (query: ABP.PageQueryParams) =>
      this.service.getList({
        ...query,
        ...this.filters,
        ...{ businessProfileId: this.businessProfile.id },
        filterText: query.filter
      });

    const setData = (list: PagedResultDto<PersonBusinessAffiliationWithNavigationPropertiesDto>) =>
      (this.data = list);

    this.list.hookToQuery(getData).subscribe(setData);
  }

  clearFilters() {
    this.filters = {} as GetPersonBusinessAffiliationsInput;
  }

  buildForm() {
    const { designation, startDate, endDate, businessProfileId, personProfileId } =
    this.selected?.personBusinessAffiliation || {};

    this.form = this.fb.group({
      designation: [designation ?? null, [Validators.required]],
      startDate: [startDate ? new Date(startDate) : null, []],
      endDate: [endDate ? new Date(endDate) : null, []],
      businessProfileId: [this.businessProfile.id ?? null, [Validators.required]],
      personProfileId: [personProfileId ?? null, [Validators.required]]
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

    const request = this.selected
      ? this.service.update(this.selected.personBusinessAffiliation.id, this.form.value)
      : this.service.create(this.form.value);

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

  update(record: PersonBusinessAffiliationWithNavigationPropertiesDto) {
    this.selected = record;
    this.showForm();
  }

  delete(record: PersonBusinessAffiliationWithNavigationPropertiesDto) {
    this.confirmation
      .warn('::DeleteConfirmationMessage', '::AreYouSure', { messageLocalizationParams: [] })
      .pipe(
        filter(status => status === Confirmation.Status.confirm),
        switchMap(() => this.service.delete(record.personBusinessAffiliation.id))
      )
      .subscribe(this.list.get);
  }
}
